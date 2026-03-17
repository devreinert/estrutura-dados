function hash(chave, tamanho) {
    let soma = 0;
    for (let i = 0; i < chave.length; i++) {
        soma += chave.charCodeAt(i);
    }
    return soma % tamanho;
}

class HashEncadeamento {
    constructor(tamanho) {
        this.tabela = new Array(tamanho).fill(null).map(() => []);
        this.tamanho = tamanho;
    }

    inserir(chave, valor) {
        const i = hash(chave, this.tamanho);
        this.tabela[i].push({ chave, valor });
    }

    buscar(chave) {
        const i = hash(chave, this.tamanho);
        for (let item of this.tabela[i]) {
            if (item.chave === chave) return item.valor;
        }
        return null;
    }
}

class HashLinear {
    constructor(tamanho) {
        this.tabela = new Array(tamanho).fill(null);
        this.tamanho = tamanho;
    }

    inserir(chave, valor) {
        let i = hash(chave, this.tamanho);

        while (this.tabela[i] !== null && this.tabela[i].chave !== chave) {
            i = (i + 1) % this.tamanho;
        }

        this.tabela[i] = { chave, valor };
    }

    buscar(chave) {
        let i = hash(chave, this.tamanho);
        let inicio = i;

        while (this.tabela[i] !== null) {
            if (this.tabela[i].chave === chave) {
                return this.tabela[i].valor;
            }

            i = (i + 1) % this.tamanho;
            if (i === inicio) break;
        }

        return null;
    }
}

const TAMANHO = 1333; // load factor ~0.75
const N = 1000;

const enc = new HashEncadeamento(TAMANHO);
const lin = new HashLinear(TAMANHO);

const chaves = [];

// gerar dados
for (let i = 0; i < N; i++) {
    chaves.push("chave" + i);
}

// 🔹 Inserção
console.time("Encadeamento - Inserir");
for (let i = 0; i < N; i++) {
    enc.inserir(chaves[i], i);
}
console.timeEnd("Encadeamento - Inserir");

console.time("Linear - Inserir");
for (let i = 0; i < N; i++) {
    lin.inserir(chaves[i], i);
}
console.timeEnd("Linear - Inserir");

// 🔹 Busca
console.time("Encadeamento - Buscar");
for (let i = 0; i < N; i++) {
    enc.buscar(chaves[i]);
}
console.timeEnd("Encadeamento - Buscar");

console.time("Linear - Buscar");
for (let i = 0; i < N; i++) {
    lin.buscar(chaves[i]);
}
console.timeEnd("Linear - Buscar");