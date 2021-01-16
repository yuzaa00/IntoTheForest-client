import Phaser from 'phaser'
import skys from '../../resource/images/sky.png'
import starss from '../../resource/images/star.png'
import bombs from '../../resource/images/bomb.png'
import trees from '../../resource/images/tree.png'
import platformss from '../../resource/images/platform.png'
import dudes from '../../resource/images/dude.png'
// import dudes2 from '../../resource/images/dude2.png'
import sky_cloud from '../../resource/images/sky-clouds.jpg'
import mountain_skyline from '../../resource/images/mountain-skyline.png'
import bird from '../../resource/images/104.png'
const stage1_BGM = require("../../resource/sound/bgm/stage1_bgm.mp3")
const scoreEffect = require('../../resource/sound/effect/fx_mixdown.ogg')
const scoreEffectjson = require('../../resource/sound/effect/fx_mixdown.json')

let player: any
let platforms: any
let cursors: any
let stars: any

export default class Loader extends Phaser.Scene {
    
    constructor() {
        super('Loader')
      }

 preload(): void {
    
    this.load.image('sky', skys)
    this.load.image('ground', platformss)
    this.load.image('star', starss)
    this.load.image('tree', trees)
    this.load.image('sky_cloud', sky_cloud)
    this.load.image('mountain_skyline', mountain_skyline)
    this.load.image('bird', bird)
    this.load.spritesheet('dude', dudes, { frameWidth: 32, frameHeight: 48 })
    // this.load.spritesheet('dude2', dudes2, { frameWidth: 156, frameHeight: 260 })
    this.load.audio('stage1_bgm', stage1_BGM)
    this.load.audioSprite('sfx', scoreEffectjson, scoreEffect)
    
}

 create (): void {
    // this.add.image(800, 600, 'sky')
    

    // platforms = this.physics.add.staticGroup()

    // platforms.create(800, 1000, 'ground').setScale(4).refreshBody()

    // platforms.create(600, 850, 'tree').setScale(0.6)
    // platforms.create(1200, 850, 'tree').setScale(0.6)
    
    // platforms.create(50, 250, 'ground')
    // platforms.create(750, 220, 'ground')

    // player = this.physics.add.sprite(100, 910, 'dude')
    // player = this.physics.add.sprite(100, 700, 'dude')

    // player.setBounce(0.4)
    // player.setCollideWorldBounds(true)
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 10
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 8,
        repeat: -1
    })
    
    // cursors = this.input.keyboard.createCursorKeys()
    

    // stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 20,
    //     setXY: { x: 30, y: 700, stepX: 70 }
    // })

    // stars.children.iterate(function (child: any):void {
        
    // })

    // this.physics.add.collider(player, platforms)
    // this.physics.add.collider(stars, platforms)

    // this.physics.add.overlap(player, stars, this.collectStar, null, this)
}

  update ():void {
    
//     if (cursors.left.isDown) {
//         player.setVelocityX(-250)

//         player.anims.play('left', true)
//     }
//     else if (cursors.right.isDown) {
//         player.setVelocityX(250)

//         player.anims.play('right', true)
//     }
//     else {
//         player.setVelocityX(0)

//         player.anims.play('turn')
//     }

//     if (cursors.space.isDown) {
//         console.log(cursors)
//         player.setVelocityY(-330)
//     }
    this.scene.start('MainGame');
// }
//   collectStar (player: any, star: any):void {
//     star.disableBody(true, true)
//     if (stars.countActive(true) === 0) {
//         stars.children.iterate(function (child: any) {
//             child.enableBody(true, child.x, 700, true, true)
//         })
//     }
  }
}

