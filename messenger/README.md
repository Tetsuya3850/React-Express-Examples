A messenger app example written by React, React Native, and Express

## Features

- One-on-one conversations between users.
- Messages are delivered real-time.
- Push notifications

## Demo

## Additional Features

- Keep track of the online/offline statuses of users.
- Group Chat

## System Design Considerations

- 500 million DAUs
- Each user sends 40 messages daily
- On average a message is 100 bytes
  Other than the chat messages, we would also need to store users’ information, messages’ metadata (ID, Timestamp, etc.)
  Since each incoming message needs to go out to another user, we will need the same amount of bandwidth 25MB/s for both upload and download.

  User-A sends a message to User-B through the chat server.
  The server receives the message and sends an acknowledgment to User-A.
  The server stores the message in its database and sends the message to User-B.
  User-B receives the message and sends the acknowledgment to the server.
  The server notifies User-A that the message has been delivered successfully to User-B.

  How can the server keep track of all the opened connection to redirect messages to the users efficiently? The server can maintain a hash table, where “key” would be the UserID and “value” would be the connection object. So whenever the server receives a message for a user, it looks up that user in the hash table to find the connection object and sends the message on the open request.

What will happen when the server receives a message for a user who has gone offline? If the receiver has disconnected, the server can notify the sender about the delivery failure. If it is a temporary disconnect, e.g., the receiver’s long-poll request just timed out, then we should expect a reconnect from the user. In that case, we can ask the sender to retry sending the message. This retry could be embedded in the client’s logic so that users don’t have to retype the message. The server can also store the message for a while and retry sending it once the receiver reconnects.

How many chat servers we need? Let’s plan for 500 million connections at any time. Assuming a modern server can handle 50K concurrent connections at any time, we would need 10K such servers.

How do we know which server holds the connection to which user? We can introduce a software load balancer in front of our chat servers; that can map each UserID to a server to redirect the request.

How should the server process a ‘deliver message’ request? The server needs to do the following things upon receiving a new message: 1) Store the message in the database 2) Send the message to the receiver and 3) Send an acknowledgment to the sender.

The chat server will first find the server that holds the connection for the receiver and pass the message to that server to send it to the receiver. The chat server can then send the acknowledgment to the sender; we don’t need to wait for storing the message in the database (this can happen in the background). Storing the message is discussed in the next section.

How does the messenger maintain the sequencing of the messages? We can store a timestamp with each message, which is the time the message is received by the server. This will still not ensure correct ordering of messages for clients. The scenario where the server timestamp cannot determine the exact order of messages would look like this:

User-1 sends a message M1 to the server for User-2.
The server receives M1 at T1.
Meanwhile, User-2 sends a message M2 to the server for User-1.
The server receives the message M2 at T2, such that T2 > T1.
The server sends message M1 to User-2 and M2 to User-1.
So User-1 will see M1 first and then M2, whereas User-2 will see M2 first and then M1.

To resolve this, we need to keep a sequence number with every message for each client. This sequence number will determine the exact ordering of messages for EACH user. With this solution both clients will see a different view of the message sequence, but this view will be consistent for them on all devices.

We can have separate group-chat objects in our system that can be stored on the chat servers. A group-chat object is identified by GroupChatID and will also maintain a list of people who are part of that chat. Our load balancer can direct each group chat message based on GroupChatID and the server handling that group chat can iterate through all the users of the chat to find the server handling the connection of each user to deliver the message.

In databases, we can store all the group chats in a separate table partitioned based on GroupChatID.

In our current design user’s can only send messages to active users and if the receiving user is offline, we send a failure to the sending user. Push notifications will enable our system to send messages to offline users.

For Push notifications, each user can opt-in from their device (or a web browser) to get notifications whenever there is a new message or event. Each manufacturer maintains a set of servers that handles pushing these notifications to the user.

To have push notifications in our system, we would need to set up a Notification server, which will take the messages for offline users and send them to the manufacture’s push notification server, which will then send them to the user’s device.
