// ---------------- GRAFO (LISTA DE ADJACÊNCIA) ----------------
class Grafo {
    constructor() {
        this.listaAdj = {};
    }

    // adicionar usuário
    adicionarUsuario(usuario) {
        if (!this.listaAdj[usuario]) {
            this.listaAdj[usuario] = [];
        }
    }

    // adicionar amizade (não-direcionado)
    adicionarAmizade(u1, u2) {
        this.listaAdj[u1].push(u2);
        this.listaAdj[u2].push(u1);
    }

    // ---------------- BFS ----------------
    menorDistancia(origem, destino) {
        let fila = [];
        let visitado = {};
        let distancia = {};

        // inicialização
        fila.push(origem);
        visitado[origem] = true;
        distancia[origem] = 0;

        while (fila.length > 0) {
            let atual = fila.shift();

            // encontrou destino
            if (atual === destino) {
                return distancia[atual];
            }

            // visitar vizinhos
            for (let vizinho of this.listaAdj[atual]) {
                if (!visitado[vizinho]) {
                    fila.push(vizinho);
                    visitado[vizinho] = true;
                    distancia[vizinho] = distancia[atual] + 1;
                }
            }
        }

        return -1; // não conectado
    }

    mostrar() {
        console.log(this.listaAdj);
    }
}

// ---------------- SIMULAÇÃO ----------------
const rede = new Grafo();

// usuários
["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda"].forEach(u =>
    rede.adicionarUsuario(u)
);

// amizades
rede.adicionarAmizade("Ana", "Bruno");
rede.adicionarAmizade("Ana", "Carlos");
rede.adicionarAmizade("Bruno", "Diana");
rede.adicionarAmizade("Carlos", "Eduardo");
rede.adicionarAmizade("Diana", "Fernanda");

// mostrar grafo
console.log("Rede social:");
rede.mostrar();

// ---------------- TESTE BFS ----------------
console.log("\nMenor distância (Ana → Fernanda):",
    rede.menorDistancia("Ana", "Fernanda")
);

console.log("Menor distância (Carlos → Diana):",
    rede.menorDistancia("Carlos", "Diana")
);