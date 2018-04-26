import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import EducationPortrait from '../containers/EducationPortrait'
import homeBanner from '../assets/images/home-banner.jpeg';
import whiteMask from '../assets/images/white_mask.png';
import '../css/AboutUs.css';
import '../css/EducationPage.css';


import pappi from '../assets/images/pappi.jpg';
import plast from '../assets/images/plast.jpg';
import flöskur from '../assets/images/floskurOgDosir.jpg';

import molta from '../assets/images/molta.jpg';
import malmur from '../assets/images/malmur.jpg';
import kertavax from '../assets/images/kertavax.jpg';

import ljosaperur from '../assets/images/ljosaperur.jpg';
import rafhlodur from '../assets/images/rafhlodur.jpg';
import gler from '../assets/images/gler.jpg';

import $ from 'jquery';
import Waypoint from 'react-waypoint';




export default class Education extends Component {
    
componentDidMount() {
    window.addEventListener("scroll", this._handleWaypointEnter);
    
}
 _handleWaypointEnter() {
     console.log("scrolling")
     $('.dropdown2').animate({'opacity':'1'},500);
 }



  render() {
    return (
        <div id="aboutpage">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="education">Fræðsluefni<br /> og fróðleikur</div>
                    <div className="educationSubtext">Hér fyrir neðan finnur þú allskonar fræðsluefni um flokkun<br /> og hvað verður um hana, uppskriftir af hreinsiefnum og<br /> snyrtivörum, hvar þú getur nálgast umhverfisvænar vörur og<br /> margt fleira sem mun hjálpa</div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 dropdown2">
                    <button className="dropbtn">Ekkert valið</button>
                <div className="dropdown2-content">
                    <a id="tab1" href="#">Hvað verður um efnið sem þú flokkar?</a>
                    <a id="tab2" href="#">Uppskriftir að hreinsiefnum</a>
                    <a id="tab3" href="#">Uppskriftir að snyrtivörum</a>
                    <a id="tab4" href="#">Hvar þú getur keypt sniðugar umhverfisvænar vörur</a>
                    <a id="tab5" href="#">Mikilvægar og góðar upplýsingar</a>
                </div>
                </div>
            </div>
        <div className="scroll-downs">
            <div className="mousey">
                <div className="scroller"></div>
            </div>
        </div>
        </div>
        <div className="container">
                <div className="row">
                    <EducationPortrait image={pappi} name={"PAPPI"} text={"Efnið er flokkað vélrænt í móttöku- og flokkunarstöð SORPU í Gufunesi til að aðskilja bylgjupappa frá sléttum pappa og pappír. {'<br />'} {'\n'} \n Efnið er pressað og baggað og síðan flutt til Svíþjóðar til frekari flokkunar og endurvinnslu. Úr endurunnum pappír og pappa er t.d. framleiddur salernispappír, eldhúspappír, dagblaðapappír og karton sem notað er til að búa til nýjar umbúðir. Úr endurunnum bylgjupappa er framleiddur nýr bylgjupappi. "} />                    
                    <EducationPortrait image={plast} name={"PLAST"} text={"Efnið er pressað og baggað í móttöku- og flokkunarstöð SORPU og síðan flutt til Svíþjóðar til frekari flokkunar og endurvinnslu​​ eða orkuvinnslu. "} />
                    <EducationPortrait image={flöskur} name={"FLÖSKUR OG DÓSIR"} text={"Endurvinnslan hf. tekur við skilagjaldsskyldum umbúðum sem berast til SORPU og baggar áldósir og plastumbúðir í pressum. Umbúðirnar eru svo fluttar erlendis til endurvinnslu. Framleiðsla úr endurunnum áldósum eru t.d. nýjar áldósir og úr gömlu plastflöskunum er framleidd polyester ull – efni sem nýtist í fataiðnaði, teppaframleiðslu o.fl. Flísföt eru þekktasta afurðin. Glerflöskur eru muldar og nýtast sem undirstöðuefni í landmótun á urðunarstað SORPU í Álfsnesi. "} />
                </div>  	
            </div>
            <div className="container">
                <div className="row">
                    <EducationPortrait image={molta} name={"MOLTA"} text={"Hérna er síða með upplýsingum um hvernig á að byrja."} />                    
                    <EducationPortrait image={malmur} name={"MÁLMUR-ÁLDÓSIR"} text={"​​Efnið er flutt til brotamálms-fyrirtækja sem flokka það eftir málmtegundum og minnka rúmmál, t.d. með pressun. Málmar eru fluttir erlendis til bræðslu og endurvinnslu."} />
                    <EducationPortrait image={kertavax} name={"KERTAVAX"} text={"​Efnið nýtist til framleiðslu á útikertum hjá Plastiðjunni Bjargi – Iðjulundi á Akureyri."} />
                </div>  	
            </div>
            <div className="container">
                <div className="row">
                    <EducationPortrait image={ljosaperur} name={"LJÓSAPERUR"} text={"Ljósaperur eru teknar í sundur hjá viðurkenndum vinnsluaðilum. Efni hættuleg umhverfinu eru flokkuð frá og meðhöndluð með viðeigandi hætti. Endurvinnsluefni, t.d. málmar, eru flokkuð frá og komið í réttan farveg."} />                    
                    <EducationPortrait image={rafhlodur} name={"RAFHLÖÐUR"} text={"​Rafhlöður fara til viðurkenndra móttökuaðila spilliefna þar sem þær eru flokkaðar og meðhöndlaðar á réttan hátt og komið til eyðingar eða í endurvinnslu."} />
                    <EducationPortrait image={gler} name={"GLER"} text={"Efninu er haldið til haga á urðunarstað SORPU í Álfsnesi. Markmiðið er að meta forsendur gler endurvinnslu."} />
                </div>  	
            </div>

    </div>
    );
  }
}


