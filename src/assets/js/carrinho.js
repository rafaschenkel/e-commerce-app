const handleCart = () => {
    const meuCarrinho = document.getElementById('meu-carrinho');
    meuCarrinho.classList.toggle('hidden');
};

export const initCart = () => {
    const buttonOpenCart = document.getElementById('abrir-carrinho');
    buttonOpenCart.addEventListener('click', handleCart);
    const buttonCloseCart = document.getElementById('fechar-carrinho');
    buttonCloseCart.addEventListener('click', handleCart);
};
