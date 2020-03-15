import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import authenticatedAxios from './services/authenticatedAxios';
import HelmetConfig from './components/helmet/HelmetConfig';

interface IAppProps {}

interface IAppState {}

export default class App extends Component<IAppProps, IAppState> {
  componentDidMount() {
    authenticatedAxios.post('/auth/verify');
  }

  render() {
    return (
      <div className="App">
        <HelmetConfig title="Início" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}