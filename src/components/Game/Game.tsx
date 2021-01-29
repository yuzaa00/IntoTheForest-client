import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer'
import { config } from '../../phaser/index'
import { store } from '../../index'

// import { GameProgress } from '~/types/game.type';
// import { selectGame } from '~/store/gameSlice';

export default function Game({ }) {
  const history = useHistory();

  const gameDestroy = useSelector((state: RootState) => state.singleReducer.game, shallowEqual)

  useEffect(() => {
    const newGame = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 11 }))
    const newGame1 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 21 })) // 추후에 props로 추가 로딩
    const newGame2 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 31 }))
    const newGame3 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 41 }))

    if (gameDestroy) {
      newGame.destroy(true)//게임삭제와 
      //동시에 게임 데이터도 스토어에 저장.,다음 컴포넌트로 이동
      history.push('/SingleResult')
    }

    return () => {
      newGame.destroy(true);
    };
  }, [gameDestroy]);


  return (
    <div>
      <div>
        <span className='game1' id='game-container11' />
        <span className='game2' id='game-container21' />
      </div>
      <div>
        <span className='game3' id='game-container31' />
        <span className='game4' id='game-container41' />
      </div>
    </div>
  )
}