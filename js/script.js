let perguntas = [];
let indice = 0;
let pontos = 0;
let respondeu = false;
let nomeJogador = '';

const $ = (id) => document.getElementById(id);

async function carregarPerguntas() {
  const botaoIniciar = $('start-button');
  if (botaoIniciar) botaoIniciar.disabled = true;

  try {
    const resposta = await fetch('data/perguntas.json');

    if (!resposta.ok) {
      throw new Error('Não foi possível carregar as perguntas.');
    }

    const dados = await resposta.json();

    if (
      !Array.isArray(dados) ||
      dados.length === 0 ||
      !dados.every((q) =>
        typeof q.pergunta === 'string' &&
        Array.isArray(q.alternativas) &&
        q.alternativas.length === 4 &&
        Number.isInteger(q.respostaCorreta) &&
        q.respostaCorreta >= 0 &&
        q.respostaCorreta < 4 &&
        typeof q.explicacao === 'string' &&
        typeof q.fonte === 'string'
      )
    ) {
      throw new Error('O arquivo de perguntas está inválido.');
    }

    perguntas = dados;
    if (botaoIniciar) botaoIniciar.disabled = false;
  } catch (erro) {
    console.error('Erro ao carregar o quiz:', erro);
    if (botaoIniciar) botaoIniciar.textContent = 'Erro ao carregar quiz';
  }
}

function renderizar() {
  respondeu = false;

  const q = perguntas[indice];
  const percentual = Math.round(((indice + 1) / perguntas.length) * 100);

  $('question-count').textContent =
    `PERGUNTA ${String(indice + 1).padStart(2, '0')} / ${perguntas.length}`;

  const progressFill = $('progress-fill');
  progressFill.style.width = `${percentual}%`;
  progressFill.parentElement.setAttribute('aria-valuenow', percentual);

  $('question-text').textContent = q.pergunta;

  const respostas = $('answers');
  respostas.replaceChildren();

  q.alternativas.forEach((alternativa, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'answer';

    const letra = document.createElement('b');
    letra.textContent = 'ABCD'[i];

    const texto = document.createElement('span');
    texto.textContent = alternativa;

    botao.append(letra, texto);
    botao.addEventListener('click', () => responder(i));

    respostas.append(botao);
  });

  $('feedback').hidden = true;
  $('next-button').disabled = true;

  $('next-button').textContent =
    indice === perguntas.length - 1
      ? 'Ver resultado →'
      : 'Próxima pergunta →';

  $('score-label').textContent = `Pontuação: ${pontos}`;
}

function responder(i) {
  if (respondeu) return;

  respondeu = true;
  const q = perguntas[indice];

  if (i === q.respostaCorreta) {
    pontos++;
  }

  [...$('answers').children].forEach((botao, j) => {
    botao.disabled = true;

    if (j === q.respostaCorreta) {
      botao.classList.add('selected');
    }

    if (j === i && i !== q.respostaCorreta) {
      botao.classList.add('wrong');
    }
  });

  const feedback = $('feedback');
  feedback.replaceChildren();
  feedback.hidden = false;

  const titulo = document.createElement('strong');
  const letraCorreta = 'ABCD'[q.respostaCorreta];

  titulo.textContent =
    i === q.respostaCorreta
      ? '✓ Resposta correta!'
      : `✕ Incorreta — a certa era a alternativa ${letraCorreta}`;

  const explicacao = document.createElement('p');
  explicacao.textContent = q.explicacao;

  const fonte = document.createElement('a');
  fonte.href = q.fonte;
  fonte.target = '_blank';
  fonte.rel = 'noopener noreferrer';
  fonte.textContent = 'Consultar fonte ↗';

  feedback.append(titulo, explicacao, fonte);

  $('score-label').textContent = `Pontuação: ${pontos}`;
  $('next-button').disabled = false;
  $('next-button').focus();
}

function salvarERenderizarRanking() {
  const ranking = JSON.parse(sessionStorage.getItem('ranking')) || [];
  const registroAtual = {
    id: Date.now(),
    nome: nomeJogador,
    pontos: pontos,
    total: perguntas.length
  };

  ranking.push(registroAtual);
  ranking.sort((a, b) => b.pontos - a.pontos);
  sessionStorage.setItem('ranking', JSON.stringify(ranking));

  const containerRanking = document.createElement('div');
  containerRanking.className = 'ranking-container';

  const tituloRanking = document.createElement('h3');
  tituloRanking.textContent = 'Ranking da Sessão';
  containerRanking.append(tituloRanking);

  ranking.forEach((item, index) => {
    const linha = document.createElement('div');
    linha.className = 'ranking-item';
    if (item.id === registroAtual.id) {
      linha.classList.add('destaque');
    }

    const posNome = document.createElement('span');
    posNome.textContent = `${index + 1}º — ${item.nome}`;

    const placar = document.createElement('span');
    placar.textContent = `${item.pontos}/${item.total}`;

    linha.append(posNome, placar);
    containerRanking.append(linha);
  });

  return containerRanking;
}

function mostrarResultado() {
  $('jogo').hidden = true;
  $('resultado').hidden = false;

  const cartao = $('resultado-card');
  cartao.replaceChildren();

  const etiqueta = document.createElement('div');
  etiqueta.className = 'eyebrow';
  etiqueta.textContent = 'DESAFIO CONCLUÍDO';

  const titulo = document.createElement('h2');
  titulo.textContent = `${nomeJogador}, você acertou ${pontos} de ${perguntas.length}!`;

  const descricao = document.createElement('p');
  descricao.className = 'descricao';
  descricao.textContent = 'Confira sua posição no ranking da sessão abaixo:';

  const rankingEl = salvarERenderizarRanking();

  const reiniciar = document.createElement('button');
  reiniciar.className = 'primary';
  reiniciar.type = 'button';
  reiniciar.textContent = 'Jogar novamente ↻';

  reiniciar.addEventListener('click', () => {
    indice = 0;
    pontos = 0;
    respondeu = false;

    $('resultado').hidden = true;
    $('inicio').hidden = false;

    const inputNome = $('player-name');
    if (inputNome) {
      inputNome.value = '';
      inputNome.focus();
    }
  });

  cartao.append(etiqueta, titulo, descricao, rankingEl, reiniciar);
  reiniciar.focus();
}

function iniciarQuiz() {
  const inputNome = $('player-name');
  const valorNome = inputNome ? inputNome.value.trim() : '';

  if (!valorNome) {
    alert('Por favor, informe o seu nome para começar!');
    if (inputNome) inputNome.focus();
    return;
  }

  if (perguntas.length === 0) return;

  nomeJogador = valorNome;
  indice = 0;
  pontos = 0;

  $('inicio').hidden = true;
  $('resultado').hidden = true;
  $('jogo').hidden = false;

  renderizar();
  window.scrollTo(0, 0);
}

$('next-button').addEventListener('click', () => {
  if (!respondeu) return;

  indice++;

  if (indice < perguntas.length) {
    renderizar();
  } else {
    mostrarResultado();
  }
});

$('start-button').addEventListener('click', iniciarQuiz);

$('player-name').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    iniciarQuiz();
  }
});

carregarPerguntas();