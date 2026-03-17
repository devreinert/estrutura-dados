class No {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

function inOrder(no) {
    if (no === null) return;

    inOrder(no.esquerda);
    console.log(no.valor);
    inOrder(no.direita);
}

function preOrder(no) {
    if (no === null) return;

    console.log(no.valor);
    preOrder(no.esquerda);
    preOrder(no.direita);
}

function postOrder(no) {
    if (no === null) return;

    postOrder(no.esquerda);
    postOrder(no.direita);
    console.log(no.valor);
}

class BST {
    constructor() {
        this.raiz = null;
    }

    inserir(valor) {
        const novo = new No(valor);

        if (this.raiz === null) {
            this.raiz = novo;
            return;
        }

        this._inserirRec(this.raiz, novo);
    }

    _inserirRec(no, novo) {
        if (novo.valor < no.valor) {
            if (no.esquerda === null) {
                no.esquerda = novo;
            } else {
                this._inserirRec(no.esquerda, novo);
            }
        } else {
            if (no.direita === null) {
                no.direita = novo;
            } else {
                this._inserirRec(no.direita, novo);
            }
        }
    }

    buscar(valor) {
        return this._buscarRec(this.raiz, valor);
    }

    _buscarRec(no, valor) {
        if (no === null) return false;

        if (valor === no.valor) return true;

        if (valor < no.valor) {
            return this._buscarRec(no.esquerda, valor);
        } else {
            return this._buscarRec(no.direita, valor);
        }
    }

    remover(valor) {
        this.raiz = this._removerRec(this.raiz, valor);
    }

    _removerRec(no, valor) {
        if (no === null) return null;

        if (valor < no.valor) {
            no.esquerda = this._removerRec(no.esquerda, valor);
        } else if (valor > no.valor) {
            no.direita = this._removerRec(no.direita, valor);
        } else {

            // Caso 1: sem filhos
            if (no.esquerda === null && no.direita === null) {
                return null;
            }

            // Caso 2: um filho
            if (no.esquerda === null) {
                return no.direita;
            }

            if (no.direita === null) {
                return no.esquerda;
            }

            // Caso 3: dois filhos
            let menor = this._minimo(no.direita);
            no.valor = menor.valor;
            no.direita = this._removerRec(no.direita, menor.valor);
        }

        return no;
    }

    _minimo(no) {
        while (no.esquerda !== null) {
            no = no.esquerda;
        }
        return no;
    }
}

let arvore = new BST();

[50, 30, 70, 20, 40, 60, 80].forEach(v => arvore.inserir(v));

console.log("In-order:");
inOrder(arvore.raiz);

console.log("Buscar 40:", arvore.buscar(40));

arvore.remover(30);

console.log("Após remover 30:");
inOrder(arvore.raiz);