

class telaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'telaInicial' });
    }

    preload() {
        this.load.image('cena', 'assets/telaInicial.png')
        this.load.image('play', 'assets/botao-play.png')
    }

    create() {
        this.add.image(300, 300, 'cena')
        let botao = this.add.image(300, 500, 'play').setScale(0.7)

        botao.setInteractive()
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('Fase01');
        })
    };
}