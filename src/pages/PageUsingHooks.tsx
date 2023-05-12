import React, { useContext } from 'react';
import { useClient, useTreatments, SplitContext } from '@splitsoftware/splitio-react';
import { feature_flag_1, feature_flag_2, feature_flag_3 } from '../sdkConfig';
import { ISplitContextValues } from '@splitsoftware/splitio-react/types/types';

/* This example shows useClient and useTreatments hooks */

function Loading() {
  return <div>Loading SDK...</div>
};

function Timedout() {
  return <div>SDK timed out (check your SDK key)</div>
};

export default function PageUsingHooks() {

  /* `useContext(SplitContext)` lets you access the SDK status (`isReady`, `isTimedout`, `lastUpdate`) when using hooks,
   * to conditionally render your components, for example, showing a Loading label until the SDK is ready. */
  const { isReady, isTimedout }: ISplitContextValues = useContext(SplitContext);

  /* `useTreatments` returns the evaluated treatments of the given list of feature flag names.
   * While the SDK is not ready, treatments values are `control`. */
  const treatment: SplitIO.TreatmentsWithConfig = useTreatments([feature_flag_1]);

  const FeatureOne = isReady ? (
    <div className="App-section">
      <h4>{`Feature flag: ${feature_flag_1}`}</h4>
      <p>{`Treatment value: ${treatment[feature_flag_1].treatment}`}</p>
    </div>
  ) : <Loading />;

  /* `useClient` returns an SDK client with a given optional user key and traffic type.
   * If key is not provided, it returns the client at SplitContext.
   * If it is not inside the scope of a `SplitFactory` component, it returns `null`. */
  const client: SplitIO.IClient | null = useClient('other_user');
  const treatments: SplitIO.TreatmentsWithConfig = client ? client.getTreatmentsWithConfig([feature_flag_2, feature_flag_3]) : {};
  const OtherFeatures = (
    isReady ? (
      <div className="App-section">{
        Object.entries(treatments).map(([featureFlagName, treatment]) =>
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
