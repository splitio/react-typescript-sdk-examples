import * as React from "react";

import { FirstFeature } from "./FirstFeature";
import { SecondFeature } from "./SecondFeature";
import { ThirdFeature } from "./ThirdFeature";

interface AppProps { client: SplitIO.IClient, attributes: SplitIO.Attributes, featureTreatments: {[key: string]: string} };
interface AppState { [key: string]: SplitIO.Treatment };

const ON = 'on';

export class App extends React.Component<AppProps, AppState> {
  
  constructor(props: AppProps) {
    super(props);

    const {client, featureTreatments, attributes} = props;
    const firstTreatment: SplitIO.Treatment = client.getTreatment('feature1', attributes);
    const secondTreatment: SplitIO.Treatment = client.getTreatment('feature2');
    const thirdTreatment: SplitIO.Treatment = client.getTreatment('feature3');
    // Initial state.
    this.state = {
      firstTreatment,
      secondTreatment,
      thirdTreatment
    };
    // On SDK Update event, we will refresh the state for our treatments.
    client.on(client.Event.SDK_UPDATE, () => {
      this.setState({
        firstTreatment: featureTreatments.feature1,
        secondTreatment: featureTreatments.feature2,
        thirdTreatment: featureTreatments.feature3
      });
    });
  }

  render() {
    const { firstTreatment, secondTreatment, thirdTreatment } = this.state;
    const firstIsOn = firstTreatment === ON;

    return (
      <div>
        <h1>Hello from TS!</h1>
        <p> This app has some dummy code to show different types and interfaces from the SDK. Every 3 seconds one feature will be turned on or off.</p>        
        <ul>
          <li>First feature treatment is: {firstTreatment}</li>
          <li>Second feature treatment is: {secondTreatment}</li>
          <li>Third feature treatment is: {thirdTreatment}</li>
        </ul>
        { firstIsOn && <FirstFeature />}
        <SecondFeature treatment={secondTreatment} />
        <ThirdFeature showDescription={thirdTreatment === 'on'}/>
      </div>
    );
  }
}