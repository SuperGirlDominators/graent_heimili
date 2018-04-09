import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/Checklist.css';
import whiteMask from '../assets/images/white_mask.png';
import checklistImage from '../assets/images/recycle.jpg';
import ChecklistItem from './partials/ChecklistItem';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class Checklist extends Component {
    
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentQuestion: 0,
//       login:false,
//     };
//     this.getNextQuestion = this.getNextQuestion.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.postChecklist = this.postChecklist.bind(this);
//   }

  componentDidMount(){
    this.props.actions.getUserChecklist(); 
    this.props.actions.getUserChecklist();
  }

  componentWillMount(){
    document.body.id= "checklist";
  }
 

//   getNextQuestion() {
//     const currQuest = { currentQuestion: this.state.currentQuestion + 1 };

//     if(currQuest.currentQuestion === this.props.questions.length) {
//       this.handleSubmit();
//     } else {
//       this.setState(currQuest);
//     }
//   }
/*
  handleSubmit() {
    console.log(firebase.auth().currentUser);

    if(firebase.auth().currentUser) {
      this.setState({login:true});
    }
    this.props.actions.postChoices(this.props.choices);
    // console.log(this.props.choices)

    const choicesValue = this.props.choices;

    const unSelectedChoices = choicesValue.filter((choice)=> {
      if(choice.value) {
        return false;
      } else {
        return true;
      }
    });
    this.postChecklist(unSelectedChoices);
  }

  postChecklist(unSelectedChoices) {
    const data = {};
    data.unSelectedChoices = unSelectedChoices;
    // console.log(this.props.profileData.user.uid)

    data.userID =this.props.profileData.user.uid;
    const url = "http://localhost:3001/api/userchoices";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept','application/json');
    fetch(url, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
    })
    .then(response =>
      response.json()
    )
    .then(response => {
      console.log(response);
      // dispatch(receiveChecklist([]));
    })
    .catch( err => {
      console.log("The error is ", err);
      // receiveChecklist([]);
    });
  }

  onClick(e) {
  let  clickedItems= [];
    // e.target.value;
    let clickedItem = e.target.value;
    // console.log(e.target.value);
    clickedItems.push(clickedItem);
    console.log(clickedItems);
  }
  */

    render() {
        const { userchecklist, checklist_steps } = this.props;
        console.log(checklist_steps);
     
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
                            <div className="col-md-4">
                                <p>
                                    SKREF 1/5
                                </p>
                                <h1>
                                    Flokkun
                                </h1>
                            
                                <div className="photoChecklist">
                                    <div className="side">
                                        <img src={checklistImage} alt="photo of a home"/>
                                    </div> 
                                    <div className="side back" id="backside">Hægt er að kaupa ýmiskonar stærðir af tunnum í <strong>IKEA </strong>og í <strong> Rúmfatalagernum</strong>.
                                        IKEA er einnig með góðar lausnir fyrir flokkun í lítið rými eins og undir vaska eða í lítilli geymslu.
                                    </div>
                                </div>
                            </div>
                

                            <div className="col-md-8 positionToRight">   
                                {
                                    userchecklist.map(function(checklist, i) {
                                        <ChecklistItem key={i} checklist={checklist}/>
                                    }) 
                                }        
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    checklist_steps: state.checklist_steps.checklist_steps,
    userchecklist: state.userchecklist.userchecklist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
