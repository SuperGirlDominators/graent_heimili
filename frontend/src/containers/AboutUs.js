import React, { Component } from 'react';
import '../css/About.css';
import JudyImage from '../assets/images/judy.jpg';
import HrefnaImage from '../assets/images/hrefna.jpg';
import HeidrunImage from '../assets/images/heidrun.jpg';
import IngunnImage from '../assets/images/ingunn.jpg';


class AboutUs extends Component {
  constructor(props) {
      super(props);
      this.state = { active: '' };
      this.state = { open: '' };
      // this.onStatusClick = this.onStatusClick.bind(this);
  }

  componentWillMount(){
    document.body.id= "aboutpage";
  }

  displayInfo(e){
    e.target.closest(".dropdown").toggleClass('active');

    let caret;

    if (e.target.className.includes("fa"))
    {
      caret = e.target;
    } else {
      caret =  e.target .find('svg');
    }

    caret.toggleClass('fa-caret-down');
    caret.find('svg').toggleClass('fa-caret-up');

  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="white_curved_mask">
              <img className="target white_curved_mask" alt="Masked banner"></img>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="umOkkur">Um okkur</div>
            </div>
          </div>
        </div>

         <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="gluggi">
                <img className="AboutImage" src={JudyImage} alt="judy"></img>
                <div className="dropdown">
                  <div className="kassi" onClick={this.displayInfo}>Judy<i className="fas fa-caret-up"></i></div>
                  <div className="dropdown-content">
                    <span className="fullname">Judy Njeru</span>
                    <p className="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum elit turpis, vitae maximus ex fringilla et. Aliquam erat volutpat. Donec ut elit sed elit efficitur cursus. Sed euismod, elit nec rutrum scelerisque, ligula sapien tincidunt nisi, et dictum tellus nisl et velit. Proin dictum eros lobortis odio vulputate, non condimentum urna ultrices.</p>
                    <a className="portfolio-linkur" href="http://judynjeru.com">Portfólíó</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <img className="AboutImage" src={HrefnaImage} alt="hrefna"></img>
            </div>
            <div className="col-md-3">
              <img className="AboutImage" src={HeidrunImage} alt="heidrun"></img>
            </div>
            <div className="col-md-3">
              <img className="AboutImage" src={IngunnImage} alt="ingunn"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default AboutUs;
