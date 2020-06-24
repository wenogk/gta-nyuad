/* taken in part from: https://www.jqueryscript.net/text/Create-A-Rolling-End-Credits-Effect-In-jQuery-Roll-Credits.html*/
console.log("loaded");

document.addEventListener('visibilitychange', function() {
    if(document.hidden) {
        // tab is now inactive
        clearInterval();
    }
    else {
        // tab is active again
        // restart timers
location.reload();
    }
});

// Add all names here
var names = [
"Saad Teeti",
"Romeno Wenogk",
"Youssef Abdelhamid",
"Saad Teeti",
"Romeno Wenogk",
"Youssef Abdelhamid",
"Saad Teeti",
"Romeno Wenogk",
"Youssef Abdelhamid",
"Matti Jouett",
"Pierre Depaz",
"Public Safety Staff",
"Convenience Store Staff ",
];

// Add corresponding title here
var titles = [
  "Director",
  "Executive Producer 1",
  "Executive Producer 2",
  "Camera Crew 1",
  "Camera Crew 2",
  "Main Actor",
  "Storyboard",
  "Script Supervisor",
  "Costume Designer",
  "Recording Device Provider",
  "Special Thanks",
  "              ",
  "              ",

]

//function to merge the names
function writeName(){

	var i = 0,
      employee,
      name,
      title,
      bottom;

  var interval = setInterval(function() {
                   employee = '.employee.' + i;
                   name = '.name.' + i;
                   title = '.title.' + i;
                   $('<div></div>').appendTo('#screen').addClass('employee '+i);
                   $('<h4></h4>').appendTo(employee).addClass('title '+i);
                   $('<h2></h2>').appendTo(employee).addClass('name '+i);
                   $(name).text(names[i]);
                   $(title).text(titles[i]);
                   i++;
                   if(i >= names.length) clearInterval(interval);
                 }, 4000);

}

//function to fade the texts

function fadeInText(){
  var i = 0;
  if (i < 150){
  var interval =  setInterval(function(){
                    $('h2').css('opacity', '+=0.01');
                    $('h4').css('opacity', '+=0.01');
                    i++;
                  },100);
  }

}

//function to scrll the text using set interval
function scrollText(){
   var interval = setInterval(function(){
     							   $('.employee').css('bottom', '+=1px');
                     $('.employee').css('opacity', '-=0.0025');
   								 }, 50);
}



$(function(){
writeName();
fadeInText();
scrollText();
})

// $(document).ready(function(){
//
//     var iframe = $('#screen iframe');
//     var player = new Vimeo.Player(iframe);
//
//     player.on('ended', function() {
//         document.location.href = "https://wenogk.github.io/gta-nyuad/glitches.html";
//     });
//
// });
// this to direct the page to the index after the credits are done
window.setTimeout(function() {
    window.location.href = 'index.html';
}, 70000);
