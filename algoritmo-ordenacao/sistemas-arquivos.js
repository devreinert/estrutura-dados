// ---------------- NÓ DA ÁRVORE B+ ----------------
class NoBPlus {
    constructor(folha = false) {
        this.folha = folha;
        this.chaves = [];
        this.filhos = [];
        this.proximo = null; // usado nas folhas
    }
}

// ---------------- ÁRVORE B+ ----------------
class ArvoreBPlus {
    constructor(ordem = 3) {
        this.raiz = new NoBPlus(true);
        this.ordem = ordem;
    }

    // BUSCA
    buscar(chave, no = this.raiz) {
        let i = 0;

        while (i < no.chaves.length && chave > no.chaves[i]) {
            i++;
        }

        if (no.folha) {
            return no.chaves[i] === chave;
        }

        return this.buscar(chave, no.filhos[i]);
    }

    // INSERÇÃO SIMPLIFICADA
    inserir(chave) {
        let raiz = this.raiz;

        if (raiz.chaves.length === this.ordem - 1) {
            let novaRaiz = new NoBPlus(false);
            novaRaiz.filhos.push(raiz);
            this.dividirFilho(novaRaiz, 0);
            this.raiz = novaRaiz;
        }

        this.inserirNaoCheio(this.raiz, chave);
    }

    inserirNaoCheio(no, chave) {
        let i = no.chaves.length - 1;

        if (no.folha) {
            no.chaves.push(chave);
            no.chaves.sort((a, b) => a - b);
        } else {
            while (i >= 0 && chave < no.chaves[i]) {
                i--;
            }
            i++;

            if (no.filhos[i].chaves.length === this.ordem - 1) {
                this.dividirFilho(no, i);

                if (chave > no.chaves[i]) {
                    i++;
                }
            }

            this.inserirNaoCheio(no.filhos[i], chave);
        }
    }

    dividirFilho(pai, i) {
        let ordem = this.ordem;
        let filho = pai.filhos[i];
        let novo = new NoBPlus(filho.folha);

        let meio = Math.floor((ordem - 1) / 2);

        novo.chaves = filho.chaves.splice(meio + 1);
        let promovido = filho.chaves.pop();

        if (!filho.folha) {
            novo.filhos = filho.filhos.splice(meio + 1);
        } else {
            novo.proximo = filho.proximo;
            filho.proximo = novo;
        }

        pai.chaves.splice(i, 0, promovido);
        pai.filhos.splice(i + 1, 0, novo);
    }

    // REMOÇÃO SIMPLIFICADA
    remover(chave, no = this.raiz) {
        let i = no.chaves.findIndex(k => k === chave);

        if (no.folha) {
            if (i !== -1) {
                no.chaves.splice(i, 1);
            }
            return;
        }

        let j = 0;
        while (j < no.chaves.length && chave > no.chaves[j]) {
            j++;
        }

        this.remover(chave, no.filhos[j]);
    }
}

// ---------------- SISTEMA DE ARQUIVOS ----------------
class SistemaArquivos {
    constructor() {
        this.arvore = new ArvoreBPlus(4);
    }

    adicionarArquivo(nome) {
        this.arvore.inserir(nome);
    }

    removerArquivo(nome) {
        this.arvore.remover(nome);
    }

    buscarArquivo(nome) {
        return this.arvore.buscar(nome);
    }
}

// ---------------- SIMULAÇÃO ----------------
function simular() {
    const sistema = new SistemaArquivos();

    let arquivos = [];

    // gerar arquivos
    for (let i = 0; i < 1000; i++) {
        let nome = "arquivo_" + Math.floor(Math.random() * 10000);
        arquivos.push(nome);
    }

    console.time("Inserção");
    arquivos.forEach(a => sistema.adicionarArquivo(a));
    console.timeEnd("Inserção");

    console.time("Busca");
    arquivos.forEach(a => sistema.buscarArquivo(a));
    console.timeEnd("Busca");

    console.time("Remoção");
    arquivos.slice(0, 200).forEach(a => sistema.removerArquivo(a));
    console.timeEnd("Remoção");

    console.log("Busca exemplo:", sistema.buscarArquivo(arquivos[0]));
}

// executar
simular();