class BPlusNode {
    constructor(folha = false) {
        this.chaves = [];
        this.filhos = [];
        this.folha = folha;
        this.proximo = null; // ligação entre folhas
    }
}

class BPlusTree {
    constructor(t) {
        this.raiz = new BPlusNode(true);
        this.t = t;
    }

    inserir(valor) {
        let r = this.raiz;

        if (r.chaves.length === 2 * this.t - 1) {
            let novo = new BPlusNode(false);
            novo.filhos.push(r);
            this.split(novo, 0);
            this.raiz = novo;
        }

        this.inserirNaoCheio(this.raiz, valor);
    }

    inserirNaoCheio(no, valor) {
        if (no.folha) {
            no.chaves.push(valor);
            no.chaves.sort((a, b) => a - b);
        } else {
            let i = no.chaves.findIndex(k => valor < k);
            if (i === -1) i = no.chaves.length;

            if (no.filhos[i].chaves.length === 2 * this.t - 1) {
                this.split(no, i);
                if (valor > no.chaves[i]) i++;
            }

            this.inserirNaoCheio(no.filhos[i], valor);
        }
    }

    split(pai, i) {
        let t = this.t;
        let no = pai.filhos[i];
        let novo = new BPlusNode(no.folha);

        let meio = Math.floor(no.chaves.length / 2);

        novo.chaves = no.chaves.splice(meio);

        if (no.folha) {
            novo.proximo = no.proximo;
            no.proximo = novo;
            pai.chaves.splice(i, 0, novo.chaves[0]);
        } else {
            pai.chaves.splice(i, 0, no.chaves.pop());
            novo.filhos = no.filhos.splice(meio + 1);
        }

        pai.filhos.splice(i + 1, 0, novo);
    }

    imprimir(no = this.raiz, nivel = 0) {
        console.log(" ".repeat(nivel * 4) + "[" + no.chaves.join(", ") + "]");

        if (!no.folha) {
            for (let filho of no.filhos) {
                this.imprimir(filho, nivel + 1);
            }
        }
    }
}

const arvore = new BPlusTree(2);
const valores = [15, 5, 25, 10, 20, 30, 35];

for (let v of valores) {
    arvore.inserir(v);
    console.log("\nApós inserir:", v);
    arvore.imprimir();
}