let fullscreenDebug = true; //for debugging purposes, if false there will be no fullscreen video playback
let pauseMenuMusic = document.getElementById("pause-menu-music"); //selector for audio element for pause menu music
let missionContent = [] //mission content array that is dynamically loaded from missionContent.js
let cheatHolder = [] //array that holds the current typed cheat by the user where each element in the array is a letter

let lastCheatTypeTime = Math.floor(Date.now() / 1000); //required to reset cheatHolder later so that multiple cheats can be used

console.log(`░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███`) //message to users in console giving them the cheat codes
console.log("Welcome Explorer! We at GTA NYU Abu Dhabi would like to give you a gift.")
console.log("Anytime in the gameplay you can type any of the cheatcodes to unlock checkpoints!")
console.log("The precious cheatcodes are: givemegta, bike, monster, backagain, skip, glitch");
console.log(`░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███░░▒▓███`)


var elem = document.documentElement;
function openFullscreen() { //function to open full screen taken from stackoverflow
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

function closeFullscreen() { //function to close full screen taken from stackoverflow
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

function fadeOutPauseMenuMusic() { //pause the pause menu music (used to be a fade with timeout but removed it)
  var audio = $("#pause-menu-music");
  pauseMenuMusic.pause();
}

function fadeInPlayMenuMusic() {  //play the pause menu music (used to be a fade with timeout but removed it)
  var audio = $("#pause-menu-music");
  pauseMenuMusic.play();
}

function playedVideo() { //code to run every time the video is played
  if(fullscreenDebug) {openFullscreen();} //force open fullscreen
  fadeOutPauseMenuMusic(); //stop pause menu music
  gsap.timeline()
  .to(".video-overlay", { //animation to blur the video when paused
   duration:0.5,
   filter: "sepia(0)",
   ease: "none",
   backdropFilter: "blur(0px)"
 },"same")
 .to(".pauseMenuContainer", { //animation to show the pause menu
  duration:0.5,
  opacity: 0,
  display: "none",
  ease: "sine.out",
},"same");
}

function pausedVideo() { //code to run whenever video is paused
  //if(fullscreenDebug) {openFullscreen();}

  fadeInPlayMenuMusic(); // play the pause menu music
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

function togglePlay() { //toggle the play mode of the player and call the relevant functions
  var mediaVideo = $("#videoPlayer").get(0);
  if (mediaVideo.paused) {
      mediaVideo.play();
      playedVideo();
  } else {
      mediaVideo.pause();
      pausedVideo();
 }
}

function pauseVideo(force = false) { //pause the video and call pausedVideo()
  var mediaVideo = $("#videoPlayer").get(0);
  mediaVideo.pause();
  pausedVideo();
}

function playVideo() { //play the video and call playVideo()
  var mediaVideo = $("#videoPlayer").get(0);
  mediaVideo.play();
  playedVideo();
}
//mission content is loaded from the missionContent.js file
function addMissionContent(content,timeStart,timeEnd,isProgressBar=true) { //creates an object based on params and pushes it to the missionContent array
  missionContent.push({
    content: content, //the actual html content to be displayed
    timeStart: timeStart, //the time the mission starts
    timeEnd: timeEnd, //the time the mission ends
    isProgressBar: isProgressBar // whether the mission progress bar should be shown or not
  });
}

$('#videoPlayer').click(function () { //onclick listener to video for toggle
   togglePlay()
});

$('.resume-button').click(function(){ //onclick listener to video for resume button
  togglePlay()
});

$('.nav-link').click(function() { //onclick listener to play sound when pause menu tab is clicked
  let audio = document.getElementById("pause-menu-press-button");
  audio.play();
});
let video = document.getElementById("videoPlayer");

video.addEventListener('timeupdate', (event) => { //listen to any time change in video to update mission content

  for(x in missionContent) { //for loop that goes through all the mission content objects
    let mission = missionContent[x]
    if((video.currentTime>=mission["timeStart"]) && (video.currentTime<mission["timeEnd"])) { //if the current video time is between a specified missionContent time
      $(".missionContent").html(mission["content"]); //set the mission content html to the object html string
      let missionDuration = mission["timeEnd"] - mission["timeStart"]; //the defined mission duration
      let missionElapsed = mission["timeEnd"] - video.currentTime; //the elapsed time so far of the current mission
      let percentageProgress = Math.floor((((missionDuration) - (missionElapsed))/missionDuration) * 100); //calculation for the percentage of the current mission completed
      if(!mission["isProgressBar"]) { // if progress bar bool is not true then no progress button or restart mission button
        $(".missionProgress").html('');
        $(".missionRestart").html('');
      } else { // if progress bar bool is true then progress button and restart mission button shown
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
function setVideoTime(time) { //set video time, used for cheat code later
  video.currentTime = time;
  togglePlay();
}
document.onkeypress = function(e) { //key press event listener for cheat codes + play
    e = e || window.event;
    if(e.keyCode == 32){ // escape button toggle play
      togglePlay();
    }
    if(event.keyCode === 27) { // space bar toggle play
      togglePlay();
    }

    var charCode = (typeof e.which == "number") ? e.which : e.keyCode; //if character
    let letter = String.fromCharCode(charCode).toLowerCase(); //char number to actual letter which is then forced to lowercase so even upper case cheat codes r good
    if (charCode) {
        let timeNow = Math.floor(Date.now() / 1000); //current time in seconds, rounded
        if(((timeNow-lastCheatTypeTime)>2) && cheatHolder.length != 0) { //if the last time a cheat code is typed is greater than 2 seconds then empty cheat code array and push current letter
          cheatHolder = []
          cheatHolder.push(letter);
          lastCheatTypeTime =timeNow;
        } else { //if letter is typed within 2 seconds of another letter push letter to cheatHolder array
            cheatHolder.push(letter);
            lastCheatTypeTime =timeNow;
        }
    }
    console.log(cheatHolder.join("")) //print the text for the cheat joining all the elements of the cheat code array
    let cheatCode = "givemegta";

    //cheat codes and their functionalities
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
    } else if(cheatHolder.join("")=="monster") {
      video.currentTime = 343; //5:04
      cheatHolder = []
    } else if(cheatHolder.join("")=="backagain") {
      video.currentTime = 0; //5:04
      cheatHolder = []
    } //343

    //fullscreenDebug

};
//little trick to force full screen after load
setTimeout(function(){
    if(fullscreenDebug) {openFullscreen();}
     playVideo()
 },1000);

 video.onended = function() { //go to credits once the video is finished
      closeFullscreen();
      document.location.href = "https://wenogk.github.io/gta-nyuad/credits.html";
};
$(window).resize(function(){ //if the user tries to resize the scree, pause it so we can force him/her to play and go back to full screen mode ;)
  if(!document.fullscreen) {
    pauseVideo(true)
  }
});
//code to hide cursor after inactivity in video taken from https://codepen.io/vitoralberto/pen/yyRxMQ and edited
var justHidden = false;
var j;

function hide() {
  $('body').addClass("noCursor");
  $('body').removeClass("mfCursor");
  $('body').removeClass("punchCursor");
  justHidden = true;
  setTimeout(function() {
    justHidden = false;
  }, 500);
}

$(document).mousemove(function() {
  if (!justHidden) {
    justHidden = false;
    console.log('move');
    clearTimeout(j);
    $('body').removeClass("noCursor");
    $('body').removeClass("mfCursor");
    $('body').addClass("punchCursor")
    j = setTimeout(hide, 1000);
  }
});
