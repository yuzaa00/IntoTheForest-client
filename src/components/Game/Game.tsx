import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { config } from '../../phaser/index'

// import { GameProgress } from '~/types/game.type';
// import { selectGame } from '~/store/gameSlice';

export default function Game({  }) {
    const history = useHistory();

    
    
    useEffect(() => {
      const newGame = new Phaser.Game(config);
      
      // const newGame1 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 1})); // 추후에 props로 추가 로딩
      // const newGame2 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 2}));
      // const newGame3 = new Phaser.Game(Object.assign(config, { parent: 'game-container' + 3}));
  
      return () => {
        newGame.destroy(true);
      };
    }, []);

  
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