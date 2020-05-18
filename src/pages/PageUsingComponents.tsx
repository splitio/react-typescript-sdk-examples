import React from 'react';
import { SplitClient, SplitTreatments } from '@splitsoftware/splitio-react';
import { feature_1, feature_2, feature_3 } from '../sdkConfig';
import { ISplitTreatmentsChildProps } from '@splitsoftware/splitio-react/types/types';

/* This example shows SplitClient and SplitTreatments components */

function Loading() {
  return <div>Loading SDK...</div>
}

function Timedout() {
  return (<div>SDK timed out (check your API key)</div>);
};

export default function PageUsingComponents() {
  return (
    <main>
      {/* `SplitTreatments` passes down to a child function a `treatments` prop, which contains split evaluations.
        * It also passes down the SDK status (`isReady`, `isTimedout`, `lastUpdate`) as props. You can use `isReady`
        * to conditionally render your component, for example, by showing a Loading label until the SDK is ready.
        * While the SDK is not ready, treatments values are `control`. */}
      <SplitTreatments names={[feature_1]} >
        {({ treatments, isReady }: ISplitTreatmentsChildProps) => {
          return isReady ? (
            <div className="App-section">
              <h4>{`Split: ${feature_1}`}</h4>
              <p>{`Treatment value: ${treatments[feature_1].treatment}`}</p>
            </div>
          ) : <Loading />
        }}
      </SplitTreatments>

      {/* `SplitClient` changes the SDK client at the context, given a key and a optional traffic type.
        *  Thus, the inner `SplitTreatments` components will evaluate splits for a different key */}
      <SplitClient splitKey="other_user" updateOnSdkTimedout={true} >
        <SplitTreatments names={[feature_2, feature_3]} >
          {({ treatments, isReady, isTimedout }: ISplitTreatmentsChildProps) => {
            /* In the following piece of UI, we use the `isReady` prop as condition for
            * rendering a `Loading` component until the client with key `other_user` is ready */
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
          }}
        </SplitTreatments>
      </SplitClient>

    </main>
  );
};
