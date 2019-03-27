A Twitter app example written by React, React Native, and Express

## Features

- A tweet can be added.
- Timeline of top tweets from all the people the user follows can be read.
- A tweet's detail can be read.
- Tweets of a user can be read.
- A tweet can be liked and unliked.
- A tweet can be deleted.
- A user can follow other users.
- Follows of a user can be read.
- Followers of a user can be read.
- Liked tweets of a user can be read.

## Demo

## Ststem Design Considerations

- Availability over consistency
- Timeline generation's latency should be minimal (preferrably under 200ms)
- Read-Heavy.
- 200 million DAUs
- 100 million new tweets every day and on average each user follows 3 people.
- each user favorites five tweets per day
- on average a user visits their timeline two times a day and visits five other people’s pages. On each page if a user sees 20 tweets
- Let’s say each tweet has 140 characters and we need two bytes to store a character without compression. Let’s assume we need 30 bytes to store metadata with each tweet (like ID, timestamp, user ID, etc.).

Trending topics – current hot topics/searches.

traffic will be distributed unevenly throughout the day, though, at peak time we should expect at least a few thousand write requests and around 1M read requests per second. We should keep this in mind while designing the architecture of our system.

What if we cache the latest data? Our service can benefit from this approach. Let’s say if 80% of our users see tweets from the past three days only; we can try to cache all the tweets from the past three days. Let’s say we have dedicated cache servers that cache all the tweets from all the users from the past three days. As estimated above, we are getting 100 million new tweets or 30GB of new data every day (without photos and videos). If we want to store all the tweets from last three days, we will need less than 100GB of memory. This data can easily fit into one server, but we should replicate it onto multiple servers to distribute all the read traffic to reduce the load on cache servers. So whenever we are generating a user’s timeline, we can ask the cache servers if they have all the recent tweets for that user. If yes, we can simply return all the data from the cache. If we don’t have enough tweets in the cache, we have to query the backend server to fetch that data. On a similar design, we can try caching photos and videos from the last three days.

Our cache would be like a hash table where ‘key’ would be ‘OwnerID’ and ‘value’ would be a doubly linked list containing all the tweets from that user in the past three days. Since we want to retrieve the most recent data first, we can always insert new tweets at the head of the linked list, which means all the older tweets will be near the tail of the linked list. Therefore, we can remove tweets from the tail to make space for newer tweets.

Since our system is read-heavy, we can have multiple secondary database servers for each DB partition. Secondary servers will be used for read traffic only. All writes will first go to the primary server and then will be replicated to secondary servers. This scheme will also give us fault tolerance, since whenever the primary server goes down we can failover to a secondary server.

How do we serve feeds? Get all the latest tweets from the people someone follows and merge/sort them by time. Use pagination to fetch/show tweets. Only fetch top N tweets from all the people someone follows. This N will depend on the client’s Viewport, since on a mobile we show fewer tweets compared to a Web client. We can also cache next top tweets to speed things up.

Alternately, we can pre-generate the feed to improve efficiency; for details please see ‘Ranking and timeline generation’ under Designing Instagram.

Retweet: With each Tweet object in the database, we can store the ID of the original Tweet and not store any contents on this retweet object.
