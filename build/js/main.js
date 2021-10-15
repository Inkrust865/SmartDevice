'use strict';

(function () {
  var MouseButtons = {
    LEFT: 0
  };

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
      }
    }
  })

  window.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target !== buttonFeedback) {
      if (modalFeedback.classList.contains('modal--show')) {
        if (evt.button === MouseButtons.LEFT) {
          if (evt.target === modalFeedback) {
            modalFeedback.classList.remove('modal--show');
          }
        }
      }
    }
  });

  buttonScroll.addEventListener('click', function(evt) {
    evt.preventDefault();
    feedbackBlock.scrollIntoView({behavior: "smooth"});
  })

  var accordion = (function (element) {
    var getItem = function (elements, className) {
      var element = undefined;
      elements.forEach(function (item) {
        if (item.classList.contains(className)) {
          element = item;
        }
      });
      return element;
    };

    return function () {
      var mainElement = {},
          items = {},
          contents = {};

      var actionClick = function (evt) {
        if (!evt.target.classList.contains('page-footer__title')) {
        }
        evt.preventDefault();

        var header = evt.target,
          item = header.parentElement,
          itemActive = getItem(items, 'accordion-item--show');

        if (itemActive === undefined) {
          item.classList.add('accordion-item--show');
        } else {
          itemActive.classList.remove('accordion-item--show');
          if (itemActive !== item) {
            item.classList.add('accordion-item--show');
          }
        }
      },

      setupListeners = function () {
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

  /*var element = document.getElementById('phone');
  var maskOptions = {
    mask: '+{7}(0000000000)'
  };
  var mask = IMask(element, maskOptions);*/

  window.addEventListener("DOMContentLoaded", function() {
      [].forEach.call( document.querySelectorAll('[name=user-phone]'), function(input) {
      var keyCode;
      function mask(event) {
          event.keyCode && (keyCode = event.keyCode);
          var pos = this.selectionStart;
          if (pos < 3) event.preventDefault();
          var matrix = "+7 (___ ___ ____)",
              i = 0,
              def = matrix.replace(/\D/g, ""),
              val = this.value.replace(/\D/g, ""),
              new_value = matrix.replace(/[_\d]/g, function(a) {
                  return i < val.length ? val.charAt(i++) || def.charAt(i) : a
              });
          i = new_value.indexOf("_");
          if (i != -1) {
              i < 5 && (i = 4);
              new_value = new_value.slice(0, i)
          }
          var reg = matrix.substr(0, this.value.length).replace(/_+/g,
              function(a) {
                  return "\\d{1," + a.length + "}"
              }).replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
          if (event.type == "blur" && this.value.length < 5)  this.value = ""
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false)

    });

  });
})();

