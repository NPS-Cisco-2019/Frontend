import React from 'react';
import './App.css';

let maxLength = (10/100) * (80/100) * window.innerHeight;

const navObj = {
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyItems: 'center',
    padding: maxLength/5,
    height: maxLength,
    borderRadius: '50%',
    width: maxLength,
    cursor: 'pointer',
    objectFit: 'cover'
}

export class Flash extends React.Component {
    constructor(props){
        super(props);
        this.state = {selected: true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        let selected = this.props.on;
        this.setState({ selected: !this.props.on });
        if (!selected){
            this.props.flipOutMode('vid');
        } else {
            this.props.flipOutMode('img');
        }
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
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.showDefault();
        // alert('This path hasnt been programmed yet');
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
            <div className="img1">
                <img className="tutImg" src={require("./pictures/safari1.jpg")} alt="tutorial 1" />
            </div>
            <div className="p1">
                <p>Click on the the circled button</p>
            </div>
            <div className="img2">
                <img className="tutImg" src={require("./pictures/safari2.jpg")} alt="tutorial 2" />
            </div>
            <div className="p2">
                <p>After scrolling down, click on "Add to Home Screen".</p>
            </div>
            <div className="img3">
                <img className="tutImg" src={require("./pictures/safari3.jpg")} alt="tutorial 3" />
            </div>
            <div className="p3">
                <p>Click on "Add" to install to your home screen.</p>
            </div>
        </div>
    );
}


export function getBrowser(){
    if (typeof InstallTrigger !== 'undefined') {
        return 'firefox';
    } else if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'])) {
        return 'safari';
    } else if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
        return 'chrome';
    } else {
        console.log('unknown');
    }
}

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
}