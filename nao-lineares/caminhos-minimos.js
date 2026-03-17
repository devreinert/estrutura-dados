class GrafoPonderado {
    constructor() {
        this.listaAdj = {};
    }

    adicionarVertice(v) {
        if (!this.listaAdj[v]) {
            this.listaAdj[v] = [];
        }
    }

    adicionarAresta(origem, destino, peso) {
        this.listaAdj[origem].push({ no: destino, peso });
    }

    dijkstra(inicio) {
        const dist = {};
        const prev = {};
        const visitados = new Set();

        // inicialização
        for (let v in this.listaAdj) {
            dist[v] = Infinity;
            prev[v] = null;
        }

        dist[inicio] = 0;

        while (true) {
            let atual = null;

            for (let v in dist) {
                if (!visitados.has(v)) {
                    if (atual === null || dist[v] < dist[atual]) {
                        atual = v;
                    }
                }
            }

            if (atual === null) break;

            visitados.add(atual);

            for (let vizinho of this.listaAdj[atual]) {
                let novaDist = dist[atual] + vizinho.peso;

                if (novaDist < dist[vizinho.no]) {
                    dist[vizinho.no] = novaDist;
                    prev[vizinho.no] = atual;
                }
            }
        }

        return { dist, prev };
    }

    // reconstruir caminho
    caminhoMaisCurto(inicio, destino) {
        const { dist, prev } = this.dijkstra(inicio);

        const caminho = [];
        let atual = destino;

        while (atual) {
            caminho.unshift(atual);
            atual = prev[atual];
        }

        return {
            distancia: dist[destino],
            caminho
        };
    }
}

const g = new GrafoPonderado();

["A", "B", "C", "D"].forEach(v => g.adicionarVertice(v));

g.adicionarAresta("A", "B", 2);
g.adicionarAresta("A", "C", 4);
g.adicionarAresta("B", "D", 7);
g.adicionarAresta("C", "D", 1);

console.log(g.caminhoMaisCurto("A", "D"));