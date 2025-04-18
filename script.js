function validateName(event) {
    const name = event.target.value;
    const element = event.target;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/; // Validar nomes com letras e espaços
    const hasMultipleWords = name.trim().split(/\s+/).length > 1;

    validateElement(name, nameRegex.test(name) && hasMultipleWords, element);
}

function validateCPF(event) {
    const cpf = event.target.value;
    const element = event.target;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    validateElement(cpf, cpfRegex.test(cpf), element);
}

function validateEmail(event) {
    const email = event.target.value;
    const element = event.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    validateElement(email, emailRegex.test(email), element);
}

function validateUser(event) {
    const user = event.target.value;
    const element = event.target;
    const userRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;

    validateElement(user, userRegex.test(user), element);
}

function validateElement(value, expression, element) {
    if (!value) {
        clearValidationStyles(element);
        return;
    }

    if (expression) {
        resetElementStyle(element);
    } else {
        applyErrorStyle(element);
    }
}

function resetElementStyle(element) {
    element.classList.remove('invalid');
    element.classList.add('valid');
}

function applyErrorStyle(element) {
    element.classList.remove('valid');
    element.classList.add('invalid');
}

function clearValidationStyles(element) {
    element.classList.remove('valid', 'invalid');
}

document.getElementById('cpf').addEventListener('input', validateCPF);
document.getElementById('name').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('user').addEventListener('input', validateUser);

async function LogIn(event) {
  event.preventDefault();

  // elements
  let user = document.getElementById("user");
  let password = document.getElementById("pwd");

  // values
  let userValue = user.value;
  let passwordValue = password.value;

  fetch("../data.json")
    .then((response) => response.json())
    .then(async (data) => {
      let users = data.users;
      let usernames = Object.keys(users);
      let matchedUser = usernames.find((username) => {
        return (
          username === userValue && users[username].password === passwordValue
        );
      });

      if (!matchedUser) {
        let popup = CreateElement(
          "div",
          "popup-error",
          "Usuário ou senha incorretos!"
        );
        RemovePopUpOfConsole(popup);
        return; // Sai da função se o usuário não for encontrado
      }

      // Se o usuário for encontrado, exibe a mensagem de sucesso
      let popup = CreateElement(
        "div",
        "popup-sucess",
        "Login realizado com sucesso!"
      );
      RemovePopUpOfConsole(popup);

      // Exibe a barra de carregamento
      let loaderContainer = document.querySelector(".loader-container");
      loaderContainer.style.display = "inline";

      // Inicia a barra de carregamento
      let progressElement = document.querySelector(".progress-bar");
      let percentageElement = document.getElementById("percentage");
      let width = 0;

      let interval = setInterval(() => {
        if (width < 100) {
          width++;
          progressElement.style.width = width + "%";
          percentageElement.innerText = width + "%";
        } else {
          clearInterval(interval);
          // Redireciona para a página home após o carregamento
          window.location.href = "home-club.html";
        }
      }, 40);
    })
    .catch((error) => console.error("Erro ao carregar os usuários:", error));
}

async function SignUp(event) {
  event.preventDefault();
  console.log("entrou no signup");

  // elements
  let name = document.getElementById("name");
  let cpf = document.getElementById("cpf");
  let email = document.getElementById("email");
  let user = document.getElementById("user");
  let password = document.getElementById("pwd");
  let passwordConfirm = document.getElementById("confirm-pwd");

  console.log(name);

  // values
  let nameValue = name.value;
  let cpfValue = cpf.value;
  let emailValue = email.value;
  let userValue = user.value;
  let passwordValue = password.value;
  let passwordConfirmValue = passwordConfirm.value;

  // validations
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const userRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
  const hasMultipleWords = nameValue.trim().split(/\s+/).length > 1;
  const requiredFields = [
    nameValue,
    cpfValue,
    emailValue,
    userValue,
    passwordValue,
    passwordConfirmValue,
  ];
  let emptyFields = requiredFields.filter((field) => field == '');

  if (emptyFields.length > 0) {
    let popup = CreateElement('div', 'popup-error', '❌ Existem campos vazios!<br>Preencha todos os campos.');
    RemovePopUpOfConsole(popup);
    return;
  }
  else if (!nameRegex.test(nameValue) || !hasMultipleWords) {
    let popup = CreateElement('div', 'popup-error', '❌ Nome inválido!<br>O nome deve começar com uma letra, ter no mínimo 2 palavras e conter apenas letras e espaços.');
    RemovePopUpOfConsole(popup);
    return;
  }
  else if (!cpfRegex.test(cpfValue)) {
    let popup = CreateElement('div', 'popup-error', '❌ CPF inválido!<br>O CPF deve estar no formato xxx.xxx.xxx-xx.');
    RemovePopUpOfConsole(popup);
    return;
  }
  else if (!emailRegex.test(emailValue)) {
    let popup = CreateElement('div', 'popup-error', '❌ E-mail inválido.<br>Por favor, insira um endereço de e-mail no formato correto (ex: nome@dominio.com).');
    RemovePopUpOfConsole(popup);
    return;
  }
  else if (!userRegex.test(userValue)) {
    let popup = CreateElement('div', 'popup-error', '❌ Usuário inválido!<br>O nome de usuário deve começar com uma letra e conter apenas letras e números.');
    RemovePopUpOfConsole(popup);
    return;
  }
  else if (passwordValue != passwordConfirmValue) {
    let popup = CreateElement('div', 'popup-error', '❌ As senhas não coincidem!');
    RemovePopUpOfConsole(popup);
    return;
  } 
  else if (!passwordRegex.test(passwordValue)) {
    let popup = CreateElement('div', 'popup-error', '❌ Sua senha é fraca! Ela deve conter mais de 8 caracteres, ao menos um especial, uma letra e um número.');
    RemovePopUpOfConsole(popup);
    return;
  } 
  else {
    let popup = CreateElement('div', 'popup-sucess', '✅ Cadastro realizado com sucesso!<br>Você será redirecionado para a página de login.');
    RemovePopUpOfConsole(popup);

    // Outras validações
    // Salvar os dados em memória
    await Sleep(1800);
    window.location.href = "index.html";
  }
}

function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function CreateElement(element, className, content) {
  {
    let x = document.createElement(element);
    x.className = className;
    x.innerHTML = content;
    document.body.appendChild(x);

    return x;
  }
}

function RemovePopUpOfConsole(popup)
{
    popup.addEventListener("animationend", (event) => {
        if (event.animationName === "fadeOut") {
            popup.remove();
        }
    });
}

document.addEventListener('copy', (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    // Cria um elemento temporário para copiar o conteúdo com estilo
    const tempElement = document.createElement('div');
    tempElement.style.backgroundColor = 'transparent'; // Define o fundo como transparente
    tempElement.style.color = 'inherit'; // Mantém a cor do texto
    tempElement.textContent = selectedText;

    document.body.appendChild(tempElement);

    // Seleciona o conteúdo do elemento temporário
    const range = document.createRange();
    range.selectNodeContents(tempElement);
    selection.removeAllRanges();
    selection.addRange(range);

    // Executa o comando de cópia
    document.execCommand('copy');

    // Remove o elemento temporário
    document.body.removeChild(tempElement);

    // Impede o comportamento padrão
    event.preventDefault();
});