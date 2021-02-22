import Phaser from 'phaser'
export default class preloadBar {
  constructor(scene, x, y) {
    this.bar = new Phaser.GameObjects.Graphics(scene)

    this.x = x
    this.y = y
    this.value = 0
    this.p = 5.66

    this.draw()
    scene.add.existing(this.bar)
  }
  
  set(value) {
    this.value = value
    this.draw()
  }

  decrease(amount) {
    this.value -= amount

    if (this.value < 0) {
      this.value = 0
    }

    if (this.value > 100) {
      this.value = 100
    }

    this.draw()
    if(this.value === 100) {
      return 'start'
    }
  }

  draw() {
    this.bar.clear()

    this.bar.fillStyle(0x000000)
    this.bar.fillRect(this.x, this.y, 570, 25)

    this.bar.fillStyle(0xffffff)

    if (this.value < 15) {
      this.bar.fillStyle(0xF5FDCF)
    }
    else if (this.value < 30) {
      this.bar.fillStyle(0xEAFCA0)
    }
    else if (this.value < 45) {
      this.bar.fillStyle(0xD8F66F)
    }
    else if (this.value < 60) {
      this.bar.fillStyle(0xC4ED4B)
    }
    else if (this.value < 75) {
      this.bar.fillStyle(0xA8E214)
    }
    else if(this.value < 90) {
      this.bar.fillStyle(0x8AC20E)
    }
    else {
      this.bar.fillStyle(0x6EA20A)
    }
    // else if (this.value < 80) {
    //   this.bar.fillStyle(0x558306)
    // }
    // else if (this.value < 90) {
    //   this.bar.fillStyle(0x426C03)
    // }
    // else {
    //   this.bar.fillStyle(0x228B22)
    // }
  
    let length = Math.floor(this.p * this.value)

    this.bar.fillRect(this.x + 2, this.y + 2, length, 21)
    this.bar.setDepth(8).setScrollFactor(0)
  }

}