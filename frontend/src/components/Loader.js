import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/Loader.css';


class Loader extends Component {

    componentDidMount() {

        setTimeout(() => {
            this.props.history.push('/checklist');
            console.log("timer running")
          }, 10000)
        // this.props.history.push('/checklist')
    }

    componentWillMount(){
        document.body.id= "loader";
    }

    render() {
        return (
            <div>
                <div class="loader">
                    <div class="square"></div>
                    <div class="square clear"></div>
                    <div class="square"></div>
                    <div class="square last"></div>
                </div>
                <h1 id="loading_checklist">Tékklisti í vinnslu</h1>
            </div>
        
        );
    }
}


export default Loader;
