import { addToCart } from './carrinho';
import { catalogoProdutos } from './catalogo';

export const listarProdutos = () => {
    const listaProdutos = catalogoProdutos
        .map(produto => {
            return `
            <li id="produto-${produto.id}" class="flex flex-col justify-between w-48 rounded-lg bg-slate-100 shadow-md shadow-slate-500">
                <img class="rounded-ss-lg rounded-se-lg" src="./src/assets/img/${produto.imagem}" alt=${produto.imagem} />
                <p class="mx-2 font-bold">${produto.nome}</p>
                <p class="mx-2 italic">${produto.marca}</p>
                <div class="mx-2 mb-2 flex justify-between">
                    <p class="text-lg font-semibold mb-1">$${produto.preco}</p>
                    <button class="addToCart text-slate-50 px-2 rounded-lg transition ease-in-out delay-150 bg-slate-700 hover:bg-slate-950 duration-300"><i class="fa-solid fa-cart-plus"></i></button>
                </div>

            </li>
        `;
        })
        .join('');
    document.querySelector('#container-produtos').innerHTML += listaProdutos;

    const buttons = document.querySelectorAll('.addToCart');
    catalogoProdutos.forEach((produto, i) =>
        buttons[i].addEventListener('click', () => addToCart(produto.id))
    );
};
