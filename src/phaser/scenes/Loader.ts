import Phaser from 'phaser'

export default class Loader extends Phaser.Scene { // resource load scene

  constructor() {
    super('Loader')
  }

  preload(): void {
    
    //character load
    this.load.image('logo', 'images/character/logo.png')
    this.load.image('bird', 'images/character/bird.png')
    this.load.image('squi', 'images/character/squi.png')
    
    
    //background load
    this.load.image('stage1', 'images/background/stage1.png')
    this.load.image('stage2', 'images/background/stage2.png')
    this.load.image('groundDark', 'images/background/groundDark.png')
    this.load.image('gameOver', 'images/background/gameover.png')
    this.load.image('way', 'images/background/way.png')
    this.load.image('cave', 'images/background/forestCave.png')


    //object load
    this.load.image("bone", 'images/object/bone.png')
    this.load.image("potion", 'images/object/potion.png')
    this.load.image("subBird", 'images/object/subBird.png')
    this.load.image("subSqui", 'images/object/subSqui.png')
    this.load.image("mushroom", 'images/object/mushroom.png')
    this.load.image("bund", 'images/object/bund.png')
    this.load.image("bund2", 'images/object/bund2.png')
    this.load.image("signExit", 'images/object/signExit.png')
    
    this.load.image('back.png', 'images/card/back.png')
    this.load.image('cardbg','images/card/cardbg.png')
    this.load.image('molebg', 'images/mole/bg.png')
    this.load.image('moleBG', 'images/mole/molebg.png')
    this.load.image('mole', 'images/mole/mole.png')
    this.load.image('card6.png', 'images/card/card6.png')
    
    this.load.tilemapTiledJSON("map", 'stage1_map.json')
    this.load.tilemapTiledJSON("map2", 'stage2_map.json')
    this.load.bitmapFont('font', 'font/font.png', 'font/font.fnt')
    this.load.spritesheet('dog', 'images/character/dog2.png', { frameWidth: 500, frameHeight: 500 })

    //audio load
    this.load.audio('stage1_bgm', 'sound/bgm/stage1-1.mp3')
    this.load.audio('stage1-2_bgm', 'sound/bgm/stage1-2.mp3')
    this.load.audio('stage2-1_bgm', 'sound/bgm/stage2-1.mp3')
    this.load.audio('stage2-2_bgm', 'sound/bgm/stage2-2.mp3')
    
    // monster
    this.load.image('wolf', 'images/card/card3.png')
    this.load.audio('wolfEcho', 'sound/effect/wolf.mp3')
  }
  
  update ():void {
    this.scene.start('Stage1') // 첫 스테이지 선택
  }
}

