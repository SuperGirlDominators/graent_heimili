import React, { Component } from 'react';
import '../../css/Footer.css';


class Footer extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="share-social">
                <a className="social overlay_icon" href="https://pinterest.com">
                  <i className="fa fa-pinterest"></i>
                </a>
                <a className="social overlay_icon" href="https://facebook.com">
                  <i className="fa fa-facebook"></i>
                </a>
                <a className="social overlay_icon" href="https://twitter.com">
                  <i className="fa fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
