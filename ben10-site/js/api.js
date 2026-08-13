/**
 * INTEGRAÇÃO COM A API REMOTA (Ben 10 API)
 * -------------------------------------------
 * A documentação oficial (ben10api.vercel.app/docs) expõe as rotas em:
 *   GET /aliens        -> lista completa
 *   GET /aliens/:id     -> um alien específico
 *   GET /random         -> um alien aleatório
 * hospedadas em https://ben10-api.herokuapp.com.
 *
 * IMPORTANTE: o Heroku descontinuou os planos gratuitos em 2022, então esse
 * backend específico tende a estar fora do ar. Por isso este módulo SEMPRE
 * tenta a API primeiro e, se ela falhar (timeout, erro de rede, resposta
 * inválida etc.), cai automaticamente para o banco local ALIENS_DB
 * (js/data.js) — exatamente o comportamento de fallback que o projeto pede.
 *
 * Se no futuro você tiver uma URL de API funcionando, basta trocar o valor
 * de REMOTE_API_BASE abaixo.
 */

const REMOTE_API_BASE = "https://ben10-api.herokuapp.com";
const FETCH_TIMEOUT_MS = 5000;

/**
 * fetch() com timeout, usando AbortController.
 * Evita que a página fique "travada" esperando uma API fora do ar.
 */
function fetchComTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { signal: controller.signal }).finally(() =>
    clearTimeout(timeoutId)
  );
}

/**
 * Converte o formato de alien retornado pela API remota para o mesmo
 * formato usado internamente pelo site (o mesmo shape de ALIENS_DB).
 * Isso garante que sortear.js, lista.js e detalhe.js funcionem
 * identicamente, não importa se o dado veio da API ou do JSON local.
 */
function normalizarAlienDaApi(raw) {
  const geral = raw.general || {};
  return {
    id: raw._id,
    nome: geral.name || "Desconhecido",
    tipo: raw.series || "Desconhecido",
    descricao: geral.body || "Descrição não disponível para este alien.",
    habilidades: Array.isArray(raw.abilities) ? raw.abilities : [],
    especie: geral.species || "Desconhecida",
    planetaOrigem: geral.homeWorld || "Desconhecido",
    altura: "N/A",
    peso: "N/A",
    imagemUrl:
      raw.image || "https://placehold.co/400x400/1a1a1a/39ff14?text=Alien",
  };
}

/**
 * Retorna a lista completa de aliens.
 * Tenta GET /aliens na API remota; se falhar por qualquer motivo,
 * usa o array local ALIENS_DB (js/data.js).
 */
async function obterTodosAliens() {
  try {
    const resposta = await fetchComTimeout(
      `${REMOTE_API_BASE}/aliens`,
      FETCH_TIMEOUT_MS
    );
    if (!resposta.ok) throw new Error(`API retornou status ${resposta.status}`);

    const dados = await resposta.json();
    if (!Array.isArray(dados.aliens) || dados.aliens.length === 0) {
      throw new Error("API retornou uma lista vazia ou em formato inesperado");
    }

    console.info("[Ben10] Aliens carregados da API remota.");
    return dados.aliens.map(normalizarAlienDaApi);
  } catch (erro) {
    console.warn(
      "[Ben10] API indisponível, usando banco de dados local (js/data.js).",
      erro.message
    );
    return ALIENS_DB;
  }
}

/**
 * Retorna um único alien pelo id.
 * Tenta GET /aliens/:id na API remota; se falhar, procura o id no
 * array local (comparando como string, já que a API usa ObjectId do
 * MongoDB e o banco local usa números).
 */
async function obterAlienPorId(id) {
  try {
    const resposta = await fetchComTimeout(
      `${REMOTE_API_BASE}/aliens/${id}`,
      FETCH_TIMEOUT_MS
    );
    if (!resposta.ok) throw new Error(`API retornou status ${resposta.status}`);

    const dados = await resposta.json();
    if (!dados.alien) throw new Error("API não retornou o alien esperado");

    console.info("[Ben10] Alien carregado da API remota.");
    return normalizarAlienDaApi(dados.alien);
  } catch (erro) {
    console.warn(
      "[Ben10] API indisponível, buscando alien no banco local.",
      erro.message
    );
    return ALIENS_DB.find((alien) => String(alien.id) === String(id)) || null;
  }
}

/**
 * Retorna um alien aleatório.
 * Tenta GET /random na API remota; se falhar, sorteia localmente.
 */
async function obterAlienAleatorio() {
  try {
    const resposta = await fetchComTimeout(
      `${REMOTE_API_BASE}/random`,
      FETCH_TIMEOUT_MS
    );
    if (!resposta.ok) throw new Error(`API retornou status ${resposta.status}`);

    const dados = await resposta.json();
    if (!dados.general) throw new Error("API não retornou um alien válido");

    console.info("[Ben10] Alien aleatório carregado da API remota.");
    return normalizarAlienDaApi(dados);
  } catch (erro) {
    console.warn(
      "[Ben10] API indisponível, sorteando localmente.",
      erro.message
    );
    const indice = Math.floor(Math.random() * ALIENS_DB.length);
    return ALIENS_DB[indice];
  }
}
