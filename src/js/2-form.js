const form = document.querySelector('.js-feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const formData = {
  email: '',
  message: '',
};

const storageKey = 'feedback-form-state';

const saveToLocalStorage = () => {
  localStorage.setItem(storageKey, JSON.stringify(formData));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(storageKey);
  return savedData ? JSON.parse(savedData) : null;
};

document.addEventListener('DOMContentLoaded', () => {
  const savedData = loadFromLocalStorage();
  if (savedData) {
    emailInput.value = savedData.email;
    messageTextarea.value = savedData.message;
    formData.email = savedData.email;
    formData.message = savedData.message;
  }
});

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value;
  saveToLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted form data:', formData);
  localStorage.removeItem(storageKey);
  formData.email = '';
  formData.message = '';
  form.reset();
});