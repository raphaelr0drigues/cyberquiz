
let perguntas = [];
let indice = 0;
let pontos = 0;
let respondeu = false;

const $ = (id) => document.getElementById(id);

async function carregarPerguntas() {
  const botaoIniciar = $('start-button');
  botaoIniciar.disabled = true;

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
    renderizar();

    botaoIniciar.disabled = false;
  } catch (erro) {
    console.error('Erro ao carregar o quiz:', erro);
    botaoIniciar.textContent = 'Erro ao carregar quiz';
  }
}

function renderizar() {
  respondeu = false;

  const q = perguntas[indice];

  $('question-count').textContent =
    `PERGUNTA ${String(indice + 1).padStart(2, '0')} / ${perguntas.length}`;

  $('progress-fill').style.width =
    `${((indice + 1) / perguntas.length) * 100}%`;

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

  titulo.textContent =
    i === q.respostaCorreta
      ? '✓ Resposta correta!'
      : 'Resposta incorreta';

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
}

function mostrarResultado() {
  const cartao = $('quiz-card');

  cartao.replaceChildren();

  const etiqueta = document.createElement('div');
  etiqueta.className = 'eyebrow';
  etiqueta.textContent = 'DESAFIO CONCLUÍDO';

  const titulo = document.createElement('h2');
  titulo.textContent =
    `Você acertou ${pontos} de ${perguntas.length}!`;

  const descricao = document.createElement('p');
  descricao.textContent =
    'Continue aprendendo sobre segurança digital.';

  const reiniciar = document.createElement('button');
  reiniciar.className = 'primary';
  reiniciar.type = 'button';
  reiniciar.textContent = 'Jogar novamente ↻';

  reiniciar.addEventListener('click', () => {
    window.location.reload();
  });

  cartao.append(etiqueta, titulo, descricao, reiniciar);
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

$('start-button').addEventListener('click', () => {
  if (perguntas.length === 0) return;

  $('inicio').hidden = true;
  $('jogo').hidden = false;

  window.scrollTo(0, 0);
});

carregarPerguntas();
