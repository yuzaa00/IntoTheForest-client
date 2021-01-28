import React, { useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { config } from '../../phaser/index'
import { store } from '../../index'
import  RecordRTC, { invokeSaveAsDialog }  from 'recordrtc'

// import { GameProgress } from '~/types/game.type';
// import { selectGame } from '~/store/gameSlice';

export default function Game() {

  const gameDestroy = useSelector((state: RootState) => state.roomReducer.game, shallowEqual)

  const width = (store.getState().gameReducer.width) - 100

  console.log(gameDestroy)

  useEffect(() => {
    const newGame = new Phaser.Game(Object.assign(config))
    // const newGame1 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 1, width: width / 2 })) // 추후에 props로 추가 로딩
    // const newGame2 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 2, width: width / 2 }))
    // const newGame3 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 3, width: width / 2 }))

    if (gameDestroy) {
      newGame.destroy(true)
      // newGame1.destroy(true)
      // newGame2.destroy(true)
      // newGame3.destroy(true)

      // 게임 삭제와 동시에 게임 데이터도 스토어에 저장
      // 다음 컴포넌트로 이동 (다음 컴포넌트에서 스토어에 저장된 값을 불러와서 axios )
    }

    return () => {
      newGame.destroy(true)
      // newGame1.destroy(true)
      // newGame2.destroy(true)
      // newGame3.destroy(true)
    }
  }, [gameDestroy])

  return (
    <div >
    </div>
  );
}