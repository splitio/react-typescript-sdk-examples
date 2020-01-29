import React from 'react';
import { SplitClient, SplitTreatments } from '@splitsoftware/splitio-react';
import { feature_1, feature_2, feature_3 } from '../sdkConfig';
import { ISplitTreatmentsChildProps } from '@splitsoftware/splitio-react/types/types';

/* This example shows SplitClient and SplitTreatments components */

function Loading() {
  return <div>Loading SDK...</div>
}

export default function PageUsingComponents() {
  return (
    <main>
      {/* `SplitTreatments` passes down to a child function a `treatments` prop, which contains split evaluations.
          * It also passes down the SDK status (`isReady`, `isTimedout`, `lastUpdate`) as props, but we are not using
          * them in this part of the example. This means that for a brief time, the following piece of UI will show up 
          * the `control` treatment value until the SDK isReady */}
      <SplitTreatments names={[feature_1]} >
        {({ treatments }: ISplitTreatmentsChildProps) => {
          return (
            <div className="App-section">
              <h4>{`Split: ${feature_1}`}</h4>
              <p>{`Treatment value: ${treatments[feature_1].treatment}`}</p>
            </div>
          )
        }}
      </SplitTreatments>

      {/* `SplitClient` changes the SDK client at the context, given a key and a optional traffic type.
        *  Thus, the inner `SplitTreatments` components will evaluate splits for a different key */}
      <SplitClient splitKey="other_user" >
        <SplitTreatments names={[feature_2, feature_3]} >
          {({ treatments, isReady }: ISplitTreatmentsChildProps) => {
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
            ) : <Loading />
          }}
        </SplitTreatments>
      </SplitClient>

    </main>
  );
};
