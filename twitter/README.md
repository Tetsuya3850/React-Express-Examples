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

- Web
- Native

## References

- [The Architecture Twitter Uses To Deal With 150M Active Users, 300K QPS, A 22 MB/S Firehose, And Send Tweets In Under 5 Seconds](http://highscalability.com/blog/2013/7/8/the-architecture-twitter-uses-to-deal-with-150m-active-users.html)
- [Scaling Twitter: Making Twitter 10000 Percent Faster](http://highscalability.com/blog/2009/6/27/scaling-twitter-making-twitter-10000-percent-faster.html)

## Ststem Design Considerations

- Availability over consistency
- Timeline generation's latency should be minimal (preferrably under 200ms)
- Read-Heavy.
- 800 million DAUs
- 400 million tweets every day and on average each user follows 3 people.
- each user favorites five tweets per day
- on average a user visits their timeline two times a day and visits five other people’s pages. On each page if a user sees 20 tweets
- The average size of a tweet is 300 bytes.
- Let’s say each tweet has 140 characters and we need two bytes to store a character without compression. Let’s assume we need 30 bytes to store metadata with each tweet (like ID, timestamp, user ID, etc.).
- Let’s assume on average a user has 300 friends and follows 200 pages.

Trending topics – current hot topics/searches.

traffic will be distributed unevenly throughout the day, though, at peak time we should expect at least a few thousand write requests and around 1M read requests per second. We should keep this in mind while designing the architecture of our system.

What if we cache the latest data? Our service can benefit from this approach. Let’s say if 80% of our users see tweets from the past three days only; we can try to cache all the tweets from the past three days. Let’s say we have dedicated cache servers that cache all the tweets from all the users from the past three days. As estimated above, we are getting 100 million new tweets or 30GB of new data every day (without photos and videos). If we want to store all the tweets from last three days, we will need less than 100GB of memory. This data can easily fit into one server, but we should replicate it onto multiple servers to distribute all the read traffic to reduce the load on cache servers. So whenever we are generating a user’s timeline, we can ask the cache servers if they have all the recent tweets for that user. If yes, we can simply return all the data from the cache. If we don’t have enough tweets in the cache, we have to query the backend server to fetch that data. On a similar design, we can try caching photos and videos from the last three days.

Our cache would be like a hash table where ‘key’ would be ‘OwnerID’ and ‘value’ would be a doubly linked list containing all the tweets from that user in the past three days. Since we want to retrieve the most recent data first, we can always insert new tweets at the head of the linked list, which means all the older tweets will be near the tail of the linked list. Therefore, we can remove tweets from the tail to make space for newer tweets.

Since our system is read-heavy, we can have multiple secondary database servers for each DB partition. Secondary servers will be used for read traffic only. All writes will first go to the primary server and then will be replicated to secondary servers. This scheme will also give us fault tolerance, since whenever the primary server goes down we can failover to a secondary server.

How do we serve feeds? Get all the latest tweets from the people someone follows and merge/sort them by time. Use pagination to fetch/show tweets. Only fetch top N tweets from all the people someone follows. This N will depend on the client’s Viewport, since on a mobile we show fewer tweets compared to a Web client. We can also cache next top tweets to speed things up.

Alternately, we can pre-generate the feed to improve efficiency; for details please see ‘Ranking and timeline generation’ under Designing Instagram.

Retweet: With each Tweet object in the database, we can store the ID of the original Tweet and not store any contents on this retweet object.

Traffic estimates: Let’s assume 300M daily active users with each user fetching their timeline an average of five times a day. This will result in 1.5B newsfeed requests per day or approximately 17,500 requests per second.

Storage estimates: On average, let’s assume we need to have around 500 posts in every user’s feed that we want to keep in memory for a quick fetch. Let’s also assume that on average each post would be 1KB in size. This would mean that we need to store roughly 500KB of data per user. To store all this data for all the active users we would need 150TB of memory. If a server can hold 100GB we would need around 1500 machines to keep the top 500 posts in memory for all active users.

Retrieve IDs of all users and entities that Jane follows.
Retrieve latest, most popular and relevant posts for those IDs. These are the potential posts that we can show in Jane’s newsfeed.
Rank these posts based on the relevance to Jane. This represents Jane’s current feed.
Store this feed in the cache and return top posts (say 20) to be rendered on Jane’s feed.
On the front-end, when Jane reaches the end of her current feed, she can fetch the next 20 posts from the server and so on.

One thing to notice here is that we generated the feed once and stored it in the cache. What about new incoming posts from people that Jane follows? If Jane is online, we should have a mechanism to rank and add those new posts to her feed. We can periodically (say every five minutes) perform the above steps to rank and add the newer posts to her feed. Jane can then be notified that there are newer items in her feed that she can fetch.

(SELECT FeedItemID FROM FeedItem WHERE UserID in (
SELECT EntityOrFriendID FROM UserFollow WHERE UserID = <current_user_id> and type = 0(user))
)
UNION
(SELECT FeedItemID FROM FeedItem WHERE EntityID in (
SELECT EntityOrFriendID FROM UserFollow WHERE UserID = <current_user_id> and type = 1(entity))
)
ORDER BY CreationDate DESC
LIMIT 100

Offline generation for newsfeed: We can have dedicated servers that are continuously generating users’ newsfeed and storing them in memory. So, whenever a user requests for the new posts for their feed, we can simply serve it from the pre-generated, stored location. Using this scheme, user’s newsfeed is not compiled on load, but rather on a regular basis and returned to users whenever they request for it.

Whenever these servers need to generate the feed for a user, they will first query to see what was the last time the feed was generated for that user. Then, new feed data would be generated from that time onwards. We can store this data in a hash table where the “key” would be UserID and “value” would be a STRUCT like this:

Struct {
LinkedHashMap<FeedItemID, FeedItem> feedItems;
DateTime lastGenerated;
}
We can store FeedItemIDs in a data structure similar to Linked HashMap or TreeMap, which can allow us to not only jump to any feed item but also iterate through the map easily. Whenever users want to fetch more feed items, they can send the last FeedItemID they currently see in their newsfeed, we can then jump to that FeedItemID in our hash-map and return next batch/page of feed items from there.

How many feed items should we store in memory for a user’s feed? Initially, we can decide to store 500 feed items per user, but this number can be adjusted later based on the usage pattern. For example, if we assume that one page of a user’s feed has 20 posts and most of the users never browse more than ten pages of their feed, we can decide to store only 200 posts per user. For any user who wants to see more posts (more than what is stored in memory), we can always query backend servers.

Should we generate (and keep in memory) newsfeeds for all users? There will be a lot of users that don’t login frequently. Here are a few things we can do to handle this; 1) a more straightforward approach could be, to use a LRU based cache that can remove users from memory that haven’t accessed their newsfeed for a long time 2) a smarter solution can figure out the login pattern of users to pre-generate their newsfeed, e.g., at what time of the day a user is active and which days of the week does a user access their newsfeed? etc.

The most straightforward way to rank posts in a newsfeed is by the creation time of the posts, but today’s ranking algorithms are doing a lot more than that to ensure “important” posts are ranked higher. The high-level idea of ranking is first to select key “signals” that make a post important and then to find out how to combine them to calculate a final ranking score.

More specifically, we can select features that are relevant to the importance of any feed item, e.g., number of likes, comments, shares, time of the update, whether the post has images/videos, etc., and then, a score can be calculated using these features. This is generally enough for a simple ranking system. A better ranking system can significantly improve itself by constantly evaluating if we are making progress in user stickiness, retention, ads revenue, etc.

b. Sharding feed data
For feed data, which is being stored in memory, we can partition it based on UserID. We can try storing all the data of a user on one server. When storing, we can pass the UserID to our hash function that will map the user to a cache server where we will store the user’s feed objects. Also, for any given user, since we don’t expect to store more than 500 FeedItmeIDs, we will not run into a scenario where feed data for a user doesn’t fit on a single server. To get the feed of a user, we would always have to query only one server. For future growth and replication, we must use Consistent Hashing.

Should we always notify users if there are new posts available for their newsfeed? It could be useful for users to get notified whenever new data is available. However, on mobile devices, where data usage is relatively expensive, it can consume unnecessary bandwidth. Hence, at least for mobile devices, we can choose not to push data, instead, let users “Pull to Refresh” to get new posts.

Over 350,000 users. The actual numbers are as always, very super super top secret.
600 requests per second.
Average 200-300 connections per second. Spiking to 800 connections per second.
MySQL handled 2,400 requests per second.
180 Rails instances. Uses Mongrel as the "web" server.
1 MySQL Server (one big 8 core box) and 1 slave. Slave is read only for statistics and reporting.
30+ processes for handling odd jobs.
8 Sun X4100s.
Process a request in 200 milliseconds in Rails.
Average time spent in the database is 50-100 milliseconds.
Over 16 GB of memcached.

Use caching with memcached a lot.

- For example, if getting a count is slow, you can memoize the count into memcache in a millisecond.
- Getting your friends status is complicated. There are security and other issues. So rather than doing a query, a friend's status is updated in cache instead. It never touches the database. This gives a predictable response time frame (upper bound 20 msecs).

Use message a lot. Producers produce messages, which are queued, and then are distributed to consumers. Twitter's main functionality is to act as a messaging bridge between different formats (SMS, web, IM, etc).

Twitter's API Traffic is 10x Twitter’s Site

- Their API is the most important thing Twitter has done.
- Keeping the service simple allowed developers to build on top of their infrastructure and come up with ideas that are way better than Twitter could come up with. For example, Twitterrific, which is a beautiful way to use Twitter that a small team with different priorities could create.

A lot of down time because people crawl the site and add everyone as friends. 9000 friends in 24 hours. It would take down the site.

- Build tools to detect these problems so you can pinpoint when and where they are happening.
- Be ruthless. Delete them as users

Denormalize a lot. Single handedly saved them. For example, they store all a user IDs friend IDs together, which prevented a lot of costly joins.

- Avoid complex joins.

155 million tweets per day.

Graph cannot be handled with MySQL in scale.

Twitter now has 150M world wide active users, handles 300K QPS to generate timelines, and a firehose that churns out 22 MB/sec. 400 million tweets a day flow through the system and it can take up to 5 minutes for a tweet to flow from Lady Gaga’s fingers to her 31 million followers.

Twitter is primarily a consumption mechanism, not a production mechanism. 300K QPS are spent reading timelines and only 6000 requests per second are spent on writes.

Your home timeline sits in a Redis cluster and has a maximum of 800 entries.

They run things called the Timeline Service, Tweet Service, User Service, Social Graph Service, all the machinery that powers the Twitter platform.

The real challenge is the real-time constraint. Goal is to have a message flow to a user in no more than 5 seconds.
Delivery means gathering content and exerting pressure on the Internet to get it back out again as fast as possible.
Delivery is to in-memory timeline clusters, push notifications, emails that are triggered, all the iOS notifications as well as Blackberry and Android, SMSs.
Twitter is the largest generator of SMSs on a per active user basis of anyone in the world.
Elections can be one of the biggest drivers of content coming in and fanouts of content going out.

Twitter runs one of the largest real-time event systems pushing tweets at 22 MB/sec through the Firehose.
Open a socket to Twitter and they will push all public tweets to you within 150 msec.
At any given time there’s about 1 million sockets open to the push cluster.
Goes to firehose clients like search engines. All public tweets go out these sockets.
No, you can’t have it. (You can’t handle/afford the truth.)

Immediately the fanout process occurs. Tweets that come in are placed into a massive Redis cluster.

Let’s say you tweet and you have 20K followers. What the fanout daemon will do is look up the location of all 20K users inside the Redis cluster. Then it will start inserting the Tweet ID of the tweet into all those lists throughout the Redis cluster. So for every write of a tweet as many as 20K inserts are occurring across the Redis cluster.

What is being stored is the tweet ID of the generated tweet, the user ID of the originator of the tweet, and 4 bytes of bits used to mark if it’s a retweet or a reply or something else.

Your home timeline sits in a Redis cluster and is 800 entries long. If you page back long enough you’ll hit the limit. RAM is the limiting resource determining how long your current tweet set can be.
Every active user is stored in RAM to keep latencies down.
Active user is someone who has logged into Twitter within 30 days, which can change depending on cache capacity or Twitter’s usage.
If you are not an active user then the tweet does not go into the cache.

If a tweet is actually a retweet then a pointer is stored to the original tweet.

When you query for your home timeline the Timeline Service is queried. The Timeline Service then only has to find one machine that has your home timeline on it.
Effectively running 3 different hash rings because your timeline is in 3 different places.
They find the first one they can get to fastest and return it as fast as they can.
The tradeoff is fanout takes a little longer, but the read process is fast. About 2 seconds from a cold cache to the browser. For an API call it’s about 400 msec.

Since the timeline only contains tweet IDs they must “hydrate” those tweets, that is find the text of the tweets. Given an array of IDs they can do a multiget and get the tweets in parallel from T-bird.

As a tweet comes in, the Ingester tokenizes and figures out everything they want to index against and stuffs it into a single Early Bird machine. Early Bird is a modified version of Lucene. The index is stored in RAM.

Blender creates the search timeline. It has to scatter-gather across the datacenter. It queries every Early Bird shard and asks do you have content that matches this query? If you ask for “New York Times” all shards are queried, the results are returned, sorted, merged, and reranked. Rerank is by social proof, which means looking at the number of retweets, favorites, and replies.

Search and pull look remarkably similar but they have a property that is inverted from each other.
On the home timeline:
Write. when a tweet comes in there’s an O(n) process to write to Redis clusters, where n is the number of people following you. Painful for Lady Gaga and Barack Obama where they are doing 10s of millions of inserts across the cluster. All the Redis clusters are backing disk, the Flock cluster stores the user timeline to disk, but usually timelines are found in RAM in the Redis cluster.
Read. Via API or the web it’s 0(1) to find the right Redis machine. Twitter is optimized to be highly available on the read path on the home timeline. Read path is in the 10s of milliseconds. Twitter is primarily a consumption mechanism, not a production mechanism. 300K requests per second for reading and 6000 RPS for writing.
On the search timeline:
Write. when a tweet comes in and hits the Ingester only one Early Bird machine is hit. Write time path is O(1). A single tweet is ingested in under 5 seconds between the queuing and processing to find the one Early Bird to write it to.
Read. When a read comes in it must do an 0(n) read across the cluster. Most people don’t use search so they can be efficient on how to store tweets for search. But they pay for it in time. Reading is on the order of 100 msecs. Search never hits disk. The entire Lucene index is in RAM so scatter-gather reading is efficient as they never hit disk.

Problem is for large cardinality graphs. @ladygaga has 31 million followers. @katyperry has 28 million followers. @justinbieber has 28 million followers. @barackobama has 23 million followers.

It’s a lot of tweets to write in the datacenter when one of these people tweets. It’s especially challenging when they start talking to each other, which happens all the time.

These high fanout users are the biggest challenge for Twitter. Replies are being seen all the time before the original tweets for celebrities. They introduce race conditions throughout the site. If it takes minutes for a tweet from Lady Gaga to fanout then people are seeing her tweets at different points in time. Someone who followed Lady Gaga recently could see her tweets potentially 5 minutes before someone who followed her far in the past. Let’s say a person on the early receive list replies then the fanout for that reply is being processed while her fanout is still occurring so the reply is injected before the original tweet in the people receiving her tweets later. Causes much user confusion. Tweets are sorted by ID before going out because they are mostly monotonically increasing, but that doesn’t solve the problem at that scale. Queues back up all the time for high value fanouts.

400m tweets per day; 5K/sec daily average; 7K/sec daily peak; >12K/sec during large events.
Timeline delivery statistics: 30b deliveries / day (~21m / min); 3.5 seconds @ p50 (50th percentile) to deliver to 1m; 300k deliveries /sec; @ p99 it could take up to 5 minutes
