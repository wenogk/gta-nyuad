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

function playedVideo() {
  gsap.to(".video-overlay", { //#727272
   duration:1,
   background: "rgb(144,238,144,0)",
   ease: "sine.out",
 });
}

function pausedVideo() {
  gsap.to(".video-overlay", { //#727272
   duration:1,
   background: "rgb(144,238,144,0.4)",
   ease: "sine.out",
 });
}

$('#videoPlayer').click(function () {
  openFullscreen()
   var mediaVideo = $("#videoPlayer").get(0);
   if (mediaVideo.paused) {
       mediaVideo.play();
       playedVideo();
   } else {
       mediaVideo.pause();
       pausedVideo();
  }
});
