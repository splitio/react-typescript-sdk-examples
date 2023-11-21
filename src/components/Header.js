import React from 'react';
import logo from '../logo.svg';

export default function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Split React SDK example with TypeScript</h1>
      <a
        className="App-link"
        href="https://www.split.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Split.io
      </a>
    </header>
  );
};
