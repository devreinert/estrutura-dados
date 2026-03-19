// ---------------- FORÇA BRUTA ----------------
function buscaForcaBruta(texto, padrao) {
    let ocorrencias = [];

    for (let i = 0; i <= texto.length - padrao.length; i++) {
        let j = 0;

        while (j < padrao.length && texto[i + j] === padrao[j]) {
            j++;
        }

        if (j === padrao.length) {
            ocorrencias.push(i);
        }
    }

    return ocorrencias;
}

// ---------------- KMP (PRÉ-PROCESSAMENTO LPS) ----------------
function construirLPS(padrao) {
    let lps = new Array(padrao.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < padrao.length) {
        if (padrao[i] === padrao[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

// ---------------- KMP (BUSCA) ----------------
function buscaKMP(texto, padrao) {
    let ocorrencias = [];
    let lps = construirLPS(padrao);

    let i = 0; // texto
    let j = 0; // padrão

    while (i < texto.length) {
        if (texto[i] === padrao[j]) {
            i++;
            j++;
        }

        if (j === padrao.length) {
            ocorrencias.push(i - j);
            j = lps[j - 1];
        } else if (i < texto.length && texto[i] !== padrao[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return ocorrencias;
}

// ---------------- GERAR TEXTO GRANDE ----------------
function gerarTexto(tamanho) {
    const letras = "abcdefghijklmnopqrstuvwxyz";
    let texto = "";

    for (let i = 0; i < tamanho; i++) {
        texto += letras[Math.floor(Math.random() * letras.length)];
    }

    return texto;
}

// ---------------- TESTES ----------------
function testarBusca() {
    console.log("===== TEXTO PEQUENO =====");

    let textoPequeno = "ababcabcabababd";
    let padrao = "ababd";

    console.time("Força Bruta (pequeno)");
    let fb1 = buscaForcaBruta(textoPequeno, padrao);
    console.timeEnd("Força Bruta (pequeno)");

    console.time("KMP (pequeno)");
    let kmp1 = buscaKMP(textoPequeno, padrao);
    console.timeEnd("KMP (pequeno)");

    console.log("Força Bruta:", fb1);
    console.log("KMP:", kmp1);

    console.log("\n===== TEXTO GRANDE =====");

    let textoGrande = gerarTexto(100000);
    let padraoGrande = "abc";

    console.time("Força Bruta (grande)");
    buscaForcaBruta(textoGrande, padraoGrande);
    console.timeEnd("Força Bruta (grande)");

    console.time("KMP (grande)");
    buscaKMP(textoGrande, padraoGrande);
    console.timeEnd("KMP (grande)");
}

// Executar
testarBusca();