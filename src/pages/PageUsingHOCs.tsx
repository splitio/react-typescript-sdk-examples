import React from 'react';
import { withSplitClient, withSplitTreatments } from '@splitsoftware/splitio-react';
import { feature_1, feature_2, feature_3 } from '../sdkConfig';
import { ISplitTreatmentsChildProps } from '@splitsoftware/splitio-react/types/types';

/* This example shows withSplitClient and withSplitTreatments HOCs */

function Loading() {
  return <div>Loading SDK...</div>
}

function Timedout() {
  return <div>SDK timed out (check your API key)</div>
};

/* `withSplitTreatments` is a HOC for wrapping render functions inside an SplitTreatments.
 * As `SplitTreatments`, it passes down to a child function a `treatments` prop, which contains split evaluations.
 * It also passes down the SDK status (`isReady`, `isTimedout`, `lastUpdate`) as props. You can use `isReady`
 * to conditionally render your component, for example, by showing a Loading label until the SDK is ready.
 * While the SDK is not ready, treatments values are `control`. */
const TestSplit = withSplitTreatments([feature_1])(
  ({ treatments, isReady }: ISplitTreatmentsChildProps) => {
    return isReady ? (
      <div className="App-section">
        <h4>{`Split: ${feature_1}`}</h4>
        <p>{`Treatment value: ${treatments[feature_1].treatment}`}</p>
      </div>
    ) : <Loading />
  }
);

/* `withSplitClient` is a HOC for `SplitClient`. It changes the SDK client at the context, given a key and a
 * optional traffic type. Thus, the inner `SplitTreatments` components will evaluate splits for a different key */
const OtherSplits: React.ComponentType = withSplitClient('other_user')(
  /* In the following piece of UI, we use the `isReady` prop as condition for
   * rendering a `Loading` component until the client with key `other_user` is ready */
  withSplitTreatments([feature_2, feature_3])(
    ({ treatments, isReady, isTimedout }: ISplitTreatmentsChildProps) => {
      return isReady ? (
        <div className="App-section">{
          Object.entries(treatments).map(([splitName, treatment]) =>
            <div key={splitName} >
              <h4>{`Split: ${splitName}`}</h4>
              <p>{`Treatment value: ${treatment.treatment}`}</p>
            </div>
          )
        }</div>
      ) :
        isTimedout ? <Timedout /> : <Loading />
    }
  ), false, true // updateOnSdkUpdate: false, updateOnSdkTimedout: true, updateOnSdkReady: true (default)
);

export default function PageUsingHOCs() {
  return (
    <main>
      <TestSplit />
      <OtherSplits />
    </main>
  );
};
