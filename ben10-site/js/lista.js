/**
 * PÁGINA 2 - LISTA DE ALIENS (aliens.html)
 * -------------------------------------------
 * 1. Busca todos os aliens via obterTodosAliens() (js/api.js) — tenta a API
 *    remota e cai para o banco local (ALIENS_DB) se ela falhar.
 * 2. Renderiza os cards no grid.
 * 3. Filtra os cards em tempo real conforme o usuário digita na busca.
 * 4. Ao clicar em um card, redireciona para alien.html?id=<id>.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("aliensGrid");
  const searchInput = document.getElementById("searchInput");
  const noResultsEl = document.getElementById("noResults");

  let todosOsAliens = [];

  function criarCard(alien) {
    const card = document.createElement("article");
    card.className = "alien-mini-card";
    card.tabIndex = 0; // permite foco/clique via teclado (acessibilidade)
    card.dataset.nome = alien.nome.toLowerCase();

    const img = document.createElement("img");
    img.className = "alien-mini-card__image";
    img.src = alien.imagemUrl;
    img.alt = alien.nome;

    const nome = document.createElement("h2");
    nome.className = "alien-mini-card__nome";
    nome.textContent = alien.nome.toUpperCase();

    card.appendChild(img);
    card.appendChild(nome);

    // Clique ou Enter/Espaço (teclado) leva para a página de detalhes
    function irParaDetalhe() {
      window.location.href = `alien.html?id=${alien.id}`;
    }

    card.addEventListener("click", irParaDetalhe);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        irParaDetalhe();
      }
    });

    return card;
  }

  function renderizarAliens(lista) {
    grid.innerHTML = "";
    lista.forEach((alien) => grid.appendChild(criarCard(alien)));
    noResultsEl.hidden = lista.length > 0;
  }

  function filtrarAliens(termo) {
    const termoNormalizado = termo.trim().toLowerCase();
    return todosOsAliens.filter((alien) =>
      alien.nome.toLowerCase().includes(termoNormalizado)
    );
  }

  // Mensagem simples de carregamento enquanto a API (ou o fallback) responde
  grid.innerHTML = '<p class="loading-msg">Carregando aliens...</p>';

  todosOsAliens = await obterTodosAliens();
  renderizarAliens(todosOsAliens);

  // Busca em tempo real
  searchInput.addEventListener("input", (event) => {
    const resultado = filtrarAliens(event.target.value);
    renderizarAliens(resultado);
  });
});
