import { catalogoProdutos } from './catalogo';

const handleCart = () => {
    const meuCarrinho = document.querySelector('#meu-carrinho');
    if (meuCarrinho.classList.contains('right-0')) {
        meuCarrinho.classList.remove('right-0');
        meuCarrinho.classList.add('right-[-384px]');
    } else {
        meuCarrinho.classList.remove('right-[-384px]');
        meuCarrinho.classList.add('right-0');
    }
};

export const initCart = () => {
    const buttonOpenCart = document.querySelector('#abrir-carrinho');
    buttonOpenCart.addEventListener('click', handleCart);
    const buttonCloseCart = document.querySelector('#fechar-carrinho');
    buttonCloseCart.addEventListener('click', handleCart);
};

export const addToCart = idProduto => {
    const product = catalogoProdutos.find(p => p.id === idProduto);

    const produtosCarrinho = document.querySelector('#produtos-carrinho');

    const cartaoProduto = `
        <li class="flex gap-3 items-center w-full bg-slate-200 text-slate-950 rounded-lg p-1">
            <img src="./src/assets/img/${product.imagem}" class="h-20 w-14" alt=${product.imagem}>
            <div>
                <p class="font-bold">${product.nome}</p>
                <p class="italic">${product.marca}</p>
                <p>$${product.preco}</p>
            </div>
        </li>
    `;

    produtosCarrinho.innerHTML += cartaoProduto;
};
