/**
 * Formulário de Contato SMTS - EmailJS
 *
 * IMPORTANTE: Antes de usar em produção, você (cliente) precisa:
 *   1. Criar conta gratuita em https://www.emailjs.com (até 200 emails/mês grátis)
 *   2. Adicionar um Email Service (Gmail/Outlook) conectado a comercial@smts.com.br
 *   3. Criar um Email Template com os campos abaixo
 *   4. Copiar PUBLIC_KEY, SERVICE_ID e TEMPLATE_ID nesta configuração
 *
 * Os campos do template devem incluir as variáveis:
 *   {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}, {{product}}
 *
 * Modelo recomendado para o assunto do email no EmailJS:
 *   [Site SMTS] {{subject}} — {{from_name}}
 */

const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'SEU_PUBLIC_KEY_AQUI',
  SERVICE_ID: 'SEU_SERVICE_ID_AQUI',
  TEMPLATE_ID: 'SEU_TEMPLATE_ID_AQUI'
};

if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'SEU_PUBLIC_KEY_AQUI') {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

window.SMTS_EMAIL = EMAILJS_CONFIG;

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var submitBtn = document.getElementById('cf-submit');
    var feedback = document.getElementById('cf-feedback');

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.value.trim() || !form.email.value.trim() || !form.phone.value.trim() || !form.message.value.trim()) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }
    if (!emailRegex.test(form.email.value.trim())) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Por favor, informe um e-mail válido.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    var data = {
      from_name: form.name.value,
      from_email: form.email.value,
      phone: form.phone.value,
      subject: form.subject.value,
      message: form.message.value,
      product: 'N/A (formulário geral)'
    };

    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS não carregado. Verifique a tag <script>.');
      }
      if (EMAILJS_CONFIG.PUBLIC_KEY === 'SEU_PUBLIC_KEY_AQUI') {
        throw new Error('EmailJS não configurado. Veja o README.md');
      }
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, data);
      feedback.className = 'form-feedback success';
      feedback.textContent = '✓ Mensagem enviada com sucesso! Nossa equipe entrará em contato em até 1 dia útil.';
      form.reset();
    } catch (err) {
      console.error('Erro ao enviar mensagem.');
      feedback.className = 'form-feedback error';
      feedback.textContent = '✗ Não foi possível enviar a mensagem. Por favor, ligue para ';
      var tel = document.createElement('a');
      tel.href = 'tel:+551932948902';
      tel.style.cssText = 'color:inherit;text-decoration:underline;';
      tel.textContent = '+55 (19) 3294-8902';
      feedback.appendChild(tel);
      feedback.appendChild(document.createTextNode(' ou envie diretamente para '));
      var mail = document.createElement('a');
      mail.href = 'mailto:comercial@smts.com.br';
      mail.style.cssText = 'color:inherit;text-decoration:underline;';
      mail.textContent = 'comercial@smts.com.br';
      feedback.appendChild(mail);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensagem';
    }
  });
});
