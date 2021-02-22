import { getByDisplayValue } from '@testing-library/react';
import React, { useState  }from 'react';
import { Link } from 'react-router-dom';
import './Control.css';
require('dotenv').config()

interface HandleInfo {
  handleInfo: Function
}

function Control({ handleInfo }: HandleInfo) {

    const controlDescription = [
        { name: '뼈다귀', data: ['뼈다귀를 획득하면', '점수가 올라가요!'], img: `${process.env.REACT_APP_URL}/bone.png` },
        { name: '몬스터', data: ['스테이지 1: 뱀', '스테이지 2: 뱀, 멧돼지', '스테이지 3: 뱀, 멧돼지, 늑대'], img: `${process.env.REACT_APP_URL}/all-monster.png` },
        { name: '장애물', data: ['독버섯을 먹게 되면', '체력이 감소해요!'], img: `${process.env.REACT_APP_URL}/mushroom.png` },
        { name: '펫', data: ['새・다람쥐는 몬스터의 공격을', '대신 맞아줘요!'], img: `${process.env.REACT_APP_URL}/subcharacters.png` },
        { name: '포션', data: ['블루 포션: 체력 소폭 증가', '레드 포션: 체력 증가', '스테이지 포션: 체력 대폭 증가'], img: `${process.env.REACT_APP_URL}/all-potion.png` },
        { name: '푯말', data: ['이번 스테이지는 클리어!', '다음 스테이지로 넘어가기'], img: `${process.env.REACT_APP_URL}/signExit.png` },
    ];

    const [controlModal, setControlModal] = useState<boolean>(false);

    return (
      <div className="control-canvas" style={{ 
        backgroundImage: `url(${process.env.REACT_APP_URL 
            + "/nightDark.png"})`, backgroundRepeat: "no-repeat"
      }}>
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
                                  {item.data.map((el, index) => {
                                    return <li key={index}>{el}</li>
                                  })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
                <div className="add-description">
                  <p>
                    스테이지를 통과할 때마다 <br/> <span className="orange">이전 스테이지의 몬스터와 새로운 몬스터가 함께 출몰해요!</span> <br/>
                    (예를 들어 스테이지 2에서는 스테이지 1에서 <br/> 출몰했던 뱀과 새로운 몬스터인 멧돼지가 나와요)
                  </p>
                  <p>
                  <span className="orange">시간이 흐를 수록 체력이 감소해요.</span> <br/>
                    그러니 체력 관리와 동시에 스테이지를 빠르게 통과해야겠죠? <br/>
                    (체력바는 게임 화면 상단 중앙에서 볼 수 있어요!)
                  </p>
                  <p>
                  <span className="orange">스테이지를 통과하면 미니게임을 할 수 있어요!</span> <br/>
                    첫 번째 스테이지 통과: 카드 뒤집기 게임 <br/>
                    두 번째 스테이지 통과: 두더지 잡기 게임 <br/>
                    추가 점수 획득 기회가 있으니 <br/>
                    뼈다귀를 많이 얻지 못했다면 미니게임을 노려보세요! <br/>
                  </p>
                  <p>
                    펫을 얻으면 획득한 펫의 개수가 <span className="orange">랭킹에 반영</span>되고, <br/>
                    만약 몬스터를 피하지 못했을 경우 펫이 <span className="orange">대신 맞아주는 역할</span>을 해요! <br/>
                    (펫이 없다면 <span className="orange">체력이 감소</span>해요)
                  </p>
                  <p>
                    화면 우측 상단에 <span className="orange">일시정지 버튼</span>이 있어요!<br />
                    게임 일시 중단 또는 효과음, 배경음을 끄려면 일시정지 버튼을 눌러주세요.
                  </p>
                </div>
            </div>
            )}
            {controlModal && (
              <div className="game-control">
                  <p>기본 <span>자동 달리기</span></p>
                  <p>점프 <span>화면 좌측 하단 점프 버튼 클릭 <br />또는 스페이스바 클릭</span></p>
                  <p>2단 점프 <span>화면 좌측 하단 점프 버튼 두 번 클릭 또는 스페이스바 두 번 클릭</span></p>
              </div>
            )}
        </div>

        <div className="button-area">
            <button className="description control-button" onClick={() => setControlModal(!controlModal)}>
              {!controlModal? '조작키 설명' : '게임 설명'}
            </button>
              <button className="backCharacter control-button" onClick={() => handleInfo()}>
                캐릭터 선택
              </button>
         </div>
      </div>
    )
}

export default Control;