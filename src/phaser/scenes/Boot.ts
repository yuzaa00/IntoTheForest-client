import Phaser from 'phaser'
import skys from '../../images/sky.png'
import starss from '../../images/star.png'
import bombs from '../../images/bomb.png'
import trees from '../../images/tree.png'
import platformss from '../../images/platform.png'
import dudes from '../../images/dude.png'
import dudes2 from '../../images/309.png'

let player: any
let platforms: any
let cursors: any
let stars: any
export default class Boot extends Phaser.Scene {

    constructor() {
        super('Boot')
      }

 preload(): void {
    
    this.load.image('sky', skys)
    this.load.image('ground', platformss)
    this.load.image('star', starss)
    // this.load.image('bomb', bombs)
    this.load.image('tree', trees)
    this.load.spritesheet('dude', dudes, { frameWidth: 32, frameHeight: 48 })
    this.load.spritesheet('dude2', dudes2, { frameWidth: 156, frameHeight: 260 })
}

 create (): void {
    this.add.image(800, 600, 'sky')

    platforms = this.physics.add.staticGroup()

    platforms.create(800, 1000, 'ground').setScale(4).refreshBody()

    // platforms.create(600, 850, 'tree').setScale(0.6)
    // platforms.create(1200, 850, 'tree').setScale(0.6)
    
    // platforms.create(50, 250, 'ground')
    // platforms.create(750, 220, 'ground')

    // player = this.physics.add.sprite(100, 910, 'dude')
    player = this.physics.add.sprite(100, 700, 'dude')

    player.setBounce(0.4)
    player.setCollideWorldBounds(true)
    
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
    
    cursors = this.input.keyboard.createCursorKeys()
    

    stars = this.physics.add.group({
        key: 'star',
        repeat: 20,
        setXY: { x: 30, y: 700, stepX: 70 }
    })

    stars.children.iterate(function (child: any):void {
        
    })

    this.physics.add.collider(player, platforms)
    this.physics.add.collider(stars, platforms)

    this.physics.add.overlap(player, stars, this.collectStar, null, this)
}

  update ():void {
    if (cursors.left.isDown) {
        player.setVelocityX(-250)

        player.anims.play('left', true)
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(250)

        player.anims.play('right', true)
    }
    else {
        player.setVelocityX(0)

        player.anims.play('turn')
    }

    if (cursors.space.isDown) {
        console.log(cursors)
        player.setVelocityY(-330)
    }
}
  collectStar (player: any, star: any):void {
    star.disableBody(true, true)
    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child: any) {
            child.enableBody(true, child.x, 700, true, true)
        })
    }
  }
}

