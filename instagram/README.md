An Instagram app example written by React, React Native, and Express.

## Features

- Users can upload a photo
- Users can follow other users
- Users can see a feed consisting of top photos from all the people the user follows
- Adding tags to photos
- Searching photos on tags

## References

- [What Powers Instagram: Hundreds of Instances, Dozens of Technologies](https://instagram-engineering.com/what-powers-instagram-hundreds-of-instances-dozens-of-technologies-adf2e22da2ad)

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

### Demo

- Native (https://exp.host/@tetsuya3850/instagram) [WIP]

The photos themselves go straight to Amazon S3, which currently stores several terabytes of photo data for us. We use Amazon CloudFront as our CDN, which helps with image load times from users around the world (like in Japan, our second most-popular country).

We also use Redis extensively; it powers our main feed, our activity feed, our sessions system (here’s our Django session backend), and other related systems. All of Redis’ data needs to fit in memory, so we end up running several Quadruple Extra-Large Memory instances for Redis, too, and occasionally shard across a few Redis instances for any given subsystem. We run Redis in a master-replica setup, and have the replicas constantly saving the DB out to disk, and finally use EBS snapshots to backup those DB dumps (we found that dumping the DB on the master was too taxing). Since Redis allows writes to its replicas, it makes for very easy online failover to a new Redis machine, without requiring any downtime.

For our geo-search API, we used PostgreSQL for many months, but once our Media entries were sharded, moved over to using Apache Solr. It has a simple JSON interface, so as far as our application is concerned, it’s just another API to consume.

Finally, like any modern Web service, we use Memcached for caching, and currently have 6 Memcached instances, which we connect to using pylibmc & libmemcached. Amazon has an Elastic Cache service they’ve recently launched, but it’s not any cheaper than running our instances, so we haven’t pushed ourselves to switch quite yet.
