const mapLink = document.querySelector("#map-link");
const mapPopup = document.querySelector(".map-popup");

const buttonContacts = document.querySelector(".button-contacts");
const feedbackModal = document.querySelector(".write-us");

const cartButtons = document.querySelectorAll(".button-cart");
const cartModal = document.querySelector(".cart-modal");

const promoSlider = document.querySelector(".promo-slider");

const servicesItems = document.querySelectorAll(".services-item");
const servicesSlides = document.querySelectorAll(".services-slide");

// Форма с обратной связью
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

  // Закрытие окна
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

// Интерактивная карта
if (mapPopup) {
  const mapClose = mapPopup.querySelector(".modal-close");

  // Открытие интерактивной карты
  mapLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.add("modal-show");
  });
  
  // Закрытие окна
  mapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.remove("modal-show");
  });
}

// Добавление товара в корзину
if (cartModal) {
  const cartClose = cartModal.querySelector(".modal-close");
  const cartLink = document.querySelector(".cart-link");

  for (let i = 0; i < cartButtons.length; i++) {
    cartButton = cartButtons[i];

    // Открытие окна добавления в корзину
    cartButton.addEventListener("click", function (evt) {
      evt.preventDefault();
      cartModal.classList.add("modal-show");

      // Перекрашиваем вкладку в хедере
      if (!cartLink.classList.contains("full-cart")) {
        cartLink.classList.add("full-cart");
      }

      // Увеличиваем счетчик в хедере на 1
      const cartCounter = document.querySelector("#cart-counter");
      if (cartCounter) {
        cartCounter.innerHTML = Number(cartCounter.innerHTML) + 1;
      }
    });
  }

  // Закрытие окна
  cartClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    cartModal.classList.remove("modal-show");
  });
}

// Функция переключения слайда
var switchSlide = function(slides, dots, direction) {
  let activeIndex = 0;
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    if (slide.classList.contains("active")) {
      activeIndex = i;
      slide.classList.remove("active");
      dots[activeIndex].classList.remove("active");
      break;
    }
  }

  if (direction === "prev") {
    if (activeIndex === 0) {
      activeIndex = slides.length - 1;
    } else {
      activeIndex = activeIndex - 1;
    }
  } else {
    if (activeIndex === (slides.length - 1)) {
      activeIndex = 0;
    } else {
      activeIndex = activeIndex + 1;
    }
  }

  slides[activeIndex].classList.add("active");
  dots[activeIndex].classList.add("active");
}

var getActiveDot = function(dots) {
  let activeIndex = 0;
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    if (dot.classList.contains("active")) {
      activeIndex = i;
      break;
    }
  }
  return activeIndex;
};

// Активация слайдера в промоблоке
if (promoSlider) {
  const slides = promoSlider.querySelectorAll(".slider-item");
  const prevArrow = promoSlider.querySelector(".slider-arrow-prev");
  const nextArrow = promoSlider.querySelector(".slider-arrow-next");
  const dots = promoSlider.querySelectorAll(".dots");

  // Переключение слайдов назад
  prevArrow.addEventListener("click", function (evt) {
    evt.preventDefault();
    switchSlide(slides, dots, "prev");
  });

  // Переключение слайдов вперед
  nextArrow.addEventListener("click", function (evt) {
    evt.preventDefault();
    switchSlide(slides, dots, "next");
  });

  // Переключение с помощью точек
  for (let i = 0; i < slides.length; i++) {
    const dot = dots[i];
    
    dot.addEventListener("click", function (evt) {
      evt.preventDefault();

      prevIndex = getActiveDot(dots);
      this.classList.add("active");
      currentIndex = getActiveDot(dots);

      let direction;
      if (currentIndex > prevIndex) {
        direction = "next";
      } else {
        direction = "prev";
      }
      
      switchSlide(slides, dots, direction);
    });
  }
}

// Активация слайдера "Сервисы"
if (servicesItems) {
  for (let i = 0; i < servicesItems.length; i++) {
    const servicesItem = servicesItems[i];

    // Переключение слайдов
    servicesItem.addEventListener("click", function (evt) {
      evt.preventDefault();

      const current = this.dataset.slide;
      const currentSlide = document.querySelector(".services-slide-" + current);

      for (let j = 0; j < servicesItems.length; j++) {
        const elem = servicesItems[j];
        const slide = servicesSlides[j];

        if (elem.classList.contains("active")) {
          elem.classList.remove("active");
        }
        if (slide.classList.contains("active")) {
          slide.classList.remove("active");
        }
      }

      this.classList.add("active");
      currentSlide.classList.add("active");
    });
  }
}

// Закрытие модальных окон клавишей Esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    // Закрытие формы обратной связи
    if (feedbackModal && feedbackModal.classList.contains("modal-show")) {
      evt.preventDefault();
      feedbackModal.classList.remove("modal-show");
    }

    // Закрытие интерактивной карты
    if (mapPopup && mapPopup.classList.contains("modal-show")) {
      evt.preventDefault();
      mapPopup.classList.remove("modal-show");
    }

    // Закрытие окна добавления в корзину
    if (cartModal && cartModal.classList.contains("modal-show")) {
      evt.preventDefault();
      cartModal.classList.remove("modal-show");
    }
  }
});
