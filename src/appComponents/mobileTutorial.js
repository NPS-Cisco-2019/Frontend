import React, { useState } from 'react';
import { Chrome, Firefox, Safari, Back } from './elements';
import browser from '../browserDetection';

let Tutorial;

if (browser === 'firefox'){
    Tutorial = Firefox;
} else if (browser === 'safari'){
    Tutorial = Safari;
} else {
    Tutorial = Chrome;
}

export default function(props){

    const backClick = () => {
        props.backClick();
        setBackToCam(true);
    }


    const [backToCam, setBackToCam] = useState(false);

    let rootStyle = document.documentElement.style;

    rootStyle.setProperty('--tutAreas', '"img1" "text1" "img2" "text2" "img3" "text3"');
    rootStyle.setProperty('--otherRows', 'repeat(3, 27% 6%');
    rootStyle.setProperty('--firefoxRows', 'repeat(2, 40% 10%)');
    rootStyle.setProperty('--fontSize', '130%');
    rootStyle.setProperty('--marginTop', 'none');
    rootStyle.setProperty('--rowGap', '0');

    return (
        <div style={{minHeight: window.innerHeight, position: "absolute", width: window.innerWidth}} className={backToCam ? "slideout" : "fadein"}>
            <header className="top fadein" style={{height: Math.round(window.innerHeight/11)}} id="head">
                <Back handleClick={backClick} />
                <p style={{fontSize: '1.2em', margin: 0}} id="websitePosition">Tutorial</p>
            </header>
            <div style={{position: 'relative', top: Math.round(window.innerHeight/10)}}>
                <Tutorial />
            </div>
        </div>
    )
}