'use strict';

(function () {
  var body = document.querySelector('.js-body');
  var modalFeedback = document.querySelector('.modal');
  var buttonFeedback = document.querySelector('.page-header__button');

  var buttonClose = modalFeedback.querySelector('.modal__close');
  var userName = modalFeedback.querySelector('[name=user-name]');
  var form = modalFeedback.querySelector('modal__form');
  var phone = modalFeedback.querySelector('[name=user-phone]');
  var question = modalFeedback.querySelector('[name=user-question]');
  var checkbox = modalFeedback.querySelector('[name=personal-data-processing]');
  var buttonSubmit = modalFeedback.querySelector('.form__button');

  var buttonScroll = document.querySelector('.intro__button');
  var feedbackBlock = document.querySelector('.feedback');

  var isStorageSupport = 'true';
  var storage = '';

  body.classList.remove('body--nojs');

  try {
    storage = localStorage.getItem('userName');
    storage = localStorage.getItem('phone');
    storage = localStorage.getItem('question');
  } catch(err) {
    isStorageSupport = 'false';
  }

  buttonFeedback.addEventListener('click', function(evt) {
    evt.preventDefault();
    modalFeedback.classList.add('modal--show');
    console.log('Hello!!');

    if (storage) {
      userName.value = storage;
      phone.focus();
    } else {
      userName.focus();
    }
  });

  buttonClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    modalFeedback.classList.remove('modal--show');
  })

  buttonSubmit.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (isStorageSupport) {
      localStorage.setItem('userName', userName.value);
      localStorage.setItem('phone', phone.value);
      localStorage.setItem('question', question.value);
    }
  })

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (modalFeedback.classList.contains('modal--show')) {
        evt.preventDefault();
        modalFeedback.classList.remove('modal--show');
        modalFeedback.classList.remove('modal--error');
      }
    }
  })

  buttonScroll.addEventListener('click', function() {
    feedbackBlock.scrollIntoView({behavior: "smooth"});
  })

  var accordion = (function (element) {
    var getItem = function (elements, className) { // функция для получения элемента с указанным классом
      var element = undefined;
      elements.forEach(function (item) {
        if (item.classList.contains(className)) {
          element = item;
        }
      });
      return element;
    };

    return function () {
      var mainElement = {}, // .accordion
          items = {}, // .accordion-item
          contents = {}; // .accordion-item-content

      var actionClick = function (evt) {
        if (!evt.target.classList.contains('page-footer__title')) { // прекращаем выполнение функции если кликнули не по заголовку
          return;
        }
        evt.preventDefault(); // отменям стандартное действие
        // получаем необходимые данные
        var header = evt.target,
          item = header.parentElement,
          itemActive = getItem(items, 'accordion-item--show');

        if (itemActive === undefined) { // добавляем класс show к элементу (в зависимости от выбранного заголовка)
          item.classList.add('accordion-item--show');
        } else {
          // удаляем класс show у ткущего элемента
          itemActive.classList.remove('accordion-item--show');
          // если следующая вкладка не равна активной
          if (itemActive !== item) {
            // добавляем класс show к элементу (в зависимости от выбранного заголовка)
            item.classList.add('accordion-item--show');
          }
        }
      },

      setupListeners = function () {
        // добавим к элементу аккордиона обработчик события click
        mainElement.addEventListener('click', actionClick);
      };

      return {
        init: function (element) {
          mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
          items = mainElement.querySelectorAll('.accordion-item');
          setupListeners();
        }
      }
    }
  })();

  var footerAccordion = accordion();
  footerAccordion.init('.page-footer__middle-wrapper');
})();
