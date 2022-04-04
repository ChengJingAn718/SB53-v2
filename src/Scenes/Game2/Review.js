import React, { useEffect, useContext, useRef, useState } from 'react';
import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';

import { UserContext } from '../../components/BaseShot';
import { prePathUrl, generateStandardNum } from "../../components/CommonFunctions"

let timerList = []
//-0.5,1.25,5,-5
let randomList = []

export default function Review1({ _baseGeo, nextFunc }) {
    const audioList = useContext(UserContext)
    const starBaseList = Array.from({ length: 10 }, ref => useRef())
    const baseRef = useRef()


    useEffect(
        () => {

            audioList.bodyAudio.src = "./sounds/nowsay.mp3"
            setTimeout(() => {
                audioList.bodyAudio.play();
                setTimeout(() => {
                    starBaseList.map((star, index) => {
                        setTimeout(() => {
                            star.current.style.transition = '0.5s'
                            star.current.style.transform = 'scale(1.4)'
                            if (index == 9)
                                setTimeout(() => {
                                    nextFunc()
                                }, 2500);
                        }, 1500 * index);
                    });
                }, audioList.bodyAudio.duration * 1000 + 500)
            }, 2000);


            return () => {
                randomList = []
            }
        }, []
    )

    return (
        <div ref={baseRef}
            className="aniObject"  >
            <div
                style={{
                    position: "fixed", width: _baseGeo.width + "px",
                    height: _baseGeo.height + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.0 + "px",
                    bottom: _baseGeo.bottom + _baseGeo.height * 0.0 + "px",
                }}>


                {
                    Array.from(Array(10).keys()).map(value =>
                        <div
                            ref={starBaseList[value]}
                            style={{
                                position: 'absolute',
                                width: '17%',
                                height: '17%',
                                top: (0.23 + 0.3 * parseInt((value / 5))) * 100 + '%',
                                left: (0.1 + (value % 5) * 0.15) * 100 + '%',

                            }}>
                            < BaseImage
                                url={'SB_53_Prop-Interactive/SB_53_PI_game2_nut_01.svg'}
                            />
                            < BaseImage
                                scale={0.27}
                                posInfo={{ l: 0.32, t: 0.65 }}
                                url={'SB_53_Text-Interactive/SB_53_TI_Game2_' +
                                    (value < 9 ? '0' : '') + generateStandardNum(value * 5 + 55) + '.svg'}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );

}
