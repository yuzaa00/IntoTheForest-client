export default class Card {
    constructor({key, gameScene, x, y, handler}) {
      this.key = key
      this.gameScene = gameScene
      this.handler = handler
      this.outOfTheGame = false;
      this.draw(x, y)
      console.log(x, y)
    }
  
    draw(x, y) {
      this.frontbg = this.gameScene.add.sprite(x, y, 'front.png').setInteractive().setScale(0.6)
      this.cover = this.gameScene.add.sprite(x, y, 'back.png').setInteractive().setScale(0.6)

      if(this.key === 'card8.png') { // 새
        this.front = this.gameScene.add.sprite(x, y, this.key).setInteractive().setScale(0.5)
      } else if(this.key === 'card2.png') { // 치와와
        this.front = this.gameScene.add.sprite(x, y, this.key).setInteractive().setScale(0.5)
      } else if(this.key === 'card3.png') { // 늑대
        this.front = this.gameScene.add.sprite(x, y, this.key).setInteractive().setScale(0.5)
      } else {
        this.front = this.gameScene.add.sprite(x, y, this.key).setInteractive().setScale(0.6)
      }

      this.cover.on('pointerdown', this.onClickHandler.bind(this))
      this.front.on('pointerdown', this.onClickHandler.bind(this))
  
      this.faceDown()
    }
  
    readOnly () {
      this.outOfTheGame = true
    }
  
    isVisible () {
      return this.front.visible
    }
  
    faceDown() {
      if (!this.outOfTheGame) {
        this.frontbg.visible = false
        this.front.visible = false
        this.cover.visible = true
      }
    }
  
    faceUp() {
      if (!this.outOfTheGame) {
        this.frontbg.visible = true
        this.front.visible = true
        this.cover.visible = false
      }
    }
  
    onClickHandler() {
      this.handler(this)
    }
  }