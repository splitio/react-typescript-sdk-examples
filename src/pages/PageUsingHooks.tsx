import React from 'react';
import { useSplitClient, useSplitTreatments } from '@splitsoftware/splitio-react';
import { feature_flag_1, feature_flag_2, feature_flag_3 } from '../sdkConfig';

/* This example shows useSplitClient and useSplitTreatments hooks */

function Loading() {
  return <div>Loading SDK...</div>
};

function Timedout() {
  return <div>SDK timed out (check your SDK key)</div>
};

export default function PageUsingHooks() {

  /* `useSplitTreatments` returns the evaluated treatments of the given list of feature flag names along with the SDK status (`isReady`, `isReadyFromCache`, `isTimedout`, `lastUpdate`, etc).
   * While the SDK is not ready or ready from cache, treatments values are `control`. */
  const { treatments, isReady, isTimedout } = useSplitTreatments({ names: [feature_flag_1] });

  const FeatureOne = isReady ? (
    <div className="App-section">
      <h4>{`Feature flag: ${feature_flag_1}`}</h4>
      <p>{`Treatment value: ${treatments[feature_flag_1].treatment}`}</p>
    </div>
  ) : <Loading />;

  /* `useSplitClient` returns an SDK client with a given optional split key (e.g., user id) and traffic type.
   * If `splitKey` is not provided, it returns the client at SplitContext.
   * If it is not inside the scope of a `SplitFactory` component, it returns `null`. */
  const { client } = useSplitClient({ splitKey: 'other_user' });
  const otherTreatments = client ? client.getTreatmentsWithConfig([feature_flag_2, feature_flag_3]) : {};
  const OtherFeatures = (
    isReady ? (
      <div className="App-section">{
        Object.entries(otherTreatments).map(([featureFlagName, treatment]) =>
          <div key={featureFlagName} >
            <h4>{`Feature flag: ${featureFlagName}`}</h4>
            <p>{`Treatment value: ${treatment.treatment}`}</p>
          </div>
        )
      }</div>
    ) :
      isTimedout ? <Timedout /> : <Loading />
  );

  return (
    <main>
      {FeatureOne}
      {OtherFeatures}
    </main>
  )
};
