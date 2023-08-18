import { NegotiationController } from "./controllers/negotiation.controller.js";

const controller = new NegotiationController();
const form = document.querySelector('.form');
if(form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    controller.add();
  });
} else {
  throw Error ('Não foi possível iniciar a aplicação! Verifique se o form existe!')
}

const importButton = document.querySelector('#btn-import');
if(importButton) {
  importButton.addEventListener('click', () => {
    controller.importData();
  })
} else {
  throw Error('Botão "Importar" não foi encontrado!');
}