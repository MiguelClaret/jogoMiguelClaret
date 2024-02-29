class Incial extends Phaser.Scene {
    constructor(){
        super({key: 'Inicial'})
    }

    preload(){
        this.load.image('bg', '../assets/')
    }

    create(){
        this.add.image(600,300, 'bg')
    }
}