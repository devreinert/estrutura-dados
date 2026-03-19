// ===============================
// UNION-FIND (Disjoint Set)
// ===============================
class UnionFind {
    constructor(n) {
        this.pai = new Array(n);
        this.rank = new Array(n);

        for (let i = 0; i < n; i++) {
            this.pai[i] = i;
            this.rank[i] = 0;
        }
    }

    // FIND com Path Compression
    find(x) {
        if (this.pai[x] !== x) {
            this.pai[x] = this.find(this.pai[x]); // compressão de caminho
        }
        return this.pai[x];
    }

    // UNION com Rank
    union(x, y) {
        let raizX = this.find(x);
        let raizY = this.find(y);

        if (raizX === raizY) return;

        if (this.rank[raizX] < this.rank[raizY]) {
            this.pai[raizX] = raizY;
        } else if (this.rank[raizX] > this.rank[raizY]) {
            this.pai[raizY] = raizX;
        } else {
            this.pai[raizY] = raizX;
            this.rank[raizX]++;
        }
    }
}

// ===============================
// COMPONENTES CONECTADOS
// ===============================
function componentesConectados(n, arestas) {
    const uf = new UnionFind(n);

    // Une os vértices conectados
    for (let [u, v] of arestas) {
        uf.union(u, v);
    }

    // Agrupa por raiz
    const grupos = {};

    for (let i = 0; i < n; i++) {
        const raiz = uf.find(i);

        if (!grupos[raiz]) {
            grupos[raiz] = [];
        }

        grupos[raiz].push(i);
    }

    return Object.values(grupos);
}

// ===============================
// TESTE
// ===============================
function main() {
    const n = 7; // número de vértices

    const arestas = [
        [0, 1],
        [1, 2],
        [3, 4],
        [5, 6]
    ];

    const resultado = componentesConectados(n, arestas);

    console.log("Componentes conectados:");
    resultado.forEach((grupo, index) => {
        console.log(`Componente ${index + 1}:`, grupo);
    });
}

main();