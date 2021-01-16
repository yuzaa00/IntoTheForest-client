import { group } from 'console'
import { Background } from '../object/BackGround'
import { SETTING } from '../../GameSetting/index'

let player: any
let platforms: any
let cursors: any
let stars: any
let skyTile: any
let target: any
let tori: any
let subchas: any
let vertical: any
let myCam: any

export default class MainGame extends Phaser.Scene {
    constructor() {
        super('MainGame')
    }
  
    public create(): void {
        
        skyTile = this.add.tileSprite(600, 300, 1200, 800, 'sky')
        platforms = this.physics.add.staticGroup()
        target = this.physics.add.staticGroup()
        subchas = this.physics.add.staticGroup()

        // vertical = this.physics.add.staticGroup()
        // vertical.enableBody = true
        // vertical.createMultiple(12, 'ground') 
        // vertical.setAll('checkWorldBounds', true)
        // vertical.setAll('outOfBoundsKill', true)
        // for(var i=0 i<12 i++) {
        //     let newItem = vertical.create(null, 600, 'ground')
        //     newItem.body.immovable = true
        //     newItem.body.velocity.x = -250           
        // }
        
        // tori = this.physics.add.group()
        // tori.enableBody = true
        // tori.physicsBodyType = Phaser.Physics.Arcade

        // var jungle = this.sound.add('stage1_bgm') // 노래 재생하기
        // jungle.play({
        //     loop: true
        // })
        
        // for (var i = 0 i < 50 i++)
        // {
        //     var c = tori.create(this.world.randomX, Math.random() * 500, 'star', this.rnd.integerInRange(0, 36))
        //     c.name = 'veg' + i
        //     c.body.immovable = true
        // }

        platforms.create(800, 700, 'ground').setScale(4).refreshBody()

        target.create(180, 600, 'star').setScale(4).refreshBody()
        target.create(300, 600, 'star').setScale(4).refreshBody()
        target.create(400, 600, 'star').setScale(4).refreshBody()

        player = this.physics.add.sprite(100, 700, 'dude')
        
        myCam = this.cameras.main
        myCam.setBackgroundColor(0xbababa)
        myCam.setBounds(0, 0, SETTING.WIDTH * 3, SETTING.HEIGHT)
        myCam.startFollow(player)

        // player.setBounce(0.1)
        player.setCollideWorldBounds(true)
        // this.cameras.main.startFollow(player)
        
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
            
        })
    
        // stars.children.iterate(function (child: any):void {
            
        // })

        this.physics.add.collider(player, platforms)
        this.physics.add.collider(stars, platforms)
        this.physics.add.collider(target, platforms)
    
        this.physics.add.overlap(player, stars, this.collectStar, undefined, this)
        this.physics.add.collider(player, target, this.nextStage, undefined, this)
    }
    
    public update(time: number, delta: number): void {
        // this.background.update()
        if (cursors.left.isDown) {
            player.setVelocityX(-12)
            skyTile.tilePositionX -= 5
            player.anims.play('left', true)
        }

        else if (cursors.right.isDown) {
            player.setVelocityX(12)
            skyTile.tilePositionX += 5
            player.anims.play('right', true)
            
            subchas.children.iterate(function (child: any, idx: number) {
                if(player.x - (50 + idx * 50) > child.x) {
                    child.x += 1
                }
                if(player.y > child.y) {
                    child.y += 1
                }
            })
        }

        else {
            player.setVelocityX(0)
            player.anims.play('turn')
        }
    
        if (cursors.space.isDown) {
            player.setVelocityY(-330)
            subchas.children.iterate(function (child: any, idx: number) {
                if(player.y > child.y) {
                    child.y += 1
                }
            })
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

      nextStage (player: any, target: any):void {
        target.disableBody(true, true)
        
        let bird = subchas.create(player.x - (30 + subchas.children.entries.length * 80), player.y, 'bird').setScale(0.14)
        
        subchas.add(bird)
        
        
        console.log(bird)
        // var distance = bird.game.math.distance(bird.x, bird.y, target.x, target.y)
        // console.log(distance)

        // If the distance > MIN_DISTANCE then move
        // if (distance > this.MIN_DISTANCE) {
        //     // Calculate the angle to the target
        //     var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y)
    
        //     // Calculate velocity vector based on rotation and this.MAX_SPEED
        //     this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED
        //     this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED
        // } else {
        //     this.body.velocity.setTo(0, 0)
        // }
        // subchas.children.iterate(function (child: any) {
        //     child.enableBody(true, child.x, 700, true, true)
        // })
        // this.add.follower()
        
        // tori.create(player.x - 30, player.y, 'bird').setScale(0.14)
        // tori.startFollow(player)
        
      }
      
}
// var Follower = function(game, x, y, target) {
//     Phaser.Sprite.call(this, game, x, y, 'player')

//     // Save the target that this Follower will follow
//     // The target is any object with x and y properties
//     this.target = target

//     // Set the pivot point for this sprite to the center
//     this.anchor.setTo(0.5, 0.5)

//     // Enable physics on this object
//     this.game.physics.enable(this, Phaser.Physics.Arcade)

//     // Define constants that affect motion
//     this.MAX_SPEED = 250 // pixels/second
//     this.MIN_DISTANCE = 32 // pixels
// }

// // Followers are a type of Phaser.Sprite
// Follower.prototype = Object.create(Phaser.Sprite.prototype)
// Follower.prototype.constructor = Follower

// Follower.prototype.update = function() {
//     // Calculate distance to target
//     var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y)

//     // If the distance > MIN_DISTANCE then move
//     if (distance > this.MIN_DISTANCE) {
//         // Calculate the angle to the target
//         var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y)

//         // Calculate velocity vector based on rotation and this.MAX_SPEED
//         this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED
//         this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED
//     } else {
//         this.body.velocity.setTo(0, 0)
//     }
// }

