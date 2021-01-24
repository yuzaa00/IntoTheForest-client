import React, { useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import './ChoiceMode.css';
import Story from '../Ready/Story';
// import CreateRoom from './CreateRoom';
// import GoRoom from './GoRoom';

// import { useDispatch } from 'react-redux';
// import { CHOICESOLO, CHOICEMULTI } from '../redux/actions';
// import { choiceSolo, choiceMultiCreateRoom, choiceMultiGoRoom } from '../redux/actions/choiceMode';

const ChoiceMode = () => {

    // const dispatch = useDispatch();
    // const mode = useSelector((state: null) => state); // state: RootState
    const [modeClick, setModeClick] = useState('');
    const [modeHover, setModeHover] = useState('');
    const history = useHistory();

    const soloMode = ()=> {
        // const solo = dispatch(choiceSolo('solo'));
        // console.log(solo.payload);
        const text ='솔로 모드';
        setModeClick(text);
        setModeHover(text);

    }

    const multiModeCreateRoom = ()=> {
        const text ='멀티 모드: 방 만들기';
        setModeClick(text);
        setModeHover(text);
    }
    
    const multiModeGoRoom = () => {
        const text ='멀티 모드: 방에 참가하기';
        setModeClick(text);
        setModeHover(text);
    }

    return (
                <div className="game-size" onMouseOut={() => setModeHover('')}>
                    <div className="mode">
                        <div className="mode-solo">
                            <div className="mode-name">
                                솔로
                            </div>
                                    <button
                                        onClick={() => history.push('/ready/story')}
                                        onMouseOver={soloMode}
                                        className="button-design">
                                        혼자하기
                                    </button>
                        </div>
                        <div className="mode-multi">
                            <div className="mode-name">멀티</div>
                            <button
                                onClick={multiModeCreateRoom}
                                onMouseOver={multiModeCreateRoom}
                                className="multi-create button-design"
                            >
                                방 생성
                            </button>
                            <button
                                onClick={multiModeGoRoom}
                                onMouseOver={multiModeGoRoom}
                                className="multi-join button-design"
                                >
                                방 참가
                            </button>
                        </div>
                    </div>
                    <div className="text">
                        {modeHover === null?
                        <div className="choiceMode">모드를 선택하세요</div>
                        :
                        <div className="choiceMode">{modeHover}</div>
                        }
                        <Link to="/">
                            <div className="exit" onMouseOver={() => setModeHover("정말로 나가시겠습니까?")}>
                                나가기
                            </div>
                        </Link>
                    </div>
                </div>
    )
}

export default ChoiceMode;
