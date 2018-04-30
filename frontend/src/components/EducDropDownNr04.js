import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import EducationPortrait from '../containers/EducationPortrait'

import homeBanner from '../assets/images/home-banner.jpeg';
import whiteMask from '../assets/images/white_mask.png';
import '../css/AboutUs.css';
import '../css/EducationPage.css';

import mena from '../assets/images/mena.jpg';
import mistur from '../assets/images/mistur.jpg';
import graenviska from '../assets/images/graenviska.jpg';

import mammaveitbest from '../assets/images/mammaveitbest.jpg';
import matarbur from '../assets/images/matarbur.jpg';
import heilsuhusid from '../assets/images/heilsuhusid.jpg';

import tehusid from '../assets/images/tehusid.jpg';
import lauga from '../assets/images/lauga.jpg';
import baendur from '../assets/images/baendur.jpg';

import kolaportid from '../assets/images/kolaportid.jpg';
import klaran from '../assets/images/klaran.jpg';
import sostrene from '../assets/images/sostrene.jpg';

import org from '../assets/images/org.jpg';
import hagkaup from '../assets/images/hagkaup.jpg';
import bonus from '../assets/images/bonus.jpg';

import kronan from '../assets/images/kronan.jpg';
import vidir from '../assets/images/vidir.jpg';
import gamur from '../assets/images/gamur.jpg';

import $ from 'jquery';
import Waypoint from 'react-waypoint';






 class DropDownNr04 extends Component {
    
      render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <EducationPortrait image={mena} name={"MENA.IS"} text={"Býður upp á snyrtivörur og hreingerningarvörur ásamt ýmsu fyrir eldhúsið."} />                    
                    <EducationPortrait image={mistur} name={"MISTUR.IS"} text={"​Býður upp á fjölnotavörur fyrir fólk á ferðinni, í eldhúsið og baðherbergið, ásamt snyrtivörum."} />
                    <EducationPortrait image={graenviska} name={"GRAENVISKA.IS"} text={"Býður upp á vörur fyrir heimilið ásamt snyrtivörum."} />
                </div>  	
            </div>

            <div className="container">
                <div className="row">
                    <EducationPortrait image={mammaveitbest} name={"MAMMA VEIT BEST"} text={"Heilsubúð með alls konar lífrænar vörur, fæðubótarefni og snyrtivörur."} />                    
                    <EducationPortrait image={matarbur} name={"MATARBÚR KAJU"} text={"​Hægt er að versla áfyllanlegar vörur í Matarbúri Kaju sem er staðsett á Akranesi."} />
                    <EducationPortrait image={heilsuhusid} name={"HEILSUHÚSIÐ"} text={"Það er margt hægt að finna hjá Heilsuhúsinu og eru þau með góða vefverslun."} />
                </div>  	
            </div>

            <div className="container">    
                <div className="row"> 
                    <EducationPortrait image={tehusid} name={"KRYDD & TEHÚSIÐ"} text={"Hægt að kaupa áfyllingar af tei og kryddi."} />                    
                    <EducationPortrait image={lauga} name={"FRÚ LAUGA"} text={"​Þessi verslun býður upp á ýmislegt sem hægt er að fylla á, eins og t.d. olíur."} />
                    <EducationPortrait image={baendur} name={"BÆNDUR Í BÆNUM"} text={"Lífrænn bændamarkaður. Hægt er að kaupa umbúðalausar gúrkur og sömuleiðis er betra fyrir umhverfið að versla frá sínu nánasta umhverfi."} />
                </div>  	
            </div>  

            <div className="container">    
                <div className="row"> 
                    <EducationPortrait image={kolaportid} name={"KOLAPORTIÐ"} text={"Hægt er að kaupa kartöflur í lausu hjá þeim."} />                    
                    <EducationPortrait image={klaran} name={"KLARAN.IS"} text={"​Ýmsar umhverfisvænar vörur."} />
                    <EducationPortrait image={sostrene} name={"SOSTRENE GRENE"} text={"Bjóða upp á te í umbúðalausu."} />
                </div>  	
            </div>  

            <div className="container">
                <div className="row">
                    <EducationPortrait image={org} name={"ORG Í KRINGLUNNI"} text={"Bæði föt og vörur úr umhverfisvænum efnum."} />                    
                    <EducationPortrait image={hagkaup} name={"HAGKAUP"} text={"​Sonett hreinsivörurnar eru vegan og brotna 100% niður í náttúrunni."} />
                    <EducationPortrait image={bonus} name={"BÓNUS"} text={"Ecover hreinsivörur, Natracare dömubindi, Gunry umhverfisvænar handsápur og uppþvottalög. Bónus selur einnig fjölnota poka og pappírspoka undir vörurnar þínar. "} />   
                </div>  	
            </div>          
        
            <div className="container">
                <div className="row">
                    <EducationPortrait image={kronan} name={"KRÓNAN"} text={""} />                    
                    <EducationPortrait image={vidir} name={"Víðir"} text={"​"} />
                    <EducationPortrait image={gamur} name={"GAMUR.IS"} text={"Moltutunna - https://www.gamur.is/vorur-og-%C3%BEjonusta/matussi-moltutunna-310l/"} />   
                </div>  	
            </div> 

        </div>
        );
      }
    }

    export default DropDownNr04;