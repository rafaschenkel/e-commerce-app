import { listarProdutos } from './src/assets/js/listarProdutos';
import {
    atualizarPrecoCarrinho,
    initCart,
    renderizarProdutosNoCarrinho
} from './src/assets/js/carrinho';
import { inicializarFiltros } from './src/assets/js/filtrarProdutos';

listarProdutos();
initCart();
renderizarProdutosNoCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();
