class No {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

function somaLista(no) {

    if (no === null) {
        return 0;
    }

    return no.valor + somaLista(no.proximo);
}

let n1 = new No(10);
let n2 = new No(20);
let n3 = new No(30);

n1.proximo = n2;
n2.proximo = n3;

console.log(somaLista(n1));

//A função recursiva vai:

//Somar o valor do nó atual

//Chamar a função para o próximo nó

//Parar quando chegar em null