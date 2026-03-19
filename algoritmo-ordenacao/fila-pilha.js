class FilaImpressao {
    constructor() {
        this.fila = [];
    }

    // adicionar documento
    adicionar(documento) {
        this.fila.push(documento);
        console.log(`Documento "${documento}" adicionado à fila`);
    }

    // imprimir documento mais antigo
    imprimir() {
        if (this.estaVazia()) {
            console.log("Fila vazia");
            return;
        }

        const doc = this.fila.shift();
        console.log(`Imprimindo: "${doc}"`);
    }

    estaVazia() {
        return this.fila.length === 0;
    }

    mostrarFila() {
        console.log("Fila:", this.fila);
    }
}

const impressora = new FilaImpressao();

impressora.adicionar("doc1.pdf");
impressora.adicionar("doc2.pdf");
impressora.adicionar("doc3.pdf");

impressora.mostrarFila();

impressora.imprimir();
impressora.imprimir();

impressora.mostrarFila();