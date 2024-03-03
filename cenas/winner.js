

class telaWinner extends Phaser.Scene {
    constructor() {
        super({ key: 'telaWinner' });
    }

    preload() {
        this.load.image('win', '../assets/win.png')
        this.load.image('dnv1', '../assets/again.png')
    }

    create() {
        this.add.image(300, 300, 'win')
        let botao = this.add.image(300, 500, 'dnv1').setScale(1.5)

        botao.setInteractive()
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('telaInicial');
        })
    };
}