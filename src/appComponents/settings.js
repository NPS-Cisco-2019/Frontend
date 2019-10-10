import React from 'react';
import { Back } from './elements';
import { withRouter } from 'react-router-dom';

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
                backgroundColor: 'rgba(65, 100, 255, 0.87)',
                borderRadius: window.innerWidth/50,
                width: window.innerWidth * 0.95,
                top: Math.round(window.innerHeight/10),
                marginLeft: window.innerWidth / 40
            },
            bannerChildOpacity: 1
        }

        this.tutClick = this.tutClick.bind(this);
        this.backClick = this.backClick.bind(this);
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
                backgroundColor: 'rgb(25, 25, 25)',
                borderRadius: 0,
                width: window.innerWidth,
                marginLeft: 0,
                top: 0
            },
            bannerChildOpacity: 0
        })
        setTimeout(() => {
            this.props.history.push('/Tutorial')
        }, 600)
    }

    closeBanner(){
        this.setState({animateOutBanner: true});
        setTimeout(() => {this.setState({showTutBanner: false})}, 300)
    }

    render(){
        return (
            <div style={{minHeight: window.innerHeight, position: "absolute", width: window.innerWidth}} className={this.state.backToCam ? "slideout" : "fadein"}>
                <header className="top fadein" style={{height: Math.round(window.innerHeight/11)}} id="head">
                    <Back handleClick={this.backClick} />
                    <p style={{fontSize: '1.2em', margin: 0}} id="websitePosition">Settings</p>
                </header>
                
                <div style={{display: this.state.showTutBanner ? 'auto' : 'none',
                            ...this.state.bannerStyle}}
                    className={`link-container-wrapper ${this.state.animateOutBanner ? 'fadeout' : null}`}>
                    <div className="link-container" style={{opacity: this.state.bannerChildOpacity}}>
                        <div className="link-to-tut" onClick={this.tutClick}>
                            Want to install this app?<br/>Click here to find out how.
                        </div>
                        <div className="close-x" onClick={this.closeBanner}>
                            <button>&#215;</button>
                        </div>
                    </div>
                </div>
                
                <div style={{top: Math.round(window.innerHeight/10 + (this.state.showTutBanner ? window.innerHeight/9 : 0)),
                            position: "relative",
                            transition: 'all 300ms cubic-bezier(0.215, 0.610, 0.355, 1)'}}>
                    <img src={require('./pictures/default.jpg')} alt="meme" style={{maxWidth: window.innerWidth, postion: "absolute"}} />
                    <p style={{marginTop: 30}}>Temporary until a settings page and link to tutorial page is made</p>
                </div>
            </div>
        )
    }
}

export default withRouter(SettingsPage);