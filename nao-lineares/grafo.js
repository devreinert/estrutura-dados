class Grafo {
    constructor() {
        this.listaAdj = {};
    }

    // adicionar vértice
    adicionarVertice(vertice) {
        if (!this.listaAdj[vertice]) {
            this.listaAdj[vertice] = [];
        }
    }

    // adicionar aresta (não direcionado)
    adicionarAresta(v1, v2) {
        this.listaAdj[v1].push(v2);
        this.listaAdj[v2].push(v1);
    }

    // DFS (recursivo)
    dfs(inicio, visitados = new Set()) {
        if (!inicio) return;

        console.log(inicio);
        visitados.add(inicio);

        for (let vizinho of this.listaAdj[inicio]) {
            if (!visitados.has(vizinho)) {
                this.dfs(vizinho, visitados);
            }
        }
    }

    // BFS (fila)
    bfs(inicio) {
        const fila = [inicio];
        const visitados = new Set();

        visitados.add(inicio);

        while (fila.length > 0) {
            const atual = fila.shift();
            console.log(atual);

            for (let vizinho of this.listaAdj[atual]) {
                if (!visitados.has(vizinho)) {
                    visitados.add(vizinho);
                    fila.push(vizinho);
                }
            }
        }
    }
}

const grafo = new Grafo();

["A", "B", "C", "D", "E"].forEach(v => grafo.adicionarVertice(v));

grafo.adicionarAresta("A", "B");
grafo.adicionarAresta("A", "C");
grafo.adicionarAresta("B", "D");
grafo.adicionarAresta("C", "E");

console.log("DFS:");
grafo.dfs("A");

console.log("BFS:");
grafo.bfs("A");