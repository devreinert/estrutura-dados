function hashString(chave) {
    const tamanhoTabela = 10;
    let soma = 0;

    for (let i = 0; i < chave.length; i++) {
        soma += chave.charCodeAt(i); // ASCII
    }

    return soma % tamanhoTabela;
}

console.log(hashString("ana"));
console.log(hashString("carlos"));
console.log(hashString("node"));