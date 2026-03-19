class Navegador {
    constructor() {
        this.voltar = [];
        this.avancar = [];
        this.paginaAtual = null;
    }

    visitar(pagina) {
        if (this.paginaAtual !== null) {
            this.voltar.push(this.paginaAtual);
        }

        this.paginaAtual = pagina;
        this.avancar = []; // limpa histórico de avanço

        console.log(`Visitando: ${pagina}`);
    }

    voltarPagina() {
        if (this.voltar.length === 0) {
            console.log("Não há páginas para voltar");
            return;
        }

        this.avancar.push(this.paginaAtual);
        this.paginaAtual = this.voltar.pop();

        console.log(`Voltou para: ${this.paginaAtual}`);
    }

    avancarPagina() {
        if (this.avancar.length === 0) {
            console.log("Não há páginas para avançar");
            return;
        }

        this.voltar.push(this.paginaAtual);
        this.paginaAtual = this.avancar.pop();

        console.log(`Avançou para: ${this.paginaAtual}`);
    }

    mostrarEstado() {
        console.log("Atual:", this.paginaAtual);
        console.log("Voltar:", this.voltar);
        console.log("Avançar:", this.avancar);
    }
}

const nav = new Navegador();

nav.visitar("google.com");
nav.visitar("youtube.com");
nav.visitar("github.com");

nav.voltarPagina();
nav.voltarPagina();

nav.avancarPagina();

nav.mostrarEstado();