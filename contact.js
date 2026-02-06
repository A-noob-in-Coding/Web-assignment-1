document.addEventListener('DOMContentLoaded', function() {
  const clearBtn = document.querySelector('.input-header button');
  const inputs = document.querySelectorAll('.input input[type="text"]');
  const nameInput = inputs[0];
  const phoneInput = inputs[1];
  const emailInput = inputs[2];
  const submitBtn = document.querySelector('.submit-btn');
  const captchaDiv = document.querySelector('.captcha');
  const outputDiv = document.querySelector('.output');
  const emptyDiv = document.querySelector('.empty');

  let captchaAnswer;

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;

    captchaDiv.innerHTML = `
      <label class="form-label">Solve: ${num1} + ${num2} = ?</label>
      <input type="number" class="form-control captcha-input" placeholder="Enter answer">
    `;
  }

  generateCaptcha();

  clearBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    nameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';

    const captchaInput = document.querySelector('.captcha-input');
    if (captchaInput) {
      captchaInput.value = '';
    }

    generateCaptcha();

    emptyDiv.innerHTML = `
      <img src="empty.svg">
      <h2>Click Submit to send us a message!</h2>
    `;
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const captchaInput = document.querySelector('.captcha-input');
    const captchaValue = captchaInput ? captchaInput.value.trim() : '';

    if (!name) {
      window.alert('Please enter your name');
      return;
    }

    if (!phone) {
      window.alert('Please enter your phone number');
      return;
    }

    if (!email) {
      window.alert('Please enter your email');
      return;
    }

    if (!isValidEmail(email)) {
      window.alert('Please enter a valid email format');
      return;
    }

    if (!captchaValue) {
      window.alert('Please solve the CAPTCHA');
      return;
    }

    if (parseInt(captchaValue) !== captchaAnswer) {
      window.alert('CAPTCHA answer is incorrect. Please try again.');
      generateCaptcha();
      return;
    }

    window.alert('Form submitted successfully!');

    emptyDiv.innerHTML = `
      <div class="success-message">
        <h2>Thank You!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>We will contact you soon!</p>
      </div>
    `;

    nameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
    generateCaptcha();
  });
});
