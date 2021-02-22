import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from '../../redux/rootReducer'
import { config } from '../../phaser/index'
import { store } from '../../index'
import { roomSocket } from '../../utils/socket'
import Result from '../Result/Result'

// import { GameProgress } from '~/types/game.type';
// import { selectGame } from '~/store/gameSlice';

export default function Game({ }) {
  const history = useHistory()
  const disPatch = useDispatch()
  const [goResult, setGoResult] = useState(false)

  const gameDestroy = useSelector((state: RootState) => state.singleReducer.game, shallowEqual)
  const gameResult = useSelector((state: RootState) => state.singleReducer.gameData, shallowEqual)
  const gameOver = useSelector((state: RootState) => state.singleReducer.isOver, shallowEqual)
  const gameMode = useSelector((state: RootState) => state.gameReducer.mode, shallowEqual)
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)
  const isOver = useSelector((state: RootState) => state.roomReducer.isGameOver, shallowEqual)

  function resizeApp () {
	const game_ratio = 1.8
	
	let span = document.getElementById('game-container11') as HTMLElement
	span.style.width = (window.innerHeight * game_ratio) + 'px'
	span.style.height	= window.innerHeight + 'px'
	
	let canvas = document.getElementsByTagName('canvas')[0]
	
	let witdhRatio	= parseInt(span.style.width) / canvas.width
	let heightRatio	= parseInt(span.style.height) / canvas.height
	
	let height	= window.innerHeight * (witdhRatio / heightRatio)
	let width	= height * game_ratio
	
	canvas.style.width	= width + 'px'
	canvas.style.height	= height + 'px'
}

window.addEventListener('resize', resizeApp);
  
  useEffect(() => {
    const newGame: Phaser.Game = new Phaser.Game(Object.assign(config, { 
      // width: store.getState().gameReducer.width,
      // height: store.getState().gameReducer.height,
      parent: 'game-container' + 11 
    }))
    resizeApp()

    // const newGame1 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 21 })) // 추후에 props로 추가 로딩
    // const newGame2 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 31 }))
    // const newGame3 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 41 }))
    if (gameDestroy) {
      if(gameMode) {
        newGame.destroy(true)//게임삭제
        const { score, life, stage, bird, squi } = gameResult;
        const result = {
          roomCode: roomCode,
          result: {
            score: score,
            life: life,
            stage: stage,
            bird: bird,
            squi: squi,
          }
        }
        roomSocket.sendResult(result)
        disPatch({
          type: 'OPEN_MULTI_RESULT',
        })
      } else {
        newGame.destroy(true)//게임삭제와 
        //동시에 게임 데이터도 스토어에 저장.,다음 컴포넌트로 이동
        if(gameOver) history.push('/SingleResult')
        else history.push('/Ending')
      }
    }

    return () => {
      newGame.destroy(true);
    };
  }, [gameDestroy]);
  
  function handleIsOver() {

  }

  return (
    <div style={{width: '100%', height: '100vh', display: 'flex'}}>
      <div style={{margin: '0 auto', alignSelf: 'center'}}>
      <span className='game1' id='game-container11' />
      </div>
      <div>
      </div>
    </div>
  )
}