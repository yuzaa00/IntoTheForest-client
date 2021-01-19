import Phaser from 'phaser'

export default class Loader extends Phaser.Scene { // resource load scene

  constructor() {
    super('Loader')
  }

  preload(): void {
    this.load.image('logo', 'images/character/logo.png')
    this.load.image('ground', 'images/object/platform.png')
    this.load.image('star', 'images/object/star.png')
    this.load.image('sky_cloud', 'images/background/sky-clouds.png')
    this.load.image('bird', 'images/character/bird.png')
    this.load.image('sunset', 'images/background/sunset.png')
    this.load.image('groundDark', 'images/background/groundDark.png')
    this.load.image('skydark', 'images/background/country-platform.png')
    this.load.image('gameOver', 'images/background/gameover.png')
    this.load.image('way', 'images/background/way.png')
    this.load.image('molebg', 'images/mole/bg.png')
    this.load.image('mole', 'images/mole/mole.png')
    
    this.load.bitmapFont('font', 'font/font.png', 'font/font.fnt')
    this.load.spritesheet('dog', 'images/character/dog2.png', { frameWidth: 80.25, frameHeight: 100 })
    this.load.audio('stage1_bgm', 'sound/bgm/stage1_bgm.mp3')
    // this.load.audioSprite('sfx', scoreEffectjson, scoreEffect)
  }
  
  update ():void {
    this.scene.start('Stage1');
  }
}

