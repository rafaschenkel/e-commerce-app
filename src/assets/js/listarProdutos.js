import { adicionarAoCarrinho } from './carrinho';
import { catalogoProdutos } from './utilidades';

export const listarProdutos = () => {
    const listaProdutos = catalogoProdutos
        .map(produto => {
            return `
            <li id="produto-${produto.id}" class="flex group flex-col justify-between w-48 rounded-lg  shadow-md shadow-slate-400 bg-slate-200">
                <img class="m-2 rounded-lg duration-300 group-hover:scale-105" src="./src/assets/img/${produto.imagem}" alt=${produto.imagem} />
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
        buttons[i].addEventListener('click', () => adicionarAoCarrinho(produto.id))
    );
};
