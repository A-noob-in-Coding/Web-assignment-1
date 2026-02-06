
document.addEventListener('DOMContentLoaded', function() {
  const clearBtn = document.querySelector('.clear-btn');
  const nameInput = document.querySelector('#name-input');
  const chemObtained = document.querySelector('#chemistry-obtained');
  const chemTotal = document.querySelector('#chemistry-total');
  const mathObtained = document.querySelector('#math-obtained');
  const mathTotal = document.querySelector('#math-total');
  const physicsObtained = document.querySelector('#physics-obtained');
  const physicsTotal = document.querySelector('#physics-total');
  const submitBtn = document.querySelector('.submit-btn');
  const emptyDiv = document.querySelector('.empty');
  const filledDiv = document.querySelector('.filled');
  const resultDiv = document.querySelector('#result');

  clearBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    nameInput.value = '';
    chemObtained.value = '';
    chemTotal.value = '';
    mathObtained.value = '';
    mathTotal.value = '';
    physicsObtained.value = '';
    physicsTotal.value = '';

    emptyDiv.style.display = 'flex';
    filledDiv.style.display = 'none';
  });

  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = nameInput.value.trim();
    const chemObt = parseFloat(chemObtained.value);
    const chemTot = parseFloat(chemTotal.value);
    const mathObt = parseFloat(mathObtained.value);
    const mathTot = parseFloat(mathTotal.value);
    const physObt = parseFloat(physicsObtained.value);
    const physTot = parseFloat(physicsTotal.value);

    if (!name) {
      window.alert('Please enter your name');
      return;
    }

    if (isNaN(chemObt) || isNaN(chemTot)) {
      window.alert('Please enter valid Chemistry marks');
      return;
    }

    if (isNaN(mathObt) || isNaN(mathTot)) {
      window.alert('Please enter valid Mathematics marks');
      return;
    }

    if (isNaN(physObt) || isNaN(physTot)) {
      window.alert('Please enter valid Physics marks');
      return;
    }

    if (chemObt > chemTot || mathObt > mathTot || physObt > physTot) {
      window.alert('Obtained marks cannot be greater than total marks');
      return;
    }

    if (chemObt < 0 || chemTot < 0 || mathObt < 0 || mathTot < 0 || physObt < 0 || physTot < 0) {
      window.alert('Marks cannot be negative');
      return;
    }

    const totalObtained = chemObt + mathObt + physObt;
    const totalMarks = chemTot + mathTot + physTot;

    const percentage = (totalObtained / totalMarks) * 100;

    const isEligible = percentage >= 60;
    const eligibilityStatus = isEligible ? 'eligible' : 'not eligible';
    resultDiv.innerHTML = `
      <p>Dear ${name},</p>
      <p>Your Total marks are ${totalObtained.toFixed(1)} out of ${totalMarks.toFixed(1)}.</p>
      <p>Your Percentage is ${percentage.toFixed(1)}%</p>
      <p>You are <strong>${eligibilityStatus}</strong>.</p>
    `;

    emptyDiv.style.display = 'none';
    filledDiv.style.display = 'flex';
  });
});
