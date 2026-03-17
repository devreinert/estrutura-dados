class No {
    constructor(chave, valor) {
        this.chave = chave;
        this.valor = valor;
        this.proximo = null;
    }
}

class ListaEncadeada {
    constructor() {
        this.cabeca = null;
    }

    inserir(chave, valor) {
        let atual = this.cabeca;

        // verifica se já existe
        while (atual) {
            if (atual.chave === chave) {
                atual.valor = valor;
                return;
            }
            atual = atual.proximo;
        }

        // insere no início (mais simples)
        const novo = new No(chave, valor);
        novo.proximo = this.cabeca;
        this.cabeca = novo;
    }

    buscar(chave) {
        let atual = this.cabeca;

        while (atual) {
            if (atual.chave === chave) {
                return atual.valor;
            }
            atual = atual.proximo;
        }

        return null;
    }

    remover(chave) {
        let atual = this.cabeca;
        let anterior = null;

        while (atual) {
            if (atual.chave === chave) {
                if (anterior === null) {
                    this.cabeca = atual.proximo;
                } else {
                    anterior.proximo = atual.proximo;
                }
                return true;
            }

            anterior = atual;
            atual = atual.proximo;
        }

        return false;
    }

    imprimir() {
        let atual = this.cabeca;
        let resultado = "";

        while (atual) {
            resultado += `(${atual.chave}: ${atual.valor}) -> `;
            atual = atual.proximo;
        }

        return resultado + "null";
    }
}

function hash(chave, tamanho) {
    let hash = 0;

    for (let i = 0; i < chave.length; i++) {
        hash = (hash * 31 + chave.charCodeAt(i)) % tamanho;
    }

    return hash;
}

class TabelaHash {
    constructor(tamanho = 5) {
        this.tabela = new Array(tamanho);
        this.tamanho = tamanho;
    }

    inserir(chave, valor) {
        const indice = hash(chave, this.tamanho);

        if (!this.tabela[indice]) {
            this.tabela[indice] = new ListaEncadeada();
        }

        this.tabela[indice].inserir(chave, valor);
    }

    buscar(chave) {
        const indice = hash(chave, this.tamanho);

        if (!this.tabela[indice]) return null;

        return this.tabela[indice].buscar(chave);
    }

    remover(chave) {
        const indice = hash(chave, this.tamanho);

        if (!this.tabela[indice]) return false;

        return this.tabela[indice].remover(chave);
    }

    mostrarTabela() {
        for (let i = 0; i < this.tamanho; i++) {
            console.log(i, ":", this.tabela[i]?.imprimir() || "vazio");
        }
    }
}

const alunos = new TabelaHash();

alunos.inserir("ana", 8);
alunos.inserir("joao", 7);
alunos.inserir("maria", 9);
alunos.inserir("carlos", 6);
alunos.inserir("pedro", 5);

// força colisão (provavelmente cai no mesmo índice)
alunos.inserir("ana2", 10);

alunos.mostrarTabela();

console.log("Buscar maria:", alunos.buscar("maria"));

alunos.remover("joao");

console.log("Depois de remover joao:");
alunos.mostrarTabela();