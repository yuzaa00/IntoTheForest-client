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
let groundDark: any // 수정 예정

export default class MainGame extends Phaser.Scene {
    private scoreText!: Phaser.GameObjects.BitmapText
    private lifeText!: Phaser.GameObjects.BitmapText
    private worldTimer!: Phaser.Time.TimerEvent

    constructor() {
        super('MainGame')
    }

    public init(): void {
        this.registry.set('score', 0)
        this.registry.set('life', 1000)
      }
  
    public create(): void {

        this.lifeText = this.add // 라이프 텍스트 생성
        .bitmapText(30, 30, 'font', `LIFE ${this.registry.values.life}`)
        .setDepth(6)
  
        this.scoreText = this.add // 점수 텍스트 생성
        .bitmapText(530, 30, 'font', `SCORE ${this.registry.values.score}`)
        .setDepth(6)
        
        skyTile = this.add.tileSprite(0, 0, 800, 600, 'skydark').setOrigin(0).setDepth(0) 
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

          // add the ground layer which is only 48 pixels tall
        // groundDark = this.add.tileSprite(0, 0, SETTING.WIDTH, 300, "groundDark")
        // groundDark.setOrigin(0, 0)
        // groundDark.setScrollFactor(0)
        // // sinc this tile is shorter I positioned it at the bottom of he screen
        // groundDark.y = 550
        // platforms.add(groundDark)

        this.worldTimer = this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
            delay: 1000,
            callback: this.worldTime,
            callbackScope: this,
            loop: true,
          })


        platforms.create(800, 700, 'ground').setScale(4).refreshBody() // 삭제 예정 코드

        target.create(180, 500, 'star').setScale(4).refreshBody()
        target.create(300, 500, 'star').setScale(4).refreshBody()
        target.create(400, 500, 'star').setScale(4).refreshBody()

        player = this.physics.add.sprite(100, 500, 'dude')  // 플레이어 생성
        
        myCam = this.cameras.main
        myCam.setBackgroundColor(0xbababa) // 게임 배경색
        myCam.setBounds(0, 0, SETTING.WIDTH * 3, SETTING.HEIGHT)
        myCam.startFollow(player)  // 카메라 따라가기

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

        this.physics.add.collider(player, platforms) // 첫번째인자와 두번째 인자 충돌 관련
        this.physics.add.collider(stars, platforms)
        this.physics.add.collider(target, platforms)
    
        this.physics.add.overlap(player, stars, this.collectStar, undefined, this) // player와 stars가 만나면 3번째 함수 실행
        this.physics.add.collider(player, target, this.getSubcha, undefined, this)
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
        if (this.registry.values.life === 0) { // 게임 오버
            this.time.addEvent({
              delay: 300,
              callback: () => {
                this.add.tileSprite(0, 0, 800, 600, 'gameOver').setOrigin(0).setDepth(0)
                this.scene.pause()
              },
              callbackScope: this,
            })
          }
    }
    private worldTime(): void {
        this.registry.values.score += 10
        this.scoreText.setText(`SCORE ${this.registry.values.score}`)
        this.registry.values.life -= 100
        this.lifeText.setText(`LIFE ${this.registry.values.life}`)
    }

      collectStar (player: any, star: any):void {
        star.disableBody(true, true)
        if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child: any) {
                child.enableBody(true, child.x, 700, true, true)
            })
        }
      }

      // 점수 아이템
      // 서브캐 따라오기
      // 배경 밀림
      // 플레이어 땅위에
      // stage2, 3
      
      

      nextStage () : void {
        this.scene.start('Stage2', { score: this.registry.values.score, life: this.registry.values.life  })
      }

      getSubcha (player: any, target: any):void {
        target.disableBody(true, true)
        
        let bird = subchas.create(player.x - (30 + subchas.children.entries.length * 80), player.y, 'bird').setScale(0.14)
        subchas.add(bird)
        this.registry.values.score += 100
        this.scoreText.setText(`SCORE ${this.registry.values.score}`)

        
        
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

