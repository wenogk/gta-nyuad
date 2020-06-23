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
]

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
