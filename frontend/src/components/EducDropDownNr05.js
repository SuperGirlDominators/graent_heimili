import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import EducationPortraitInfo from '../containers/EducationPortrait';

import homeBanner from '../assets/images/home-banner.jpeg';
import whiteMask from '../assets/images/white_mask.png';
import '../css/AboutUs.css';
import '../css/EducationPage.css';


import plastMoreInfo from '../assets/images/plastMoreInfo.png';
import floskurMoreInfo from '../assets/images/floskurMoreInfo.png';

import $ from 'jquery';
import Waypoint from 'react-waypoint';






 class DropDownNr05 extends Component {
    
      render() {
        return (
            <div id="aboutpage">
            <div className="container">
                <div className="row">
                    <EducationPortraitInfo image={plastMoreInfo} name={"PLAST"} text={""} />                    
                    <EducationPortraitInfo  name={"MÁLMAR"} text={"​"} />
                    <EducationPortraitInfo  name={"RAUÐI KROSSINN"} text={""} />
                    <EducationPortraitInfo image={floskurMoreInfo} name={"FLÖSKUR OG DÓSIR"} text={""} />
                    <EducationPortraitInfo  name={"ANNAÐ ÁHUGAVERT"} text={""} />
                </div>  	
            </div>
        </div>
        );
      }
    }

    export default DropDownNr05;