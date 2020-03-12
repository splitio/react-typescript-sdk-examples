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

const TestSplit = withSplitTreatments([feature_1])(
  ({ treatments }: ISplitTreatmentsChildProps) => {
    return (
      <div className="App-section">
        <h4>{`Split: ${feature_1}`}</h4>
        <p>{`Treatment value: ${treatments[feature_1].treatment}`}</p>
      </div>
    )
  }
);

const OtherSplits: React.ComponentType = withSplitClient('other_user')(
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
