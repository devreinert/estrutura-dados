class No {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

function buscar(no, valor) {

    if (no === null) {
        return false;
    }

    if (valor === no.valor) {
        return true;
    }

    if (valor < no.valor) {
        return buscar(no.esquerda, valor);
    } else {
        return buscar(no.direita, valor);
    }
}

let raiz = new No(50);

raiz.esquerda = new No(30);
raiz.direita = new No(70);

raiz.esquerda.esquerda = new No(20);
raiz.esquerda.direita = new No(40);

console.log(buscar(raiz, 40)); // true
console.log(buscar(raiz, 90)); // false