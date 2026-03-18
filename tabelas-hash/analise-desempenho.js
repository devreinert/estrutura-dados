function hash(chave, tamanho) {
    let h = 0;
    for (let i = 0; i < chave.length; i++) {
        h = (h * 31 + chave.charCodeAt(i)) % tamanho;
    }
    return h;
}

class HashTable {
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

    remover(chave) {
        const i = hash(chave, this.tamanho);
        const bucket = this.tabela[i];

        for (let j = 0; j < bucket.length; j++) {
            if (bucket[j].chave === chave) {
                bucket.splice(j, 1);
                return true;
            }
        }
        return false;
    }
}

function testar(tamanho) {
    const tabela = new HashTable(tamanho);
    const chaves = [];

    // gerar dados
    for (let i = 0; i < 500; i++) {
        const chave = "chave" + i;
        chaves.push(chave);
        tabela.inserir(chave, i);
    }

    // medir busca
    console.time(`Busca tamanho ${tamanho}`);
    for (let chave of chaves) {
        tabela.buscar(chave);
    }
    console.timeEnd(`Busca tamanho ${tamanho}`);

    // medir remoção
    console.time(`Remoção tamanho ${tamanho}`);
    for (let chave of chaves) {
        tabela.remover(chave);
    }
    console.timeEnd(`Remoção tamanho ${tamanho}`);
}

// executar testes
testar(50);
testar(100);
testar(250);