var slider = tns({
  arrowKeys: true,
  autoplay: false,
  container: ".js-slider-product-tray",
  controls: true,
  controlsContainer: ".js-controls",
  gutter: 24,
  items: 1.2,
  loop: false,
  mouseDrag: true,
  nav: false,
  responsive: {
    360: {
      items: 2.4,
    },
    600: {
      items: 3.6
    },
    900: {
      items: 6
    },
  },
  slideBy: "page",
  touch: true
});