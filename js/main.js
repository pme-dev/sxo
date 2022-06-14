document.getElementById("mobile-menu").addEventListener("click", activeMenu);
function activeMenu() {
  document.getElementById("mobile-menu").classList.toggle("active");
}

document
  .getElementById("objet_contact")
  .addEventListener("change", objetChange);
function objetChange() {
  let objet = document.getElementById("objet_contact").value;
  let select = document.querySelector(".wrapper-seventh");

  if (objet === "Demande de devis" || objet === "Quotation request") {
    select.classList.remove("invisible");
    select.classList.add("visible");
  } else {
    select.classList.remove("visible");
    select.classList.add("invisible");
  }
}

document
  .getElementById("budget_contact")
  .addEventListener("change", changeBudget);
function changeBudget() {
  let budg = document.getElementById("budget_contact").value;
  document.getElementById("budg").value = budg;
}

// let getDiv = document.getElementById("js-append");

// var newDiv = document.createElement("div");
// newDiv.innerHTML =
// "<div class='container'><div class='col-2'><div class='left-part'><div><img src='./img/nuages-design.png' /></div></div><div class='right-part'><h2>Curabitur non finibus justo</h2><p class='first'>Sed id aliquam neque. Aliquam vitae malesuada quam, non sollicitudin orci. Pellentesque in augue tincidunt, cursus nulla quis, dignissim odio.</p><a class='btn hvr-sweep-to-top' href='/'>Nam mattis</a></div></div></div>";
// getDiv.appendChild(newDiv);

$(function () {
  $("#mobile-menu .open").click(function (e) {
    e.preventDefault();
    $("#mobile-menu").toggleClass("active");
  });

  var slideMovingSpeed = 750;
  var rootUrl = $("#root-url").html();

  var slidesOnPage = $('div[id^="slide-"]');

  function screenResize() {
    var windowHeight = window.innerHeight;
    $(".full-height").height(windowHeight);
    $(".almost-full-height").height(windowHeight - 50);
  }

  $(window).resize(screenResize);
  screenResize();
  /* Scrolling animation function */

  function animateScrollTo(dest, onAnimationEnd) {
    var heightMainMenuSmall = 46;
    var destOffset = dest.offset().top;
    var srcOffset = $(this).offset().top;
    var offset =
      destOffset + (destOffset > srcOffset ? 1 : -1) - heightMainMenuSmall;
    $("html, body").animate(
      {
        scrollTop: offset,
      },
      slideMovingSpeed,
      function () {
        if (onAnimationEnd !== undefined) onAnimationEnd(offset);
      }
    );
  }
  /* Hack function to manually set active pin when going to top of page */

  function setActivePinWhenGoingToTop(offset) {
    if (offset == -1) {
      setNavOnSlideChange($("#slide-header"));
    }
  }
  /* Animate scroll anchor */

  $("a[href*=#]:not([href=#])").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      if (target.length) {
        animateScrollTo.bind(this)(target, setActivePinWhenGoingToTop);
        return false;
      }
    }
  });

  function setNavOnSlideChange(slide) {
    var slideIndex = Number(slide.attr("data-index"));
    var pins = $("#vertical-nav-pins .pin");
    pins.removeClass("active");
    $(pins[slideIndex]).addClass("active");
    slidesOnPage.removeClass("active");
    slide.addClass("active");
  }

  function changeNavColor(slide, direction) {
    if (direction == "up") {
      /* If going up, take previous slide into account */
      var indexOfPreviousSlide = Number(slide.attr("data-index")) - 1;
      slide = $("[data-index=" + indexOfPreviousSlide + "]");
    }

    var bgColor = slide.attr("data-bg-color");

    if (bgColor == "light") {
      // $('#vertical-nav').addClass('black');
      $("#vertical-nav-pins").addClass("black");
    } else {
      // $('#vertical-nav').removeClass('black');
      $("#vertical-nav-pins").removeClass("black");
    }
  }

  slidesOnPage
    .waypoint(
      function (direction) {
        if (direction === "down") setNavOnSlideChange($(this));
      },
      {
        continuous: false,
        offset: "25%",
      }
    )
    .waypoint(
      function (direction) {
        if (direction === "up") setNavOnSlideChange($(this));
      },
      {
        continuous: false,
        offset: "-25%",
      }
    )
    .waypoint(
      function (direction) {
        changeNavColor($(this), direction);
      },
      {
        continuous: false,
        offset: "50%",
      }
    );
  $("#slide-contact").attr("data-index", $("[data-index]").length - 1);
  /* Change slide with vertical-nav */

  /* Check contact errors */

  $(".required").focus(function (e) {
    $(this).removeClass("error");
  });

  function validateEmail(email) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  $("#slide-contact .send-button").click(function (e) {
    e.preventDefault();
    var form = $(this).closest("form");
    var inputs = $("select.required,textarea.required", form);
    var el = "";
    var flag = true;

    for (var i = 0, max = inputs.length; i < max; ++i) {
      el = $(inputs[i]);
      /* Ignore Anti SPAM field */

      if (el.attr("name") == "name") continue;
      /* END Anti SPAM */

      if (el.val().trim() == "" || el.val().trim() == 0) {
        el.addClass("error");
        if (el.is("select")) $(".customSelect").addClass("error");

        if (flag) {
          alert("Merci de remplir tous les champs obligatoires.");
          flag = false;
        }
      } else if (
        el.attr("name") == "email" &&
        !validateEmail(el.val().trim())
      ) {
        el.addClass("error");

        if (flag) {
          alert("Cet adresse e-mail n'est pas valide.");
          flag = false;
        }
      } else {
        el.removeClass("error");
      }
    }

    // console.log(flag);

    if (flag) {
      // $(this).after("<img style='width:50px;' src='/img/spinner.gif' />");
      $(this).css("display", "none");
      form.submit();
    }
  });
  var menuSmall = false;

  window.onscroll = function (ev) {
    var scrollY = $(window).scrollTop();

    if (!menuSmall && scrollY > 10) {
      menuSmall = true;
      $("#main-menu").addClass("small");
    } else if (menuSmall && scrollY <= 10) {
      menuSmall = false;
      $("#main-menu").removeClass("small");
    }
  };

  $("select").customSelect();
  $(".customSelect").append(
    "<span class='right-part'><i class='fa fa-caret-down'></i></span>"
  );
  var titleCookie =
    "NPraesent semper rhoncus tortor ut malesuada. Aenean non ante posuere, tincidunt erat vel, malesuada arcu.";
  var closeCookie = "Euismod";
  var seeCookie = "Donec mollis nibh.";

  cookieChoices.showCookieConsentBar(
    titleCookie,
    closeCookie,
    seeCookie,
    rootUrl + "/mentions-legales"
  );

  function createCookie(name, value, days) {
    var expires = "";

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  // document.querySelector(".croix").addEventListener("click", closePopup);
  function closePopup() {
    document.getElementById("popup").classList.remove("active");
    createCookie("popupRemoved", "true", 1);
  }

  function displayTonicTuesdayPopup() {
    $("#popup").click(function () {
      // $("#popup").removeClass("active"); // createCookie("popupRemoved", "true", 1);
      // createCookie("popupRemoved", "true", 1);
      // console.log("nico")
    });
    $("#popup").addClass("active");
  }
  if (readCookie("popupRemoved") == undefined) {
    // displayTonicTuesdayPopup();
  }
  // console.log(readCookie(popupRemoved));

  function displayTonicTuesdayPopupAfterXMinutes(minutes) {
    var seconds = parseInt(readCookie("timePassedOnWebsite"));
    if (isNaN(seconds)) seconds = 0;

    if (seconds < minutes * 60) {
      var interval = setInterval(function () {
        if (seconds >= minutes * 60) {
          displayTonicTuesdayPopup();
          clearInterval(interval);
        }

        seconds += 5;
        createCookie("timePassedOnWebsite", seconds, 1);
      }, 5000);
    }
  } // displayTonicTuesdayPopupAfterXMinutes(1.2);
  // $('#slide-contact').waypoint(function (direction) {
  //   if (direction === 'down')
  //     displayTonicTuesdayPopup();
  // }, {continuous: false, offset: '50%'});

  $(".expertise-toggles li div:first-child").click(function () {
    var text = $(this).next("div.panel");

    if (text.is(":hidden")) {
      text.slideDown("200");
      $(this).children(".sign").html("<span class='minus'>-</span>");
    } else {
      text.slideUp("200");
      $(this).children(".sign").html("<span class='plus'>+</span>");
    }
  });
  $("#ventes-domaine .send-button").click(function (e) {
    e.preventDefault();
    var form = $(this).closest("form");
    var inputs = $("select.required,textarea.required", form);
    var el = "";
    var flag = true;

    for (var i = 0, max = inputs.length; i < max; ++i) {
      el = $(inputs[i]);
      /* Ignore Anti SPAM field */

      if (el.attr("name") == "name") continue;
      /* END Anti SPAM */

      if (el.val().trim() == "" || el.val().trim() == 0) {
        el.addClass("error");
        if (el.is("select")) $(".customSelect").addClass("error");

        if (flag) {
          alert("Merci de remplir tous les champs obligatoires.");
          flag = false;
        }
      } else if (
        el.attr("name") == "email" &&
        !validateEmail(el.val().trim())
      ) {
        el.addClass("error");

        if (flag) {
          alert("Cet adresse e-mail n'est pas valide.");
          flag = false;
        }
      } else {
        el.removeClass("error");
      }
    }

    console.log(flag);

    if (flag) {
      // $(this).after("<img style='width:50px;' src='/img/spinner.gif' />");
      $(this).css("display", "none");
      form.submit();
    }
  });
});
