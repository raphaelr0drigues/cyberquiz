const perguntas = [
  {
    "pergunta": "Qual das opções representa uma prática mais segura para proteger suas contas?",
    "alternativas": [
      "Usar a mesma senha em todos os serviços",
      "Compartilhar códigos de acesso com amigos",
      "Ativar a autenticação em dois fatores",
      "Desativar as atualizações de segurança"
    ],
    "respostaCorreta": 2,
    "explicacao": "A autenticação em dois fatores adiciona uma camada de proteção além da senha.",
    "fonte": "https://www.cisa.gov/secure-our-world/turn-mfa"
  },
  {
    "pergunta": "O que é phishing?",
    "alternativas": [
      "Uma atualização automática do sistema",
      "Uma tentativa de enganar pessoas para obter dados ou acessos",
      "Um tipo de armazenamento em nuvem",
      "Uma ferramenta de compactação de arquivos"
    ],
    "respostaCorreta": 1,
    "explicacao": "Phishing utiliza mensagens ou páginas fraudulentas para induzir vítimas a revelar informações ou executar ações perigosas.",
    "fonte": "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing"
  },
  {
    "pergunta": "Qual é a melhor prática ao criar senhas para contas diferentes?",
    "alternativas": [
      "Repetir a mesma senha em todas",
      "Usar somente o nome e o aniversário",
      "Compartilhar senhas com colegas",
      "Usar senhas longas e únicas para cada conta"
    ],
    "respostaCorreta": 3,
    "explicacao": "Senhas longas e exclusivas reduzem o impacto caso uma conta seja comprometida. Um gerenciador de senhas pode ajudar.",
    "fonte": "https://www.cisa.gov/secure-our-world/use-strong-passwords"
  },
  {
    "pergunta": "Por que é importante atualizar aplicativos e sistemas?",
    "alternativas": [
      "Para corrigir falhas de segurança conhecidas",
      "Para impedir qualquer tipo de ataque definitivamente",
      "Para eliminar a necessidade de senhas",
      "Para desligar os mecanismos de proteção"
    ],
    "respostaCorreta": 0,
    "explicacao": "Atualizações frequentemente corrigem vulnerabilidades que podem ser exploradas por atacantes.",
    "fonte": "https://www.cisa.gov/secure-our-world/update-software"
  },
  {
    "pergunta": "O que você deve fazer ao receber um link inesperado pedindo seus dados bancários?",
    "alternativas": [
      "Abrir rapidamente para não perder o prazo",
      "Responder com os dados solicitados",
      "Confirmar a solicitação por um canal oficial, sem usar o link",
      "Encaminhar o link para seus contatos"
    ],
    "respostaCorreta": 2,
    "explicacao": "Mensagens urgentes com links podem ser golpes. Verifique diretamente pelo aplicativo ou site oficial.",
    "fonte": "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing"
  },
  {
    "pergunta": "O que é ransomware?",
    "alternativas": [
      "Um método de autenticação biométrica",
      "Um malware que pode bloquear dados e exigir resgate",
      "Um navegador com privacidade aprimorada",
      "Um recurso de backup automático"
    ],
    "respostaCorreta": 1,
    "explicacao": "Ransomware é um tipo de software malicioso que pode criptografar dados e exigir pagamento para recuperá-los.",
    "fonte": "https://www.cisa.gov/stopransomware"
  },
  {
    "pergunta": "Qual medida ajuda a reduzir perdas após um ataque de ransomware?",
    "alternativas": [
      "Desativar todos os backups",
      "Salvar arquivos somente em um dispositivo",
      "Usar senhas idênticas em todos os sistemas",
      "Manter backups protegidos e testados"
    ],
    "respostaCorreta": 3,
    "explicacao": "Backups isolados ou protegidos, com restauração testada, podem ajudar na recuperação de dados.",
    "fonte": "https://www.cisa.gov/stopransomware"
  },
  {
    "pergunta": "O que indica o HTTPS em um endereço de site?",
    "alternativas": [
      "Que a conexão usa criptografia de transporte",
      "Que o site é sempre legítimo",
      "Que nenhum dado pode ser roubado",
      "Que o site não coleta informações"
    ],
    "respostaCorreta": 0,
    "explicacao": "HTTPS protege a comunicação em trânsito, mas não garante que o site seja confiável.",
    "fonte": "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS"
  },
  {
    "pergunta": "Qual atitude é mais adequada ao usar uma rede Wi-Fi pública?",
    "alternativas": [
      "Desativar todas as proteções do dispositivo",
      "Aceitar qualquer alerta de certificado",
      "Evitar operações sensíveis em redes não confiáveis",
      "Compartilhar senhas para facilitar o acesso"
    ],
    "respostaCorreta": 2,
    "explicacao": "Em redes desconhecidas, prefira conexões seguras e evite expor dados sensíveis desnecessariamente.",
    "fonte": "https://www.cisa.gov/secure-our-world"
  },
  {
    "pergunta": "Qual é o principal objetivo de um gerenciador de senhas?",
    "alternativas": [
      "Publicar senhas para facilitar a recuperação",
      "Armazenar e ajudar a gerar senhas únicas de forma protegida",
      "Substituir todas as atualizações de segurança",
      "Garantir que nenhuma conta jamais seja invadida"
    ],
    "respostaCorreta": 1,
    "explicacao": "Gerenciadores ajudam a criar e guardar senhas longas e diferentes para cada serviço.",
    "fonte": "https://www.cisa.gov/secure-our-world/use-strong-passwords"
  }
];
let indice = 0, pontos = 0, respondeu = false;
const $ = (id) => document.getElementById(id);
function renderizar() {
  respondeu = false;
  const q = perguntas[indice];
  $('question-count').textContent = `PERGUNTA ${String(indice+1).padStart(2,'0')} / ${perguntas.length}`;
  $('progress-fill').style.width = `${(indice+1)/perguntas.length*100}%`;
  $('question-text').textContent = q.pergunta;
  $('answers').replaceChildren();
  q.alternativas.forEach((alternativa, i) => {
    const botao = document.createElement('button');
    botao.type = 'button'; botao.className = 'answer';
    const letra = document.createElement('b'); letra.textContent = 'ABCD'[i];
    const texto = document.createElement('span'); texto.textContent = alternativa;
    botao.append(letra,texto);
    botao.addEventListener('click', () => responder(i));
    $('answers').append(botao);
  });
  $('feedback').hidden = true;
  $('next-button').disabled = true;
  $('next-button').textContent = indice === perguntas.length-1 ? 'Ver resultado →' : 'Próxima pergunta →';
  $('score-label').textContent = `Pontuação: ${pontos}`;
}
function responder(i) {
  if (respondeu) return;
  respondeu = true;
  const q = perguntas[indice];
  if (i === q.respostaCorreta) pontos++;
  [...$('answers').children].forEach((botao,j) => {
    botao.disabled = true;
    if (j === q.respostaCorreta) botao.classList.add('selected');
    if (j === i && i !== q.respostaCorreta) botao.classList.add('wrong');
  });
  const feedback = $('feedback'); feedback.replaceChildren(); feedback.hidden = false;
  const titulo = document.createElement('strong'); titulo.textContent = i === q.respostaCorreta ? '✓ Resposta correta!' : 'Resposta incorreta';
  const explicacao = document.createElement('p'); explicacao.textContent = q.explicacao;
  const fonte = document.createElement('a'); fonte.href = q.fonte; fonte.target='_blank'; fonte.rel='noopener noreferrer'; fonte.textContent='Consultar fonte ↗';
  feedback.append(titulo,explicacao,fonte);
  $('score-label').textContent = `Pontuação: ${pontos}`;
  $('next-button').disabled = false;
}
$('next-button').addEventListener('click', () => {
  if (!respondeu) return;
  indice++;
  if (indice < perguntas.length) return renderizar();
  $('quiz-card').innerHTML = `<div class="eyebrow">DESAFIO CONCLUÍDO</div><h2>Você acertou ${pontos} de ${perguntas.length}!</h2><p>Continue aprendendo sobre segurança digital.</p><button class="primary" id="restart-button" type="button">Jogar novamente ↻</button>`;
  $('restart-button').addEventListener('click', () => location.reload());
});
renderizar();

$('start-button').addEventListener('click', () => {
  $('inicio').hidden = true;
  $('jogo').hidden = false;
  window.scrollTo(0, 0);
});
