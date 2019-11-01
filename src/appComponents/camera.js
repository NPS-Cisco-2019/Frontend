import React, { useEffect } from 'react';
import styles from "./style";

let { imgStyle, videoConstraints } = styles;

export default function Camera({ error }) {

    useEffect(() => {

        let constraints = {
            audio: false,
            video: { ...videoConstraints }
        }

        if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {

                    let video = document.getElementById('Flash');

                    track = stream.getVideoTracks()[0];


                    video.srcObject = stream;
                    // video.src = track;

                    btn = document.getElementById('camera');
                    btn.addEventListener('click', () => {
                        track.applyConstraints({
                            advanced: [{ torch: true }]
                        })
                    })
                })
                .catch(err => {
                    error(err);
                })
        }
        //eslint-disable-next-line
    }, [])

    return (
        <video id="camera" autoPlay style={imgStyle} />
    )
}
