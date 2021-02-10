import Phaser from 'phaser'

export default class Boot extends Phaser.Scene { // resource load scene

  constructor() {
    super('Boot')
  }

  preload(): void {
    //character load
    this.load.image('logo', 'http://localhost:4000/logo.png')
    this.load.image('bird', 'http://localhost:4000/bird.png')
    this.load.image('squi', 'http://localhost:4000/squi.png')
    this.load.spritesheet('dog', 'http://localhost:4000/dog2.png', { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('dog3', 'http://localhost:4000/dog2-500.png', { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('dog2', 'http://localhost:4000/white-dog-2.png', { frameWidth: 500, frameHeight: 500 })

    // this.load.spritesheet('dog2', 'http://localhost:4000/dog2-running-test.png', { frameWidth: 220, frameHeight: 220})
    
    //background load
    this.load.image('forestLogo', 'http://localhost:4000/forestLogo.png')
    this.load.image('stage1', 'http://localhost:4000/stage1.png')
    this.load.image('stage2', 'http://localhost:4000/stage2.png')
    this.load.image('stage3', 'http://localhost:4000/stage3.png')
    this.load.image('groundDark', 'http://localhost:4000/groundDark.png')
    this.load.image('gameOver', 'http://localhost:4000/gameover.png')
    this.load.image('way', 'http://localhost:4000/way.png')
    this.load.image('cave', 'http://localhost:4000/forestCave.png')
    this.load.image('pause', 'http://localhost:4000/pause.png')
    this.load.image('jump', 'http://localhost:4000/jump.png')

    //object load
    this.load.image("bone", 'http://localhost:4000/bone.png')
    this.load.image("potion", 'http://localhost:4000/potion.png')
    this.load.image("orangePotion", 'http://localhost:4000/bluepotion.png')
    this.load.image("stagePotion", 'http://localhost:4000/stagepotion.png')
    this.load.image("subBird", 'http://localhost:4000/subBird.png')
    this.load.image("subSqui", 'http://localhost:4000/subSqui.png')
    this.load.image("mushroom", 'http://localhost:4000/mushroom.png')
    this.load.image("bund", 'http://localhost:4000/bund.png')
    this.load.image("bund2", 'http://localhost:4000/bund2.png')
    this.load.image("signExit", 'http://localhost:4000/signExit.png')
    
    //bonus game
    this.load.image('molebg', 'http://localhost:4000/bg.png')
    this.load.image('moleBG', 'http://localhost:4000/molebg.png')
    this.load.image('mole', 'http://localhost:4000/mole.png')
    this.load.image('card1.png', 'http://localhost:4000/card1.png') // 곰
    this.load.image('card2.png', 'http://localhost:4000/card2.png') // 치와와
    this.load.image('card3.png', 'http://localhost:4000/card3.png') // 늑대
    this.load.image('card4.png', 'http://localhost:4000/card4.png') // 멧돼지
    this.load.image('card5.png', 'http://localhost:4000/card5.png') // 갱얼쥐
    this.load.image('card6.png', 'http://localhost:4000/card6.png') // 뱀뱀
    this.load.image('card7.png', 'http://localhost:4000/card7.png') // 다람쥐
    this.load.image('card8.png', 'http://localhost:4000/card8.png') // 아기새
    this.load.image('front.png', 'http://localhost:4000/front.png')
    this.load.image('back.png', 'http://localhost:4000/back.png')
    this.load.image('cardbg','http://localhost:4000/cardbg.png')
    
    // tiled map, font
    this.load.tilemapTiledJSON("map", 'http://localhost:4000/stage1_map.json')
    this.load.tilemapTiledJSON("map2", 'http://localhost:4000/stage2_map.json')
    this.load.tilemapTiledJSON("map3", 'http://localhost:4000/stage3_map.json')
    this.load.bitmapFont('font', 'http://localhost:4000/font.png', 'http://localhost:4000/font.fnt')

    //audio load
    this.load.audio('stage1_1bgm', 'http://localhost:4000/stage1-1.mp3')
    this.load.audio('stage1-2_bgm', 'http://localhost:4000/stage1-2.mp3')
    this.load.audio('stage2-1_bgm', 'http://localhost:4000/stage2-1.mp3')
    this.load.audio('stage2-2_bgm', 'http://localhost:4000/stage2-2.mp3')
    this.load.audio('stage3_bgm', 'http://localhost:4000/stage3.mp3')
    
    // effect
    this.load.audio('wolfEcho', 'http://localhost:4000/wolf.mp3')
    this.load.audio('boarEcho', 'http://localhost:4000/boar.mp3')
    this.load.audio('snakeEcho', 'http://localhost:4000/snake.mp3')
    this.load.audio('dogEcho', 'http://localhost:4000/dogBite.mp3')
    this.load.audio('heat', 'http://localhost:4000/jab.mp3')
    this.load.audio('coin', 'http://localhost:4000/coin.wav')
    this.load.audio('get', 'http://localhost:4000/get.mp3')
    this.load.audio('heal', 'http://localhost:4000/heal.mp3')
    this.load.audio('click', 'http://localhost:4000/click.wav')
    this.load.audio('boom', 'http://localhost:4000/boom.mp3')
    
    //particles
    this.load.atlas('particles', 'http://localhost:4000/explosion.png', 'http://localhost:4000/explosion.json')
  }

  create ():void {  
  }
  
  update ():void {
    this.scene.start('Loader') // 첫 스테이지 선택
  }
}

