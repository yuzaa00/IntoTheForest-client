import Phaser from 'phaser'

export default class Boot extends Phaser.Scene { // resource load scene

  constructor() {
    super('Boot')
  }

  preload(): void {
    //character load
    this.load.image('logo', `${process.env.REACT_APP_URL}/logo.png`)
    this.load.image('bird', `${process.env.REACT_APP_URL}/bird.png`)
    this.load.image('squi', `${process.env.REACT_APP_URL}/squi.png`)
    this.load.spritesheet('dog', `${process.env.REACT_APP_URL}/dog2.png`, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('dog3', `${process.env.REACT_APP_URL}/dog2-500.png`, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('dog2', `${process.env.REACT_APP_URL}/white-dog-2.png`, { frameWidth: 500, frameHeight: 500 })

    // this.load.spritesheet('dog2', `${process.env.REACT_APP_URL}/dog2-running-test.png', { frameWidth: 220, frameHeight: 220})
    
    //background load
    this.load.image('forestLogo', `${process.env.REACT_APP_URL}/forestLogo.png`)
    this.load.image('stage1', `${process.env.REACT_APP_URL}/stage1.png`)
    this.load.image('stage2', `${process.env.REACT_APP_URL}/stage2.png`)
    this.load.image('stage3', `${process.env.REACT_APP_URL}/stage3.png`)
    this.load.image('groundDark', `${process.env.REACT_APP_URL}/groundDark.png`)
    this.load.image('gameOver', `${process.env.REACT_APP_URL}/gameover.png`)
    this.load.image('way', `${process.env.REACT_APP_URL}/way.png`)
    this.load.image('cave', `${process.env.REACT_APP_URL}/forestCave.png`)
    this.load.image('pause', `${process.env.REACT_APP_URL}/pause.png`)
    this.load.image('jump', `${process.env.REACT_APP_URL}/jump.png`)

    //object load
    this.load.image("bone", `${process.env.REACT_APP_URL}/bone.png`)
    this.load.image("potion", `${process.env.REACT_APP_URL}/potion.png`)
    this.load.image("orangePotion", `${process.env.REACT_APP_URL}/bluepotion.png`)
    this.load.image("stagePotion", `${process.env.REACT_APP_URL}/stagepotion.png`)
    this.load.image("subBird", `${process.env.REACT_APP_URL}/subBird.png`)
    this.load.image("subSqui", `${process.env.REACT_APP_URL}/subSqui.png`)
    this.load.image("mushroom", `${process.env.REACT_APP_URL}/mushroom.png`)
    this.load.image("bund", `${process.env.REACT_APP_URL}/bund.png`)
    this.load.image("bund2", `${process.env.REACT_APP_URL}/bund2.png`)
    this.load.image("signExit", `${process.env.REACT_APP_URL}/signExit.png`)
    
    //bonus game
    this.load.image('molebg', `${process.env.REACT_APP_URL}/bg.png`)
    this.load.image('moleBG', `${process.env.REACT_APP_URL}/molebg.png`)
    this.load.image('mole', `${process.env.REACT_APP_URL}/mole.png`)
    this.load.image('bomb', `${process.env.REACT_APP_URL}/bomb.png`)
    this.load.image('card1.png', `${process.env.REACT_APP_URL}/card1.png`) // 곰
    this.load.image('card2.png', `${process.env.REACT_APP_URL}/card2.png`) // 치와와
    this.load.image('card3.png', `${process.env.REACT_APP_URL}/card3.png`) // 늑대
    this.load.image('card4.png', `${process.env.REACT_APP_URL}/card4.png`) // 멧돼지
    this.load.image('card5.png', `${process.env.REACT_APP_URL}/card5.png`) // 갱얼쥐
    this.load.image('card6.png', `${process.env.REACT_APP_URL}/card6.png`) // 뱀뱀
    this.load.image('card7.png', `${process.env.REACT_APP_URL}/card7.png`) // 다람쥐
    this.load.image('card8.png', `${process.env.REACT_APP_URL}/card8.png`) // 아기새
    this.load.image('front.png', `${process.env.REACT_APP_URL}/front.png`)
    this.load.image('back.png', `${process.env.REACT_APP_URL}/back.png`)
    this.load.image('cardbg',`${process.env.REACT_APP_URL}/cardbg.png`)
    
    // tiled map, font
    this.load.tilemapTiledJSON("map", `${process.env.REACT_APP_URL}/stage1_map.json`)
    this.load.tilemapTiledJSON("map2", `${process.env.REACT_APP_URL}/stage2_map.json`)
    this.load.tilemapTiledJSON("map3", `${process.env.REACT_APP_URL}/stage3_map.json`)
    this.load.bitmapFont('font', `${process.env.REACT_APP_URL}/font.png`, `${process.env.REACT_APP_URL}/font.fnt`)

    //audio load
    this.load.audio('stage1_1bgm', `${process.env.REACT_APP_URL}/stage1-1.mp3`)
    this.load.audio('stage1-2_bgm', `${process.env.REACT_APP_URL}/stage1-2.mp3`)
    this.load.audio('stage2-1_bgm', `${process.env.REACT_APP_URL}/stage2-1.mp3`)
    this.load.audio('stage2-2_bgm', `${process.env.REACT_APP_URL}/stage2-2.mp3`)
    this.load.audio('stage3_bgm', `${process.env.REACT_APP_URL}/stage3.mp3`)
    
    // effect
    this.load.audio('wolfEcho', `${process.env.REACT_APP_URL}/wolf.mp3`)
    this.load.audio('boarEcho', `${process.env.REACT_APP_URL}/boar.mp3`)
    this.load.audio('snakeEcho', `${process.env.REACT_APP_URL}/snake.mp3`)
    this.load.audio('dogEcho', `${process.env.REACT_APP_URL}/dogBite.mp3`)
    this.load.audio('heat', `${process.env.REACT_APP_URL}/jab.mp3`)
    this.load.audio('coin', `${process.env.REACT_APP_URL}/coin.wav`)
    this.load.audio('get', `${process.env.REACT_APP_URL}/get.mp3`)
    this.load.audio('heal', `${process.env.REACT_APP_URL}/heal.mp3`)
    this.load.audio('click', `${process.env.REACT_APP_URL}/click.wav`)
    this.load.audio('boom', `${process.env.REACT_APP_URL}/boom.mp3`)
    
    //particles
    this.load.atlas('particles', `${process.env.REACT_APP_URL}/explosion.png`, `${process.env.REACT_APP_URL}/explosion.json`)
  }

  create ():void {  
  }
  
  update ():void {
    this.scene.start('Loader') // 첫 스테이지 선택
  }
}

