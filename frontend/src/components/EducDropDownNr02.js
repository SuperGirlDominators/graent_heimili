import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import EducationPortrait from '../containers/EducationPortrait'

import homeBanner from '../assets/images/home-banner.jpeg';
import whiteMask from '../assets/images/white_mask.png';
import '../css/AboutUs.css';
import '../css/EducationPage.css';

import hreinsivokvi from '../assets/images/hreinsivokvi.jpg';
import glerudi from '../assets/images/glerudi.jpg';
import klosetthreinsir from '../assets/images/klosetthreinsir.jpg';


import $ from 'jquery';
import Waypoint from 'react-waypoint';






 class DropDownNr02 extends Component {
    
      render() {
        return (
            <div id="aboutpage">
            <div className="container">
                <div className="row">
                    <EducationPortrait image={hreinsivokvi} name={"HREINSIVÖKVI GEGN FITU"} text={"Uppskrift að hreinsivökva sem er stórkostlegur til að ná fitu af hvaða yfirborði sem er. Þessi svínvirkar í örbylgjuofninn sem hefur ekki verið þrifinn lengi! 2/3 hluti vatn 1/3 hluti edik 3 tsk matarsódi 4 tsk sápa 8-10 dropar ilmolía að eigin vali 1 spreybrúsi Blandið öllu saman í spreybrúsa og byrjið að þrífa! frettanetid.is "} />                    
                    <EducationPortrait image={glerudi} name={"HEIMAGERÐUR GLERÚÐI"} text={"​Í apótekum fæst spritt sem flestir nota til sótthreinsunar. En spritt hentar líka einkar vel til þrifa. Búðu til glerúða sem er örugglega sá besti sem þú hefur prófað. 1 bolli spritt 1 bolli vatn 1 teskeið borðedik. Hristið saman og notið á gler, spegla og krómaða fleti. Virkar líka einkar vel á keramik flísar. hreint.is "} />
                    <EducationPortrait image={klosetthreinsir} name={"KLÓSETTHREINSIR"} text={"Hægt er, á auðveldan hátt, að búa til klósetthreinsi sem ekki aðeins hreinsar klósettskálina vel heldur ilmar einnig frábærlega. Blanda skal saman: ½ bolla af matarsóda ½ bolla af ediki 6 dropum af lavender olíu Hella í klósettskálina og skrúbba eins og vanalega. Ath. að ekki er hægt að geyma þessa blöndu heldur þarf að nota hana strax. nlfi.is  "} />
                </div>  	
            </div>
        </div>
        );
      }
    }

    export default DropDownNr02;