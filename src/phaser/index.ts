import Phaser from 'phaser';

import { SETTING } from '../GameSetting/index'

import Boot from './scenes/Boot';
import Loader from './scenes/Loader';
import MainGame from './scenes/MainGame';
import Stage2 from './scenes/Stage2';
import Stage3 from './scenes/Stage3';

export const config: Phaser.Types.Core.GameConfig = {
  title: 'Into the Forest',
  type: Phaser.AUTO,
  width: SETTING.WIDTH,
  height: SETTING.HEIGHT,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 500 },
        debug: false
    }
  },
  scene: [Boot, Loader, MainGame],
}
