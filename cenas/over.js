

class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    preload() {
        this.load.image('tela', '../assets/telaOver.png')
        this.load.image('dnv', '../assets/again.png')
    }

    create() {
        this.add.image(300, 300, 'tela')
        let botao = this.add.image(300, 500, 'dnv').setScale(1.75)

        botao.setInteractive()
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('Fase01');
        })
    };
}