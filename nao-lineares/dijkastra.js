class GrafoPonderado {
    constructor() {
        this.listaAdj = {};
    }

    adicionarVertice(vertice) {
        if (!this.listaAdj[vertice]) {
            this.listaAdj[vertice] = [];
        }
    }

    // agora tem peso e direção
    adicionarAresta(origem, destino, peso) {
        this.listaAdj[origem].push({ no: destino, peso });
    }

    dijkstra(inicio) {
        const distancias = {};
        const visitados = new Set();

        // inicializa
        for (let vertice in this.listaAdj) {
            distancias[vertice] = Infinity;
        }

        distancias[inicio] = 0;

        while (true) {
            let atual = null;

            // pega o menor não visitado
            for (let vertice in distancias) {
                if (!visitados.has(vertice)) {
                    if (atual === null || distancias[vertice] < distancias[atual]) {
                        atual = vertice;
                    }
                }
            }

            if (atual === null) break;

            visitados.add(atual);

            for (let vizinho of this.listaAdj[atual]) {
                let novaDist = distancias[atual] + vizinho.peso;

                if (novaDist < distancias[vizinho.no]) {
                    distancias[vizinho.no] = novaDist;
                }
            }
        }

        return distancias;
    }
}


const g = new GrafoPonderado();

["A", "B", "C", "D"].forEach(v => g.adicionarVertice(v));

g.adicionarAresta("A", "B", 2);
g.adicionarAresta("A", "C", 4);
g.adicionarAresta("B", "D", 7);
g.adicionarAresta("C", "D", 1);

console.log(g.dijkstra("A"));