document.addEventListener("DOMContentLoaded", function () {
  const originalChildCounts = {};

  function verifyAndActivateSliders() {
    /* Verifico si se debe activar - envio el ID del html y cuantos elementos tiene que haber para armar el slider */
    var promoSliderOn = verifySlider("slider-promo", 5);
    var pasosSliderOn = verifySlider("slider-pasos", 5);
    var productosSliderOn = verifySlider("slider-productos", 5);
    var gestionSliderOn = verifySlider("slider-gestion", 5);
    var beneficiosSliderOn = verifySlider("slider-beneficios", 5);
    var carusselSliderOn = verifySlider("slider-carrusel-info", 4);

    /* Armo o desarmo el slider - envio ID + validacion  */
    toggleSlider("slider-promo", promoSliderOn);
    toggleSlider("slider-pasos", pasosSliderOn);
    toggleSlider("slider-productos", productosSliderOn);
    toggleSlider("slider-gestion", gestionSliderOn);
    toggleSlider("slider-beneficios", beneficiosSliderOn);
    toggleSlider("slider-carrusel-info", carusselSliderOn);
  }

  function verifySlider(sliderId, slidesToShow) {
    var sliderWrapper = document.getElementById(sliderId);
    if (!sliderWrapper) {
      return false;
    }
    
    if (!originalChildCounts[sliderId]) {
      var children = Array.from(sliderWrapper.childNodes).filter(node => node.nodeType === 1);
      originalChildCounts[sliderId] = children.length;
    }

    return (
      originalChildCounts[sliderId] >= slidesToShow || window.innerWidth < 992
    );
  }

  function toggleSlider(sliderId, shouldActivate) {
    var sliderWrapper = document.getElementById(sliderId);
    if (!sliderWrapper) {
      return false;
    }

    if (shouldActivate) {
      sliderWrapper.classList.add("convert-slider");
      initializeSlider(sliderId);
    } else {
      var isSliderInitialized = sliderWrapper.classList.contains("slick-initialized");
      if (isSliderInitialized) {
        $("#" + sliderId).slick("unslick");
        sliderWrapper.classList.remove("convert-slider");
      }
    }
  }

  function initializeSlider(sliderId) {
    var sliderWrapper = document.getElementById(sliderId);
    var isSliderInitialized = sliderWrapper.classList.contains("slick-initialized");

    if (!isSliderInitialized) {
      $("#" + sliderId).slick({
        slidesToShow: sliderId == "slider-carrusel-info" ? 3 : 4, // BAJA LA CANTIDAD EN EL COMPONENTE  slider-carrusel-info
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        focusOnSelect: true,
        variableWidth: true,
        arrows: false,
        dots: true,
        responsive: [
          {
            breakpoint: 996,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              dots: false,
            },
          },
        ],
      });
    }
  }

  /* Sirve para crear un tiempo de retraso y que no se ejecute tantas veces */
  function useDelay(func, delay) {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  }

  window.addEventListener("resize", useDelay(verifyAndActivateSliders, 200));
  verifyAndActivateSliders();
});
