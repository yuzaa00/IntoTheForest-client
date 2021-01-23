import { SETTING } from '../../GameSetting/index'
import Phaser, { Scene } from 'phaser'
import HealthBar from '../helper/healthBar'


export default class Stage1 extends Phaser.Scene {
  private player!: any
  private hp!: HealthBar

  private map!: Phaser.Tilemaps.Tilemap
  private skyTile!: Phaser.GameObjects.TileSprite
  private ground!: Phaser.GameObjects.TileSprite
  private boneLayer!: Phaser.Tilemaps.TilemapLayer
  private subSquiLayer!: Phaser.Tilemaps.TilemapLayer
  private subBirdLayer!: Phaser.Tilemaps.TilemapLayer
  private yellowBallLayer!: Phaser.Tilemaps.TilemapLayer
  private potionLayer!: Phaser.Tilemaps.TilemapLayer
  private mushLayer!: Phaser.Tilemaps.TilemapLayer
  private signLayer!: Phaser.Tilemaps.TilemapLayer
  private bundLayer!: Phaser.Tilemaps.TilemapLayer
  private orangePotionLayer!: Phaser.Tilemaps.TilemapLayer

  private subchas!: any
  private enemies!: Phaser.Physics.Arcade.StaticGroup

  private myCam!: Phaser.Cameras.Scene2D.BaseCamera
  private scoreText!: Phaser.GameObjects.BitmapText
  private lifeText!: Phaser.GameObjects.BitmapText
  private moveHp!: Phaser.GameObjects.Text
  private spaceBar!: any

  private moveButton!: Phaser.GameObjects.Image
  private muteButton!: Phaser.GameObjects.Image

  private birdArr: Array<any> = new Array<any>()
  private squiArr: Array<any> = new Array<any>()
  private enemiesTimer: Array<any> = [4, 4, 5, 5, 6, 6, 7, 7, 8, 8]

  private pauseGame: boolean = false
  private isDoubleJump: boolean = false
  private enemiesOn: boolean = false
  private hurtOn: boolean = false

  private invincibility: any
  private reInvincibility: any
  private particles!: any

  constructor() {
    super('Stage1')
  }

  public init(): void { // 내부에서 사용할 데이터 초기화 설정
    this.registry.set('score', 0)
    this.registry.set('life', 9999)
    this.registry.set('stage', 1)
    this.registry.set('char', 'dog') //const state = store.getState())
  }

  public preload(): void {
    this.sound.volume = 0.2
    this.moveButton = this.add.image(SETTING.WIDTH - 1100, 500, 'jump')  // 버튼 위에 텍스트 추가
      .setDepth(8)
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setScale(2)
      .setInteractive()

    this.muteButton = this.add.image(1172, 33, 'pause')
      .setDepth(8)
      .setScrollFactor(0)
      .setInteractive()
      .setOrigin(0.5)
      .setScale(0.6)
      .on('pointerdown', () => {
        this.muteButton.setInteractive(false)
        if (!this.pauseGame) {
          this.pauseGame = true
          this.scene.pause()
          this.scene.launch('StageStop', {
            score: this.registry.values.score,
            life: this.registry.values.life,
            bird: this.birdArr.length,
            squi: this.squiArr.length,
            stage: 'Stage1',
            char: this.registry.values.char,
            mute: this.sound.mute
          })
        }
      }, this)
  }

  public create(): void {
    this.hp = new HealthBar(this, 270, 19)  // 체력바 인스턴스 생성
    this.game.input.addPointer() // 마우스 포인터

    this.sound.add('stage1_bgm').play({  //BGM 재생
      loop: true,
      volume: 0.3
    }) // 노래 재생하기


    this.physics.world.setBounds(0, 0, 30000, 600)

    this.lifeText = this.add // 라이프 텍스트 생성
      .bitmapText(23, 17, 'font', `LIFE ${this.registry.values.life}`)
      .setDepth(6)
      .setScrollFactor(0)

    this.scoreText = this.add // 점수 텍스트 생성 10000 490, 1000 500, 100 510
      .bitmapText(860, 17, 'font', `SCORE 00000`)
      .setDepth(6)
      .setScrollFactor(0)

    this.moveHp = this.add.text(800, 23, `${Math.floor((this.registry.values.life + 1) / 100)}%`, {
      fontSize: '22px',
      fontStyle: 'bold',
      font: 'bold 20px Arial'
    })
      .setDepth(8)
      .setScrollFactor(0)

    this.skyTile = this.add // 백그라운드 배경
      .tileSprite(0, 0, 30000, 600, 'stage1')
      .setScrollFactor(0)
      .setOrigin(0)
      .setDepth(0)
    this.subchas = this.physics.add.staticGroup()
    this.enemies = this.physics.add.staticGroup().setActive(true)

    this.map = this.make.tilemap({ key: "map" })

    let boneTiles = this.map.addTilesetImage('bone')  // 타일 로드 130 ~ 156
    this.boneLayer = this.map.createLayer('boneLayer', boneTiles, 0, 0);
    this.boneLayer.setTileIndexCallback(3, this.collectBone, this).setDepth(1).setScale(1)

    let subSquiTiles = this.map.addTilesetImage('subSqui')
    this.subSquiLayer = this.map.createLayer('subSquiLayer', subSquiTiles, 0, 0)
    this.subSquiLayer.setTileIndexCallback(2, this.collectSubSqui, this).setDepth(1)

    let subBirdTiles = this.map.addTilesetImage('subBird');
    this.subBirdLayer = this.map.createLayer('subBirdLayer', subBirdTiles, 0, 0)
    this.subBirdLayer.setTileIndexCallback(1, this.collectSubBird, this).setDepth(1)

    let potionTiles = this.map.addTilesetImage('potion')
    this.potionLayer = this.map.createLayer('potionLayer', potionTiles, 0, 0)
    this.potionLayer.setTileIndexCallback(4, this.collectPotion, this).setDepth(1)

    let mushroomBallTiles = this.map.addTilesetImage('mushroom')
    this.mushLayer = this.map.createLayer('mushLayer', mushroomBallTiles, 0, 0)
    this.mushLayer.setTileIndexCallback(6, this.collectMush, this).setDepth(1)

    let signExitTiles = this.map.addTilesetImage('signExit')
    this.signLayer = this.map.createLayer('signLayer', signExitTiles, 0, 0)
    this.signLayer.setTileIndexCallback(7, this.collectSignExit, this).setDepth(1)

    let bundTiles = this.map.addTilesetImage('bund')
    this.bundLayer = this.map.createLayer('bundLayer', bundTiles, 0, 0).setCollisionBetween(1, 50);

    let orangePotionTiles = this.map.addTilesetImage('orangePotion')
    this.orangePotionLayer = this.map.createLayer('potionLayer2', orangePotionTiles, 0, 0)
    this.orangePotionLayer.setTileIndexCallback(4, this.collectOrangePotion, this).setDepth(1)

    this.ground = this.add.tileSprite(0, 622, 30000, 100, 'way').setScrollFactor(0)

    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
      delay: 1000,
      callback: this.worldTime,
      callbackScope: this,
      loop: true,
    })
    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 0.01초당 콜백 호출 (콜백내용은 Auto Run)
      delay: 10,
      callback: this.autoMove,
      callbackScope: this,
      loop: true,
    })
    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1.5초당 콜백 호출 (콜백내용은 랜덤 몬스터 리젠)
      delay: 1500,
      callback: this.regenEnemy,
      callbackScope: this,
      loop: true,
    })
    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (일시정지 버튼 스로틀)
      delay: 1000,
      callback: () => this.pauseGame = false,
      callbackScope: this,
      loop: true,
    })

    this.player = this.physics.add
      .sprite(600, 400, this.registry.values.char) // 플레이어 생성 이동
      .setScale(0.25)
      .setDepth(3)  

    this.myCam = this.cameras.main
    this.myCam.setBackgroundColor(0xbababa) // 게임 배경색
    this.myCam.setBounds(-200, 0, Infinity, 200, true)
    this.cameras.main.startFollow(this.player)  // 카메라 캐릭터 따라다님

    this.player.setCollideWorldBounds(true)

    this.anims.create({ // 플레이어 기본 프레임 4번
      key: 'turn',
      frames: [{ key: 'dog', frame: 0 }],
      frameRate: 10
    })

    this.anims.create({ // 플레이어 오른쪽 동작시 5번 ~ 8번 프레임 8fps로 재생
      key: 'right',
      frames: this.anims.generateFrameNumbers('dog', { start: 1, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.physics.add.collider(this.player, this.bundLayer) // 첫번째인자와 두번째 인자간의 충돌 관련
    this.physics.add.collider(this.subchas, this.ground)
    this.physics.add.collider(this.enemies, this.ground)
    this.physics.add.collider(this.player, this.enemies, this.hurt, undefined, this)

    this.physics.add.overlap(this.player, this.boneLayer, this.collectBone, undefined, this)
    this.physics.add.overlap(this.player, this.subSquiLayer, this.collectSubSqui, undefined, this)
    this.physics.add.overlap(this.player, this.subBirdLayer, this.collectSubBird, undefined, this)
    this.physics.add.overlap(this.player, this.potionLayer, this.collectPotion, undefined, this)
    this.physics.add.overlap(this.player, this.orangePotionLayer, this.collectOrangePotion, undefined, this)
    this.physics.add.overlap(this.player, this.mushLayer, this.collectMush, undefined, this)
    this.physics.add.overlap(this.player, this.signLayer, this.collectSignExit, undefined, this)
    this.physics.add.overlap(this.player, this.enemies, this.hurt, undefined, this)

    this.particles = this.add.particles('particles')

    this.particles.createEmitter({ // 파티클 효과
      frame: ['smoke-puff', 'cloud', 'smoke-puff'],
      angle: { min: 240, max: 300 },
      speed: { min: 200, max: 300 },
      quantity: 10,
      lifespan: 2000,
      alpha: { start: 1, end: 0 },
      scale: { start: 1.5, end: 0.5 },
      on: false
    })
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  public update(): void {
    this.moveButton.on( // 버튼 점프
      'pointerdown',
      () => {
        if (this.player.body.onFloor()) {
          this.isDoubleJump = true;
          this.player.body.setVelocityY(-850)
        } else if (this.isDoubleJump) {
          this.isDoubleJump = false;
          this.player.body.setVelocityY(-850)
        }
      }, this)
    let didJump = Phaser.Input.Keyboard.JustDown(this.spaceBar) // 스페이스바 입력 감지

    if (didJump) {
      if (this.player.body.onFloor()) { // 점프 로직
        this.isDoubleJump = true
        this.player.body.setVelocityY(-850)
        this.subchas.children.iterate(function (child: any, idx: number) {
          if (child.body.onFloor()) {
            setTimeout(() => child.setVelocityY(-850), (100 + idx * 150))
          }
        })
      } else if (this.isDoubleJump) { //더블점프 로직
        this.isDoubleJump = false
        this.player.body.setVelocityY(-850)
        this.subchas.children.iterate(function (child: any, idx: number) {
          setTimeout(() => child.setVelocityY(-850), (100 + idx * 180))
        })
      }
    }

    if (this.registry.values.life <= 0) { // 게임 오버
      this.game.sound.stopAll()
      this.scene.pause()
      this.scene.start('StageOver', { score: this.registry.values.score, stage: 1 })
    }
  }

  private worldTime(): void {  // 타이머 콜백함수, 초당 체력 감소
    this.registry.values.score += 10
    this.scoreText.setText(`SCORE ${this.registry.values.score > 0 && this.registry.values.score < 10
        ? '0000' : this.registry.values.score > 0 && this.registry.values.score < 100
          ? '000' : this.registry.values.score >= 100 && this.registry.values.score < 1000
            ? '00' : this.registry.values.score >= 1000 && this.registry.values.score < 10000
              ? '0' : this.registry.values.score >= 10000
                ? '' : null}${this.registry.values.score}`)
    this.registry.values.life -= 100
    this.lifeText.setText(`LIFE ${this.registry.values.life}`)
    this.hp.decrease(1)
    this.moveHp.setText(`${Math.floor(this.registry.values.life / 100)}%`)
    this.moveHp.x -= 5.1
  }

  private autoMove(): void {  // 타이머 콜백함수, 자동 달리기
    this.player.setVelocityX(550)
    let self = this
    this.subchas.children.iterate(function (child: any, idx: number): void { // 서브캐릭터 강아지 따라오는 반복 함수
      self.physics.moveToObject(child, { x: self.player.x - (50 * idx), y: self.player.y + 10 }, 0, 150)
    }, this)
    this.player.anims.play('right', true)
    this.skyTile.tilePositionX += 0.3 // 배경 움직임
  }

  private regenEnemy(): void {
    if (!this.enemiesOn) {
      this.enemiesOn = true
      this.sound.add('wolfEcho').play()
      setTimeout(() => {
        let wolf = this.physics.add.image(this.player.x + 1000, 540, 'wolf')
        this.physics.world.enableBody(wolf, 0)
        wolf.setVelocityX(-650).setScale(1.2).setDepth(3).body.setAllowGravity(false)
        this.physics.add.collider(this.player, wolf, this.hurt, undefined, this)
        this.enemies.add(wolf)
      }, 2000)
      setTimeout(() => {
        this.enemiesOn = false
      }, this.enemiesTimer[Math.floor(Math.random() * 10)] * 1000)
    }
  }

  collectBone(player: any, tile: any): void { // 오브젝트 간 충돌 이벤트
    this.boneLayer.removeTileAt(tile.x, tile.y)
    if (tile.index !== -1) {
      this.sound.add('coin', { volume: 0.2 }).play()
      this.registry.values.score += 10
      this.scoreText.setText(`SCORE ${this.registry.values.score > 0 && this.registry.values.score < 10
          ? '0000' : this.registry.values.score > 0 && this.registry.values.score < 100
            ? '000' : this.registry.values.score >= 100 && this.registry.values.score < 1000
              ? '00' : this.registry.values.score >= 1000 && this.registry.values.score < 10000
                ? '0' : this.registry.values.score >= 10000
                  ? '' : null}${this.registry.values.score}`)
    }
  }

  collectSubSqui(player: any, tile: any): void { // 오브젝트 간 충돌 이벤트
    this.subSquiLayer.removeTileAt(tile.x, tile.y)
    if (tile.index !== -1) {
      this.getSubcha(player, 'squi')
    }
  }

  collectSubBird(player: any, tile: any): void { // 오브젝트 간 충돌 이벤트
    this.subBirdLayer.removeTileAt(tile.x, tile.y)
    if (tile.index !== -1) {
      this.getSubcha(player, 'bird')
    }
  }

  collectyellowBall(player: any, tile: any): void { // 오브젝트 간 충돌 이벤트
    this.yellowBallLayer.removeTileAt(tile.x, tile.y)
  }

  collectPotion(player: any, tile: any): void { // 오브젝트 간 충돌 이벤트
    this.potionLayer.removeTileAt(tile.x, tile.y)
    if (tile.index !== -1) {
      this.sound.add('heal', { volume: 2 }).play()
      this.hp.decrease(-2)
      this.registry.values.life + 200 >= 10000 ? this.registry.values.life = 10000 : this.registry.values.life += 200
      this.lifeText.setText(`LIFE ${this.registry.values.life}`)
      this.moveHp.setText(`${Math.floor(this.registry.values.life / 100)}%`)
      this.moveHp.x += 10
      player.setScale(0.4)
      clearTimeout(this.invincibility)
      this.hurtOn = true
      clearTimeout(this.reInvincibility)
      this.reInvincibility = setTimeout(() => {
        player.setScale(0.25)
        this.hurtOn = false
      }, 9000)
    }
  }

  collectOrangePotion(player: any, tile: any): void {
    this.orangePotionLayer.removeTileAt(tile.x, tile.y)
    if (tile.index !== -1) {
    }
  }

  collectMush(player: any, tile: any): void { // 오브젝트 간 충돌 이벤트
    this.mushLayer.removeTileAt(tile.x, tile.y)
  }

  collectSignExit(player: any, tile: any): void { // 오브젝트 간 충돌 이벤트
    this.signLayer.removeTileAt(tile.x, tile.y)
    if (tile.index !== -1) {
      this.game.sound.stopAll()
      this.scene.start('StageResult', {
        score: this.registry.values.score + 10000,
        life: this.registry.values.life, 
        stage: 2,
        bird: this.birdArr.length,
        squi: this.squiArr.length,
        char: this.registry.values.char
      }) // stage1Event로 scene (데이터 이전) 
    }
  }

  hurt(player: any, enemy: any): void { // 몬스터에게 피격 이벤트 함수
    if (!this.hurtOn) {
      this.hurtOn = true
      enemy.destroy()
      this.cameras.main.shake(1000, 0.06, true)
      this.sound.add('heat', { volume: 1 }).play()
      let sub = this.subchas.children.entries
      if (sub.length === 0) {
      }
      else {
        this.particles.emitParticleAt(sub[sub.length - 1].x - 100, sub[sub.length - 1].y)
        sub[sub.length - 1].destroy()
      }
      this.invincibility = setTimeout(() => this.hurtOn = false, 2000)
    }
    else {
      enemy.setDepth(8)
      this.physics.moveToObject(enemy, { x: player.x + 1350, y: player.y - 850 }, 0, 1300)
      this.time.addEvent({
      })
      let time = this.time.addEvent({ //  시간 이벤트 등록, 날아가는 몬스터 회전
        delay: 40,
        callback: () => enemy.angle += 100,
        callbackScope: this,
        loop: true,
      })
      setTimeout(() => {
        time.destroy()
        enemy.destroy()
      }, 2500)
    }
  }

  //서브캐 습득시 자리정렬과 스코어 합산
  getSubcha(player: any, name: string): void {
    if (name === 'bird') {
      let bird = this.physics.add.image(player.x, player.y, 'bird')
        .setScale(0.12)
        .setCollideWorldBounds(true)
        .setDepth(4)
      this.birdArr.push(bird)
      this.subchas.add(bird)
    }

    if (name === 'squi') {
      let squi = this.physics.add.image(player.x, player.y, 'squi')
        .setScale(0.13)
        .setCollideWorldBounds(true)
        .setDepth(4)
      this.squiArr.push(squi)
      this.subchas.add(squi)
    }
    this.sound.add('get', { volume: 1 }).play()
    this.registry.values.score += 500
    this.scoreText.setText(`SCORE ${this.registry.values.score > 0 && this.registry.values.score < 10
        ? '0000' : this.registry.values.score > 0 && this.registry.values.score < 100
          ? '000' : this.registry.values.score >= 100 && this.registry.values.score < 1000
            ? '00' : this.registry.values.score >= 1000 && this.registry.values.score < 10000
              ? '0' : this.registry.values.score >= 10000
                ? '' : null}${this.registry.values.score}`)
  }
} 