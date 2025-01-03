#!/usr/bin/env node

const cdk = require('aws-cdk-lib')
const { ApiStack } = require('./constructs/api-stack')
const { DatabaseStack } = require('./constructs/database-stack')
const { CognitoStack } = require('./constructs/cognito-stack')
const { EventsStack } = require('./constructs/events-stack')
const { OrderFlowStack } = require('./constructs/order-flow-stack')

const app = new cdk.App()
let stageName = app.node.tryGetContext('stageName')
let ssmStageName = app.node.tryGetContext('ssmStageName')

if (!stageName) {
  console.log('Defaulting stage name to dev')
  stageName = 'dev'
}

if (!ssmStageName) {
  console.log(`Defaulting SSM stage name to "stageName": ${stageName}`)
  ssmStageName = stageName
}

const serviceName = 'workshop-sherif'

const dbStack = new DatabaseStack(app, `DatabaseStack-${stageName}`, { stageName })
const cognitoStack = new CognitoStack(app, `CognitoStack-${stageName}`, { stageName })
const eventsStack = new EventsStack(app, `EventsStack-${stageName}`, {
  serviceName,
  stageName,
  ssmStageName,
  idempotencyTable: dbStack.idempotencyTable
})
new ApiStack(app, `ApiStack-${stageName}`, {
  serviceName,
  stageName,
  ssmStageName,
  restaurantsTable: dbStack.restaurantsTable,
  cognitoUserPool: cognitoStack.cognitoUserPool,
  webUserPoolClient: cognitoStack.webUserPoolClient,
  serverUserPoolClient: cognitoStack.serverUserPoolClient,
  orderEventBus: eventsStack.orderEventBus
})
new OrderFlowStack(app, `OrderFlowStack-${stageName}`, {
  serviceName,
  stageName,
  ordersTable: dbStack.ordersTable,
  orderEventBus: eventsStack.orderEventBus,
  restaurantNotificationTopic: eventsStack.restaurantNotificationTopic,
  userNotificationTopic: eventsStack.userNotificationTopic
})
