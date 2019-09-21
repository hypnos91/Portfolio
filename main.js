{
  const body = document.body.intro;
  const docEl = document.documentElement;

  const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b
    var m = (y2 - y1) / (x2 - x1),
      b = y1 - m * x1;
    return m * currentVal + b;
  };

  const lerp = (a, b, n) => (1 - n) * a + n * b;

  const distance = (x1, x2, y1, y2) => {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.hypot(a, b);
  };

  const getMousePos = e => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    return { x: posx, y: posy };
  };

  let winsize;
  const calcWinsize = () =>
    (winsize = { width: window.innerWidth, height: window.innerHeight });
  calcWinsize();
  window.addEventListener("resize", calcWinsize);

  const feDisplacementMapEl = document.querySelector("feDisplacementMap");

  class Menu {
    constructor() {
      this.DOM = {
        svg: document.querySelector("svg.distort"),
        menu: document.querySelector("blockquote.quote")
      };
      this.DOM.imgs = [...this.DOM.svg.querySelectorAll("g > image")];
      this.DOM.menuLinks = [...this.DOM.menu.querySelectorAll(".quote__link")];
      this.mousePos = { x: winsize.width / 2, y: winsize.height / 2 };
      this.lastMousePos = {
        translation: { x: winsize.width / 2, y: winsize.height / 2 },
        displacement: { x: 0, y: 0 }
      };
      this.dmScale = 0;

      this.current = -1;

      this.initEvents();
      requestAnimationFrame(() => this.render());
    }
    initEvents() {
      window.addEventListener(
        "mousemove",
        ev => (this.mousePos = getMousePos(ev))
      );

      this.DOM.menuLinks.forEach((item, pos) => {
        const mouseenterFn = () => {
          this.current = pos;
          TweenMax.to(this.DOM.imgs[this.current], 0.5, {
            ease: Quad.easeOut,
            opacity: 1
          });
        };
        const mouseleaveFn = () => {
          TweenMax.to(this.DOM.imgs[this.current], 0.5, {
            ease: Quad.easeOut,
            opacity: 0
          });
        };
        item.addEventListener("mouseenter", mouseenterFn);
        item.addEventListener("mouseleave", mouseleaveFn);
      });
    }
    render() {
      this.lastMousePos.translation.x = lerp(
        this.lastMousePos.translation.x,
        this.mousePos.x,
        0.15
      );
      this.lastMousePos.translation.y = lerp(
        this.lastMousePos.translation.y,
        this.mousePos.y,
        0.15
      );
      this.DOM.svg.style.transform = `translateX(${this.lastMousePos.translation
        .x -
        winsize.width / 2}px) translateY(${this.lastMousePos.translation.y -
        winsize.height / 2}px)`;

      // Scale goes from 0 to 50 for mouseDistance values between 0 to 100
      this.lastMousePos.displacement.x = lerp(
        this.lastMousePos.displacement.x,
        this.mousePos.x,
        0.07
      );
      this.lastMousePos.displacement.y = lerp(
        this.lastMousePos.displacement.y,
        this.mousePos.y,
        0.07
      );
      const mouseDistance = distance(
        this.lastMousePos.displacement.x,
        this.mousePos.x,
        this.lastMousePos.displacement.y,
        this.mousePos.y
      );
      this.dmScale = Math.min(lineEq(50, 0, 100, 0, mouseDistance), 50);
      feDisplacementMapEl.scale.baseVal = this.dmScale;

      requestAnimationFrame(() => this.render());
    }
  }

  new Menu();
}

//smoothscroll to goto
(function($) {
  "use strict";
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            1000
          );
          return false;
        }
      }
    });
  });
})(jQuery);

TweenMax.from(".quote", 1, {
  delay: 0.4,
  opacity: 0,
  y: 50,
  ease: Expo.ease
});

TweenMax.from(".cad", 1, {
  delay: 0.4,
  opacity: 0,
  y: 50,
  ease: Expo.ease
});

TweenMax.from(".fn", 1, {
  delay: 0.8,
  opacity: 0,
  y: 50,
  ease: Expo.ease
});

TweenMax.from(".fct", 1, {
  delay: 1.2,
  opacity: 0,
  y: 50,
  ease: Expo.ease
});

//slick
{
  $(".poster--slide").slick({
    centerMode: true,
    centerPadding: "60px",
    variableWidth: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4
  });
}
