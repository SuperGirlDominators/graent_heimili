import React, { Component } from 'react';
import $ from 'jquery';
import checklistImage from '../../assets/images/recycle.jpg';


class ChecklistItem extends Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  onItemClick() {
    this.props.onToggle(this.props.checklist.checklistID);
  }

  handleClick() {
    const { checklist } = this.props;
    $('.photoChecklist').toggleClass('active');
    $("#backside").html (`${checklist.checklistTip}`)
  }

  render() {
    const { checklist } = this.props;
    return (
      <div>
        <label className='my-checklist'>
            <input type='checkbox' onClick={this.onItemClick} type='checkbox' checked={checklist.value} />
            <span>{checklist.checklistItem}</span>
            <button onClick={this.handleClick}  className="questionmark q q1" >
                <i className="fa fa-question-circle"></i>
            </button>
        </label>
      </div>
    );
  }
}

export default ChecklistItem;
