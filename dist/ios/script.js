//all special code
const SplashScreen = Capacitor.Plugins.SplashScreen; //only in ios and android
const haptics = Capacitor.Plugins.Haptics; //only in ios and android

const hapticsImpactLight = async () => {
  //only in ios and android
  await haptics.impact({ style: ImpactStyle.Heavy });
};

hapticsImpactLight();

//loading screen animation hiding splash screen
const splashscreenhide = async function () {
    await SplashScreen.hide();
}

//beginning intro line 317
const intro = function () {
    if (!get_cookie("first-intro")) {
        document.querySelector(".intro-box").style.transform =
          "translate(0, -100dvh)";
        document.querySelector(".locate-done").style.opacity = "1";
      } else {
        document.querySelector(".intro-location").scrollIntoView();
      }
      
      document.querySelector(".intro-done").addEventListener("click", function () {
        document
          .querySelector(".intro-notification")
          .scrollIntoView({ behavior: "smooth" });
      });
      
      document
        .querySelector(".notification-done")
        .addEventListener("click", function () {
          requestNotiPermission();
          document
            .querySelector(".intro-location")
            .scrollIntoView({ behavior: "smooth" });
        });
      
      document.querySelector(".locate-done").addEventListener("click", function () {
        main_app_function();
        setInterval(start(), 86400000);
      
        set_cookie("first-intro=true;");
      });
}

//cookie updater
const updateCookies = function () {
  set_cookie([`dhikrs=${JSON.stringify(names)};`]);
  set_cookie([`dhikr_total=${JSON.stringify(dhikr_total)};`]);
  set_cookie([`dhikr_done=${JSON.stringify(dhikr_done)};`]);
  set_cookie([`repeats=${JSON.stringify(repeats)};`]);
  set_cookie([`repeatIDs=${JSON.stringify(repeatIDs)};`]);
};

  //notification reminders
  const add_dhikr_reminder = function (i) {
    if (repeats[i] !== "no_reminder" || !repeats[i] || repeats[i] === null) {
      scheduleRepeatNotification(
        names[i],
        `Reminder to finish ${dhikr_total[i]} ${names[i]}s`,
        repeats[i],
        Number(i)
      );
    } else {
      repeatIDs.push(null);
      return;
    }
  };


const schdeuleDhikrNoti = function() {
    //scheduling notification **not in web
    repeats.push(repeat);
    add_dhikr_reminder(total_dhikrs - 1);

    //resetting repeat value
    document.querySelectorAll('.dhikr-choice').forEach(function (el) {
      el.style.color = secondary_color;
      el.style.backgroundColor = 'transparent'
    })

    document.querySelectorAll(".dhikr-choice")[0].style.color = primary_color;
    document.querySelectorAll(".dhikr-choice")[0].style.backgroundColor = secondary_color;

    repeat = 'no_reminder';
    //
}  

const unScheduleNoti = function(i) {
  //unscheduling notification
  cancelNotification(i);
  repeats.splice(i, 1);
  repeatIDs.splice(i, 1);
}

const vibrate = function() {
    hapticsImpactLight()
    haptics.vibrate({ duration: 3 }); //only in ios and android
}

const request_permission = function () {
  DeviceOrientationEvent.requestPermission()
}