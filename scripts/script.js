let fullscreenDebug = false;
let pauseMenuMusic = document.getElementById("pause-menu-music");
let missionContent = []
let cheatHolder = []
let lastCheatTypeTime = Math.floor(Date.now() / 1000);
console.log(`░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███`)
console.log("Welcome Explorer! We at GTA NYU Abu Dhabi would like to give you a gift.")
console.log("Anytime in the gameplay you can type any of the cheatcodes to unlock checkpoints!")
console.log("The precious cheatcodes are: givemegta, bike, skip, glitch");
console.log(`░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███`)
var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen(); //s
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
  pauseMenuMusic.pause();
}

function fadeInPlayMenuMusic() {
  var audio = $("#pause-menu-music");
  pauseMenuMusic.play();
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

function pauseVideo() {
  mediaVideo.pause();
  pausedVideo();
}

function playVideo() {
  mediaVideo.pause();
  pausedVideo();
}

function addMissionContent(content,timeStart,timeEnd,isProgressBar=true) {
  missionContent.push({
    content: content,
    timeStart: timeStart,
    timeEnd: timeEnd,
    isProgressBar: isProgressBar
  });
}

$('#videoPlayer').click(function () {
   togglePlay()
});

$('.resume-button').click(function(){
  togglePlay()
});

$('.nav-link').click(function() {
  let audio = document.getElementById("pause-menu-press-button");
  audio.play();
});
let video = document.getElementById("videoPlayer");

video.addEventListener('timeupdate', (event) => {

  for(x in missionContent) {
    let mission = missionContent[x]
    if((video.currentTime>=mission["timeStart"]) && (video.currentTime<mission["timeEnd"])) {
      $(".missionContent").html(mission["content"]);
      let missionDuration = mission["timeEnd"] - mission["timeStart"];
      let missionElapsed = mission["timeEnd"] - video.currentTime;
      let percentageProgress = Math.floor((((missionDuration) - (missionElapsed))/missionDuration) * 100);
      if(!mission["isProgressBar"]) {
        $(".missionProgress").html('');
        $(".missionRestart").html('');
      } else {
        $(".missionProgress").html(`
          <div class="progress" style="background: rgb(0,0,0,0.7); height: 50px; width:100%; margin-bottom:5px;">
          <div class="progress-bar bg-success" role="progressbar" style="width: ${percentageProgress}%" aria-valuenow="${percentageProgress}" aria-valuemin="0" aria-valuemax="100">${percentageProgress}% mission complete</div>
          </div>
          `);

        $(".missionRestart").html(`
          <a onclick="setVideoTime(${mission["timeStart"]})" class="nav-item nav-link transparentContent" style="padding:3px;">Restart from checkpoint</a>
          `);
          //
      }

    }
  }
});
function setVideoTime(time) {
  video.currentTime = time;
  togglePlay();
}
document.onkeypress = function(e) {
    e = e || window.event;
    if(e.keyCode == 32){
      togglePlay();
    }
    if(event.keyCode === 27) {
      togglePlay();
    }

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
    if(cheatHolder.join("") == "givemegta") {
      video.currentTime = 180;
      cheatHolder = []
    } else if(cheatHolder.join("")=="bike") {
      video.currentTime = (60*5) + 4; //5:04
      cheatHolder = []
    } else if(cheatHolder.join("")=="skip") {
      video.currentTime = video.currentTime + 20; //5:04
      cheatHolder = []
    } else if(cheatHolder.join("")=="glitch") {
      pauseVideo();
      closeFullscreen();
      document.location.href = "https://wenogk.github.io/gta-nyuad/glitches.html";
      cheatHolder = []
    } else if(cheatHolder.join("")=="fullscreen") {
      fullscreenDebug=true;
      openFullscreen();
      playVideo()
      cheatHolder = []
    }

    //fullscreenDebug

};

setTimeout(function(){
    if(fullscreenDebug) {openFullscreen();}
     playVideo()
 },1000);

 video.onended = function() {
      closeFullscreen();
      document.location.href = "https://wenogk.github.io/gta-nyuad/credits.html";
};
