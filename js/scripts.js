const mapLink = document.querySelector("#map-link");
const mapPopup = document.querySelector(".map-popup");

const buttonContacts = document.querySelector(".button-contacts");
const feedbackModal = document.querySelector(".write-us");

const cartButtons = document.querySelectorAll(".button-cart");
const cartModal = document.querySelector(".cart-modal");

if (feedbackModal) {
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
}

if (mapPopup) {
  const mapClose = mapPopup.querySelector(".modal-close");

  mapLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.add("modal-show");
  });
  
  mapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.remove("modal-show");
  });
}

if (cartModal) {
  const cartClose = cartModal.querySelector(".modal-close");
  const cartLink = document.querySelector(".cart-link");

  for (let i = 0; i < cartButtons.length; i++) {
    cartButton = cartButtons[i];

    cartButton.addEventListener("click", function (evt) {
      evt.preventDefault();
      cartModal.classList.add("modal-show");

      if (!cartLink.classList.contains("full-cart")) {
        cartLink.classList.add("full-cart");
      }

      const cartCounter = document.querySelector("#cart-counter");
      if (cartCounter) {
        cartCounter.innerHTML = Number(cartCounter.innerHTML) + 1;
      }
    });
  }

  cartClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    cartModal.classList.remove("modal-show");
  });
}

// Закрытие модальных окон клавишей Esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (feedbackModal && feedbackModal.classList.contains("modal-show")) {
      evt.preventDefault();
      feedbackModal.classList.remove("modal-show");
    }

    if (mapPopup && mapPopup.classList.contains("modal-show")) {
      evt.preventDefault();
      mapPopup.classList.remove("modal-show");
    }

    if (cartModal && cartModal.classList.contains("modal-show")) {
      evt.preventDefault();
      cartModal.classList.remove("modal-show");
    }
  }
});
