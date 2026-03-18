function hashString(chave, tamanho = 100) {
    let hash = 0;

    for (let i = 0; i < chave.length; i++) {
        hash = (hash * 31 + chave.charCodeAt(i)) % tamanho;
    }

    return hash;
}

function testarDistribuicao() {
    const tamanho = 100;
    const tabela = new Array(tamanho).fill(0);

    const dados = [];

    // gerar 1000 chaves
    for (let i = 0; i < 1000; i++) {
        dados.push("chave_" + i);
    }

    // aplicar hash
    for (let chave of dados) {
        const indice = hashString(chave, tamanho);
        tabela[indice]++;
    }

    console.log("Distribuição:");
    console.log(tabela);

    return tabela;
}

const distribuicao = testarDistribuicao();

function analisarColisoes(distribuicao) {
    let colisoes = 0;
    let ocupados = 0;

    for (let valor of distribuicao) {
        if (valor > 1) {
            colisoes += (valor - 1);
        }
        if (valor > 0) ocupados++;
    }

    const total = distribuicao.reduce((a, b) => a + b, 0);

    console.log("Total de elementos:", total);
    console.log("Colisões:", colisoes);
    console.log("Índices ocupados:", ocupados);

    console.log("Taxa de colisão:", (colisoes / total * 100).toFixed(2) + "%");
}

analisarColisoes(distribuicao);

