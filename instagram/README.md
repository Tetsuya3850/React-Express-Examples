An Instagram app example written by React, React Native, and Express

## Features

- Users can upload a photo
- Users can follow other users
- Users can see a feed consisting of top photos from all the people the user follows
- Adding tags to photos
- Searching photos on tags

## System Design Considerations

- Availability over consistency
- Feed generation's latency should be minimal (preferrably under 200ms)
- Read heavy. Especially on photo.

## Ideas for further scalability

- Seperate the app to read and write services.
- Use CDNs to deliver photos more instantly.

Trending Topics: We can cache most frequently occurring hashtags or search queries in the last N seconds and keep updating them after every M seconds. We can rank trending topics based on the frequency of tweets or search queries or retweets or likes. We can give more weight to topics which are shown to more people.

Who to follow? How to give suggestions? This feature will improve user engagement. We can suggest friends of people someone follows. We can go two or three levels down to find famous people for the suggestions. We can give preference to people with more followers.

Let’s assume we have 500M total users, with 1M daily active users.
2M new photos every day, 23 new photos every second.
Average photo file size => 200KB
