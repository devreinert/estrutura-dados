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

        while (atual) {
            if (atual.chave === chave) {
                atual.valor = valor; // atualiza
                return;
            }
            atual = atual.proximo;
        }

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
}

function hash(chave, tamanho) {
    let soma = 0;

    for (let i = 0; i < chave.length; i++) {
        soma += chave.charCodeAt(i);
    }

    return soma % tamanho;
}

class Dicionario {
    constructor(tamanho = 10) {
        this.tabela = new Array(tamanho);
        this.tamanho = tamanho;
    }

    adicionar(palavra, significado) {
        const indice = hash(palavra, this.tamanho);

        if (!this.tabela[indice]) {
            this.tabela[indice] = new ListaEncadeada();
        }

        this.tabela[indice].inserir(palavra, significado);
    }

    buscar(palavra) {
        const indice = hash(palavra, this.tamanho);

        if (!this.tabela[indice]) {
            return "Palavra não encontrada.";
        }

        const resultado = this.tabela[indice].buscar(palavra);

        return resultado || "Palavra não encontrada.";
    }

    remover(palavra) {
        const indice = hash(palavra, this.tamanho);

        if (!this.tabela[indice]) {
            return "Palavra não encontrada.";
        }

        const removido = this.tabela[indice].remover(palavra);

        return removido ? "Removido com sucesso." : "Palavra não encontrada.";
    }

    mostrar() {
        for (let i = 0; i < this.tamanho; i++) {
            let atual = this.tabela[i]?.cabeca;
            let linha = "";

            while (atual) {
                linha += `[${atual.chave}: ${atual.valor}] -> `;
                atual = atual.proximo;
            }

            console.log(i, ":", linha || "vazio");
        }
    }
}

const dic = new Dicionario();

// inserir
dic.adicionar("casa", "lugar para morar");
dic.adicionar("carro", "veículo");
dic.adicionar("gato", "animal doméstico");

// buscar
console.log(dic.buscar("casa"));
console.log(dic.buscar("gato"));
console.log(dic.buscar("banana")); // não existe

// remover
console.log(dic.remover("carro"));
console.log(dic.remover("carro")); // já removido

// visualizar tabela
dic.mostrar();
