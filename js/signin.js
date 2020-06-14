const alertError = document.getElementById('alertError');
const alertValid = document.getElementById('alertValid');

const clearAnimations = (elements) => {
  elements.forEach(el => {
    el.classList.remove('remove-element-animation');
    el.style.display = 'none';
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  clearAnimations([alertError, alertValid]);
  
  const { email: { value: email}, password: { value: password}} = event.target;
  
  if(!email || !password) {
    alertError.style.display = 'flex';
    // add a animation class
    setTimeout(() => alertError.classList.add('remove-element-animation'), 1000);
     
  } else {
    alertValid.style.display = 'flex';
    setTimeout(() => alertValid.style.display = 'none', 1000);
  }
};
