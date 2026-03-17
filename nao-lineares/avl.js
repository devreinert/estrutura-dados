class No {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
        this.altura = 1;
    }
}

class AVL {
    constructor() {
        this.raiz = null;
    }

    // ===== FUNÇÕES AUXILIARES =====

    altura(no) {
        return no ? no.altura : 0;
    }

    fatorBalanceamento(no) {
        return no ? this.altura(no.esquerda) - this.altura(no.direita) : 0;
    }

    atualizarAltura(no) {
        no.altura = 1 + Math.max(this.altura(no.esquerda), this.altura(no.direita));
    }

    // ===== ROTAÇÕES =====

    rotacaoDireita(y) {
        let x = y.esquerda;
        let T2 = x.direita;

        x.direita = y;
        y.esquerda = T2;

        this.atualizarAltura(y);
        this.atualizarAltura(x);

        return x;
    }

    rotacaoEsquerda(x) {
        let y = x.direita;
        let T2 = y.esquerda;

        y.esquerda = x;
        x.direita = T2;

        this.atualizarAltura(x);
        this.atualizarAltura(y);

        return y;
    }

    // ===== INSERÇÃO =====

    inserir(valor) {
        this.raiz = this._inserir(this.raiz, valor);
    }

    _inserir(no, valor) {
        if (!no) return new No(valor);

        if (valor < no.valor) {
            no.esquerda = this._inserir(no.esquerda, valor);
        } else if (valor > no.valor) {
            no.direita = this._inserir(no.direita, valor);
        } else {
            return no;
        }

        this.atualizarAltura(no);

        let balance = this.fatorBalanceamento(no);

        // LL
        if (balance > 1 && valor < no.esquerda.valor)
            return this.rotacaoDireita(no);

        // RR
        if (balance < -1 && valor > no.direita.valor)
            return this.rotacaoEsquerda(no);

        // LR
        if (balance > 1 && valor > no.esquerda.valor) {
            no.esquerda = this.rotacaoEsquerda(no.esquerda);
            return this.rotacaoDireita(no);
        }

        // RL
        if (balance < -1 && valor < no.direita.valor) {
            no.direita = this.rotacaoDireita(no.direita);
            return this.rotacaoEsquerda(no);
        }

        return no;
    }

    // ===== BUSCA =====

    buscar(valor) {
        return this._buscar(this.raiz, valor);
    }

    _buscar(no, valor) {
        if (!no) return false;

        if (valor === no.valor) return true;

        if (valor < no.valor) {
            return this._buscar(no.esquerda, valor);
        } else {
            return this._buscar(no.direita, valor);
        }
    }

    // ===== REMOÇÃO =====

    remover(valor) {
        this.raiz = this._remover(this.raiz, valor);
    }

    _remover(no, valor) {
        if (!no) return no;

        if (valor < no.valor) {
            no.esquerda = this._remover(no.esquerda, valor);
        } else if (valor > no.valor) {
            no.direita = this._remover(no.direita, valor);
        } else {

            // 1 ou nenhum filho
            if (!no.esquerda || !no.direita) {
                return no.esquerda || no.direita;
            }

            // 2 filhos
            let temp = this._minimo(no.direita);
            no.valor = temp.valor;
            no.direita = this._remover(no.direita, temp.valor);
        }

        this.atualizarAltura(no);

        let balance = this.fatorBalanceamento(no);

        // LL
        if (balance > 1 && this.fatorBalanceamento(no.esquerda) >= 0)
            return this.rotacaoDireita(no);

        // LR
        if (balance > 1 && this.fatorBalanceamento(no.esquerda) < 0) {
            no.esquerda = this.rotacaoEsquerda(no.esquerda);
            return this.rotacaoDireita(no);
        }

        // RR
        if (balance < -1 && this.fatorBalanceamento(no.direita) <= 0)
            return this.rotacaoEsquerda(no);

        // RL
        if (balance < -1 && this.fatorBalanceamento(no.direita) > 0) {
            no.direita = this.rotacaoDireita(no.direita);
            return this.rotacaoEsquerda(no);
        }

        return no;
    }

    _minimo(no) {
        while (no.esquerda) {
            no = no.esquerda;
        }
        return no;
    }

    // ===== PERCURSOS =====

    inOrder(no = this.raiz) {
        if (!no) return;
        this.inOrder(no.esquerda);
        console.log(no.valor);
        this.inOrder(no.direita);
    }

    preOrder(no = this.raiz) {
        if (!no) return;
        console.log(no.valor);
        this.preOrder(no.esquerda);
        this.preOrder(no.direita);
    }

    postOrder(no = this.raiz) {
        if (!no) return;
        this.postOrder(no.esquerda);
        this.postOrder(no.direita);
        console.log(no.valor);
    }
}

// ===== TESTE =====

let arvore = new AVL();

// Inserindo valores
[10, 20, 30, 40, 50, 25].forEach(v => arvore.inserir(v));

console.log("In-order:");
arvore.inOrder();

console.log("Buscar 25:", arvore.buscar(25));

// Remoção
arvore.remover(40);

console.log("Após remover 40:");
arvore.inOrder();