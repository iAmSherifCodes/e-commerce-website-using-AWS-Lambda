// const { EventBridgeClient, PutEventsCommand } = require('@aws-sdk/client-eventbridge')
// const eventBridge = new EventBridgeClient()
// const busName = process.env.bus_name
//
//
// module.exports.handler = async ( event ) =>{
//     const { name } = event.queryStringParameters;
//
//     const putEventsCmd = new PutEventsCommand({
//         Entries: [{
//             Source: 'big-mouth',
//             DetailType: 'accept_order',
//             Detail: JSON.stringify({ name }),
//             EventBusName: busName
//         }]
//     })
//
//     await eventBridge.send(putEventsCmd);
//     console.log(`published 'accept_order'' event to EventBridge`)
//
// }
