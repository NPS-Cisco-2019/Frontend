import React from 'react';
import { Back } from './elements';
import Tutorial from './mobileTutorial';

export default class SettingsPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            backToCam: false
        }

        this.backClick = this.backClick.bind(this);
    }

    backClick(){
        this.setState({backToCam: true});
        this.props.backClick();
    }

    render(){
        return (
            <div style={{minHeight: window.innerHeight, position: "absolute", width: window.innerWidth}} className={this.state.backToCam ? "slideout" : "fadein"}>
                <header className="top fadein" style={{height: Math.round(window.innerHeight/11)}} id="head">
                    <Back handleClick={this.backClick} />
                    <p style={{fontSize: '1.2em', margin: 0}} id="websitePosition">Settings</p>
                </header>
                <div style={{top: Math.round(window.innerHeight/10), position: "relative"}}>
                <img src={require('./pictures/default.jpg')} alt="meme" style={{maxWidth: window.innerWidth, postion: "absolute"}} />
                    <p style={{marginTop: 30}}>Temporary until a settings page and link to tutorial page is made</p>
                    <Tutorial />
                </div>
            </div>
        )
    }
}