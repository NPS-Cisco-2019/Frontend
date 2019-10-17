import React from 'react';
import { Back, Setting, Slider, Null } from './elements';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { changeMode } from '../localStorageHandleing';

let isInstalled = false;

if (window.matchMedia('(display-mode: standalone)').matches) {
  isInstalled = true;
}

class SettingsPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            backToCam: false,
            showTutBanner: !isInstalled,
            animateOutBanner: false,
            bannerStyle: {
                height: window.innerHeight/11,
                backgroundColor: 'var(--highlightCol)',
                borderRadius: window.innerWidth/50,
                width: window.innerWidth * 0.95,
                top: Math.round(window.innerHeight/10),
                marginLeft: window.innerWidth / 40
            },
            bannerChildAnimation: ''
        }

        this.tutClick = this.tutClick.bind(this);
        this.backClick = this.backClick.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.closeBanner = this.closeBanner.bind(this);
    }

    backClick(){
        this.setState({backToCam: true});
        this.props.backClick();
    }

    tutClick(){
        this.setState({
            bannerStyle: {
                height: window.innerHeight,
                backgroundColor: 'var(--backCol)',
                borderRadius: 0,
                width: window.innerWidth,
                marginLeft: 0,
                top: 0
            },
            bannerChildAnimation: 'lateFade'
        })
        setTimeout(() => {
            this.props.history.push('/Tutorial')
        }, 800)
    }

    closeBanner(){
        this.setState({animateOutBanner: true});
        setTimeout(() => {this.setState({showTutBanner: false})}, 300)
    }

    changeMode(){
        let mode = localStorage.getItem('mode');
        let newMode = mode === 'dark' ? 'light' : 'dark'
        localStorage.setItem('mode', newMode);
        changeMode(newMode);
        this.forceUpdate();
    }

    render(){
        let mode = localStorage.getItem('mode');
        return (
            <div style={{minHeight: window.innerHeight, position: "absolute", width: window.innerWidth, backgroundColor: 'var(--backCol)'}} className={this.state.backToCam ? "slideout" : "fadein"}>
                <header className="top fadein" style={{height: Math.round(window.innerHeight/11)}} id="head">
                    <Back handleClick={this.backClick} />
                    <p style={{fontSize: '1.2em', margin: 0}} id="websitePosition">Settings</p>
                </header>
                
                <div style={{display: this.state.showTutBanner ? 'auto' : 'none',
                            ...this.state.bannerStyle}}
                    className={`link-container-wrapper ${this.state.animateOutBanner ? 'fadeout' : null}`}>
                    <div className={`link-container ${this.state.bannerChildAnimation}`}>
                        <div className="link-to-tut" onClick={this.tutClick}>
                            Want to install this app?<br/>Click here to find out how.
                        </div>
                        <div className="close-x" onClick={this.closeBanner}>
                            <button>&#215;</button>
                        </div>
                    </div>
                </div>
                
                <div style={{top: Math.round(window.innerHeight/10 + (this.state.showTutBanner ? window.innerHeight/11 : 0)),
                            position: "relative",
                            transition: 'all 300ms cubic-bezier(0.215, 0.610, 0.355, 1)'}}
                >
                    <Setting name="Dark Mode" type="switch" id="darkMode" handleClick={this.changeMode} props={{enabled: mode === 'dark'}} Children={Null} />
                    <Setting name="Long Press Delay" type="num" id="pressDelay" props={{suffix: 'ms'}} compValue={localStorage.getItem('pressDelay')} Children={Slider} />
                    <p style={{marginTop: 30}}>More settings to be implemented</p>
                </div>
            </div>
        )
    }
}

export default withRouter(SettingsPage);

// function changeLongDuration(){
//     let value = document.getElementById('pressDelaySlider').value;
//     localStorage.setItem('pressDelay', value + '');
// }


SettingsPage.propTypes = {
    backClick: PropTypes.func.isRequired
}