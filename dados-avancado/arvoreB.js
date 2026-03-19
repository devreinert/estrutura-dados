class BNode {
    constructor(folha = true) {
        this.chaves = [];
        this.filhos = [];
        this.folha = folha;
    }
}

class BTree {
    constructor(t) {
        this.raiz = new BNode(true);
        this.t = t;
    }

    inserir(k) {
        let r = this.raiz;

        if (r.chaves.length === 2 * this.t - 1) {
            let s = new BNode(false);
            this.raiz = s;
            s.filhos[0] = r;
            this.split(s, 0);
            this.inserirNaoCheio(s, k);
        } else {
            this.inserirNaoCheio(r, k);
        }
    }

    inserirNaoCheio(no, k) {
        let i = no.chaves.length - 1;

        if (no.folha) {
            no.chaves.push(0);
            while (i >= 0 && k < no.chaves[i]) {
                no.chaves[i + 1] = no.chaves[i];
                i--;
            }
            no.chaves[i + 1] = k;
        } else {
            while (i >= 0 && k < no.chaves[i]) i--;

            i++;
            if (no.filhos[i].chaves.length === 2 * this.t - 1) {
                this.split(no, i);
                if (k > no.chaves[i]) i++;
            }
            this.inserirNaoCheio(no.filhos[i], k);
        }
    }

    split(pai, i) {
        let t = this.t;
        let y = pai.filhos[i];
        let z = new BNode(y.folha);

        z.chaves = y.chaves.splice(t);
        let meio = y.chaves.pop();

        if (!y.folha) {
            z.filhos = y.filhos.splice(t);
        }

        pai.filhos.splice(i + 1, 0, z);
        pai.chaves.splice(i, 0, meio);
    }
}

BTree.prototype.imprimir = function(no = this.raiz, nivel = 0) {
    console.log(" ".repeat(nivel * 4) + no.chaves.join(", "));

    if (!no.folha) {
        for (let filho of no.filhos) {
            this.imprimir(filho, nivel + 1);
        }
    }
};

const arvore = new BTree(3);

const valores = [10, 20, 5, 6, 12, 30, 7, 17];

for (let v of valores) {
    arvore.inserir(v);
    console.log("\nApós inserir:", v);
    arvore.imprimir();
}