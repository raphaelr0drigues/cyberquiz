CyberQuiz
Trabalho em Grupo — TechQuiz | Desenvolvimento Front-end para Web (ADS — Universidade Braz Cubas).

Link do Site Publicado
Acesse o quiz online: [https://raphaelr0drigues.github.io/cyberquiz/](https://raphaelr0drigues.github.io/cyberquiz/)

Tema e Regras

Tema: Cibersegurança e Segurança Digital (senhas, autenticação em dois fatores, phishing, ransomware, HTTPS e redes Wi-Fi públicas).

Regras:

- O jogador informa seu nome ou apelido na tela inicial para iniciar o desafio.
  
- O quiz apresenta 15 perguntas de múltipla escolha (4 alternativas cada), carregadas dinamicamente via fetch a partir de data/perguntas.json.
  
- Cada acerto soma 1 ponto. Ao responder, o sistema exibe feedback imediato com explicação educativa e link para a fonte oficial (CISA / MDN).
  
- Ao final, a pontuação é exibida junto ao Ranking da Sessão (armazenado via sessionStorage e ordenado da maior para a menor pontuação), com opção de jogar novamente.

Integrantes e Papéis

- Felipe Ryan Ribeiro Oliveira — Revisão e criação de novas perguntas, explicações e fontes (data/perguntas.json)
- Gabriel de Aquino Ninas — Implementação do sistema de ranking em sessionStorage e fluxo de replay, lógica principal do quiz e validação do JSON via fetch (js/script.js)
- Guilherme Silva Freitas — Estilização, layout responsivo e identidade visual (css/style.css)
- Matheus Almeida da Mota — Implementação da primeira versão de perguntas com arquivo JSON, com explicações e fontes (data/perguntas.json)
- Raphael Henrique Rodrigues da Silva — Estruturação semântica HTML e revisão de acessibilidade e configuração de deploy/GitHub Pages (index.html e .github/workflows/static.yml)
- Vinícius Gregório Oliveira Sanches — Testes funcionais, validação de responsividade e documentação (README.md)

Como Executar Localmente

Como o projeto carrega o arquivo data/perguntas.json via fetch(), é necessário executá-lo por meio de um servidor HTTP local (abrir direto via file:// é bloqueado por CORS nos navegadores):

Clone o repositório:

git clone [https://github.com/raphaelr0drigues/cyberquiz.git](https://github.com/raphaelr0drigues/cyberquiz.git)


🗂️ Estrutura do Projeto

cyberquiz/
├── .github/workflows/
│   └── static.yml         # Pipeline de deploy automático no GitHub Pages
├── css/
│   └── style.css          # Estilização responsiva, contraste WCAG AA e estados de foco
├── data/
│   └── perguntas.json     # Banco com 15 questões, alternativas, explicações e fontes
├── js/
│   └── script.js          # Carregamento assíncrono, validação, lógica do quiz e ranking
├── index.html             # Estrutura semântica das telas (início, jogo e resultado)
└── README.md              # Documentação técnica e guia do projeto
