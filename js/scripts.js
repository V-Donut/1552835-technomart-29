const buttonContacts = document.querySelector(".button-contacts");
const feedbackModal = document.querySelector(".write-us");
const feedbackClose = feedbackModal.querySelector(".modal-close");
const feedbackForm = feedbackModal.querySelector(".write-us-form");
const feedbackName = feedbackModal.querySelector("#your-name");
const feedbackEmail = feedbackModal.querySelector("#your-email");
const feedbackMessage = feedbackModal.querySelector("#your-message");

let isStorageSupport = true;
let name, email;

// Чтение данных из localStorage
try {
  name = localStorage.getItem("feedbackName");
  email = localStorage.getItem("feedbackEmail");
} catch (err) {
  isStorageSupport = false;
}

// Открытие окна с формой обратной связи
buttonContacts.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedbackModal.classList.add("modal-show");

  if (isStorageSupport && name && email) {
      // Подстановка данных из localStorage
      feedbackName.value = name;
      feedbackEmail.value = email;
      feedbackMessage.focus();
  } else {
    feedbackName.focus();
  }
});

// Закрытие окна с формой обратной связи
feedbackClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedbackModal.classList.remove("modal-show");
  feedbackModal.classList.remove("modal-error");
});

// Открытие окна с формой обратной связи клавишей Esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (feedbackModal.classList.contains("modal-show")) {
      evt.preventDefault();
      feedbackModal.classList.remove("modal-show");
    }
  }
});

// Отправка формы обратной связи
feedbackForm.addEventListener("submit", function (evt) {
  if (!feedbackName.value || !feedbackEmail.value || !feedbackMessage.value) {
    evt.preventDefault();

    // Анимация формы, если хотя бы одно поле не заполнено
    feedbackModal.classList.remove("modal-error");
    feedbackModal.offsetWidth = feedbackModal.offsetWidth;
    feedbackModal.classList.add("modal-error");

    // Фокусировка на незаполненном поле
    if (!feedbackName.value) {
      feedbackName.focus();
    } else if (!feedbackEmail.value) {
      feedbackEmail.focus();
    } else {
      feedbackMessage.focus();
    }
  } else {
    // Сохранение в localStorage
    if (isStorageSupport) {
      localStorage.setItem("feedbackName", feedbackName.value);
      localStorage.setItem("feedbackEmail", feedbackEmail.value);
    }
  }
});
