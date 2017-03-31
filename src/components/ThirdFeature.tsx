import * as React from "react";

interface ThirdFeatureProps { showDescription: boolean };

export class ThirdFeature extends React.Component<ThirdFeatureProps, undefined> {
  render() {
    const { showDescription } = this.props;

    return (
      <div>
        <h3>This feature heading is always visible, but...</h3>
        {showDescription ?
          <p>
            this part of the component is only visible if the feature is on.
          </p> : null
        }
        <p>
          {showDescription ? 'I have company!' : 'I\'m all alone =('}
        </p>
      </div>
    );
  }
}