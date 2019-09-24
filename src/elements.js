import React from 'react';

let maxLength = (10/100) * (50/100) * window.innerHeight;

const navObj = {
  'alignItems': 'center',
  'justifyItems': 'center',
  'padding': '10%',
  'height': maxLength,
  'borderRadius': '50%',
  'width': maxLength,
  cursor: 'pointer'
}

export class Flash extends React.Component {
    constructor(props){
        super(props);
        this.state = {selected: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        let selected = this.state.selected;
        this.setState({ selected: !selected });
    }

    render(){
        return (
        <div className={this.state.selected ? 'selected' : '' } style={navObj} onClick={this.handleClick}>
            <img src={require("./pictures/flash.png")} alt="flash" className="nav-img" />
        </div>
        );
    }
};

export class Settings extends React.Component {
    handleClick(){
        alert('This path hasnt been programmed yet');
    }

    render(){
        return (
            <div style={navObj}>
                <img src={require("./pictures/settings.png")} 
                alt="settings" 
                className="nav-img" 
                onClick={this.handleClick} />
            </div>
        );
    }
};

export class Gallery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.refs.gallery.click();
    }

    render(){
        return (
            <div style={navObj}>
                <img src={require("./pictures/gallery.png")} alt="Gallery" className="nav-img" onClick={this.handleClick} />
                <input type="file" ref="gallery" onChange={this.props.selectFileHandle} style={{display: "none"}} />
            </div>
        );
    }
};


export function Chrome() {
    let style = {
        height: window.innerHeight * 3
    }
    return (
        <div style={style} className="tut tutOthers">
            <div className="img1">
                <img className="tutImg" src={require("./pictures/chrome1.jpg")} alt="tutorial 1" />
            </div>
			<div className="p1">
                <p>Click on the the circled button</p>
            </div>
			<div className="img2">
                <img className="tutImg" src={require("./pictures/chrome2.jpg")} alt="tutorial 2" />
            </div>
			<div className="p2">
                <p>Click on "Add to Home screen".</p>
            </div>
            <div className="img3">
                <img className="tutImg" src={require("./pictures/chrome3.jpg")} alt="tutorial 3" />
            </div>
			<div className="p3">
                <p>Click on "Add" to install to your home screen.</p>
            </div>
        </div>
    );
}

export function Firefox() {
    let style = {
        height: window.innerHeight * 2
    }
    return (
        <div style={style} className="tut tutFirefox">
            <div className="img1">
                <img className="tutImg" src={require("./pictures/firefox1.jpg")} alt="tutorial 1" />
            </div>
			<div className="p1">
                <p>Click on the the circled button</p>
            </div>
			<div className="img2">
                <img className="tutImg" src={require("./pictures/firefox2.jpg")} alt="tutorial 2" />
            </div>
			<div className="p2">
                <p>Click on "+ADD TO HOME SCREEN" to install to your home screen.</p>
            </div>
        </div>
    );
}

export function Safari() {
    let style = {
        height: window.innerHeight * 3
    }
    return (
        <div style={style} className="tut tutOthers">
            <p>TODO Safari tutorial</p>
        </div>
    );
}


export function getBrowser(){
    if (typeof InstallTrigger !== 'undefined') {
        return 'firefox';
    } else if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'])) {
        return 'safari';
    } else {
        return 'chrome';
    }
}