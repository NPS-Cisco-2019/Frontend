import React from 'react';
import { Chrome } from './elements';

let Tutorial = Chrome;

export default function(){
    let rootStyle = document.documentElement.style;

    rootStyle.setProperty('--tutAreas', '"img1" "text1" "img2" "text2" "img3" "text3"');
    rootStyle.setProperty('--otherRows', 'repeat(3, 27% 6%');
    rootStyle.setProperty('--firefoxRows', 'repeat(2, 40% 10%)');
    rootStyle.setProperty('--fontSize', '130%');
    rootStyle.setProperty('--marginTop', 'none');
    rootStyle.setProperty('--rowGap', '0');

    return (
        <div>
            <Tutorial />
        </div>
    )
}