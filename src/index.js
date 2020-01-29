import React from 'react';
import ReactDOM from 'react-dom';
import { SplitFactory } from '@splitsoftware/splitio-react';
import './index.css';
import App from './App';
import sdkConfig from './sdkConfig';

ReactDOM.render(
  /* `SplitFactory` component inits the SDK with the given config object.
   * The child component and all it's descendants will have access to the SDK functionality.
   * When passing a function as a child, it receives the SDK factory and its status as props. */
  <SplitFactory config={sdkConfig}>
    {({ factory, isReady, isTimedout, lastUpdate }) => {
      // Uncomment the following line if you want to render a different component until the SDK is ready
      // if (!isReady) return (<div>Loading SDK ...</div>);
      return <App />
    }}
  </SplitFactory>,
  document.getElementById('root')
);