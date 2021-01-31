import Phaser from 'phaser'
import { images } from '../helper/image'

export default class Loader extends Phaser.Scene { // resource load scene

  constructor() {
    super('Loader')
  }

  preload(): void {
    //character load
    console.log(4)
    this.load.image('logo', 'https://elb.intotheforest.space/logo.png')
    this.load.image('bird', 'https://elb.intotheforest.space/bird.png')
    this.load.image('squi', 'https://elb.intotheforest.space/squi.png')
    this.load.spritesheet('dog', 'https://elb.intotheforest.space/dog2.png', { frameWidth: 500, frameHeight: 500 })
    // this.load.spritesheet('dog2', 'https://elb.intotheforest.space/dog2.png', { frameWidth: 500, frameHeight: 500 })
    // this.load.spritesheet('dog3', 'https://elb.intotheforest.space/dog2.png', { frameWidth: 500, frameHeight: 500 })
    
    // this.load.spritesheet('dog2', 'https://elb.intotheforest.space/dog2-running-test.png', { frameWidth: 220, frameHeight: 220})
    
    //background load
    this.load.image('stage1', 'https://elb.intotheforest.space/stage1.png')
    this.load.image('stage2', 'https://elb.intotheforest.space/stage2.png')
    this.load.image('stage3', 'https://elb.intotheforest.space/stage3.png')
    this.load.image('groundDark', 'https://elb.intotheforest.space/groundDark.png')
    this.load.image('gameOver', 'https://elb.intotheforest.space/gameover.png')
    this.load.image('way', 'https://elb.intotheforest.space/way.png')
    this.load.image('cave', 'https://elb.intotheforest.space/forestCave.png')
    this.load.image('pause', 'https://elb.intotheforest.space/pause.png')
    this.load.image('jump', 'https://elb.intotheforest.space/jump.png')

    //object load
    this.load.image("bone", 'https://elb.intotheforest.space/bone.png')
    this.load.image("potion", 'https://elb.intotheforest.space/potion.png')
    this.load.image("orangePotion", 'https://elb.intotheforest.space/bluepotion.png')
    this.load.image("stagePotion", 'https://elb.intotheforest.space/stagepotion.png')
    this.load.image("subBird", 'https://elb.intotheforest.space/subBird.png')
    this.load.image("subSqui", 'https://elb.intotheforest.space/subSqui.png')
    this.load.image("mushroom", 'https://elb.intotheforest.space/mushroom.png')
    this.load.image("bund", 'https://elb.intotheforest.space/bund.png')
    this.load.image("bund2", 'https://elb.intotheforest.space/bund2.png')
    this.load.image("signExit", 'https://elb.intotheforest.space/signExit.png')
    
    //bonus game
    this.load.image('molebg', 'https://elb.intotheforest.space/bg.png')
    this.load.image('moleBG', 'https://elb.intotheforest.space/molebg.png')
    this.load.image('mole', 'https://elb.intotheforest.space/mole.png')
    this.load.image('card1.png', 'https://elb.intotheforest.space/card1.png') // 곰
    this.load.image('card2.png', 'https://elb.intotheforest.space/card2.png') // 치와와
    this.load.image('card3.png', 'https://elb.intotheforest.space/card3.png') // 늑대
    this.load.image('card4.png', 'https://elb.intotheforest.space/card4.png') // 멧돼지
    this.load.image('card5.png', 'https://elb.intotheforest.space/card5.png') // 갱얼쥐
    this.load.image('card6.png', 'https://elb.intotheforest.space/card6.png') // 뱀뱀
    this.load.image('card7.png', 'https://elb.intotheforest.space/card7.png') // 다람쥐
    this.load.image('card8.png', 'https://elb.intotheforest.space/card8.png') // 아기새
    this.load.image('front.png', 'https://elb.intotheforest.space/front.png')
    this.load.image('back.png', 'https://elb.intotheforest.space/back.png')
    this.load.image('cardbg','https://elb.intotheforest.space/cardbg.png')
    
    // tiled map, font
    this.load.tilemapTiledJSON("map", 'https://elb.intotheforest.space/stage1_map.json')
    this.load.tilemapTiledJSON("map2", 'https://elb.intotheforest.space/stage2_map.json')
    this.load.tilemapTiledJSON("map3", 'https://elb.intotheforest.space/stage3_map.json')
    this.load.bitmapFont('font', 'https://elb.intotheforest.space/font.png', 'https://elb.intotheforest.space/font.fnt')

    //audio load
    this.load.audio('stage1_1bgm', 'https://elb.intotheforest.space/stage1-1.mp3')
    this.load.audio('stage1-2_bgm', 'https://elb.intotheforest.space/stage1-2.mp3')
    this.load.audio('stage2-1_bgm', 'https://elb.intotheforest.space/stage2-1.mp3')
    this.load.audio('stage2-2_bgm', 'https://elb.intotheforest.space/stage2-2.mp3')
    this.load.audio('stage3_bgm', 'https://elb.intotheforest.space/stage3.mp3')
    
    // effect
    this.load.audio('wolfEcho', 'https://elb.intotheforest.space/wolf.mp3')
    this.load.audio('boarEcho', 'https://elb.intotheforest.space/boar.mp3')
    this.load.audio('snakeEcho', 'https://elb.intotheforest.space/snake.mp3')
    this.load.audio('dogEcho', 'https://elb.intotheforest.space/dogBite.mp3')
    this.load.audio('heat', 'https://elb.intotheforest.space/jab.mp3')
    this.load.audio('coin', 'https://elb.intotheforest.space/coin.wav')
    this.load.audio('get', 'https://elb.intotheforest.space/get.mp3')
    this.load.audio('heal', 'https://elb.intotheforest.space/heal.mp3')
    
    //particles
    console.log(5)
    this.load.atlas('particles', 'https://elb.intotheforest.space/explosion.png', 'https://elb.intotheforest.space/explosion.json')
    console.log(6)
  }

  create ():void {
    
  }
  
  update ():void {
   
    this.scene.start('Stage1') // 첫 스테이지 선택
  }
}

