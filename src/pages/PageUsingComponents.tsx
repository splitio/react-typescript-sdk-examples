import React from 'react';
import { SplitClient, SplitTreatments, ISplitTreatmentsChildProps } from '@splitsoftware/splitio-react';
import { feature_flag_1, feature_flag_2, feature_flag_3 } from '../sdkConfig';

/* This example shows SplitClient and SplitTreatments components */

function Loading({ splitKey }: { splitKey?: string }) {
  return <div>Loading SDK {splitKey ? `for split key "${splitKey}"` : ''}</div>
};

function Timedout({ splitKey }: { splitKey?: string }) {
  return <div>SDK timed out {splitKey ? `for split key "${splitKey}"` : ''} (check your SDK key)</div>
};

export default function PageUsingComponents() {
  return (
    <main>
      {/* `SplitTreatments` passes down to a child function a `treatments` prop, which contains feature flag evaluations.
        * It also passes down the SDK status (`isReady`, `isTimedout`, `lastUpdate`) as props. You can use `isReady`
        * to conditionally render your component, for example, by showing a Loading label until the SDK is ready.
        * While the SDK is not ready, treatments values are `control`. */}
      <SplitTreatments names={[feature_flag_1]} >
        {({ treatments, isReady }: ISplitTreatmentsChildProps) => {
          return isReady ? (
            <div className='App-section'>
              <h4>{`Feature flag: ${feature_flag_1}`}</h4>
              <p>{`Treatment value: ${treatments[feature_flag_1].treatment}`}</p>
            </div>
          ) : <Loading />
        }}
      </SplitTreatments>

      {/* `SplitClient` changes the SDK client at the context, given a key and a optional traffic type.
        *  Thus, the inner `SplitTreatments` components will evaluate feature flags for a different key */}
      <SplitClient splitKey='other_user' >
        <SplitTreatments names={[feature_flag_2, feature_flag_3]} >
          {({ treatments, isReady, isTimedout }: ISplitTreatmentsChildProps) => {
            /* In the following piece of UI, we use the `isReady` prop as condition for
            * rendering a `Loading` component until the client with key `other_user` is ready */
            return isReady ? (
              <div className='App-section'>{
                Object.entries(treatments).map(([featureFlagName, treatment]) =>
                  <div key={featureFlagName} >
                    <h4>{`Feature flag: ${featureFlagName}`}</h4>
                    <p>{`Treatment value: ${treatment.treatment}`}</p>
                  </div>
                )
              }</div>
            ) :
              isTimedout ? <Timedout splitKey='other_user' /> : <Loading splitKey='other_user' />
          }}
        </SplitTreatments>
      </SplitClient>

    </main>
  );
};
