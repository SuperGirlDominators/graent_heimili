import React, { Component } from 'react';
import '../css/Home.css';
import Login from '../components/partials/Login';
import homeBanner from '../assets/images/home-banner.jpeg';


class Home extends Component {
  
  componentWillMount() {
    document.body.id= "homepage";

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    fetch("http://localhost:3003/api/profile", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        'Accept':'application/json'
      }),
      credentials: 'include', // Don't forget to specify this if you need cookies
    })
    .then(handleErrors)
    .then(response => {
      console.log(response);
      this.props.history.push('checklist');
    })
    .catch(err => {
      console.log("The error is ", err)
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
             <div className="luminance-mask">
               <img className="target luminance-target" src={homeBanner} alt="banner mask"></img>
             </div>
             <div className="row banner-headline">
               <div className="col-xl-12 col-lg-12 col-md-12">
                 <h1>Taktu þátt í að gera heimilið<br /> þitt umhverfisvænt</h1>
               </div>
             </div>
             <div className="row support-text">
               <div className="col-xl-9 col-lg-9 col-md-8">
                 <h3>
                  Svaraðu nokkrum spurningum og við búum til tékklista fyrir þig<br /> til að gera heimilið umhverfisvænna
                 </h3>
               </div>
             </div>
             <div className="row start-button">
               <div className="col-7 col-md-6">
                 <div>
                   <a className="next_button btn-lg" href="#login_popup">Byrjaðu núna</a>
                 </div>

                 <Login destination="/questions" />
               </div>
             </div>
           </div>
        </div>
      </div>
    );
  }
}



export default Home;
