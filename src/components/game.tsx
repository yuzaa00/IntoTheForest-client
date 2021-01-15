import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { config } from '../phaser/index'

// import { GameProgress } from '~/types/game.type';
// import { selectGame } from '~/store/gameSlice';

export default function Game() {
    const history = useHistory();
    
    useEffect(() => {
      const newGame = new Phaser.Game(config);
  
      return () => {
        newGame.destroy(true);
      };
    }, []);

  
    return (
        <div>
        </div>
    );
}