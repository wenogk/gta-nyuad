/*
The following code is used to fill up the missionContent array in script.js for the creation of a dynamic object so that the missionContent can be updated seamlessly.
It is in a separate file mainly for the separtion of concerns and cleanliness
*/
addMissionContent(`
  Information not available yet!
  <img src= "assets/images/conf.png" class="img-fluid"/>
  `,0,162, false);
addMissionContent(`
  Select your clothes <br />
  This is the start of the game. Your outfit is not fit for a criminal, so it's time for you to change it. Go over your options and pick your outfit to begin your crime life.
  `,163,235,false);
addMissionContent(`
    Get Money&Sanatizer <br />
    Remember how Romeno refused to give you money and hand sanitizer? It's time for your revenge. Get $$$ and sanatizer, and maybe beat him up along the way so he learns his lesson.
    `,236,285, true);
addMissionContent(`
  Acquire a Bike <br />
   When you wanted to borrow a bike and you were feeling down, Saad was very rude to you and told you to get lost.
  It's time for Saad to lose his bike.

  `,286,342, true);
  addMissionContent(`
    Steal Monister Energy Drink <br />
   You have been broke for the past week, spending all your money on alchohol and cigarettes. The convenience Store refused to give you a monster energy drink so its time for you to steal it.

    `,343,401, true);
    addMissionContent(`
      Failed Mission <br />
      You got caught stealing. The dean is very pissed at you and he decided to suspend you. Life is too short to care, so enjoy a walk on campus while it lasts.

      `,401,492,false);
