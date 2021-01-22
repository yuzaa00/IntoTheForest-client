export default class HealthBar {
    constructor (scene, x, y) {     
        this.bar = new Phaser.GameObjects.Graphics(scene)

        this.x = x
        this.y = y
        this.value = 100
        this.p = 7.280

        this.draw()
        scene.add.existing(this.bar)
    }

    set (value) {
        this.value = value
        this.draw()
    }

    decrease (amount) {
        this.value -= amount

        if (this.value < 0) {
            this.value = 0
        }

        if (this.value > 100) {
            this.value = 100
        }

        this.draw()
        return (this.value === 0)
    }

    draw () {
        this.bar.clear()

        this.bar.fillStyle(0x000000)
        this.bar.fillRect(this.x, this.y, 733, 24)

        this.bar.fillStyle(0xffffff)
  
        if (this.value < 20) {
            this.bar.fillStyle(0xff0000)
        }
        else if(this.value < 40) {
            this.bar.fillStyle(0xFFA500)
        }
        else if(this.value < 60) {
            this.bar.fillStyle(0xFFFF00)
        }
        else {
            this.bar.fillStyle(0x00ff00)
        }
        let length = Math.floor(this.p * this.value)
        
        this.bar.fillRect(this.x + 2, this.y + 2, length, 20)
        this.bar.setDepth(8).setScrollFactor(0)
    }

}