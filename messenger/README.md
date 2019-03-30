A messenger app example written by React, React Native, and Express

## Features

- One-on-one conversations between users.
- Messages are delivered real-time.
- Push notifications

1. User-A sends a message to User-B through the chat server.
2. The server receives the message and sends an acknowledgment to User-A.
3. The server stores the message in its database and sends the message to User-B.
4. User-B receives the message and sends the acknowledgment to the server.
5. The server notifies User-A that the message has been delivered successfully to User-B.

## Demo

- Web
- Native

## References

- [The WhatsApp Architecture Facebook Bought For \$19 Billion](http://highscalability.com/blog/2014/2/26/the-whatsapp-architecture-facebook-bought-for-19-billion.html)

## Additional Features

- Group Chat
- Read
- Shared locations, video, audio, pictures, push-to-talk, voice-messages and photos, read receipt, group-chats, send messages via WiFi, offline support.

## System Design Considerations

- Since each incoming message needs to go out to another user, we will need the same amount of bandwidth 25MB/s for both upload and download.

- How can the server keep track of all the opened connection to redirect messages to the users efficiently? The server can maintain a hash table, where “key” would be the UserID and “value” would be the connection object. So whenever the server receives a message for a user, it looks up that user in the hash table to find the connection object and sends the message on the open request.

- We can have separate group-chat objects in our system that can be stored on the chat servers. A group-chat object is identified by GroupChatID and will also maintain a list of people who are part of that chat. Our load balancer can direct each group chat message based on GroupChatID and the server handling that group chat can iterate through all the users of the chat to find the server handling the connection of each user to deliver the message.

- The process of pushing a post to all the followers is called a fanout. “Push” model or Fan-out-on-write: For a push system, once a user has published a post, we can immediately push this post to all the followers. The advantage is that when fetching feed you don’t need to go through your friend’s list and get feeds for each of them. It significantly reduces read operations. To efficiently handle this, users have to maintain a Long Poll request with the server for receiving the updates. A possible problem with this approach is that when a user has millions of followers (a celebrity-user) the server has to push updates to a lot of people.

## Real-World Numbers

- 500 million DAUs.
- Each user sends 40 messages daily.
- On average a message is 100 bytes.
- A modern server can handle 50K concurrent connections at any time.

## Other

- Hybrid: An alternate method to handle feed data could be to use a hybrid approach, i.e., to do a combination of fan-out-on-write and fan-out-on-load. Specifically, we can stop pushing posts from users with a high number of followers (a celebrity user) and only push data for those users who have a few hundred (or thousand) followers. For celebrity users, we can let the followers pull the updates. Since the push operation can be extremely costly for users who have a lot of friends or followers, by disabling fanout for them, we can save a huge number of resources. Another alternate approach could be that, once a user publishes a post, we can limit the fanout to only her online friends. Also, to get benefits from both the approaches, a combination of ‘push to notify’ and ‘pull for serving’ end users is a great way to go. Purely a push or pull model is less versatile.

- Privacy. Shaped by Jan Koum’s experiences growing up in the Ukraine, where nothing was private. Messages are not stored on servers; chat history is not stored; goal is to know as little about users as possible; your name and your gender are not known; chat history is only on your phone.

- Multimedia messages are sent by uploading the image, audio or video to be sent to an HTTP server and then sending a link to the content along with its Base64 encoded thumbnail (if applicable).

- Need to plan for bumps in traffic. Examples are soccer games and earthquakes in Spain or Mexico. These happen near peak traffic loads, so there needs to be enough spare capacity to handle peaks + bumps. A recent soccer match generated a 35% spike in outbound message rate right at the daily peak.

- There’s something to this brutal focus on the user idea. WhatsApp is focussed on being a simple messaging app, not being a gaming network, or an advertising network, or a disappearing photos network. That worked for them. It guided their no ads stance, their ability to keep the app simple while adding features, and the overall no brainer it just works philosohpy on any phone.
