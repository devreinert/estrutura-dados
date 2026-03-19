class UnionFind {
    constructor(n) {
        this.pai = new Array(n);
        this.rank = new Array(n);

        for (let i = 0; i < n; i++) {
            this.pai[i] = i;
            this.rank[i] = 0;
        }
    }

    find(x) {
        if (this.pai[x] !== x) {
            this.pai[x] = this.find(this.pai[x]); // compressão
        }
        return this.pai[x];
    }

    union(x, y) {
        let raizX = this.find(x);
        let raizY = this.find(y);

        if (raizX === raizY) return false;

        if (this.rank[raizX] < this.rank[raizY]) {
            this.pai[raizX] = raizY;
        } else if (this.rank[raizX] > this.rank[raizY]) {
            this.pai[raizY] = raizX;
        } else {
            this.pai[raizY] = raizX;
            this.rank[raizX]++;
        }

        return true;
    }
}

// ----------------------
// KRUSKAL
// ----------------------
function kruskal(vertices, arestas) {
    // ordena pelo peso
    arestas.sort((a, b) => a.peso - b.peso);

    const uf = new UnionFind(vertices);
    const resultado = [];
    let custoTotal = 0;

    for (let aresta of arestas) {
        let { u, v, peso } = aresta;

        // se não forma ciclo
        if (uf.find(u) !== uf.find(v)) {
            uf.union(u, v);
            resultado.push(aresta);
            custoTotal += peso;
        }
    }

    return { resultado, custoTotal };
}

// ----------------------
// DETECÇÃO DE CICLO
// ----------------------
function temCiclo(vertices, arestas) {
    const uf = new UnionFind(vertices);

    for (let aresta of arestas) {
        let { u, v } = aresta;

        if (uf.find(u) === uf.find(v)) {
            return true; // ciclo encontrado
        }

        uf.union(u, v);
    }

    return false;
}

const arestas = [
    { u: 0, v: 1, peso: 4 },
    { u: 0, v: 2, peso: 3 },
    { u: 1, v: 2, peso: 1 },
    { u: 1, v: 3, peso: 2 },
    { u: 2, v: 3, peso: 4 }
];

const resultado = kruskal(4, arestas);

console.log("MST:", resultado.resultado);
console.log("Custo:", resultado.custoTotal);

console.log("Tem ciclo?", temCiclo(4, arestas));