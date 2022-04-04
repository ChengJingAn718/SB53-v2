import React, { useContext, useState, useEffect, useRef } from 'react';
import "../../stylesheets/styles.css";

import { UserContext } from '../../components/BaseShot';
import { prePathUrl, initialAudio, startRepeatAudio, blinkFunc, stopBlinkFunc } from '../../components/CommonFunctions';
import GamePanel from "./GamePanel"
import Review from "./Review"
import BaseImage from '../../components/BaseImage';
import loadSound from '../../utils/loadSound';
var isGameStarted = false;
let timerList = []

const eyeNumList = []
const BaseScene = React.forwardRef(({ nextFunc, _geo, _baseGeo, showMusicBtn }, ref) => {

    const audioList = useContext(UserContext)
    const [isIntroHide, setIntroHide] = useState(false)

    const [isGameFinished, setGameFinish] = useState(false)
    const [isGameRenderStart, setGameRenderStart] = useState(false)

    const [isShow, setShow] = useState(false)
    const gamePanelRef = useRef();
    const playBtnRef = useRef();

    const eyeRefList = Array.from({ length: 12 }, ref => useRef())

    useEffect(() => {

        // audioList.titleAudio = loadSound('SB_53_Audio_05');
        audioList.bodyAudio = loadSound('SB_53_Audio_06');
        audioList.subBodyAudio = loadSound('SB_53_Audio_11');

        eyeNumList[0] = blinkFunc(eyeRefList.slice(0, 3), 0, 4000)
        eyeNumList[1] = blinkFunc(eyeRefList.slice(4, 7), 1500, 3000)
        eyeNumList[2] = blinkFunc(eyeRefList.slice(8), 2000, 3500)


        // setTimeout(() => {
        //     audioList.titleAudio.play();
        // }, 1200);

        setTimeout(() => {
            setShow(true)
        }, 1000);

        setTimeout(() => {
            setGameRenderStart(true)
            playBtnRef.current.className = 'introText'

        }, 1500);

        setTimeout(() => {
            playBtnRef.current.className = 'commonButton'
            playBtnRef.current.style.pointerEvents = ''
        }, 3000);

        playBtnRef.current.className = 'hide'


        return () => {
            audioList.titleAudio.pause();
            audioList.titleAudio.currentTime = 0;


        }
    }, [])


    function finishGame() {
        gamePanelRef.current.style.display = 'none'
        setGameFinish(true)
    }

    function clickFunc() {
        showMusicBtn()

        eyeNumList.map(item => stopBlinkFunc(item))
        if (!isGameStarted)
            new initialAudio(audioList)

        if (!isGameStarted) {
            setTimeout(() => {
                isGameStarted = true;
            }, 500);
        }

        audioList.titleAudio.pause();
        audioList.titleAudio.currentTime = 0;


        gamePanelRef.current.style.display = 'inline-block'
        gamePanelRef.current.style.transition = '1s'
        gamePanelRef.current.style.opacity = 1

        setTimeout(() => {
            audioList.backAudio.play();
        }, 200);

        setTimeout(() => {
            timerList[0] = setTimeout(() => {
                audioList.bodyAudio.play();
                timerList[1] = setTimeout(() => {
                    audioList.subBodyAudio.play();
                    startRepeatAudio();
                }, audioList.bodyAudio.duration * 1000 + 1000);
            }, 1000);
            setIntroHide(true)
        }, 1000);
    }

    function stopSound() {

        timerList.map(timer => {
            clearTimeout(timer)
        })

        audioList.bodyAudio.pause();
        audioList.subBodyAudio.pause();
    }



    return (
        <div>
            {!isIntroHide &&
                <div >

                    <div
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.2 + "px",
                            left: _baseGeo.width * 0.4 + _baseGeo.left + "px"
                            , bottom: _baseGeo.height * 0.1 + _baseGeo.bottom + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + 'images/SB_53_BG-Intro/Game2/SB_53_Intro_game2_squirrel_03.svg'}
                        />
                        {
                            Array.from(Array(4).keys()).map(value =>
                                <BaseImage
                                    ref={eyeRefList[value]}
                                    scale={0.25}
                                    posInfo={{
                                        l: 0.1090,
                                        b: 0.34
                                    }}
                                    className={'hideObject'}
                                    url={'animations/SB53_intro_02 _middle_eyeblink_0' + (4 - value) + '.svg'}
                                />)
                        }
                    </div>
                    {/* <div
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.6 + "px",
                            left: _baseGeo.width * 0.15 + _baseGeo.left + "px"
                            , bottom: _baseGeo.height * 0.2 + _baseGeo.bottom + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + 'images/SB_53_BG-Intro/Game2/SB_53_Intro_game2_nuts_01 .svg'}
                        />
                    </div> */}

                    <div
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.15 + "px",
                            left: _baseGeo.width * 0.05 + _baseGeo.left + "px"
                            , bottom: _baseGeo.height * 0.3 + _baseGeo.bottom + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + 'images/SB_53_BG-Intro/Game2/SB_53_Intro_game2_squirrel_02.svg'}
                        />

                        {
                            Array.from(Array(4).keys()).map(value =>
                                <BaseImage
                                    ref={eyeRefList[4 + value]}
                                    scale={0.5}
                                    posInfo={{
                                        l: 0.495,
                                        b: 0.44
                                    }}
                                    className={'hideObject'}
                                    url={'animations/squirrel_eye0' + (value + 1) + '.svg'}
                                />)
                        }
                    </div>



                    <div
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.15 + "px",
                            right: _baseGeo.width * 0.05 + _baseGeo.left + "px"
                            , bottom: _baseGeo.height * 0.3 + _baseGeo.bottom + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + 'images/SB_53_BG-Intro/Game2/SB_53_Intro_game2_squirrel_04.svg'}
                        />
                        {
                            Array.from(Array(4).keys()).map(value =>
                                <BaseImage
                                    ref={eyeRefList[8 + value]}
                                    scale={0.65}
                                    posInfo={{
                                        l: -0.1050,
                                        b: 0.39
                                    }}
                                    className={'hideObject'}
                                    url={'animations/SB53_intro_02 _right_01_eyeblink_0' + (4 - value) + '.svg'}
                                />)
                        }


                    </div>


                    {isShow &&
                        <div
                            className='introText'
                            style={{
                                position: "fixed", width: _baseGeo.width * 0.45 + "px",
                                left: _baseGeo.width * 0.25 + _baseGeo.left + "px"
                                , bottom: _baseGeo.height * 0.45 + _baseGeo.bottom + "px",
                            }}>
                            <img draggable={false} width={"100%"}
                                src={prePathUrl() + 'images/SB_53_BG-Intro/Game2/SB_53_Intro_game2_name_01 .svg'}
                            />
                        </div>
                    }

                    <div
                        className="hide"
                        ref={playBtnRef}
                        onClick={clickFunc}
                        style={{
                            position: "fixed", width: _geo.width * 0.1 + "px",
                            left: _geo.width * 0.42 + _geo.left + "px"
                            , top: _geo.height * 0.55 + _geo.top + "px",
                            cursor: "pointer",
                            pointerEvents: 'none'
                        }}>
                        <img draggable={false}
                            width={"100%"}
                            src={prePathUrl() + 'images/Buttons/Play_blue.svg'}
                        />
                    </div>


                </div>
            }
            {
                isGameRenderStart &&
                < div
                    ref={gamePanelRef}
                    style={{ display: 'none', opacity: 0 }}
                >
                    <GamePanel stopSound={stopSound} finishGame={finishGame} _baseGeo={_baseGeo} _geo={_geo} />
                </div>
            }

            {
                isGameFinished &&
                <Review nextFunc={nextFunc} _baseGeo={_baseGeo} _geo={_geo} />
            }
        </div >
    );
});

export default BaseScene;
