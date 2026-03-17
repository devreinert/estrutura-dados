class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // ===== AUXILIARES =====

    pai(i) {
        return Math.floor((i - 1) / 2);
    }

    esquerda(i) {
        return 2 * i + 1;
    }

    direita(i) {
        return 2 * i + 2;
    }

    trocar(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // ===== INSERÇÃO =====

    inserir(valor) {
        this.heap.push(valor);
        this.subir(this.heap.length - 1);
    }

    subir(i) {
        while (i > 0 && this.heap[this.pai(i)] < this.heap[i]) {
            this.trocar(i, this.pai(i));
            i = this.pai(i);
        }
    }

    // ===== REMOVER MAIOR =====

    removerMax() {
        if (this.heap.length === 0) return null;

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        let max = this.heap[0];
        this.heap[0] = this.heap.pop();

        this.descer(0);

        return max;
    }

    descer(i) {
        let maior = i;
        let esq = this.esquerda(i);
        let dir = this.direita(i);

        if (esq < this.heap.length && this.heap[esq] > this.heap[maior]) {
            maior = esq;
        }

        if (dir < this.heap.length && this.heap[dir] > this.heap[maior]) {
            maior = dir;
        }

        if (maior !== i) {
            this.trocar(i, maior);
            this.descer(maior);
        }
    }

    // ===== VER MAIOR =====

    peek() {
        return this.heap[0] || null;
    }
}

// ===== FILA DE PRIORIDADE =====

class FilaPrioridade {
    constructor() {
        this.heap = new MaxHeap();
    }

    enfileirar(valor) {
        this.heap.inserir(valor);
    }

    desenfileirar() {
        return this.heap.removerMax();
    }

    maior() {
        return this.heap.peek();
    }
}

// ===== TESTE =====

let fila = new FilaPrioridade();

fila.enfileirar(10);
fila.enfileirar(50);
fila.enfileirar(30);
fila.enfileirar(20);

console.log("Maior:", fila.maior()); // 50

console.log("Removido:", fila.desenfileirar()); // 50
console.log("Removido:", fila.desenfileirar()); // 30
console.log("Removido:", fila.desenfileirar()); // 20
console.log("Removido:", fila.desenfileirar()); // 10