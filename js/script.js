/* ==========================================================================
   1. TEMA CLARO / ESCURO
   Guarda a preferência no localStorage para persistir entre visitas.
   ========================================================================== */
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

function aplicarTema(tema) {
  htmlEl.setAttribute('data-theme', tema);
  themeToggle.textContent = tema === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('tema', tema);
}

// Ao carregar a página, respeita o tema salvo anteriormente (padrão: claro)
aplicarTema(localStorage.getItem('tema') || 'light');

themeToggle.addEventListener('click', () => {
  const temaAtual = htmlEl.getAttribute('data-theme');
  aplicarTema(temaAtual === 'dark' ? 'light' : 'dark');
});

/* ==========================================================================
   2. MENU RESPONSIVO (MOBILE)
   Alterna a classe "open" no menu e atualiza aria-expanded para acessibilidade.
   ========================================================================== */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const aberto = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', aberto);
});

// Fecha o menu mobile automaticamente ao escolher uma seção
navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ==========================================================================
   3. VALIDAÇÃO E ENVIO (SIMULADO) DO FORMULÁRIO DE CONTATO
   ========================================================================== */
const form = document.getElementById('contactForm');
const modalOverlay = document.getElementById('modalOverlay');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Marca visualmente um campo inválido e escreve a mensagem de erro correspondente
function mostrarErro(campo, elementoErro, mensagem) {
  campo.classList.add('invalid');
  elementoErro.textContent = mensagem;
}

function limparErro(campo, elementoErro) {
  campo.classList.remove('invalid');
  elementoErro.textContent = '';
}

function validarFormulario() {
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const mensagemInput = document.getElementById('mensagem');

  const erroNome = document.getElementById('erroNome');
  const erroEmail = document.getElementById('erroEmail');
  const erroMensagem = document.getElementById('erroMensagem');

  let valido = true;

  if (nomeInput.value.trim() === '') {
    mostrarErro(nomeInput, erroNome, 'Informe seu nome.');
    valido = false;
  } else {
    limparErro(nomeInput, erroNome);
  }

  if (emailInput.value.trim() === '') {
    mostrarErro(emailInput, erroEmail, 'Informe seu e-mail.');
    valido = false;
  } else if (!REGEX_EMAIL.test(emailInput.value.trim())) {
    mostrarErro(emailInput, erroEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
    valido = false;
  } else {
    limparErro(emailInput, erroEmail);
  }

  if (mensagemInput.value.trim() === '') {
    mostrarErro(mensagemInput, erroMensagem, 'Escreva uma mensagem.');
    valido = false;
  } else {
    limparErro(mensagemInput, erroMensagem);
  }

  return valido;
}

function abrirModal(mensagem) {
  modalMessage.textContent = mensagem;
  modalOverlay.classList.remove('hidden');
}

function fecharModal() {
  modalOverlay.classList.add('hidden');
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault(); // impede o envio real, pois não há backend nesta atividade

  if (!validarFormulario()) {
    return;
  }

  // Simulação de envio: em um cenário real, aqui entraria uma chamada a uma API
  form.reset();
  abrirModal('Mensagem enviada com sucesso! Em breve retornarei o contato.');
});

modalClose.addEventListener('click', fecharModal);
modalOverlay.addEventListener('click', (evento) => {
  if (evento.target === modalOverlay) fecharModal();
});

/* ==========================================================================
   4. RODAPÉ: ano atual automático
   ========================================================================== */
document.getElementById('ano').textContent = new Date().getFullYear();
