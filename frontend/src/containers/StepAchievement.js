import React, { Component } from 'react';
import '../css/StepAchievement.css';
import BannerImage from '.././assets/images/confetti_image.png';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'



class StepAchievement extends Component {
  constructor(props) {
    super(props);
  
    this.getNextStep = this.getNextStep.bind(this);
   
  }

  componentWillMount(){
    document.body.id= "hometypespage";
  }

  getNextStep() {
    this.props.history.push('/checklist');

  }


  render() {
    const styles = {
      backgroundImage: 'url('+BannerImage+')',
      backgroundSize: 'contain'
    };

    return (
    
        <div id="banner_popup" className="banner_overlay">
          <div className="banner_popup" style={styles} >
              <a className="close" href="/checklist#login_popup">&times;</a>

              <h3>Þú kláraðir SKREF {this.props.current_step} af 5 </h3>

              <h1>Vá hvað þú ert frábær!</h1>
              <div id="wrapper">
                <div class="bar stepfive">
                  <span class="bar_number">5</span>
                </div>
                <div class="bar stepfour">
                  <span class="bar_number">4</span>

                </div>
                <div class="bar stepthree">
                  <span class="bar_number">3</span>
                </div>
                <div class="bar steptwo">
                  <span class="bar_number">2</span>
                </div>
                <div class="bar stepone">
                 <span class="bar_number">1</span>
                </div>
              </div>
              <div>
                <button class="share btn-lg">Deila áfram</button>
                <button class="next_step btn-lg" onClick={this.getNextStep}>Skora á aðra</button>
              </div>

          </div>
         
        </div>

    );
  }
}

// height: 300px;
// position: absolute;
// bottom: 0;
// width: 500px;
// background-color: red;
const mapStateToProps = state => {
  return {
    checklist_steps: state.checklist_steps.checklist_steps,
    userchecklist: state.userchecklist.userchecklist,
    current_step: state.current_step.current_step
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
    setCurrentStep: step =>  dispatch(actions.CurrentStep(step) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepAchievement);

