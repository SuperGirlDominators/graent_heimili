import React, { Component } from 'react';

class ChecklistItem extends Component {

  render() {
    const { checklist } = this.props;
    console.log(checklist)
    console.log('hi')

    return (
      <div>
        <label className='my-checklist'>
            <input type='checkbox'/>
            <span>{checklist.checklistItem}</span>
            <button className="questionmark q q1" >
                <i className="fa fa-question-circle"></i>
            </button>
        </label>
      </div>
    );
  }
}

export default ChecklistItem;
