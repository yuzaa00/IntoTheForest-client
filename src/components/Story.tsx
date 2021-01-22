import React, { useState, useEffect } from 'react';
// import { Route, Switch } from 'react-router-dom';
import './Story.css';

const Story = () => {

    const [showButton, setShowButton] = useState<boolean>(false);
    const [showText, setShowText] = useState<boolean>(false);

    const text1 = '어쩌고 저쩌고... 뭐는 이랬고 뭐는 저랬고 우당탕탕 스펙타클한 갱얼쥐의 12시간동안 뛰댕기는 이야기...';
    const text2 = '더 많은 내용이 궁금하세요...?';

    const textArr1 = [text1, text1, text1, text1, text1, text1];
    const textArr2 = [text2, text2, text2, text2, text2, text2];

    useEffect(() => {
        setTimeout(() => {
            setShowButton(true);
        }, 4000);

    }, []);

    const moreStory = () => {
        setShowButton(false);
        setShowText(true);
    }

    return (
        // <Switch>
        //     <Route path="/story">
        //         <div>
        //             story
        //         </div>
        //     </Route>
        // </Switch>
        <div className="full-screen">
            <h2>the dog's story...⭐️</h2>
            <div className="story-area">
                <div className="storytelling">
                    <div className="storytelling-start">
                    {textArr1.map(item => <div key={item}>{item}</div>)}
                    </div>
                    {showText && (
                        <div className="storytelling-restart">
                            {textArr2.map(item => <div key={item}>{item}</div>)}
                        </div>
                    )}
                </div>
                {showButton && <button className="more" onClick={moreStory}>MORE</button>}
            </div>
        </div>
    )
}

export default Story;