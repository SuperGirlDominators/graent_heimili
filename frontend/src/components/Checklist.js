import React, { Component } from 'react';
import '../css/Checklist.css';
import whiteMask from '../assets/images/white_mask.png';
import ChecklistItem from './partials/ChecklistItem';
import ChecklistStep from './partials/ChecklistStep';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import $ from 'jquery';


class Checklist extends Component {
  constructor(props) {
    super(props);
    this.getNextStep = this.getNextStep.bind(this);
  }

  componentDidMount(){
    this.props.actions.getUserChecklist(); 
    this.props.actions.getChecklistSteps();
  }

  componentDidUpdate(){
    $(document).ready(function(){
      $('.view_more').click(function(){
        $('.label_wrap').css("transform","translate(0,-480px)");
        $('.view_up').css("display","block");
        $(this).hide();
      });

      $('.view_up').click(function(){
        $('.label_wrap').css("transform","translate(0,0)");
        $('.view_more').css("display","block");
        $(this).hide();
      });
    });
  }

  componentWillMount(){
    document.body.id= "checklist";
  }
 

  getNextStep() {
    const currStep = { currentStep: this.props.current_step + 1 };
    //change background color
    if(currStep.currentStep === 1) {
      $('#checklist').addClass('bg_1'); 
    }
    else if(currStep.currentStep === 2) {
      $('#checklist').removeClass('bg_1'); 
      $('#checklist').addClass('bg_2'); 
      $('#checkbox').addClass('bg_teal'); 
    }
    else if(currStep.currentStep === 3) {
      $('#checklist').removeClass('bg_2'); 
      $('#checklist').addClass('bg_3'); 
    }

    else if(currStep.currentStep === 4) {
      $('#checklist').removeClass('bg_3'); 
      $('#checklist').addClass('bg_4'); 
    }


    if(currStep.currentStep === this.props.checklist_steps.length + 1 ) {
      this.handleSubmit();
    } 
    else {
      this.props.setCurrentStep ( this.props.current_step + 1 );
      this.props.history.push('/stepcomplete');
    }
  }


  handleSubmit() {
    const checklistValue = this.props.userchecklist;
    console.log(checklistValue)
  }

  render() {
    const { checklist_steps } = this.props;
    let { userchecklist } = this.props;

    userchecklist = userchecklist.filter(checklist => checklist.checklistStep === this.props.current_step + 1)
    .filter(checklist => !!checklist.checklistItem); 

    const isAChecklistSelected = userchecklist.every(checklist => checklist.value);
    return (
      <div>
        <div className="container">
            <div className="row">
              <div className="luminance-mask">
                <img className="target luminance-target" src={whiteMask} alt="banner mask"></img>
              </div>
                <div className="col-12 col-sm-12 col-md-12 checklist_content">
                  <ChecklistStep
                    currentStep={this.props.current_step}
                    totalSteps={checklist_steps.length}
                    checklist_step = {checklist_steps[this.props.current_step]}
                  />
                  <button className="view_up"><i className="up"></i></button>
                  <div className="col-12 col-sm-12 col-md-7 checklistItems"> 
                    {
                      userchecklist.map((checklist, i) =>
                        <ChecklistItem key={i} checklist={checklist} onToggle={this.props.actions.toggleUserChecklist}/>
                      )
                    }       
                  </div>
                  <button className="view_more"><i className="down"></i></button>
                </div>
            </div>
        </div>
        { isAChecklistSelected &&
          <a className="play-button-outer" href={(this.props.current_step === this.props.userchecklist.length-1 ) ? "# ":"# "} style={{ display: "block" }} id="next_question" onClick={this.getNextStep}>
            <div className="next_checklist">
              <p className="button_text">NÆSTA SKREF</p>
            </div>
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
