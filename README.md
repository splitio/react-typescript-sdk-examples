## react-typescript-sdk-examples

This is a demo application using Split SDK in a Typescript app.

It's just a small page built with React for the browser, that will change treatments on some mocked features randomly every three seconds, so you can see a basic example of how you can use split.

### SDK Documentation

* [Browser SDK Docs](http://docs.split.io/docs/javascript-sdk-overview)
* [NodeJS SDK Docs](http://docs.split.io/docs/nodejs-sdk-overview)

We have SDKs for other languages as well! Read the [full list.](http://docs.split.io/docs/sdk-overview)

### Getting started with the demo

Download this repo and run the following commands:

```
# One time only, for installing all dependencies
npm install
# Builds the project and starts the server on localhost:8080
npm start
```

This project has two npm scripts commands, in case you want to do some custom test:

```
# For building the bundle. It uses local webpack.
npm run build
# For running the server on localhost:8080, with local http-server.
npm run server
```
### How to use Split Javascript SDK on Typescript

You will have the SplitIO namespace with Split SDK custom types. Declaration file has a lot of comments so you shouldn't have issues finding what you need!

```typescript
// Import the SDK
import splitio = require('@splitsoftware/splitio');

// Your settings. You have two interfaces available, IBrowserSettings and INodeSettings 
// for proper guidance on both options.
const settings: SplitIO.IBrowserSettings = {
  core: {
    authorizationKey: '<your-api-key>',
    key: '<customer-key>'
  }
}

// Instantiate the SDK
const SplitSDK: SplitIO.ISDK = splitio(settings);

// And get the client or the manager api
const client: SplitIO.IClient = sdk.client();
const manager: SplitIO.IManager = sdk.manager();
```

If you need further guidance please feel free to refer to our [Developer Resources page.](http://www.split.io/resources)
