A netflix app example written by React, React Native, and Express.

## Features

- Users can view videos.
- Users can search based on video titles.
- Stats of videos e.g., likes/dislikes, total number of views are recorded.
- (Recommend Videos.)
- (Popular videos are delivered efficiently through CDNs.)
- (Cache hot search results with memcached.)

## Demo

- Web
- Native

## References

- [YouTube Architecture](http://highscalability.com/youtube-architecture)
- [7 Years Of YouTube Scalability Lessons In 30 Minutes](http://highscalability.com/blog/2012/3/26/7-years-of-youtube-scalability-lessons-in-30-minutes.html)

## System Design Considerations

- Availability over consistency.
- Users experience should be real time with few lags.

## Real-World Numbers

- 800 million DAUs.
- A user views five videos per day.
- Read heavy (upload:view ratio is 1:200)
- As videos need to be stored in multiple formats, one minute of video needs 50MB of storage.
- About 4 Thumbnails per video.
- 1 Thumbnail is maximum 5KB.

## Other Ideas

- Resuming video upload after connection drop.
- How to handle illegal uploads.
- Handle thumbnails with big table.
- Single server, went to a single master with multiple read slaves, then partitioned the database, and then settled on a sharding approach.

## Learning Topics

- Video Encoding: Newly uploaded videos are stored on the server and a new task is added to the processing queue to encode the video into multiple formats. Once all the encoding will be completed the uploader will be notified and the video is made available for view/sharing.
