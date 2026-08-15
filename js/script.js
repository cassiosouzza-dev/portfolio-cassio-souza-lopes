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
   ========================================================================== */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
let menuAberto = false;

menuToggle.addEventListener('click', () => {
  menuAberto = !menuAberto;
  navLinks.style.maxHeight = menuAberto ? '300px' : '0';
  menuToggle.setAttribute('aria-expanded', menuAberto);
});

// fecha o menu ao escolher uma seção
navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    menuAberto = false;
    navLinks.style.maxHeight = '0';
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ==========================================================================
   3. VALIDAÇÃO E ENVIO (SIMULADO) DO FORMULÁRIO DE CONTATO
   ========================================================================== */
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');
const erroNome = document.getElementById('erroNome');
const erroEmail = document.getElementById('erroEmail');
const erroMensagem = document.getElementById('erroMensagem');
const btnEnviar = document.getElementById('btnEnviar');
const modalOverlay = document.getElementById('modalOverlay');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');

// considera válido um e-mail com um "@" e um "." depois dele
function emailValido(email) {
  const partes = email.split('@');
  if (partes.length !== 2 || partes[0] === '') return false;

  const dominio = partes[1].split('.');
  return dominio.length >= 2 && dominio[dominio.length - 1] !== '';
}

function mostrarErro(campo, elementoErro, mensagem) {
  campo.style.borderColor = 'var(--error)';
  elementoErro.textContent = mensagem;
}

function limparErro(campo, elementoErro) {
  campo.style.borderColor = '';
  elementoErro.textContent = '';
}

function validarFormulario() {
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
  } else if (!emailValido(emailInput.value.trim())) {
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
  modalOverlay.style.display = 'flex';
}

function fecharModal() {
  modalOverlay.style.display = 'none';
}

btnEnviar.addEventListener('click', () => {
  if (!validarFormulario()) return;

  nomeInput.value = '';
  emailInput.value = '';
  mensagemInput.value = '';
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
