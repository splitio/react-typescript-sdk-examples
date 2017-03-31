import * as React from "react";

interface SecondFeatureProps { treatment: SplitIO.Treatment };
const ON = 'on';

export class SecondFeature extends React.Component<SecondFeatureProps, undefined> {
  render() {
    const { treatment } = this.props;

    if (treatment === ON) {
      return <h3>I'm behind a split but I control myself looking at my treatment prop.</h3>;
    } else {
      return null;
    }
  }
}