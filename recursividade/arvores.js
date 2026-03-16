function inOrder(no) {
    if (no === null) {
        return;
    }

    inOrder(no.esquerda);
    console.log(no.valor);
    inOrder(no.direita);
}

function preOrder(no) {
    if (no === null) {
        return;
    }

    console.log(no.valor);
    preOrder(no.esquerda);
    preOrder(no.direita);
}

function postOrder(no) {
    if (no === null) {
        return;
    }

    postOrder(no.esquerda);
    postOrder(no.direita);
    console.log(no.valor);
}

//Percurso	Ordem
//In-order	Esquerda → Raiz → Direita
//Pre-order	Raiz → Esquerda → Direita
//Post-order	Esquerda → Direita → Raiz