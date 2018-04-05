import React, { Component } from 'react';
import Header from './containers/partials/Header';
import Home from './containers/Home';
import Footer from './components/partials/Footer';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Home/>
        <Footer/>
      </div>
    );
  }
}

export default App;
