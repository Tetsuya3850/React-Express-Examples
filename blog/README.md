A blog app example written by React.js, React Native, and Node.js

## Features

- An article can be added.
- All articles can be read.
- An article's detail can be read.
- Articles of a user can be read.
- An article can be edited.
- An article can be deleted.

## Demo

- Web (https://blog-client-3850.herokuapp.com/)

It helps to realize that Tumblr operates at surprisingly huge scales: 500 million page views a day, a peak rate of ~40k requests per second, ~3TB of new data to store a day, all running on 1000+ servers.

500 million page views a day
15B+ page views month
~20 engineers
Peak rate of ~40k requests per second
1+ TB/day into Hadoop cluster
Many TB/day into MySQL/HBase/Redis/Memcache
Growing at 30% a month
~1000 hardware nodes in production
Billions of page visits per month per engineer
Posts are about 50GB a day. Follower list updates are about 2.7TB a day.
Dashboard runs at a million writes a second, 50K reads a second, and it is growing.

500 web servers
200 database servers (many of these are part of a spare pool we pulled from for failures)
47 pools
30 shards
30 memcache servers
22 redis servers
15 varnish servers
25 haproxy nodes
8 nginx
14 job queue servers (kestrel + gearman)

Tumblr has a different usage pattern than other social networks.
With 50+ million posts a day, an average post goes to many hundreds of people. It’s not just one or two users that have millions of followers. The graph for Tumblr users has hundreds of followers. This is different than any other social network and is what makes Tumblr so challenging to scale.
#2 social network in terms of time spent by users. The content is engaging. It’s images and videos. The posts aren’t byte sized. They aren’t all long form, but they have the ability. People write in-depth content that’s worth reading so people stay for hours.
Users form a connection with other users so they will go hundreds of pages back into the dashboard to read content. Other social networks are just a stream that you sample.
Implication is that given the number of users, the average reach of the users, and the high posting activity of the users, there is a huge amount of updates to handle.

Posts are only about 50GB a day. Follower list updates are 2.7TB a day. Media is all stored on S3.

A notification is something like a user liked your post. Notifications show up in a user’s dashboard to indicate actions other users have taken on their content.
High write ratio made MySQL a poor fit.  
Notifications are ephemeral so it wouldn’t be horrible if they were dropped, so Redis was an acceptable choice for this function.
