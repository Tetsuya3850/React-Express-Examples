A reservation app example written by React, React Native, and Express

## Features

- Users can make a reservation through a calendar UI.

## Demo

Functional Requirements:

Our ticket booking service should be able to list different cities where its affiliate cinemas are located.
Once the user selects the city, the service should display the movies released in that particular city.
Once the user selects a movie, the service should display the cinemas running that movie and its available show times.
The user should be able to choose a show at a particular cinema and book their tickets.
The service should be able to show the user the seating arrangement of the cinema hall. The user should be able to select multiple seats according to their preference.
The user should be able to distinguish available seats from booked ones.
Users should be able to put a hold on the seats for five minutes before they make a payment to finalize the booking.
The user should be able to wait if there is a chance that the seats might become available, e.g., when holds by other users expire.
Waiting customers should be serviced in a fair, first come, first serve manner.
Non-Functional Requirements:

The system would need to be highly concurrent. There will be multiple booking requests for the same seat at any particular point in time. The service should handle this gracefully and fairly.
The core thing of the service is ticket booking, which means financial transactions. This means that the system should be secure and the database ACID compliant.

For simplicity, let’s assume our service does not require any user authentication.
The system will not handle partial ticket orders. Either user gets all the tickets they want or they get nothing.
Fairness is mandatory for the system.
To stop system abuse, we can restrict users from booking more than ten seats at a time.
We can assume that traffic would spike on popular/much-awaited movie releases and the seats would fill up pretty fast. The system should be scalable and highly available to keep up with the surge in traffic.

our service has 3 billion page views per month and sells 10 million tickets a month.

Let’s assume that we have 500 cities and, on average each city has ten cinemas. If there are 2000 seats in each cinema and on average, there are two shows every day.

Let’s assume each seat booking needs 50 bytes (IDs, NumberOfSeats, ShowID, MovieID, SeatNumbers, SeatStatus, Timestamp, etc.) to store in the database. We would also need to store information about movies and cinemas; let’s assume it’ll take 50 bytes. So, to store all the data about all shows of all cinemas of all cities for a day:

SearchMovies(api_dev_key, keyword, city, lat_long, radius, start_datetime, end_datetime, postal_code,
includeSpellcheck, results_per_page, sorting_order)

api_dev_key (string): The API developer key of a registered account. This will be used to, among other things, throttle users based on their allocated quota.
keyword (string): Keyword to search on.
city (string): City to filter movies by.
lat_long (string): Latitude and longitude to filter by. radius (number): Radius of the area in which we want to search for events.
start_datetime (string): Filter movies with a starting datetime.
end_datetime (string): Filter movies with an ending datetime.
postal_code (string): Filter movies by postal code / zipcode.
includeSpellcheck (Enum: “yes” or “no”): Yes, to include spell check suggestions in the response.
results_per_page (number): Number of results to return per page. Maximum is 30.
sorting_order (string): Sorting order of the search result. Some allowable values : ‘name,asc’, ‘name,desc’, ‘date,asc’, ‘date,desc’, ‘distance,asc’, ‘name,date,asc’, ‘name,date,desc’, ‘date,name,asc’, ‘date,name,desc’.

[
{
"MovieID": 1,
"ShowID": 1,
"Title": "Cars 2",
"Description": "About cars",
"Duration": 120,
"Genre": "Animation",
"Language": "English",
"ReleaseDate": "8th Oct. 2014",
"Country": USA,
"StartTime": "14:00",
"EndTime": "16:00",
"Seats":
[
{
"Type": "Regular"
"Price": 14.99
"Status: "Almost Full"
},
{
"Type": "Premium"
"Price": 24.99
"Status: "Available"
}
]
},
{
"MovieID": 1,
"ShowID": 2,
"Title": "Cars 2",
"Description": "About cars",
"Duration": 120,
"Genre": "Animation",
"Language": "English",
"ReleaseDate": "8th Oct. 2014",
"Country": USA,
"StartTime": "16:30",
"EndTime": "18:30",
"Seats":
[
{
"Type": "Regular"
"Price": 14.99
"Status: "Full"
},
{
"Type": "Premium"
"Price": 24.99
"Status: "Almost Full"
}
]
},
]

ReserveSeats(api_dev_key, session_id, movie_id, show_id, seats_to_reserve[])

api_dev_key (string): same as above
session_id (string): User’s session ID to track this reservation. Once the reservation time expires, user’s reservation on the server will be removed using this ID.
movie_id (string): Movie to reserve.
show_id (string): Show to reserve.
seats_to_reserve (number): An array containing seat IDs to reserve.

Ticket Booking Workflow: The following would be a typical ticket booking workflow:

The user searches for a movie.
The user selects a movie.
The user is shown the available shows of the movie.
The user selects a show.
The user selects the number of seats to be reserved.
If the required number of seats are available, the user is shown a map of the theater to select seats. If not, the user is taken to ‘step 8’ below.
Once the user selects the seat, the system will try to reserve those selected seats.
If seats can’t be reserved, we have the following options:
Show is full; the user is shown the error message.
The seats the user wants to reserve are no longer available, but there are other seats available, so the user is taken back to the theater map to choose different seats.
There are no seats available to reserve, but all the seats are not booked yet, as there are some seats that other users are holding in the reservation pool and have not booked yet. The user will be taken to a waiting page where they can wait until the required seats get freed from the reservation pool. This waiting could result in the following options:
If the required number of seats become available, the user is taken to the theater map page where they can choose seats.
While waiting, if all seats get booked or there are fewer seats in the reservation pool than the user intend to book, the user is shown the error message.
User cancels the waiting and is taken back to the movie search page.
At maximum, a user can wait one hour, after that user’s session gets expired and the user is taken back to the movie search page.
If seats are reserved successfully, the user has five minutes to pay for the reservation. After payment, booking is marked complete. If the user is not able to pay within five minutes, all their reserved seats are freed to become available to other users.

For more on waiting list (https://www.educative.io/collection/page/5668639101419520/5649050225344512/5651874166341632)

How to handle concurrency, such that no two users are able to book same seat. We can use transactions in SQL databases to avoid any clashes. For example, if we are using an SQL server we can utilize Transaction Isolation Levels to lock the rows before we can update them. Here is the sample code:

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
​
BEGIN TRANSACTION;
​
-- Suppose we intend to reserve three seats (IDs: 54, 55, 56) for ShowID=99
Select \* From Show_Seat where ShowID=99 && ShowSeatID in (54, 55, 56) && Status=0 -- free
​
-- if the number of rows returned by the above statement is three, we can update to
-- return success otherwise return failure to the user.
update Show_Seat ...
update Booking ...
​
COMMIT TRANSACTION;
‘Serializable’ is the highest isolation level and guarantees safety from Dirty, Nonrepeatable, and Phantoms reads. One thing to note here; within a transaction, if we read rows, we get a write lock on them so that they can’t be updated by anyone else.

Once the above database transaction is successful, we can start tracking the reservation in ActiveReservationService.
