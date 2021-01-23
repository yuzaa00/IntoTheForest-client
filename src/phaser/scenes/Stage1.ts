import { group } from 'console'
import { Background } from '../object/BackGround'
import { SETTING } from '../../GameSetting/index'
import { Scene } from 'phaser'
import HealthBar from '../helper/healthBar'
// import { Dog } from '../object/dog'

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
let gate: any
let next: any
let enemies: any
let boneLayer: any
let subSquiLayer: any
let subBirdLayer: any
let potionLayer: any
let mushLayer: any
let signLayer: any
let bundLayer: any
let map: any
let count: number = 0
let isSub: boolean = false
let temp: any


export default class Stage1 extends Phaser.Scene {
    private hp!: any
    private scoreText!: Phaser.GameObjects.BitmapText
    private lifeText!: Phaser.GameObjects.BitmapText
    private worldTimer!: Phaser.Time.TimerEvent
    private isDoubleJump: boolean = false
    private stage1Bgm: any = this
    private button!: any
    private moveButton!: any
    private jumpButton!: any
    private birdArr: Array<any> = new Array<any>()
    private squiArr: Array<any> = new Array<any>()
    private birdIdx: number = 0
    private squiIdx: number = 0
    private fullWidth: number = 300
    private scoreMove: number = 510
    private autoRun!: any
    private moveHp!: any
    private enemiesTimer: Array<any> = [4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
    private enemiesOn: boolean = false
    
    constructor() {
      super('Stage1')
    }

    public init(): void {
      
        this.registry.set('score', 0)
        this.registry.set('life', 10000)
        this.registry.set('stage', 1)
    }

    public preload(): void {
      
      
      this.button = this.add.graphics().setDepth(8).setScrollFactor(0)
      this.button.lineStyle(4, 0x2a275c)
      
      this.button.fillStyle(0xfd6a41, 0.5)
      this.button.strokeRect(1030, 480, 140, 80)
      this.button.fillRect(1030, 480, 140, 80)

      this.moveButton = this.add
      .text(1100, 520, 'Jump', {
        color: '#2A275C',
        fontSize: '22px',
        fontStyle: 'bold',
      }).setDepth(8)
      .setOrigin(0.5).setScrollFactor(0).setScale(2)
      this.moveButton.setInteractive()
    
    }
  
    public create(): void {
      this.hp = new HealthBar(this, 240, 80)
      this.game.input.addPointer()

       this.stage1Bgm.sound.add('stage1_bgm').play({
            loop: true
        }) // 노래 재생하기
        this.stage1Bgm.sound.setVolume(0.1)
        
      
        this.physics.world.setBounds(0, 0, 30000, 600)

        this.lifeText = this.add // 라이프 텍스트 생성
        .bitmapText(30, 30, 'font', `LIFE ${this.registry.values.life}`)
        .setDepth(6)
        .setScrollFactor(0)
  
        this.scoreText = this.add // 점수 텍스트 생성 10000 490, 1000 500, 100 510
        .bitmapText(890, 30, 'font', `SCORE 00000`)
        .setDepth(6)
        .setScrollFactor(0)

        this.moveHp = this.add.text(925, 80, `${this.registry.values.life / 100}%`, {
          fontSize: '22px',
          fontStyle: 'bold',
          font: 'bold 20px Arial'
        })
        .setDepth(8)
        .setScrollFactor(0)

        skyTile = this.add.tileSprite(0, 0, 30000, 600, 'stage1').setScrollFactor(0).setOrigin(0).setDepth(0)
        platforms = this.physics.add.staticGroup()
        target = this.physics.add.staticGroup()
        subchas = this.physics.add.staticGroup()
        next = this.physics.add.staticGroup()
        enemies = this.physics.add.staticGroup()
        gate = this.physics.add.staticGroup()
        
        
        map = this.make.tilemap({ key: "map" })

        let boneTiles = map.addTilesetImage('bone')
        boneLayer = map.createLayer('boneLayer', boneTiles, 0, 0);
        boneLayer.setTileIndexCallback(3, this.collectBone, this).setDepth(1).setScale(1)
        
        let subSquiTiles =map.addTilesetImage('subSqui')
        subSquiLayer = map.createLayer('subSquiLayer', subSquiTiles, 0, 0)
        subSquiLayer.setTileIndexCallback(2, this.collectSubSqui, this).setDepth(1)
        
        let subBirdTiles = map.addTilesetImage('subBird');
        subBirdLayer = map.createLayer('subBirdLayer', subBirdTiles, 0, 0)
        subBirdLayer.setTileIndexCallback(1, this.collectSubBird, this).setDepth(1)
        
        let potionTiles = map.addTilesetImage('potion')
        potionLayer = map.createLayer('potionLayer', potionTiles, 0, 0)
        potionLayer.setTileIndexCallback(4, this.collectPotion, this).setDepth(1)
        
        let mushroomBallTiles = map.addTilesetImage('mushroom')
        mushLayer = map.createLayer('mushLayer', mushroomBallTiles, 0, 0)
        mushLayer.setTileIndexCallback(6, this.collectMush, this).setDepth(1)
        
        let signExitTiles = map.addTilesetImage('signExit')
        signLayer = map.createLayer('signLayer', signExitTiles, 0, 0)
        signLayer.setTileIndexCallback(7, this).setDepth(0)
        
        let bundTiles = map.addTilesetImage('bund')
        bundLayer = map.createLayer('bundLayer', bundTiles, 0, 0)
        bundLayer.setCollisionByExclusion(-1, true)
      
        groundDark = this.add.tileSprite(0, 622 , 30000, 100, 'way').setScrollFactor(0)
        
        platforms.add(groundDark)

        this.worldTimer = this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
            delay: 1000,
            callback: this.worldTime,
            callbackScope: this,
            loop: true,
          })
        this.autoRun = this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
            delay: 10,
            callback: this.autoMove,
            callbackScope: this,
            loop: true,
          })
        this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
          delay: 1000,
          callback: this.regenEnemy,
          callbackScope: this,
          loop: true,
        })
        // next.create(10000, 500, 'logo').setScale(2.2).refreshBody() 
        player = this.physics.add.sprite(28000, 400, 'dog').setScale(0.25).setDepth(3)  // 플레이어 생성 이동
        
        myCam = this.cameras.main
        myCam.setBackgroundColor(0xbababa) // 게임 배경색
        myCam.setBounds(-200, 0, Infinity, 200, true)
        this.cameras.main.startFollow(player)
        
        player.setCollideWorldBounds(true)
        
        this.anims.create({ // 플레이어 기본 프레임 4번
            key: 'turn',
            frames: [ { key: 'dog', frame: 0 } ], 
            frameRate: 10
        })
    
        this.anims.create({ // 플레이어 오른쪽 동작시 5번 ~ 8번 프레임 8fps로 재생
            key: 'right',
            frames: this.anims.generateFrameNumbers('dog', { start: 1, end: 8 }),
            frameRate: 10,
            repeat: -1
        })
        
        cursors = this.input.keyboard.createCursorKeys()

        stars = this.physics.add.group({  // 별 20개 생성 (현재는 좌표설정이 없어서 제대로 동작하지않음)
            key: 'star',
            repeat: 20,
        })

        
    
        this.physics.add.collider(player, bundLayer) // 첫번째인자와 두번째 인자간의 충돌 관련
        this.physics.add.collider(stars, platforms)
        this.physics.add.collider(target, platforms)
        this.physics.add.collider(subchas, groundDark)
        this.physics.add.collider(enemies, groundDark)
        
        // this.physics.add.collider(player, target, this.getSubcha, undefined, this) 
        this.physics.add.collider(player, next, this.nextStage, undefined, this) 
        this.physics.add.collider(player, enemies)
        
        this.physics.add.overlap(player, boneLayer, this.collectBone, undefined, this)
        this.physics.add.overlap(player, bundLayer, this.collectBund, undefined, this)
        this.physics.add.overlap(player, subSquiLayer, this.collectSubSqui, undefined, this)
        this.physics.add.overlap(player, subBirdLayer, this.collectSubBird, undefined, this)
        this.physics.add.overlap(player, potionLayer, this.collectPotion, undefined, this)
        this.physics.add.overlap(player, mushLayer, this.collectMush, undefined, this)
        this.physics.add.overlap(player, signLayer)

        //next.create(10000, 500, 'logo').setScale(2.2).refreshBody() 
        gate.create(30240, 400, 'cave').setDepth(1).setScale(1.5).refreshBody() 
        this.physics.add.overlap(player, gate, this.collectSignExit, undefined, this)


        player.setVelocityX(550)
    }
    
    public update(time: number, delta: number): void {  
      
      var pointer = this.game.input.activePointer

      this.moveButton.on(
        'pointerdown',
        () => {
            if (player.body.onFloor()) {
              this.isDoubleJump = true;
              player.body.setVelocityY(-850)
            } else if (this.isDoubleJump) {
              this.isDoubleJump = false;
              player.body.setVelocityY(-850)
            }
         }, this)    
         
        this.physics.world.wrap(player, 5000)
         // this.background.update()

        // if (cursors.right.isDown || this.game.input.pointers[1].isDown) { 
        //     player.anims.play('right', true)// 키보드 방향키 오른쪽 입력시 플레이어 +12 오른쪽이동
        //     player.setVelocityX(550)
        //     skyTile.tilePositionX += 0.3
        //     subchas.children.iterate(function (child: any, idx: number) {
        //       if(Phaser.Math.Distance.BetweenPoints(child, player) > 100 && child.x < player.x - (80 + idx * 80)) {
        //       child.setVelocityX(550)
        //     }
        //       else {
        //       child.setVelocityX(0)
        //     }       
        //     })
            
        // }
        // else {
        //     player.setVelocityX(0)
        //     player.anims.play('turn')
        //     subchas.children.iterate((child: any) => child.setVelocityX(0))
        // }
        
        const didJump = Phaser.Input.Keyboard.JustDown(cursors.space)
        
        if (didJump) {
          if (player.body.onFloor()) {
            this.isDoubleJump = true
            player.body.setVelocityY(-850)
            var self = this
            subchas.children.iterate(function (child: any, idx: number) {
              if(child.body.onFloor()) {
                setTimeout(() => child.setVelocityY(-850), (100 + idx * 150)) 
              }
            })
          } else if (this.isDoubleJump) {
            this.isDoubleJump = false
            player.body.setVelocityY(-850)
            subchas.children.iterate(function (child: any, idx: number) {
              setTimeout(() => child.setVelocityY(-850), (100 + idx * 180)) 
            })
          }
        }
      
        if (this.registry.values.life <= 0) { // 게임 오버
            this.game.sound.stopAll()
            this.scene.pause()
            this.scene.start('StageOver', { score: this.registry.values.score, stage: 1  })
          }
    }

    private worldTime(): void {  // 1초당 실행되는 함수 this.worldTimer 참조
        this.registry.values.score += 1
        this.scoreText.setText(`SCORE ${this.registry.values.score > 0 && this.registry.values.score < 10 ? '0000' : this.registry.values.score > 0 && this.registry.values.score < 100 ? '000' : this.registry.values.score >= 100 && this.registry.values.score < 1000 ? '00' : this.registry.values.score >= 1000 && this.registry.values.score < 10000 ? '0' : this.registry.values.score >= 10000 ? '' : null }${this.registry.values.score}`)
        this.registry.values.life -= 100
        this.lifeText.setText(`LIFE ${this.registry.values.life}`)
        this.hp.decrease(1)
        this.moveHp.setText(`${this.registry.values.life / 100}%`)
        this.moveHp.x -= 6.75
    }

    private autoMove(): void {  // 1초당 실행되는 함수 this.worldTimer 참조
      player.setVelocityX(550)
      let self = this
      console.log()
      
      subchas.children.iterate(function (child: any, idx: number): void {
        if(idx === 0 ) {
          self.physics.moveToObject(child, {x: player.x - 50 , y: player.y + 10}, 0, 150)
        }
        else {
          self.physics.moveToObject(child, {x: subchas.children.entries[idx - 1].x - 30 , y: subchas.children.entries[idx - 1].y - (idx * 2)}, 0, 150)
        }
      })
      player.anims.play('right', true)// 키보드 방향키 오른쪽 입력시 플레이어 +12 오른쪽이동
      skyTile.tilePositionX += 0.3
      // subchas.children.iterate(function (child: any, idx: number): void {
      //   if(Phaser.Math.Distance.BetweenPoints(child, player) > 100 && child.x < player.x - (80 + idx * 70)) {
      //     child.setVelocityX(580)
      //   }
      //   else {
      //     child.setVelocityX(0)
      //   }       
      // })
    }

      private regenEnemy(): void {
        if(!this.enemiesOn) {
          console.log('?')
          this.enemiesOn = true
          this.sound.add('wolfEcho').play()
          setTimeout(() => {
            let wolf = this.physics.add.image(player.x +1000, 530, 'wolf')
            wolf.setVelocityX(-600).setDepth(2)
            wolf.body.setAllowGravity(false)
            setTimeout(() => {
              wolf.destroy()
            },2000)
          },2000)
          setTimeout(() => {
            console.log('4천함수')
            this.enemiesOn = false
            console.log('넌 몇인데 ',this.enemiesTimer[Math.floor(Math.random() * 10)] * 1000)
          },this.enemiesTimer[Math.floor(Math.random() * 10)] * 1000)
        } 

      }

      subchaPickup (player: any, target: any):void { // 별 다모으면 다시 만드는 함수
        // target.x = player.x - 100
        // target.y = player.y
        subchas.children.iterate(function (child: any, idx: number) {
          
        })
      }

      collectBone(player: any, tile: any):void {
        boneLayer.removeTileAt(tile.x, tile.y)
      }

      collectSubSqui(player: any, tile: any):void {
        let getSqui = subSquiLayer.removeTileAt(tile.x, tile.y)
        if(getSqui.index !== -1) {
          this.getSubcha(player, 'squi')
        }
      }

      collectSubBird(player: any, tile: any):void {
        let getBird = subBirdLayer.removeTileAt(tile.x, tile.y)
        if(getBird.index !== -1) {
          this.getSubcha(player, 'bird')
        }
      }

      //collectOrangePotion(player: any, tile: any):void {
      //  OrangePotionLayer.removeTileAt(tile.x, tile.y)
      //}

      collectPotion(player: any, tile: any):void {
        let potion = potionLayer.removeTileAt(tile.x, tile.y)
        if(potion) {
          if(potion.index !== -1) {
            this.hp.decrease(-2)
            this.registry.values.life + 200 >= 10000 ? this.registry.values.life = 10000 : this.registry.values.life += 200
            this.lifeText.setText(`LIFE ${this.registry.values.life}`)
            this.moveHp.setText(`${this.registry.values.life / 100}%`)
            this.moveHp.x += 10
          }
        }
      }
      collectMush(player: any, tile: any):void {
        mushLayer.removeTileAt(tile.x, tile.y)
      }
      collectSignExit(player: any):void {
        if(gate.index !== -1) {
          this.game.sound.stopAll()
          this.scene.start('Stage1Event', { score: this.registry.values.score + 10000, life: this.registry.values.life, stage: 2, bird: this.birdArr.length, squi: this.squiArr.length  }) // stage1Event로 scene 이동 (데이터 이전) 
        }
      }
      collectBund(player: any, tile: any):void {
        
      }

      hello(): void {
        console.log('hello')
      }
      
      nextStage () : void { // 다음 스테이지로 넘어가는 함수
        this.game.sound.stopAll()
        this.scene.start('Stage1Event', { score: this.registry.values.score + 10000, life: this.registry.values.life + 1000, stage: 2  }) // stage1Event로 scene 이동 (데이터 이전)
      }
      
      //this.physics.add.collider(player, target, this.getSubcha, undefined, this) 에서 사용된 함수
      //서브캐 습득시 자리정렬과 스코어 합산
      getSubcha (player: any, name: string):void {
        if(name === 'bird') {
          let bird = this.physics.add.image(player.x, player.y, 'bird').setScale(0.12)
          // bird.body.setAllowGravity(false)
          bird.setCollideWorldBounds(true)
          bird.setDepth(4)
          this.birdArr.push(bird)
          subchas.add(bird)
        }

        if(name === 'squi') {
          let squi = this.physics.add.image(player.x , player.y , 'squi').setScale(0.13)
          // squi.body.setAllowGravity(false)
          squi.setCollideWorldBounds(true)
          squi.setDepth(4)
          this.squiArr.push(squi)
          subchas.add(squi)
        }
        // let bird = subchas.create(player.x - (30 + subchas.children.entries.length * 80), player.y, 'bird').setScale(0.14)
        this.registry.values.score += 500
        this.scoreText.setText(`SCORE ${this.registry.values.score > 0 && this.registry.values.score < 10 ? '0000' : this.registry.values.score > 0 && this.registry.values.score < 100 ? '000' : this.registry.values.score >= 100 && this.registry.values.score < 1000 ? '00' : this.registry.values.score >= 1000 && this.registry.values.score < 10000 ? '0' : this.registry.values.score >= 10000 ? '' : null }${this.registry.values.score}`)
      }    
} 

         // let selfs = this
      // subchas.children.iterate(function (child: any, idx: number) {
      //   if(child.texture.key === 'bird') {
      //     child.x = player.x - (70 + selfs.birdIdx * 40)
      //     child.y = player.y - 50 
      //     selfs.birdIdx++
      //   }
      //   else if(child.texture.key === 'squi') {
      //     child.x = player.x - (70 + selfs.squiIdx * 40)
      //     child.y = player.y + 15
      //     selfs.squiIdx++
      //   }
        
      //   if(selfs.squiArr.length + selfs.birdArr.length - 1 === idx) {
      //     selfs.squiIdx = 0
      //     selfs.birdIdx = 0
      //   }
      // }) 