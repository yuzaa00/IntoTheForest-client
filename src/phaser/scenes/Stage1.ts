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
let next: any

export default class Stage1 extends Phaser.Scene {
    private scoreText!: Phaser.GameObjects.BitmapText
    private lifeText!: Phaser.GameObjects.BitmapText
    private worldTimer!: Phaser.Time.TimerEvent

    constructor() {
      super('Stage1')
    }

    public init(): void {
        this.registry.set('score', 0)
        this.registry.set('life', 4000)
        this.registry.set('stage', 1)
    }
  
    public create(): void {
        this.physics.world.setBounds(0, 0, 6666, 600)

        this.lifeText = this.add // 라이프 텍스트 생성
        .bitmapText(30, 30, 'font', `LIFE ${this.registry.values.life}`)
        .setDepth(6)
        .setScrollFactor(0)
  
        this.scoreText = this.add // 점수 텍스트 생성
        .bitmapText(530, 30, 'font', `SCORE ${this.registry.values.score}`)
        .setDepth(6)
        .setScrollFactor(0)
        
        skyTile = this.add.tileSprite(0, 0, 8000, 600, 'skydark').setOrigin(0).setDepth(0) 
        platforms = this.physics.add.staticGroup()
        target = this.physics.add.staticGroup()
        subchas = this.physics.add.staticGroup()
        next = this.physics.add.staticGroup()

        groundDark = this.add.tileSprite(0, 0, SETTING.WIDTH, 160, 'way')
        groundDark.setOrigin(0, 0)
        groundDark.setScrollFactor(0)
        // sinc this tile is shorter I positioned it at the bottom of he screen
        groundDark.y = 475
        // platforms.add(groundDark)

        this.worldTimer = this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
            delay: 1000,
            callback: this.worldTime,
            callbackScope: this,
            loop: true,
          })

        // platforms.create(800, 700, 'ground').setScale(4).refreshBody() // 삭제 예정 코드

        target.create(180, 500, 'star').setScale(4).refreshBody()
        target.create(300, 500, 'star').setScale(4).refreshBody()
        target.create(400, 500, 'star').setScale(4).refreshBody()

        next.create(1750, 500, 'logo').setScale(0.5).refreshBody()

        player = this.physics.add.sprite(100, 500, 'dog').setScale(1.2)  // 플레이어 생성
        
        myCam = this.cameras.main
        myCam.setBackgroundColor(0xbababa) // 게임 배경색
        myCam.setBounds(0, 0, Infinity, 200, true)
        this.cameras.main.startFollow(player)
        
        player.setCollideWorldBounds(true)

        this.anims.create({  // 플레이어 왼쪽 동작시 0번 ~ 3번 프레임 8fps로 재생
            key: 'left',
            frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        })
    
        this.anims.create({ // 플레이어 기본 프레임 4번
            key: 'turn',
            frames: [ { key: 'dog', frame: 6 } ], 
            frameRate: 10
        })
    
        this.anims.create({ // 플레이어 오른쪽 동작시 5번 ~ 8번 프레임 8fps로 재생
            key: 'right',
            frames: this.anims.generateFrameNumbers('dog', { start: 7, end: 11 }),
            frameRate: 8,
            repeat: -1
        })
        
        cursors = this.input.keyboard.createCursorKeys()

        stars = this.physics.add.group({  // 별 20개 생성 (현재는 좌표설정이 없어서 제대로 동작하지않음)
            key: 'star',
            repeat: 20,
        })
    
        // stars.children.iterate(function (child: any):void {  // 별 뿌리는 함수
            
        // })

        this.physics.add.collider(player, platforms) // 첫번째인자와 두번째 인자간의 충돌 관련
        this.physics.add.collider(stars, platforms)
        this.physics.add.collider(target, platforms)
    
        this.physics.add.overlap(player, stars, this.collectStar, undefined, this) // player와 stars가 만나면 3번째 함수 실행
        this.physics.add.collider(player, target, this.getSubcha, undefined, this) // player와 target이 만나면 3번째 함수 실행
        this.physics.add.collider(player, next, this.nextStage, undefined, this) // player와 next가 만나면 3번째 함수 실행
    }
    
    public update(time: number, delta: number): void {
 
        this.physics.world.wrap(player, 5000)
         // this.background.update()
        if (cursors.left.isDown) {   // 키보드 방향키 왼쪽 입력시 플레이어 -12 왼쪽이동
            player.setVelocityX(-30)
            skyTile.tilePositionX -= 20
            player.anims.play('left', true)
        }

        else if (cursors.right.isDown) { // 키보드 방향키 오른쪽 입력시 플레이어 +12 오른쪽이동
            player.setVelocityX(150)
            skyTile.tilePositionX += 20
            player.anims.play('right', true)
                    
            subchas.children.iterate(function (child: any, idx: number) {  //서브캐릭들 붙이는 함수
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
        if (cursors.space.isDown) { // 스페이스바 입력시 점프
            player.setVelocityY(-330)
            subchas.children.iterate(function (child: any, idx: number) {
                if(player.y > child.y) {
                    child.y += 1
                }
            })
        }
        if (this.registry.values.life < 0) { // 게임 오버
            console.log('die')
            this.scene.pause()
            this.scene.start('StageOver', { score: this.registry.values.score, life: this.registry.values.life, stage: 1  })
          }
    }
    private worldTime(): void {  // 1초당 실행되는 함수 this.worldTimer 참조
        this.registry.values.score += 10
        this.scoreText.setText(`SCORE ${this.registry.values.score}`)
        this.registry.values.life -= 100
        this.lifeText.setText(`LIFE ${this.registry.values.life}`)
    }

      collectStar (player: any, star: any):void { // 별 다모으면 다시 만드는 함수
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
      // cloudfront 배포 
      
      nextStage () : void { // 다음 스테이지로 넘어가는 함수 (아직 사용중인 곳은 없음)
        this.scene.start('Stage1Event', { score: this.registry.values.score + 10000, life: this.registry.values.life + 1000, stage: 2  }) // stage1Event로 scene 이동 (데이터 이전)
      }
      
      //this.physics.add.collider(player, target, this.getSubcha, undefined, this) 에서 사용된 함수
      //서브캐 습득시 자리정렬과 스코어 합산
      getSubcha (player: any, target: any):void { 
        target.disableBody(true, true)
        
        let bird = subchas.create(player.x - (30 + subchas.children.entries.length * 80), player.y, 'bird').setScale(0.14)
        subchas.add(bird)
        this.registry.values.score += 100
        this.scoreText.setText(`SCORE ${this.registry.values.score}`)

    }
      
}

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