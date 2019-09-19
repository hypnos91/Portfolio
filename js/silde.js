var flicking = new eg.Flicking(".slidecontainer__slide--1", {
  circular: false,
  gap: 40
}).on("select", e => {
  e.panel.focus(300);
});

var flicking = new eg.Flicking(".slidecontainer__slide--2", {
  circular: false,
  gap: 40
}).on("select", e => {
  e.panel.focus(300);
});
