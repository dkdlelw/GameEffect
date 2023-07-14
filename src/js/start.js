function start() {
  $(".icon1").draggable({
    containment: ".icon__box",
    scroll: false,

    start: function () {
      $(".cursor img").attr("src", "images/game_mouse01.png");
      $("#header").attr("class", "red");
    },
    drag: function () {
      $(".info").html(
        "현재 <span style='color:rgba(220, 20, 60, 0.76)'>빨간색</span> 폴더를 드래그하고 있습니다."
      );
      $("#header").addClass("red");
    },
    stop: function () {
      $(".info").html("드래그를 멈추었습니다.");
    },
  });
  $(".icon2").draggable({
    containment: ".icon__box",
    scroll: false,

    start: function () {
      $(".cursor img").attr("src", "images/game_mouse02.png");
      $("#header").attr("class", "blue");
    },
    drag: function () {
      $(".info").html(
        "현재 <span style='color:rgba(100, 148, 237, 0.76)'>파랑색</span> 폴더를 드래그하고 있습니다."
      );
      $("#header").addClass("blue");
    },
    stop: function () {
      $(".info").html("드래그를 멈추었습니다.");
    },
  });
  $(".icon3").draggable({
    containment: ".icon__box",
    scroll: false,

    start: function () {
      $(".cursor img").attr("src", "images/game_mouse03.png");
      $("#header").attr("class", "green");
    },
    drag: function () {
      $(".info").html(
        "현재 <span style='color:rgba(168, 247, 65, 0.76)'>초록색</span> 폴더를 드래그하고 있습니다."
      );
      $("#header").addClass("green");
    },
    stop: function () {
      $(".info").html("드래그를 멈추었습니다.");
    },
  });
  $(".icon4").draggable({
    containment: ".icon__box",
    scroll: false,

    start: function () {
      $(".cursor img").attr("src", "images/game_mouse04.png");
      $("#header").attr("class", "yellow");
    },
    drag: function () {
      $(".info").html(
        "현재 <span style='color:rgba(247, 250, 54, 0.76)'>노란색</span> 폴더를 드래그하고 있습니다."
      );
      $("#header").addClass("yellow");
    },
    drag: function () {
      $(".info").html("드래그를 멈추었습니다.");
    },
  });
  $(".music__wrap").draggable({
    scroll: true,
  });

  window.onload = function () {
    window.addEventListener("mousemove", (e) => {
      gsap.to(".cursor", {
        duration: 0,
        left: e.pageX - 5,
        top: e.pageY - 10,
      });
    });

    // function printTime(){
    //     const time = document.querySelector(".time");
    //     const now = new Date();

    //     time.innerHTML =  clock.innerHTML = now.getFullYear() + "년 " +(now.getMonth()+1) + "월 " + now.getDate() + "일 " + now.getHours() + "시 " + now.getMinutes() + "분 "
    //     setTimeout("printTime()", 1000);
    // }

    // function printAgent(){

    // }

    function printTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      // 10분 이하일 때 앞에 0을 붙이기
      const paddedMinute = minute < 10 ? `0${minute}` : minute;

      const timeString = `${year}년 ${month}월 ${date}일 ${hour}:${paddedMinute}`;
      $(".time").text(timeString);
      setTimeout(printTime, 1000);
    }
    $(document).ready(function () {
      printTime();
    }); //오른쪽 상단 시간
    // printAgent();   //하단 중앙
  };
  // $( "#draggable3" ).draggable({ containment: "#containment-wrapper", scroll: false });

  //운영체제
  const os = navigator.userAgent.toLowerCase();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const Info = document.querySelector(".info");

  if (os.indexOf("macintosh") > -1) {
    Info.innerHTML =
      "현재 맥을 사용하고 있으며, 화면 크기는" +
      screenWidth +
      "*" +
      screenHeight +
      "입니다. ";
  } else if (os.indexOf("windows") > -1) {
    Info.innerHTML =
      "현재 윈도우를 사용하고 있으며, 화면 크기는" +
      screenWidth +
      "*" +
      screenHeight +
      "입니다. ";
  } else if (os.indexOf("iphone") > -1) {
    Info.innerHTML =
      "현재 아이폰을 사용하고 있으며, 화면 크기는" +
      screenWidth +
      "*" +
      screenHeight +
      "입니다. ";
  } else if (os.indexOf("android") > -1) {
    Info.innerHTML =
      "현재 안드로이드를 사용하고 있으며, 화면 크기는" +
      screenWidth +
      "*" +
      screenHeight +
      "입니다. ";
  }
}
export default start;
