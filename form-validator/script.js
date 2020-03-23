const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required.`)
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if(input.value === '') {
    return;
  } else if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must have at least ${min} characters.`);
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must have ${max} characters or less.`);
  }
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
  if(input.value === '') {
    return;
  }
  else if(re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid.');
  }
}

function checkPasswordsMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, 'Passwords must match.');
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  formControl.className = 'form-control error';
  small.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    ${message}
  `;
}

function showSuccess(input, message) {
  const formControl = input.parentElement;

  formControl.className = 'form-control success';
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});