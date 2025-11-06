import React from 'react';
import { useSplitClient, useTreatment } from '@splitsoftware/splitio-react';
import { feature_flag_1, feature_flag_2, feature_flag_3 } from '../sdkConfig';

/* This example shows useSplitClient and useTreatment hooks */

function Loading({ splitKey }: { splitKey?: string }) {
  return <div>Loading SDK {splitKey ? `for split key "${splitKey}"` : ''}</div>
};

function Timedout({ splitKey }: { splitKey?: string }) {
  return <div>SDK timed out {splitKey ? `for split key "${splitKey}"` : ''} (check your SDK key)</div>
};

export default function PageUsingHooks() {

  /* `useTreatment` returns the evaluated treatments of the given list of feature flag names along with the SDK status (`isReady`, `isReadyFromCache`, `isTimedout`, `lastUpdate`, etc).
   * While the SDK is not ready or ready from cache, treatments values are `control`. */
  const { treatment, isReady, isTimedout } = useTreatment({ name: feature_flag_1 });

  const FeatureOne = isReady ? (
    <div className='App-section'>
      <h4>{`Feature flag: ${feature_flag_1}`}</h4>
      <p>{`Treatment value: ${treatment}`}</p>
    </div>
  ) :
    isTimedout ? <Timedout /> : <Loading />

  /* `useSplitClient` returns an SDK client with a given optional split key (e.g., user id) and traffic type.
   * If `splitKey` is not provided, it returns the client at SplitContext.
   * If it is not inside the scope of a `SplitFactoryProvider` component, it returns `null`. */
  const { client, isReady: isReadyForOtherUser, isTimedout: isTimeoutForOtherUser } = useSplitClient({ splitKey: 'other_user' });
  const otherTreatments = client ? client.getTreatmentsWithConfig([feature_flag_2, feature_flag_3]) : {};
  const OtherFeatures = (
    isReadyForOtherUser ? (
      <div className='App-section'>{
        Object.entries(otherTreatments).map(([featureFlagName, treatment]) =>
          <div key={featureFlagName} >
            <h4>{`Feature flag: ${featureFlagName}`}</h4>
            <p>{`Treatment value: ${treatment.treatment}`}</p>
          </div>
        )
      }</div>
    ) :
      isTimeoutForOtherUser ? <Timedout splitKey='other_user' /> : <Loading splitKey='other_user' />
  );

  return (
    <main>
      {FeatureOne}
      {OtherFeatures}
    </main>
  )
};
