import React, { Component } from 'react';
import '../css/HomeTypes.css';
import HomeImage from '../assets/images/home.png';



class HomeTypes extends Component {

  componentWillMount(){
    document.body.id= "hometypespage";
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="white_curved_mask">
              <img className="target white_curved_mask" src="" alt="Masked banner"/>
            </div>
          </div>
        </div>


        <div className="container centerVertical">
          <div className="row">
            <div className="col-md-12">
              <h1>
                Hvað búa margir á heimilinu þínu?
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <div className="thumbnail">
                <a href="https://localhost:8000/questionOne.html">
                  <img src={HomeImage} alt="smallsize home"/>
                  <div className="caption darkGreen">
                    <p>1 til 2 á heimili</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-md-4">
              <div className="thumbnail">
                <a href="/assets/images/home.png">
                  <img src={HomeImage}  alt="mediumsize home"/>
                  <div className="caption darkGreen">
                    <p>3 til 4 á heimili</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-md-4">
              <div className="thumbnail">
                <a href="/assets/images/home.png">
                  <img src={HomeImage}  alt="bigsize home"/>
                  <div className="caption darkGreen">
                    <p>5 eða fleiri á heimili</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}



export default HomeTypes;
