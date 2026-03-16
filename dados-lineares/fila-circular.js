class FilaCircular {
    constructor(tamanho) {
        this.itens = new Array(tamanho);
        this.frente = 0;
        this.tras = -1;
        this.tamanho = tamanho;
        this.total = 0;
    }


    enfileirar(valor) {
        if (this.total === this.tamanho) { // se a quantidade de elementos for igual ao maximo da fila
            console.log("Fila cheia");
            return;
        }

        this.tras = (this.tras + 1) % this.tamanho; // Faz o ponteiro tras voltar para o inicio quando chega no final
        this.itens[this.tras] = valor;
        this.total++;
    }
    
    desenfileirar() {

        if (this.total === 0) {
            console.log("Fila vazia");
            return null;
        }
    
        const valor = this.itens[this.frente];
    
        this.frente = (this.frente + 1) % this.tamanho;
    
        this.total--;
    
        return valor;
    }

}

const fila = new FilaCircular(5);

fila.enfileirar(1);
fila.enfileirar(2);
fila.enfileirar(3);

console.log(fila.desenfileirar());

fila.enfileirar(4);
fila.enfileirar(5);
fila.enfileirar(6);