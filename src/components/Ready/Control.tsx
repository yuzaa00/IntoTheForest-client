import React, { useState  }from 'react';
import { Link } from 'react-router-dom';
import './Control.css';

function Control() {

    const controlDescription = [
        { name: '점수 획득', data: ['뼈다귀'], img: 'https://elb.intotheforest.space/bone.png' },
        { name: '몬스터', data: ['Stage1: 뱀', 'Stage2: 멧돼지', 'Stage3: 늑대'], img: 'https://elb.intotheforest.space/all-monster.png' },
        { name: '장애물', data: ['독버섯 (체력 감소)'], img: 'https://elb.intotheforest.space/mushroom.png' },
        { name: '서브캐', data: ['새', '다람쥐'], img: 'https://elb.intotheforest.space/subcharacters.png' },
        { name: '포션', data: ['블루 포션 (체력 소폭 증가)', '레드 포션 (체력 증가)', '스테이지 포션 (체력 대폭 증가)'], img: 'https://elb.intotheforest.space/all-potion.png' },
        { name: '푯말', data: ['이번 스테이지는 클리어!', '다음 스테이지로 넘어가기'], img: 'https://elb.intotheforest.space/signExit.png' },
    ];

    const [controlModal, setControlModal] = useState<boolean>(false);

    return (
      <div className="control-canvas">
        <h2>
          {!controlModal? '게임 설명':'조작키 설명'}
        </h2>
        <div className="description-area">
            {!controlModal && (
              <div>
                <div className="control-description">
                  {controlDescription.map((item, idx) => {
                        return (
                            <div className="control-layout" key={idx}>
                              <img src={item.img}  height='71px'/>
                                <h3>{item.name}</h3>
                                <ul className="item-data">
                                  {item.data.map(el => {
                                    return <li>{el}</li>
                                  })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
                <p className="first-p">주 캐릭터가 몬스터 또는 장애물을 피하지 못했을 경우,</p>
                <p className="second-p">주 캐릭터의 체력이 깎이거나 서브캐릭터를 보유하고 있다면 서브캐릭터 감소</p>
            </div>
            )}
            {controlModal && (
              <div className="game-control">
                  <p>기본 <span>자동 달리기</span></p>
                  <p>점프 <span>화면 좌측 하단 점프 버튼 클릭 또는 스페이스바 클릭</span></p>
                  <p>2단 점프 <span>화면 좌측 하단 점프 버튼 두 번 클릭 또는 스페이스바 두 번 클릭</span></p>
              </div>
            )}
        </div>

        <div className="button-area">
            <button className="description control-button" onClick={() => setControlModal(!controlModal)}>
              {!controlModal? '조작키 설명' : '게임 설명'}
            </button>
            <Link to="/game">
              <button className="start control-button">
                GAME START
              </button>
            </Link>
            <Link to="/">
              <button className="backCharacter control-button">
                첫 화면으로 돌아가기
              </button>
            </Link>
         </div>
      </div>
    )
}

export default Control;