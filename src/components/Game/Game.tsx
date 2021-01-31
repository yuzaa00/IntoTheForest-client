import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { config } from "../../phaser/index";
import { store } from "../../index";
import { roomSocket } from "../../utils/socket";
import Result from "../Result/Result";

// import { GameProgress } from '~/types/game.type';
// import { selectGame } from '~/store/gameSlice';

export default function Game({}) {
  const history = useHistory();
  const [isGame, setGame] = useState();
  const [goResult, setGoResult] = useState(false);
  const [scoreList, setScoreList] = useState([]);

  const gameDestroy = useSelector(
    (state: RootState) => state.singleReducer.game
  );
  const gameResult = useSelector(
    (state: RootState) => state.singleReducer.gameData,
    shallowEqual
  );
  const gameMode = useSelector(
    (state: RootState) => state.gameReducer.mode,
    shallowEqual
  );
  const roomCode = useSelector(
    (state: RootState) => state.roomReducer.roomCode
  );
  const isOver = useSelector(
    (state: RootState) => state.roomReducer.isGameOver,
    shallowEqual
  );
  const newGame = new Phaser.Game(
    Object.assign(config, { parent: "game-container" + 11 })
  );

  useEffect(() => {
    roomSocket.listenResult((res) => {
      console.log("설마 너냐? 혼날래?");
      setScoreList(res);
      setGoResult(true);
    });
  });

  useEffect(() => {
    if (!gameDestroy) {
    }

    // const newGame1 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 21 })) // 추후에 props로 추가 로딩
    // const newGame2 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 31 }))
    // const newGame3 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 41 }))

    if (gameDestroy) {
      if (gameMode) {
        // 소켓
        console.log("잡는다 ");
        newGame.destroy(true); //게임삭제

        const { score, life, stage, bird, squi } = gameResult;
        const result = {
          roomCode: roomCode,
          result: {
            score: score,
            life: life || 0,
            stage: stage,
            bird: bird,
            squi: squi,
          },
        };
        roomSocket.sendResult(result);
      } else {
        console.log("===================");
        newGame.destroy(true); //게임삭제와
        //동시에 게임 데이터도 스토어에 저장.,다음 컴포넌트로 이동
        history.push("/SingleResult");
      }
    }

    return () => {
      console.log("범인은 이 안에 있다");
      newGame.destroy(true);
    };
  }, [gameDestroy]);

  // function handleIsOver() {
  //   dispatch({
  //     type: 'IS_GAME_OVER'
  //   })
  // }

  return goResult ? (
    <Result scoreList={scoreList} />
  ) : (
    <div>
        <span className="game1" id="game-container11" />
    </div>
  );
}
