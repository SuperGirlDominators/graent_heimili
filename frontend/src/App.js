import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './containers/Home';
import Header from './containers/partials/Header';
import Login from './components/partials/Login';
import Questions from './components/Questions';
import Checklist from './components/Checklist';
import StepAchievement from './containers/StepAchievement';
import AboutGame from './containers/AboutGame';
import AboutUs from './containers/AboutUs';
import Companies from './containers/Companies';
import Education from './containers/EducationPage';
import Loader from './components/Loader';
import Footer from './containers/partials/Footer';
import './css/App.css';

import homeBanner from './assets/images/home-banner.jpeg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  render() {
    let maskClass = 'target  white_curved_mask';
    let imageStyle;
    if (this.props.location.pathname === '/' || this.props.location.pathname === '/about-game') {
      maskClass = 'target home-luminance-target';
      imageStyle = { backgroundImage: `url(${homeBanner})` }; 
    }
    const footerClass = this.state.menuOpen ? 'menu-active' : '';
    return (
      <div>
        <div className="luminance-mask">
            <div className={maskClass} style={imageStyle}></div>
        </div>
        <Route path="/login" component={Login} />
        <Header toggleMenu={this.toggleMenu} menuOpen={this.state.menuOpen}/>
        <Route path="/" exact component={Home}/>
        <Route path="/questions" component={Questions} />
        <Route path="/checklist" component={Checklist} />
        <Route path="/stepcomplete" component={StepAchievement} />
        <Route path="/about-game" component={AboutGame} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/companies" component={Companies} />
        <Route path="/education" component={Education} />
        <Route path="/loader" component={Loader} />
        <div className={`socials ${footerClass}`} style={{position: 'fixed', bottom: 20, right: '134px'}}>
        <Footer />
        </div>
      </div>
    );
  }
}

export default App;
