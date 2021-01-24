import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './Story.css';
import ChoiceCharacter from './ChoiceCharacter';

const Story = () => {

    const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
    const [showSkipButton, setShowSkipButton] = useState<boolean>(false);
    const [showText, setShowText] = useState<boolean>(false);
    const [skipPage, setSkipPage] = useState<boolean>(false);

    const text1:string = '어쩌고 저쩌고... 뭐는 이랬고 뭐는 저랬고 우당탕탕 스펙타클한 갱얼쥐의 12시간동안 뛰댕기는 이야기...';
    const text2:string = '그리고 뭐 이렇게 됐다가 저렇게 됐다가 왔다갔다 하고... 갱얼쥐는 숲 속에서 몬스터도 만나고 칭구들도 만날 수 있으니 도전해보세요!';

    const textArr1:string[] = [text1, text1, text1, text1, text1, text1];
    const textArr2:string[] = [text2, text2, text2, text2, text2, text2];

    useEffect(():void => {
        setTimeout(():void => {
            setShowMoreButton(true);
            setShowSkipButton(true);
        }, 3000);
    }, []);

    // 스토리 더보기
    const moreStory = ():void => {
        setShowMoreButton(false);
        setShowText(true);
    }

    // 페이지 전환 (캐릭터 선택창)
    // const skipStory = ():void => {
    //     setSkipPage(true);
    // }

    return (
     
                <div className="full-screen">
                    <h2>게임 스토리 설명</h2>
                    <div className="story-area">
                        <div className="only-hidden">
                            <div className="storytelling">
                                <div className="storytelling-start">
                                    {!showText && textArr1.map(item => <div key={item}>{item}</div>)}
                                </div>
                                {showText && (
                                    <div className="storytelling-restart">
                                        {textArr1.map(item => <div key={item}>{item}</div>)} {/* 첫 번째 텍스트 */}
                                        <br/>
                                        <br/>
                                        {textArr2.map(item => <div key={item}>{item}</div>)}  {/* 두 번째 텍스트 */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="moreOrSkip">
                        {showMoreButton && <button className="more" onClick={moreStory}>더보기</button>}
                        {showSkipButton && <Link to="/ready/character"><button className="skip">SKIP</button></Link>}
                    </div>
                </div>
      
      
       
    )
}

export default Story;