import React, { useEffect, useContext, useRef, useState } from 'react';
import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';

import { UserContext } from '../../components/BaseShot';
import {
    prePathUrl, generateStandardNum, setRepeatAudio,
    startRepeatAudio, stopRepeatAudio, blinkFunc, stopBlinkFunc
} from "../../components/CommonFunctions"

import Lottie from "react-lottie-segments";
import loadAnimation from '../../utils/loadAnimation'

var isGameStarted = false;

let animationList = []
new loadAnimation('main/Chick_1.json').then(result => {
    animationList[1] = result;
}, () => { });

new loadAnimation('main/Chicken1_1.json').then(result => {
    animationList[2] = result;
}, () => { });

new loadAnimation('main/Chicken2_1.json').then(result => {
    animationList[0] = result;
}, () => { });

let timerList = []
//3.5,-3.5,
// 5,-5

let isGamenutted = false;
let currentNum = 0;
let stepNumRange = 5;
let currentStep = 0
let movingSceneNum = 0;
let eyeNumList = []

const eyePosList = [
    { x: 0.139, y: 0.575 },
    { x: 1.0495, y: .916 },
    { x: 1.9508, y: 1.3205 },
    { x: 3.0145, y: 1.744, s: 0.08 },
    { x: 4.024, y: 2.445, s: 0.08 },
]

export default function Scene2({ finishGame, _baseGeo, _geo, stopSound }) {
    const audioList = useContext(UserContext)

    const heightList = [
        0, -1, -2, -3, -2, -1, 0, 1, 2, 1,
        0, -1, -2, -1, 0, 1, 2, 3, 3, 4,
        0, -1, -2, -3, -2, -1, 0, 1, 1, 2,
        -3, -2, 0, 1, 2, 3, 4, 6, 8, 9,
        0, -1, -2, -3, -2, -1, 0, -1, 0, 0,
    ]


    const treeAreaList = [
        0.0,
        0.29,
        0.41,
        1.05,
        1.39,
    ]

    const heightTreeList = [
        0,
        0.34,
        0.75,

        1.25,
        1.88
    ]
    const movingSceneList = [
        0,
        0.45,
        0.9,
        1.3,
        1.83,
        2.3,
        2.87,
        3.4,
        3.85,
        4.1,
        3.85,
    ]

    const heightStep = 0.25
    const baseRef = useRef()
    const backRef = useRef()

    const greennut = useRef();
    const rednut = useRef();
    const lastHen = useRef();


    const targetRange = 0.062
    const stepRange = 0.03


    const layoutnuttPos = { x: -1.98, y: -0.8 }
    const translatenuttPos = { x: 1.98, y: -0.8 }

    const characterList = Array.from({ length: 5 }, ref => useRef())
    const nestList = Array.from({ length: 10 }, ref => useRef())
    const nutList = Array.from({ length: 100 }, ref => useRef())
    const nutBaseList = Array.from({ length: 50 }, ref => useRef())
    const numberList = Array.from({ length: 100 }, ref => useRef())
    const starRefList = Array.from({ length: 5 }, ref => useRef())

    const eyeRefList = Array.from({ length: 4 }, ref => useRef())


    const sparkBaseRef = useRef()
    const sparkRefList = [useRef(), useRef(), useRef()]

    // width : + -> -
    // height : - ->+


    useEffect(
        () => {
            isGamenutted = true;

            setRepeatAudio(audioList.repeatAudio)

            greennut.current.style.opacity = 0
            rednut.current.style.opacity = 0

            lastHen.current.className = 'hideObject'

            nestList.map((feed, index) => {
                if (index > 0)
                    feed.current.setClass('hideObject')
            })

            characterList.map((character, index) => {
                character.current.setClass('hideObject')
            })

            backRef.current.style.transition = '0s'
            backRef.current.style.transform = 'translate(' + (_baseGeo.width * (translatenuttPos.x -
                movingSceneList[movingSceneNum])) + 'px, '
                + _baseGeo.height * (translatenuttPos.y + heightStep * movingSceneNum) + 'px)'


            eyeNumList[0] = blinkFunc(eyeRefList, 0, 3000)

            eyeRefList.map(eye => eye.current.setPosInfo({
                s: eyePosList[movingSceneNum / 2].s ? eyePosList[movingSceneNum / 2].s : 0.066,
                b: layoutnuttPos.y + eyePosList[movingSceneNum / 2].y,
                l: layoutnuttPos.x + eyePosList[movingSceneNum / 2].x
            }))

            return () => {

                stopBlinkFunc(eyeNumList[0])

                isGamenutted = false;
                currentNum = 0;
                currentStep = 0
                movingSceneNum = 0;

                audioList.clapAudio.pause();
                audioList.clapAudio.currentTime = 0;
            }
        }, []
    )

    function returnOption(index) {
        return {
            loop: true,
            autoplay: true,
            animationData: animationList[index],
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
    }

    if (isGamenutted)
        reRenderingFunc()

    function reRenderingFunc() {
        // if (movingSceneNum > 0 && movingSceneNum % 2 != 0) {
        //     henAnimation.current.style.left = (layoutnuttPos.x + 0.06 + henAniPosList[(movingSceneNum - 1) / 2].x) * 100 + '%'
        //     henAnimation.current.style.bottom = (layoutnuttPos.y + 0.22 + henAniPosList[(movingSceneNum - 1) / 2].y) * 100 + '%'
        // }

        backRef.current.style.transition = '0s'

        backRef.current.style.transform = 'translate(' + (_baseGeo.width * (translatenuttPos.x -
            movingSceneList[movingSceneNum])) + 'px, '
            + _baseGeo.height * (translatenuttPos.y + heightStep * movingSceneNum) + 'px)'


        // if (currentNum % 10 == 0) {
        //     characterList[0].current.setPosInfo({
        //         l: layoutnuttPos.x + 0.06 + targetRange * currentNum + currentStep * treeAreaLength,
        //         b: layoutnuttPos.y + 0.22
        //     })
        // }
        // else {
        //     characterList[0].current.setPosInfo({
        //         l: layoutnuttPos.x + 0.06 + targetRange * currentNum + currentStep * treeAreaLength,
        //         b: layoutnuttPos.y + 0.22 + stepRange * heightList[currentNum - 1]
        //     })
        // }


    }

    function playEatingAni() {
        characterList[0].current.setClass('hideObject')

        nestList[currentStep * 2 - 1].current.setClass('showObject')

        setTimeout(() => {
            nestList[currentStep * 2 - 1].current.setClass('hideObject')
            setTimeout(() => {
                nestList[currentStep * 2].current.setClass('showObject')
            }, 300);
        }, 300);

        setTimeout(() => {
            movingSceneNum++;

            setTimeout(() => {
                baseRef.current.style.pointerEvents = ''
            }, 2000);

            characterList[0].current.setPosInfo({
                b: layoutnuttPos.y + 0.52 + heightList[currentNum] * stepRange +
                    heightTreeList[parseInt((currentNum) / 10)],

                l: layoutnuttPos.x + 0.11 + treeAreaList[parseInt((currentNum) / 10)] +
                    (currentNum) * (targetRange + ((currentNum) > 19 && (currentNum) < 30 ? 0.0085 : 0))
            })

            backRef.current.style.transition = '2s'
            backRef.current.style.transform = 'translate(' + (_baseGeo.width * (translatenuttPos.x -
                movingSceneList[movingSceneNum])) + 'px, '
                + _baseGeo.height * (translatenuttPos.y + heightStep * movingSceneNum) + 'px)'

        }, 1000);

    }

    function clickFunc(num) {

        stopRepeatAudio();
        stopBlinkFunc(eyeNumList[0])

        if (currentNum == 0)
            stopSound()
        if (num >= currentNum) {
            let currentnut = nutBaseList[num]
            currentnut.current.style.transition = '0.1s'
            currentnut.current.style.transform = 'scale(0.95)'
            setTimeout(() => {
                currentnut.current.style.transform = 'scale(1)'
            }, 100);

            rednut.current.style.opacity = 0
            greennut.current.style.opacity = 0



            if (num + 1 == currentNum + stepNumRange) {

                audioList.jumpAudio.currentTime = 0
                audioList.jumpAudio.play();

                audioList.buzzAudio.pause();
                audioList.tingAudio.currentTime = 0;
                audioList.tingAudio.play();

                baseRef.current.style.pointerEvents = 'none'

                for (let i = 0; i < 5; i++)
                    nutBaseList[currentNum + i].current.style.cursor = 'default'

                currentNum += stepNumRange;

                if (currentNum % 10 != 0) {
                    nestList[currentStep * 2].current.setClass('hideObject')
                    characterList[0].current.setClass('showObject')
                }


                showButtonAni(greennut, num)

                setTimeout(() => {
                    let calcNum = currentNum - stepNumRange;

                    let startPos = layoutnuttPos.y + 0.52 + heightList[calcNum] * stepRange +
                        heightTreeList[parseInt((calcNum) / 10)]

                    if ((calcNum - 1) % 10 == 0)
                        startPos += 0.2

                    let endPos = layoutnuttPos.y + 0.52 + heightList[calcNum + 4] * stepRange +
                        heightTreeList[parseInt((calcNum + 4) / 10)]


                    for (let i = 1; i < 5; i++) {
                        characterList[i].current.setPosInfo({
                            b: startPos + (endPos - startPos) / 5 * i + [0.09, 0.1, 0.13, 0.09][i - 1],

                            l: layoutnuttPos.x + 0.05 + treeAreaList[parseInt(calcNum / 10)] + 0.07 * i +
                                (calcNum) * (targetRange + (calcNum > 19 && calcNum < 30 ? 0.0085 : 0))
                        })
                    }

                    let num = 0;

                    let interval = setInterval(() => {
                        characterList[num].current.setClass('hideObject')

                        if (num == 0) {
                            characterList[0].current.setPosInfo({
                                b: layoutnuttPos.y + 0.52 + heightList[currentNum - 1] * stepRange +
                                    heightTreeList[parseInt((currentNum - 1) / 10)],

                                l: layoutnuttPos.x + 0.11 + treeAreaList[parseInt((currentNum - 1) / 10)] +
                                    (currentNum - 1) * (targetRange + ((currentNum - 1) > 19 && (currentNum - 1) < 30 ? 0.0085 : 0))
                            })

                            if (currentNum % 10 != 0)

                                eyeRefList.map(eye => eye.current.setPosInfo({
                                    s: 0.066,
                                    b: layoutnuttPos.y + 0.552 + heightList[currentNum - 1] * stepRange +
                                        heightTreeList[parseInt((currentNum - 1) / 10)],

                                    l: layoutnuttPos.x + 0.209 + treeAreaList[parseInt((currentNum - 1) / 10)] +
                                        (currentNum - 1) * (targetRange + ((currentNum - 1) > 19 && (currentNum - 1) < 30 ? 0.0085 : 0))
                                })
                                )

                        }


                        if (num == 4) {
                            clearInterval(interval)
                            characterList[0].current.setClass('showObject')
                            if (currentNum % 10 != 0)
                                eyeNumList[0] = blinkFunc(eyeRefList, 0, 3000)
                        }
                        else {
                            num++
                            characterList[num].current.setClass('showObject')

                        }
                    }, 150);

                    sparkBaseRef.current.style.left = (layoutnuttPos.x + 0.17 + treeAreaList[parseInt((currentNum - 1) / 10)] +
                        (currentNum - 1) * (targetRange + ((currentNum - 1) > 19 && (currentNum - 1) < 30 ? 0.0085 : 0))) * 100 + "%"
                    sparkBaseRef.current.style.bottom = (layoutnuttPos.y + 0.54 + heightList[currentNum - 1] * stepRange +
                        heightTreeList[parseInt((currentNum - 1) / 10)]) * 100 + "%"

                    setTimeout(() => {
                        let num = 0;
                        sparkRefList[0].current.setClass('showObject')
                        let interval = setInterval(() => {
                            sparkRefList[num].current.setClass('hideObject')
                            if (num < 2) {
                                num++
                                sparkRefList[num].current.setClass('showObject')
                            }
                            else {
                                clearInterval(interval)
                            }
                        }, 100);
                    }, 600);

                    setTimeout(() => {

                        for (let i = currentNum - 5; i < currentNum; i++) {
                            if ((i + 1) % 5 != 0) {
                                nutList[i].current.setUrl('SB_53_Prop-Interactive/SB_53_PI_game2_nut_inactive_01.svg')
                                numberList[i].current.setStyle({ opacity: 0.4 })
                            }
                            nutBaseList[i].current.style.cursor = 'default'
                        }

                        if (currentNum % 10 == 0) {

                            starRefList[currentStep].current.setClass('hide')
                            currentStep++;
                            movingSceneNum++;

                            if (currentStep < 5) {
                                setTimeout(() => {
                                    // playEatingAni();
                                    characterList[0].current.setPosInfo({
                                        b: layoutnuttPos.y + 0.58 + heightList[currentNum] * stepRange +
                                            heightTreeList[parseInt((currentNum) / 10)],

                                        l: layoutnuttPos.x + 0.11 + treeAreaList[parseInt((currentNum) / 10)] +
                                            (currentNum) * (targetRange + ((currentNum) > 19 && (currentNum) < 30 ? 0.0085 : 0))
                                    })
                                    characterList[0].current.setClass('hideObject')

                                    greennut.current.style.opacity = 0
                                    startRepeatAudio();

                                }, 2000);

                                movingSceneNum++

                                baseRef.current.style.pointerEvents = 'none'
                                if (currentStep < 5) {
                                    backRef.current.style.transition = '2s'
                                    backRef.current.style.transform = 'translate(' + (_baseGeo.width * (translatenuttPos.x -
                                        movingSceneList[movingSceneNum])) + 'px, '
                                        + _baseGeo.height * (translatenuttPos.y + heightStep * movingSceneNum) + 'px)'


                                    eyeRefList.map(eye => eye.current.setPosInfo({
                                        s: eyePosList[movingSceneNum / 2].s ? eyePosList[movingSceneNum / 2].s : 0.066,
                                        b: layoutnuttPos.y + eyePosList[movingSceneNum / 2].y,
                                        l: layoutnuttPos.x + eyePosList[movingSceneNum / 2].x
                                    }))

                                    setTimeout(() => {
                                        nestList[currentStep * 2].current.setClass('showObject')
                                        baseRef.current.style.pointerEvents = ''
                                        eyeNumList[0] = blinkFunc(eyeRefList, 0, 3000)
                                        audioList.successAudio.play();
                                    }, 2500);
                                }
                            }

                            else {
                                isGamenutted = false;

                                characterList[0].current.setClass('hideObject')
                                nestList[9].current.setClass('showObject')
                                setTimeout(() => {
                                    nestList[9].current.setClass('hideObject')
                                }, 300);
                                setTimeout(() => {
                                    lastHen.current.className = 'showObject'
                                }, 2000);

                                audioList.clapAudio.play();

                                setTimeout(() => {
                                    baseRef.current.style.transition = '0.7s'
                                    baseRef.current.style.opacity = 0
                                    setTimeout(() => {
                                        finishGame();
                                    }, 700);

                                }, 5000);
                            }
                        }

                        else {
                            for (let i = currentNum - 2; i < currentNum; i++) {
                                nutBaseList[i].current.style.cursor = 'default'
                            }
                            baseRef.current.style.pointerEvents = ''
                            startRepeatAudio();
                        }


                    }, 1000);
                }, 200);
            }
            else {

                audioList.tingAudio.pause();

                audioList.buzzAudio.currentTime = 0;
                audioList.buzzAudio.play();

                startRepeatAudio();
                showButtonAni(rednut, num)
            }
        }
    }

    function showButtonAni(obj, num) {

        obj.current.style.transition = '0.0s'
        obj.current.style.opacity = '0'
        obj.current.style.bottom = (layoutnuttPos.y + 0.49 + heightList[num] * stepRange +
            heightTreeList[parseInt(num / 10)]) * 100 + '%'

        if (obj == rednut)
            obj.current.style.left = (layoutnuttPos.x + 0.1262 +
                treeAreaList[parseInt(num / 10)] +
                num * (targetRange + (num > 19 && num < 30 ? 0.0085 : 0))) * 100 + '%'
        else
            obj.current.style.left = (layoutnuttPos.x + 0.13 +
                treeAreaList[parseInt(num / 10)] +
                num * (targetRange + (num > 19 && num < 30 ? 0.0085 : 0))) * 100 + '%'

        setTimeout(() => {
            obj.current.style.transition = '0.5s'
            obj.current.style.opacity = 1
        }, 100);
    }



    return (
        <div ref={baseRef}
            className="aniObject"  >
            <div
                ref={backRef}
                style={{
                    position: "fixed", width: _baseGeo.width + "px",
                    height: _baseGeo.height + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.0 + "px",
                    bottom: _baseGeo.bottom + _baseGeo.height * 0.0 + "px",
                }}>
                <img
                    style={{
                        width: '100%',
                        left: '0%', bottom: '0%',
                        transform: 'scale(5)'
                    }}
                    src={prePathUrl() + "images/SB_53_BG/SB53_Squirrel_BG-01.svg"}
                />

                {
                    Array.from(Array(50).keys()).map(value =>
                        <div
                            ref={nutBaseList[value]}
                            onClick={() => { clickFunc(value) }}

                            style={{
                                position: 'absolute',
                                width: '7.5%',
                                height: '13%',
                                cursor: 'pointer',
                                // overflow: 'hidden',
                                // background:'black',
                                bottom: (layoutnuttPos.y + 0.45 + heightList[value] * stepRange +
                                    heightTreeList[parseInt(value / 10)]) * 100 + '%',
                                left: (layoutnuttPos.x + 0.16 +
                                    treeAreaList[parseInt(value / 10)] +
                                    value * (targetRange + (value > 19 && value < 30 ? 0.0085 : 0))) * 100 + '%'
                            }}>

                            < BaseImage
                                scale={2}
                                posInfo={{ t: -0.4, l: -0.4 }}
                                ref={nutList[value]}
                                url={'SB_53_Prop-Interactive/SB_53_PI_game2_nut_01.svg'}
                            />
                            < BaseImage
                                ref={numberList[value]}
                                scale={0.6}
                                posInfo={{ l: 0.2, t: 0.3 }}
                                url={'SB_53_Text-Interactive/SB_53_TI_Game2_' + (value < 49 ? '0' : '') + generateStandardNum(value + 51) + '.svg'}
                            />
                        </div>
                    )
                }


                <div
                    ref={sparkBaseRef}
                    style={{
                        position: 'absolute',
                        pointerEvents: 'none',
                        width: '5%',
                        height: '5%',
                        left: (layoutnuttPos.x + 0.132) * 100 + '%',
                        bottom: (layoutnuttPos.y + 0.489) * 100 + '%'
                    }}
                >
                    {
                        Array.from(Array(3).keys()).map(value =>
                            <BaseImage
                                ref={sparkRefList[value]}
                                className='hideObject'
                                style={{ transform: 'scale(' + [1.5, 2, 3][value] + ')' }}
                                url={'magic/sb_52_magic_wand_sparkels_' + (1 + value) + '.svg'}
                            />
                        )
                    }
                </div>

                {/* foods 1*/}

                <BaseImage
                    scale={0.13}
                    ref={nestList[0]}
                    posInfo={{
                        l: layoutnuttPos.x + 0.085,
                        b: layoutnuttPos.y + 0.47
                    }}

                    url={'animations/SB53-56.svg'}
                />





                <BaseImage
                    scale={0.13}
                    ref={nestList[1]}
                    posInfo={{
                        l: layoutnuttPos.x + 0.74,
                        b: layoutnuttPos.y + 0.46
                    }}
                    url={'animations/SB53-55.svg'}
                />


                <BaseImage
                    scale={0.13}
                    ref={nestList[2]}
                    posInfo={{
                        l: layoutnuttPos.x + 0.995,
                        b: layoutnuttPos.y + 0.81
                    }}
                    url={'animations/SB53-56.svg'}
                />

                {/* foods 2*/}

                <BaseImage
                    scale={0.15}
                    ref={nestList[3]}
                    posInfo={{
                        l: layoutnuttPos.x + 1.65,
                        b: layoutnuttPos.y + 0.94
                    }}
                    url={'SB_53_Character_Animation/SB53_Sqiurrel_01.svg'}
                />

                <BaseImage
                    scale={0.13}
                    ref={nestList[4]}
                    posInfo={{
                        l: layoutnuttPos.x + 1.897,
                        b: layoutnuttPos.y + 1.215
                    }}
                    url={'animations/SB53-56.svg'}
                />



                {/* foods 3*/}

                <BaseImage
                    scale={0.17}
                    ref={nestList[5]}
                    posInfo={{
                        l: layoutnuttPos.x + 2.625,
                        b: layoutnuttPos.y + 1.23
                    }}
                    url={'SB_53_Character_Animation/SB53_Sqiurrel_01.svg'}
                />

                <BaseImage
                    scale={0.17}
                    ref={nestList[6]}
                    posInfo={{
                        l: layoutnuttPos.x + 2.94,
                        b: layoutnuttPos.y + 1.6
                    }}
                    url={'animations/SB53-56.svg'}
                />


                {/* foods 4*/}

                <BaseImage
                    scale={0.17}
                    ref={nestList[7]}
                    posInfo={{
                        l: layoutnuttPos.x + 3.65,
                        b: layoutnuttPos.y + 2
                    }}
                    url={'SB_53_Character_Animation/SB53_Sqiurrel_01.svg'}
                />

                <BaseImage
                    scale={0.17}
                    ref={nestList[8]}
                    posInfo={{
                        l: layoutnuttPos.x + 3.95,
                        b: layoutnuttPos.y + 2.3
                    }}
                    url={'animations/SB53-56.svg'}
                />




                <BaseImage
                    scale={0.17}
                    ref={nestList[9]}
                    posInfo={{
                        l: layoutnuttPos.x + 4.585,
                        b: layoutnuttPos.y + 2.3
                    }}
                    url={'SB_53_Character_Animation/SB53_Sqiurrel_01.svg'}
                />


                <div
                    ref={lastHen}
                    style={{
                        position: "absolute", width: '20%',
                        left: (layoutnuttPos.x + 0.901 + 3.41) * 100 + '%'
                        , bottom: (layoutnuttPos.y + 0.27) * 100 + '%',
                    }}>
                    <Lottie autoplay loop options={returnOption(0)}
                        mouseDown={false}
                        isClickToPauseDisabled={true}
                        speed={0.56}
                    />
                </div>


                <div
                    ref={greennut}
                    style={{
                        position: 'absolute',
                        width: '14.5%',
                        height: '14.5%',
                        pointerEvents: 'none',
                        left: (layoutnuttPos.x + 0.13) * 100 + '%',
                        bottom: (layoutnuttPos.y + 0.49) * 100 + '%'
                    }}>
                    < BaseImage
                        url={'SB_53_Prop-Interactive/SB_53_PI_game2_nut_green_HL_01.svg'}
                    />
                </div>

                <div
                    ref={rednut}
                    style={{
                        position: 'absolute',
                        width: '14.5%',
                        height: '14.5%',
                        pointerEvents: 'none',
                        left: (layoutnuttPos.x + 0.1275) * 100 + '%',
                        bottom: (layoutnuttPos.y + 0.49) * 100 + '%'
                    }}>
                    < BaseImage
                        url={'SB_53_Prop-Interactive/SB_53_PI_game2_nut_red_HL_01.svg'}
                    />
                </div>


                {Array.from(Array(5).keys()).map(value =>
                    <BaseImage
                        scale={0.16}
                        ref={characterList[value]}
                        posInfo={{
                            l: layoutnuttPos.x + [0.07, 0.17, 0.29][value],
                            b: layoutnuttPos.y + [0.55, 0.6, 0.55][value]
                        }}
                        style={{ transform: 'scale(1.9) ' }}
                        url={'animations/SB53_Squirrel_pose_0' + (value + 1) + '.svg'}
                    />
                )}

                {
                    Array.from(Array(4).keys()).map(value =>
                        <BaseImage
                            ref={eyeRefList[value]}
                            scale={0.066}
                            posInfo={{
                                l: layoutnuttPos.x + 0.169,
                                b: layoutnuttPos.y + 0.5835
                            }}
                            className={'hideObject'}
                            url={'animations/squirrel_eye0' + (value + 1) + '.svg'}
                        />)
                }

            </div>

            <div
                style={{
                    position: "fixed", width: _geo.width * 0.25 + "px",
                    right: _geo.width * (0.01) + 'px'
                    , top: 0.04 * _geo.height + 'px'
                }}>
                <BaseImage
                    url={'SB_53_Icons/SB_53_ICON_03.svg'}
                />
            </div>

            {
                Array.from(Array(5).keys()).map(value =>
                    <div
                        style={{
                            position: "fixed", width: _geo.width * 0.042 + "px",
                            right: _geo.width * (value * 0.042 + 0.03) + 'px'
                            , top: 0.055 * _geo.height + 'px'
                        }}>
                        <BaseImage
                            url={'SB_53_Icons/ICON_01.png'}
                        />
                        <BaseImage
                            ref={starRefList[4 - value]}
                            url={'SB_53_Icons/ICON_02.png'}
                        />
                    </div>)
            }

        </div >
    );

}
