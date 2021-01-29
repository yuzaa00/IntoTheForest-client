import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer' 
import { config } from '../../phaser/index'
import { store } from '../../index'
import  RecordRTC, { invokeSaveAsDialog }  from 'recordrtc'

// import { GameProgress } from '~/types/game.type';
// import { selectGame } from '~/store/gameSlice';

export default function Game({  }) {
    const history = useHistory();

    const gameDestroy = useSelector((state: RootState) => state.singleReducer.game, shallowEqual)
    console.log(gameDestroy)
    
    useEffect(() => {
      const newGame = new Phaser.Game(config);
      
      // const newGame1 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 1})); // 추후에 props로 추가 로딩
      // const newGame2 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 2}));
      // const newGame3 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 3}));
  
      if(gameDestroy) {
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
        <div id='game-container'>
        </div>
        <div id='game-container1'>
        </div>
        <div id='game-container2'>
        </div>
        <div id='game-container3'>
        </div>
      </div>
    );
}