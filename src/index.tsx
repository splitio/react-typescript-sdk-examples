import * as React from "react";
import { render } from "react-dom";
// Importing splitio package
import { SplitFactory } from '@splitsoftware/splitio';

import { App } from "./components/App";

// Mocking features treatment for this example.
const browserMockedFeatures: SplitIO.MockedFeaturesMap = {
  feature1: 'on',
  feature2: 'on',
  feature3: 'on'
};
// The settings we will use
const settings: SplitIO.IBrowserSettings = {
  core: {
    authorizationKey: 'localhost',
    key: '<customer-key>'
  },
  features: browserMockedFeatures,
  scheduler: {
    // Every three seconds we will refresh the mocked data.
    offlineRefreshRate: 3
  }
}
// We instantiate the SDK
const sdk: SplitIO.ISDK = SplitFactory(settings);
// Get our client api.
const client: SplitIO.IClient = sdk.client();
// You could have some attributes for this customer. (Not used on this particular example).
const attributes: SplitIO.Attributes = {
  attrString: 'something',
  attrNumber: 22,
  // Remember that dates should be sent as millis since epoch.
  attrDate: new Date().getTime()
}
// Once the SDK is ready we render our app.
client.on(client.Event.SDK_READY, () => {
  render(
    <App client={client} attributes={attributes} featureTreatments={sdk.settings.features} />,
    document.getElementById("root")
  );
});

/***** The code below this line is just for demo purposses. It will periodically change treatments of the mocked features. *****/
const ON = 'on';
const OFF = 'off';
// Random number generator.
function getRandomInt(max: number, min: number = 1): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// "Treatment swapper".
function getSwappedTreatment(currentTreatment: string) {
  return currentTreatment === OFF ? ON : OFF;
}
setInterval(() => {
  const featureTarget = `feature${getRandomInt(3)}`;
  sdk.settings.features[featureTarget] = getSwappedTreatment(sdk.settings.features[featureTarget]);
}, 3000);
