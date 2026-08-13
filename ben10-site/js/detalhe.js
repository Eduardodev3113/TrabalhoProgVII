/**
 * PÁGINA 3 - DETALHES DO ALIEN (alien.html)
 * ---------------------------------------------
 * 1. Lê o parâmetro "id" da URL (ex: alien.html?id=3) via URLSearchParams.
 * 2. Busca esse alien via obterAlienPorId() (js/api.js) — tenta a API
 *    remota e cai para o banco local (ALIENS_DB) se ela falhar.
 * 3. Preenche a hero section, a lista de habilidades e os atributos.
 * 4. Caso o id não exista, mostra a seção "Alien não encontrado".
 */

document.addEventListener("DOMContentLoaded", async () => {
  const secaoDetalhe = document.getElementById("alienDetalhe");
  const secaoNaoEncontrado = document.getElementById("alienNaoEncontrado");

  // 1. Extrai o id da URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    secaoNaoEncontrado.hidden = false;
    return;
  }

  // 2. Busca o alien (API remota com fallback para o banco local)
  const alien = await obterAlienPorId(id);

  if (!alien) {
    secaoNaoEncontrado.hidden = false;
    return;
  }

  preencherPagina(alien);
  secaoDetalhe.hidden = false;

  function preencherPagina(alien) {
    // Hero
    document.getElementById("detalheImg").src = alien.imagemUrl;
    document.getElementById("detalheImg").alt = alien.nome;
    document.getElementById("detalheNome").textContent = alien.nome.toUpperCase();
    document.getElementById("detalheTipo").textContent = `Tipo: ${alien.tipo}`;
    document.getElementById("detalheDescricao").textContent = alien.descricao;

    // Título da aba do navegador
    document.title = `${alien.nome} | Ben 10`;

    // Habilidades
    const habilidadesLista = document.getElementById("habilidadesLista");
    habilidadesLista.innerHTML = "";
    alien.habilidades.forEach((habilidade) => {
      const li = document.createElement("li");
      li.textContent = habilidade;
      habilidadesLista.appendChild(li);
    });

    // Sobre (atributos rápidos)
    document.getElementById("atrEspecie").textContent = alien.especie;
    document.getElementById("atrPlaneta").textContent = alien.planetaOrigem;
    document.getElementById("atrAltura").textContent = alien.altura;
    document.getElementById("atrPeso").textContent = alien.peso;
  }
});
