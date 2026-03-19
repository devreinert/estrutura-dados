// ---------------- FUNÇÃO DISTÂNCIA ----------------
function distancia(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// ---------------- GERAR CIDADES ----------------
function gerarCidades(n) {
    let lista = [];
    for (let i = 0; i < n; i++) {
        lista.push({
            nome: String.fromCharCode(65 + i),
            x: Math.random() * 100,
            y: Math.random() * 100
        });
    }
    return lista;
}

// ---------------- PERMUTAÇÃO (FORÇA BRUTA) ----------------
function permutar(arr) {
    if (arr.length === 1) return [arr];

    let resultado = [];

    for (let i = 0; i < arr.length; i++) {
        let atual = arr[i];
        let resto = arr.slice(0, i).concat(arr.slice(i + 1));
        let perms = permutar(resto);

        for (let p of perms) {
            resultado.push([atual, ...p]);
        }
    }

    return resultado;
}

// ---------------- TSP FORÇA BRUTA ----------------
function tspForcaBruta(cidades) {
    const perms = permutar(cidades.slice(1)); // fixa primeira cidade
    let melhorDist = Infinity;
    let melhorCaminho = [];

    for (let perm of perms) {
        let caminho = [cidades[0], ...perm, cidades[0]];
        let total = 0;

        for (let i = 0; i < caminho.length - 1; i++) {
            total += distancia(caminho[i], caminho[i + 1]);
        }

        if (total < melhorDist) {
            melhorDist = total;
            melhorCaminho = caminho;
        }
    }

    return { distancia: melhorDist, caminho: melhorCaminho };
}

// ---------------- TSP VIZINHO MAIS PRÓXIMO ----------------
function tspVizinhoMaisProximo(cidades) {
    let naoVisitadas = [...cidades];
    let atual = naoVisitadas.shift();
    let caminho = [atual];
    let total = 0;

    while (naoVisitadas.length > 0) {
        let maisProxima = null;
        let menorDist = Infinity;
        let indice = -1;

        for (let i = 0; i < naoVisitadas.length; i++) {
            let d = distancia(atual, naoVisitadas[i]);

            if (d < menorDist) {
                menorDist = d;
                maisProxima = naoVisitadas[i];
                indice = i;
            }
        }

        total += menorDist;
        atual = maisProxima;
        caminho.push(atual);
        naoVisitadas.splice(indice, 1);
    }

    // volta para origem
    total += distancia(atual, caminho[0]);
    caminho.push(caminho[0]);

    return { distancia: total, caminho };
}

// ---------------- TESTE COM 5 CIDADES ----------------
console.log("===== TESTE COM 5 CIDADES (COMPARAÇÃO) =====");

const cidades5 = gerarCidades(5);
console.log("Cidades:", cidades5);

console.time("Força Bruta");
let exato = tspForcaBruta(cidades5);
console.timeEnd("Força Bruta");

console.time("Vizinho Mais Próximo");
let heuristica5 = tspVizinhoMaisProximo(cidades5);
console.timeEnd("Vizinho Mais Próximo");

console.log("\n--- RESULTADO FORÇA BRUTA (ÓTIMO) ---");
console.log("Distância:", exato.distancia.toFixed(2));
console.log("Caminho:", exato.caminho.map(c => c.nome).join(" → "));

console.log("\n--- RESULTADO HEURÍSTICO ---");
console.log("Distância:", heuristica5.distancia.toFixed(2));
console.log("Caminho:", heuristica5.caminho.map(c => c.nome).join(" → "));

// ---------------- TESTE COM 10 CIDADES ----------------
console.log("\n===== TESTE COM 10 CIDADES (APENAS HEURÍSTICA) =====");

const cidades10 = gerarCidades(10);
console.log("Cidades:", cidades10);

console.time("Vizinho Mais Próximo (10 cidades)");
let heuristica10 = tspVizinhoMaisProximo(cidades10);
console.timeEnd("Vizinho Mais Próximo (10 cidades)");

console.log("\n--- RESULTADO (10 cidades) ---");
console.log("Distância:", heuristica10.distancia.toFixed(2));
console.log("Caminho:", heuristica10.caminho.map(c => c.nome).join(" → "));