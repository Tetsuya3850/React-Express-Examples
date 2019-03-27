## References

- [Seattle Conference on Scalability: YouTube Scalability](https://www.youtube.com/watch?v=w5WVu624fY8)

## Features

- Users can view videos.
- Users can search based on video titles.
- Stats of videos e.g., likes/dislikes, total number of views are recorded.
- Recommend Videos.

## System Design Considerations

- Availability over consistency.
- Users should have a real time experience while watching videos and should not feel any lag.
- 800 million DAUs.
- A user views five videos per day.
- Read heavy (upload:view ratio is 1:200)
- one minute of video needs 50MB of storage (videos need to be stored in multiple formats)

## Other

thumbnail

Video metadata storage - MySql
Videos metadata can be stored in a SQL database. The following information should be stored with each video:

VideoID
Title
Description
Size
Thumbnail
Uploader/User
Total number of likes
Total number of dislikes
Total number of views
For each video comment, we need to store following information:

CommentID
VideoID
UserID
Comment
TimeOfCreation
User data storage - MySql

UserID, Name, email, address, age, registration details etc.

Thumbnails are small files with, say, a maximum 5KB each.
Read traffic for thumbnails will be huge compared to videos. Users will be watching one video at a time, but they might be looking at a page that has 20 thumbnails of other videos.

Video Uploads: Since videos could be huge, if while uploading the connection drops we should support resuming from the same point.

Video Encoding: Newly uploaded videos are stored on the server and a new task is added to the processing queue to encode the video into multiple formats. Once all the encoding will be completed the uploader will be notified and the video is made available for view/sharing.

With a huge number of users uploading a massive amount of video data our service will have to deal with widespread video duplication. Duplicate videos often differ in aspect ratios or encodings, can contain overlays or additional borders, or can be excerpts from a longer original video. The proliferation of duplicate videos can have an impact on many levels:

Data Storage: We could be wasting storage space by keeping multiple copies of the same video.
Caching: Duplicate videos would result in degraded cache efficiency by taking up space that could be used for unique content.
Network usage: Duplicate videos will also increase the amount of data that must be sent over the network to in-network caching systems.
Energy consumption: Higher storage, inefficient cache, and network usage could result in energy wastage.
For the end user, these inefficiencies will be realized in the form of duplicate search results, longer video startup times, and interrupted streaming.

For our service, deduplication makes most sense early; when a user is uploading a video as compared to post-processing it to find duplicate videos later. Inline deduplication will save us a lot of resources that can be used to encode, transfer, and store the duplicate copy of the video. As soon as any user starts uploading a video, our service can run video matching algorithms (e.g., Block Matching, Phase Correlation, etc.) to find duplications. If we already have a copy of the video being uploaded, we can either stop the upload and use the existing copy or continue the upload and use the newly uploaded video if it is of higher quality. If the newly uploaded video is a subpart of an existing video or, vice versa, we can intelligently divide the video into smaller chunks so that we only upload the parts that are missing.

To serve globally distributed users, our service needs a massive-scale video delivery system. Our service should push its content closer to the user using a large number of geographically distributed video cache servers. We need to have a strategy that will maximize user performance and also evenly distributes the load on its cache servers.

We can introduce a cache for metadata servers to cache hot database rows. Using Memcache to cache the data and Application servers before hitting database can quickly check if the cache has the desired rows. Least Recently Used (LRU) can be a reasonable cache eviction policy for our system. Under this policy, we discard the least recently viewed row first.

A CDN is a system of distributed servers that deliver web content to a user based in the geographic locations of the user, the origin of the web page and a content delivery server. Take a look at ‘CDN’ section in our Caching chapter.

Our service can move the popular videos to CDNs:

CDNs replicate content in multiple places. There’s a better chance of videos being closer to the user and, with fewer hops, videos will stream from a friendlier network.
CDN machines make heavy use of caching and can mostly serve videos out of memory.
Less popular videos (1-20 views per day) that are not cached by CDNs can be served by our servers in various data centers.

Big table for thumbnails

memcached
