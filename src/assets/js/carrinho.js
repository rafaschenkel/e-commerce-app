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

const atualizarValorTotal = (produto, operator) => {
    const totalCarrinho = document.querySelector('#total-carrinho');
    if (operator === '+') {
        const total = Number(Number(totalCarrinho.innerHTML) + Number(produto.preco));
        totalCarrinho.innerHTML = total;
    } else {
        const total = Number(Number(totalCarrinho.innerHTML) - Number(produto.preco));
        totalCarrinho.innerHTML = total;
    }
};

const incrementarQtdProduto = produto => {
    const qtd = Number(document.querySelector(`#qtd-${produto.id}`).innerHTML) + 1;
    document.querySelector(`#qtd-${produto.id}`).innerHTML = String(qtd);
    atualizarValorTotal(produto, '+');
};

const decrementarQtdProduto = produto => {
    const qtd = Number(document.querySelector(`#qtd-${produto.id}`).innerHTML) - 1;
    if (qtd === 0) {
        removerProdutoCarrinho(produto);
        return;
    }
    document.querySelector(`#qtd-${produto.id}`).innerHTML = String(qtd);
    atualizarValorTotal(produto, '-');
};

const removerProdutoCarrinho = produto => {
    const qtd = document.querySelector(`#qtd-${produto.id}`).innerHTML;
    const produtoRemovido = { ...produto };
    produtoRemovido.preco = Number(qtd) * produto.preco;
    document
        .querySelector(`#produtos-carrinho`)
        .removeChild(document.querySelector(`#card-${produto.id}`));
    atualizarValorTotal(produtoRemovido, '-');
};

const desenharProduto = product => {
    const produtosCarrinho = document.querySelector('#produtos-carrinho');
    const li = document.createElement('li');
    li.setAttribute('id', `card-${product.id}`);

    const liClassList = [
        'flex',
        'justify-between',
        'h-24',
        'py-1',
        'gap-3',
        'items-center',
        'w-full',
        'bg-slate-200',
        'text-slate-950',
        'rounded-lg',
        'relative'
    ];

    li.classList.add(...liClassList);

    li.innerHTML = `
        <button id="remover-produto-${product.id}"><i class="fa-solid fa-circle-xmark text-slate-950 absolute top-2 right-2"></i></button>
        <img src="./src/assets/img/${product.imagem}" class="h-20 w-14" alt=${product.imagem}>
        <div class="px-1">
            <p class="text-sm w-40">${product.nome}</p>
            <p class="text-sm italic">${product.marca}</p>
            <p class="text-sm">$ <span id="preco-produto-${product.id}">${product.preco}</span></p>
        </div>
        <div class="flex self-end gap-2 m-1 border-2 border-slate-300 rounded-lg">
            <button id="decrementar-produto-${product.id}" class="border-r-2 border-slate-300 text-xs w-6 hover:bg-slate-400 duration-200 rounded-s-md">-</button>
            <p id="qtd-${product.id}" class="text-sm font-bold">1</p>
            <button id="incrementar-produto-${product.id}" class="border-l-2 border-slate-300 text-xs w-6 hover:bg-slate-400 duration-200 rounded-e-md">+</button>
        </div>
    `;

    produtosCarrinho.appendChild(li);

    document
        .querySelector(`#remover-produto-${product.id}`)
        .addEventListener('click', () => removerProdutoCarrinho(product));

    document
        .querySelector(`#incrementar-produto-${product.id}`)
        .addEventListener('click', () => incrementarQtdProduto(product));

    document
        .querySelector(`#decrementar-produto-${product.id}`)
        .addEventListener('click', () => decrementarQtdProduto(product));

    atualizarValorTotal(product, '+');
};

export const initCart = () => {
    const buttonOpenCart = document.querySelector('#abrir-carrinho');
    buttonOpenCart.addEventListener('click', handleCart);
    const buttonCloseCart = document.querySelector('#fechar-carrinho');
    buttonCloseCart.addEventListener('click', handleCart);
};

export const addToCart = idProduto => {
    const product = catalogoProdutos.find(p => p.id === idProduto);

    const produtoExist = document.querySelector(`#qtd-${product.id}`)
        ? document.querySelector(`#qtd-${product.id}`)
        : undefined;

    if (produtoExist !== undefined) {
        produtoExist.innerHTML = Number(produtoExist.innerHTML) + 1;
        atualizarValorTotal(product, '+');
        return;
    }
    desenharProduto(product);
};
