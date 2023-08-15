document.addEventListener("DOMContentLoaded", function () {
  var brute_force_effect = (element) => {
    // "use strict";
    var effect = this;

    effect.init = () => {
      effect.letters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890&#*+%?£@§$_-</>.,;:";
      // effect.letters = "&#*+%?£@§$_-</>.,;:";
      effect.fadeBuffer = false;
      effect.curr_length = 0;
      effect.message = element.innerHTML.trim();
      setTimeout(effect.animateIn, 100);
    };

    effect.generateRandomString = (length) => {
      var random_text = "";
      while (random_text.length < length) {
        random_text += effect.letters.charAt(
          Math.floor(Math.random() * effect.letters.length)
        );
      }
      return random_text;
    };

    effect.animateIn = () => {
      if (effect.curr_length < effect.message.length - 1) {
        effect.curr_length += 1;
        var message = effect.generateRandomString(effect.curr_length);
        // $(element).html(message);
        element.innerHTML = message;

        setTimeout(effect.animateIn, 50);
      } else {
        setTimeout(effect.animateFadeOut, 50);
      }
    };

    effect.animateFadeOut = () => {
      if (effect.fadeBuffer === false) {
        effect.fadeBuffer = [];
        for (var i = 0; i < effect.message.length; i++) {
          effect.fadeBuffer.push({
            fadeConstant: Math.floor(Math.random() * 12) + 1,
            targetChar: effect.message.charAt(i)
          });
        }
      }

      var do_cycles = false;
      var message = "";

      for (i = 0; i < effect.fadeBuffer.length; i++) {
        var fader = effect.fadeBuffer[i];
        // var fadedChar = "";
        if (fader.fadeConstant > 0) {
          do_cycles = true;
          fader.fadeConstant--;
          message += effect.letters.charAt(
            Math.floor(Math.random() * effect.letters.length)
          );
        } else {
          message += fader.targetChar;
        }
      }

      // $(element).html(message);
      element.innerHTML = message;

      if (do_cycles === true) {
        setTimeout(effect.animateFadeOut, 80);
      } else {
        setTimeout(effect.glitch, Math.floor(Math.random() * 10000) + 5000);
      }
    };

    effect.cycleText = () => {
      effect.curr_length = 0;
      effect.fadeBuffer = false;

      setTimeout(effect.animateIn, 200);
    };

    effect.glitch = () => {
      var glitchedCharCount =
        Math.floor(Math.floor(effect.message.length * 0.6) * Math.random()) + 1;
      var glitchIndex = [];
      for (var i = 0; i < glitchedCharCount; i++) {
        glitchIndex[i] = Math.floor(Math.random() * effect.message.length);
      }
      effect.fadeBuffer = [];
      for (i = 0; i < effect.message.length; i++) {
        var fadeConstant = 0;
        if (glitchIndex.includes(i)) {
          fadeConstant = Math.floor(Math.random() * 12) + 1;
        }
        effect.fadeBuffer.push({
          fadeConstant: fadeConstant,
          targetChar: effect.message.charAt(i)
        });
      }
      effect.animateFadeOut();
    };

    effect.init();
  };

  var elements = document.querySelectorAll(".brute-force-effect");
  elements.forEach((element) => {
    brute_force_effect(element);
  });
  ////////////////////////////////////////////////////////////////
  let getCurrentDate = () => {
    var now = new Date();
    // var days = [
    //   "Sunday",
    //   "Monday",
    //   "Tuesday",
    //   "Wednesday",
    //   "Thursday",
    //   "Friday",
    //   "Saturday"
    // ];
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var date = (now.getDate() < 10 ? "0" : "") + now.getDate();
    function fourdigits(number) {
      return number < 1000 ? number + 1900 : number;
    }
    var today =
      date + " " + months[now.getMonth()] + ", " + fourdigits(now.getYear());
    return today;
  };

  elements = document.querySelectorAll(".today");
  elements.forEach((element) => {
    element.innerHTML = getCurrentDate();
  });
});
