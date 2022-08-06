# Multi-channel Server Test

This is a multi-channel forum api server, using nestjs, graphql(https://github.com/nestjs/graphql)

Among them, we provide two protocols:

```
main.js -> Interface of Rest protocol

main.js -> Interface of GraphQL protocol
```


Model Demo:

```
Channel Model: { id, name }

Message Model: { id, title, content, channel, createdAt }

```

If you try to send this Like below, the server will return messages in current channel and order by descending:

```
POST http://localhost:3000/channel/v1/messages

{
    "channel": "004",
	"content": "testbill"
}
```
