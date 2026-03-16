class No {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

function contarNos(no) {

    if (no === null) {
        return 0;
    }

    return 1 + contarNos(no.proximo);
}

let n1 = new No(10);
let n2 = new No(20);
let n3 = new No(30);
let n4 = new No(40);

n1.proximo = n2;
n2.proximo = n3;
n3.proximo = n4;

console.log(contarNos(n1));