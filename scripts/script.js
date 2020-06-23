let fullscreenDebug = true;
let pauseMenuMusic = document.getElementById("pause-menu-music");
let missionContent = []
let cheatHolder = []
let lastCheatTypeTime = Math.floor(Date.now() / 1000);
var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function fadeOutPauseMenuMusic() {
  var audio = $("#pause-menu-music");
  audio.animate({volume:0});
  setTimeout(function() {
  pauseMenuMusic.pause();
}, 1000);

}

function fadeInPlayMenuMusic() {
  var audio = $("#pause-menu-music");
  pauseMenuMusic.play();
  setTimeout(function() {
  audio.animate({volume:0.5});
}, 200);


}

function playedVideo() {
  if(fullscreenDebug) {openFullscreen();}
  fadeOutPauseMenuMusic();
  gsap.timeline()
  .to(".video-overlay", { //#727272
   duration:0.5,
   filter: "sepia(0)",
   ease: "none",
   backdropFilter: "blur(0px)"
 },"same")
 .to(".pauseMenuContainer", { //#727272
  duration:0.5,
  opacity: 0,
  display: "none",
  ease: "sine.out",
},"same");
 console.log("PLAYED")
}

function pausedVideo() {
  if(fullscreenDebug) {openFullscreen();}

  fadeInPlayMenuMusic();
  //openFullscreen()
  gsap.timeline()
  .to(".video-overlay", { //#727272
   duration:0.5,
   filter: "sepia(0.5)",
   ease: "none",
   backdropFilter: "blur(10px)"
 },"same")
 .to(".pauseMenuContainer", { //#727272
  duration:0.5,
  opacity: 1,
  display: "block",
  ease: "sine.out",
},"same");
 console.log("PAUSED")
}

function togglePlay() {
  var mediaVideo = $("#videoPlayer").get(0);
  if (mediaVideo.paused) {
      mediaVideo.play();
      playedVideo();
  } else {
      mediaVideo.pause();
      pausedVideo();
 }
}

function addMissionContent(content,timeStart,timeEnd) {
  missionContent.push({
    content: content,
    timeStart: timeStart,
    timeEnd: timeEnd
  });
}

$('#videoPlayer').click(function () {
   togglePlay()
});

$('.resume-button').click(function(){
  togglePlay()
});
let video = document.getElementById("videoPlayer");

video.addEventListener('timeupdate', (event) => {

  for(x in missionContent) {
    let mission = missionContent[x]
    if((video.currentTime>=mission["timeStart"]) && (video.currentTime<mission["timeEnd"])) {
      console.log("found!")
      $(".missionContent").html(mission["content"]);
    }
  }
});

document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    let letter = String.fromCharCode(charCode).toLowerCase();
    if (charCode) {
        let timeNow = Math.floor(Date.now() / 1000);
        if(((timeNow-lastCheatTypeTime)>2) && cheatHolder.length != 0) {
          cheatHolder = []
          cheatHolder.push(letter);
          lastCheatTypeTime =timeNow;
        } else {
            cheatHolder.push(letter);
            lastCheatTypeTime =timeNow;
        }
    }
    console.log(cheatHolder.join(""))
    let cheatCode = "givemegta";
    if(cheatHolder.join("")=="givemegta") {
      video.currentTime = 180;
      cheatHolder = []
    } else if(cheatHolder.join("")=="bike") {
      video.currentTime = (60*5) + 4; //5:04
      cheatHolder = []
    } else if(cheatHolder.join("")=="skip") {
      video.currentTime = video.currentTime + 20; //5:04
      cheatHolder = []
    }

};

setTimeout(function(){
      if(fullscreenDebug) {openFullscreen();}
     document.getElementById('videoPlayer').play();
 },1000);
