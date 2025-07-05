document.addEventListener('DOMContentLoaded', () => {
  const billInput = document.querySelector('#bill');
  const peopleInput = document.querySelector('#people');
  const tipButtons = document.querySelectorAll('.tip');
  const customTipInput = document.querySelector('.custom');
  const tipAmountDisplay = document.querySelector('#tip-amount');
  const totalDisplay = document.querySelector('#total');
  const resetButton = document.querySelector('#reset-btn');
  const errorText = document.querySelector('#error-text');

  let selectedTip = 15;

  const getBill = () => parseFloat(billInput.value);
  const getPeople = () => parseInt(peopleInput.value);
  const getCustomTip = () => parseFloat(customTipInput.value) || 0;

  const hasValidInput = () => {
    return billInput.value.trim() !== '' && (selectedTip > 0 || customTipInput.value.trim() !== '');
  };

  const showError = () => {
    setTimeout(() => {
      errorText?.classList.add('visible');
      peopleInput.classList.add('error');
    }, 3000);
  };

  const hideError = () => {
    errorText?.classList.remove('visible');
    peopleInput.classList.remove('error');
  };

  const updateDisplays = (tip, total) => {
    tipAmountDisplay.textContent = `$${tip.toFixed(2)}`;
    totalDisplay.textContent = `$${total.toFixed(2)}`;
  };

  const calculateTip = () => {
    const bill = getBill();
    const people = getPeople();

    if (hasValidInput() && (!people || people === 0)) {
      showError();
      return;
    } else {
      hideError();
    }

    if (!bill || !people) return;

    const tipAmount = (bill * selectedTip) / 100 / people;
    const total = (bill + bill * selectedTip / 100) / people;

    updateDisplays(tipAmount, total);
  };

  const checkResetState = () => {
    const hasInput =
      billInput.value.trim() !== '' ||
      peopleInput.value.trim() !== '' ||
      customTipInput.value.trim() !== '' ||
      Array.from(tipButtons).some((btn) => btn.classList.contains('active'));

    resetButton.disabled = !hasInput;
  };

  const handleTipButtonClick = (button) => {
    tipButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    selectedTip = parseFloat(button.textContent);
    customTipInput.value = '';
    calculateTip();
    checkResetState();
  };

  tipButtons.forEach((button) => {
    button.addEventListener('click', () => handleTipButtonClick(button));
  });

  customTipInput.addEventListener('input', () => {
    tipButtons.forEach((btn) => btn.classList.remove('active'));
    selectedTip = getCustomTip();
    calculateTip();
    checkResetState();
  });

  billInput.addEventListener('input', () => {
    calculateTip();
    checkResetState();
  });

  peopleInput.addEventListener('input', () => {
    calculateTip();
    checkResetState();
  });

  resetButton.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    selectedTip = 15;
    tipButtons.forEach((btn) => btn.classList.remove('active'));
    updateDisplays(0, 0);
    hideError();
    resetButton.disabled = true;
  });

  checkResetState();
});