import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/Checklist.css';
import whiteMask from '../assets/images/white_mask.png';
import ChecklistItem from './partials/ChecklistItem';
import ChecklistStep from './partials/ChecklistStep';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class Checklist extends Component {
    
  constructor(props) {
    super(props);
  
    this.getNextStep = this.getNextStep.bind(this);

  }

  componentDidMount(){
    this.props.actions.getUserChecklist(); 
    this.props.actions.getChecklistSteps();
  }

  componentWillMount(){
    document.body.id= "checklist";
  }
 

  getNextStep() {
    const currStep = { currentStep: this.props.current_step + 1 };
    console.log(this.props.current_step)
    if(currStep.currentStep === this.props.checklist_steps.length) {
      this.handleSubmit();
    } else {
      
      this.props.setCurrentStep ( this.props.current_step + 1 );
      this.props.history.push('/stepcomplete');
    }

  }


  handleSubmit() {

    const checklistValue = this.props.userchecklist;

  }

  onClick(e) {
    let  clickedItems= [];
      // e.target.value;
      let clickedItem = e.target.value;
      // console.log(e.target.value);
      clickedItems.push(clickedItem);
      console.log(clickedItems);
    }

    render() {
      const { checklist_steps } = this.props;
      let { userchecklist } = this.props;
      userchecklist = userchecklist.filter(checklist => checklist.checklistStep === this.props.current_step+1);      
      const isAChecklistSelected = userchecklist.every(checklist => checklist.value);
      return (
          <div>
              <div className="container">
                  <div className="row">
                      <div className="white_curved_mask">
                          <img className="target white_curved_mask" src={whiteMask} alt="Masked banner"/>
                      </div>
                  </div>
              </div>
              <div className="container">
                  <div className="row">
                      <div className="col-md-12 checklist_content">
                        <ChecklistStep
                          currentStep={this.props.current_step}
                          totalSteps={checklist_steps.length}
                          checklist_step = {checklist_steps[this.props.current_step]}
                        />
                        <div className="col-md-8 positionToRight">   
                          {
                            userchecklist.map((checklist, i) =>
                              <ChecklistItem key={i} checklist={checklist} onToggle={this.props.actions.toggleUserChecklist}/>
                            )
                          }        
                        </div>
                      </div>
                  </div>
              </div>
              { isAChecklistSelected &&
                <a className="play-button-outer" href={(this.props.current_step === this.props.userchecklist.length-1 ) ? "#":"#"} style={{ display: "block" }} id="next_question" onClick={this.getNextStep}>
                  <div className="play-button"></div>
                </a>
              }
          </div>
      );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
