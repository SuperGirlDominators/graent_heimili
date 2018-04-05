import React, { Component } from 'react';
import '../../css/Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import firebase from 'firebase';


class Header extends Component {
  constructor(props) {
      super(props);
      this.state = { active: '' };
      this.state = { open: '' };
      this.onStatusClick = this.onStatusClick.bind(this);
  }

  onStatusClick() {
      var toggle = this.state.active === 'active' ? '' : 'active';
      var toggle2 = this.state.open === 'open' ? '' : 'open';
      this.setState({active: toggle, open: toggle2 });
  }
  handleLogout() {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }


  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-inverse container">
            <div className="container-fluid">
              <div className="navbar-header">
                <div className="logo ">
                  <a href="http://localhost:8000/">
                    <img src={logo} alt="logo"></img>
                  </a>
                </div>
              </div>

              <ul className="nav navbar-right">
                <div className="burger_menu">
                  <div className={`button_container ${this.state.active}`} id="toggle" onClick={this.onStatusClick}>
                    <span className="top"></span>
                    <span className="middle"></span>
                    <span className="bottom"></span>
                  </div>

                  <div className={`overlay ${this.state.open}`} id="overlay">
                    <nav className="overlay-menu">
                      <ul>
                        <li><Link to="/about-game">Um listann</Link></li>
                        <li><a href="#partners">Samstarfsaðilar</a></li>
                        <li><Link to="/about-us">Um okkur</Link></li>
                        <li id="login"><Link to="/#login_popup">Innskráning</Link></li>
                        <li id="login"><button onClick={this.handleLogout}>Logout</button></li>
                      </ul>
                    </nav>

                  </div>
                </div>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}



export default Header;
