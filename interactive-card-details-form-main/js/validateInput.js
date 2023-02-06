const inputValue = document.querySelectorAll("[required]");
const formData = document.querySelector('[data-form]');

formData.addEventListener("submit", (event) => {
    event.preventDefault();

    const answerList = {
        "name": event.target.elements["name"].value,
        "fone": event.target.elements["fone"].value,
        "cvv": event.target.elements["cvv"].value,
        "expiration": event.target.elements["expiration"].value,
    }
    localStorage.setItem("cadastro", JSON.stringify(answerList));

    document.getElementById('form').reset();

    window.location.href = './congratulations.html'
}) 

inputValue.forEach((inputItem) => {
    inputItem.addEventListener("blur", () => checksInput(inputItem));
    inputItem.addEventListener("invalid", event => event.preventDefault())
})



const typesOfError = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const Messages = {
    name: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    fone: {
        valueMissing: "O campo de Telefone não pode estar vazio.",
        patternMismatch: "Por favor, preencha um número válido.",
        tooShort: "O número informando não tem caractéres suficientes.",
    },
    expiration: {
        valueMissing: 'O campo de vencimento não pode estar vazio.',
        customError: 'A data de vencimento deve ser maior que o ano atual'
    },
    cvv: {
        valueMissing: 'O campo de CVV não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CVV válido.",
        customError: "O CVV digitado não existe.",
        tooShort: "O campo de CVV não tem caractéres suficientes."
    }
}


function checksInput(inputItem) {
    let message = "";
    inputItem.setCustomValidity('');

    typesOfError.forEach(erro => {
        if (inputItem.validity[erro]) {
            message = Messages[inputItem.name][erro];
            console.log(message);
        }
    })

const messageError = inputItem.parentNode.querySelector(`.error_${inputItem.name}`);
    const validateInput = inputItem.checkValidity();
    if (!validateInput) {
        messageError.textContent = `*${message}`;
    } else {
        messageError.textContent = "";
    }
}

