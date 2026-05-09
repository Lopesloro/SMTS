// Tira-dúvidas lateral nas páginas de produto
// Usa a mesma configuração EmailJS do formulário principal (window.SMTS_EMAIL)

(function () {
  var forms = document.querySelectorAll('.qa-form');
  if (!forms.length) return;

  forms.forEach(function (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var feedback = form.querySelector('.qa-feedback');
      var button = form.querySelector('button');
      var product = form.dataset.product || 'Não especificado';
      var data = {
        from_name: form.name.value,
        from_email: form.email.value,
        phone: form.phone.value || 'Não informado',
        subject: 'Dúvida sobre ' + product,
        message: form.message.value,
        product: product
      };

      button.disabled = true;
      button.textContent = 'Enviando...';
      feedback.className = 'qa-feedback';
      feedback.textContent = '';

      try {
        var cfg = window.SMTS_EMAIL;
        if (typeof emailjs === 'undefined' || !cfg || cfg.PUBLIC_KEY === 'SEU_PUBLIC_KEY_AQUI') {
          throw new Error('EmailJS não configurado');
        }
        await emailjs.send(cfg.SERVICE_ID, cfg.TEMPLATE_ID, data);
        feedback.className = 'qa-feedback success';
        feedback.textContent = '✓ Sua dúvida foi enviada! Retornaremos em até 1 dia útil.';
        form.reset();
      } catch (err) {
        console.error('Erro ao enviar dúvida.');
        feedback.className = 'qa-feedback error';
        feedback.textContent = '✗ Erro ao enviar. Ligue ';
        var tel = document.createElement('a');
        tel.href = 'tel:+551932948902';
        tel.style.cssText = 'color:inherit;';
        tel.textContent = '(19) 3294-8902';
        feedback.appendChild(tel);
        feedback.appendChild(document.createTextNode(' ou '));
        var mail = document.createElement('a');
        mail.href = 'mailto:comercial@smts.com.br';
        mail.style.cssText = 'color:inherit;';
        mail.textContent = 'comercial@smts.com.br';
        feedback.appendChild(mail);
      } finally {
        button.disabled = false;
        button.textContent = 'Enviar dúvida';
      }
    });
  });
})();
