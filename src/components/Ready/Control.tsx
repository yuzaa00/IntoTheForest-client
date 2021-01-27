import React, { useState  }from 'react';
import { Link } from 'react-router-dom';
import './Control.css';

function Control() {

    const controlDescription = [
        { name: '점수 획득 아이템', data: ['뼈다귀'], img: '../../images/object/bone.png' },
        { name: '몬스터', data: ['뱀', '멧돼지', '늑대'], img: '../../images/character/all-monster.png' },
        { name: '장애물(체력 감소)', data: ['독버섯'], img: '../../images/object/mushroom.png' },
        { name: '서브캐', data: ['서브캐 증가'], img: '../../images/character/subcharacters.png' },
        { name: '포션', data: ['블루 포션 (체력 소폭 증가)', '레드 포션 (체력 대폭 증가)', '스테이지 포션 (스테이지 전환)'], img: '../../images/object/all-potion.png' },
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
                  {controlDescription.map(item => {
                        return (
                            <div className="control-layout">
                              <img src={item.img} />
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
                  <p>기본: 자동 달리기</p>
                  <p>점프: 화면 좌측 하단 점프 버튼 또는 스페이스바 클릭</p>
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
            <Link to="/ready/character">
              <button className="backCharacter control-button">
                뒤로가기
              </button>
            </Link>
         </div>
      </div>
    )
}

export default Control;