/**
 * PÁGINA 1 - SORTEAR ALIEN (index.html)
 * --------------------------------------
 * Ao clicar em "Sortear", busca um alien aleatório via obterAlienAleatorio()
 * (js/api.js) — que tenta a API remota e cai para o banco local se ela
 * falhar — e atualiza o card principal com imagem, nome e tipo.
 */

document.addEventListener("DOMContentLoaded", () => {
  const btnSortear = document.getElementById("btnSortear");
  const card = document.getElementById("alienCard");
  const imgEl = document.getElementById("alienImg");
  const placeholderEl = card.querySelector(".alien-card__placeholder");
  const nomeEl = document.getElementById("alienNome");
  const tipoEl = document.getElementById("alienTipo");

  async function sortearAlien() {
    btnSortear.disabled = true;
    nomeEl.textContent = "SORTEANDO...";
    tipoEl.textContent = "Tipo: --------";

    const alien = await obterAlienAleatorio();
    preencherCard(alien);

    btnSortear.disabled = false;
  }

  function preencherCard(alien) {
    // Troca o placeholder "X" pela imagem real do alien
    imgEl.src = alien.imagemUrl;
    imgEl.alt = alien.nome;
    imgEl.hidden = false;
    placeholderEl.hidden = true;

    nomeEl.textContent = alien.nome.toUpperCase();
    tipoEl.textContent = `Tipo: ${alien.tipo}`;

    card.dataset.state = "filled";
  }

  btnSortear.addEventListener("click", sortearAlien);
});
