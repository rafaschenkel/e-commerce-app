const abrirCarrinho = () => {
    const meuCarrinho = document.getElementById('meu-carrinho');
    meuCarrinho.classList.remove('hidden');
};

const fecharCarrinho = () => {
    const meuCarrinho = document.getElementById('meu-carrinho');
    meuCarrinho.classList.add('hidden');
};
