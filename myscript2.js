
var tl = new TimelineMax({ repeat: 0, repeatDelay: 0, delay: 0 });


//function init(){
var total1 = 0;
var total2 = 0;

var delay = $("#delay").val();
var $step = $("#step");
var speed1 = $("#speed1").val(); 
var speed2 = $("#speed2").val();
var distance0 = $("#distance0").val(); 


var limit = 1000
var lowerLimit = 0
var scaleFactor = 10

var meet = $("#meet");
var distanceBetween = $("#distanceBetween");

var timer;

var $car1 = $("#car1");
var $car2 = $("#car2");

var $resetButton = $("#resetButton");
var $resetButtonb = $("#resetButtonb");

//init();
delay = 0
speed1 = 20
speed2 = 30
distance0 = 100


 
//FORWARD INV 20 80 OK -- 2-1 2-1 1-2

var $ispeed1 = $("#speed1"); 
var $ispeed2 = $("#speed2");
var $idistance0 = $("#distance0"); 
var $idelay = $("#delay");

$ispeed1.change(function(){
  speed1 = parseInt($("#speed1").val()); 
  
  car1.speed = speed1
  checkSpeed()
   

});

$ispeed2.change(function(){

  speed2 = parseInt($("#speed2").val());

  car2.speed = speed2
  checkSpeed()
  
  
});

$idelay.change(function(){

  delay = $("#delay").val();
  car2.delay = delay

  checkSpeed()
  

});

$idistance0.change(function(){

  distance0 = parseInt($("#distance0").val()); 

  if (distance0 > 100){
    distance0 = 100

  }


  backwardReset(car2)
  
  init();

  console.log("Here")

});



var $preset = $("#preset");

$preset.change(function(){

  console.log($preset.val())

  var option = parseInt($preset.val())
  var steps = parseInt($step.val())

 
  if (option > 0){

    while (steps > 0){
      backward()
      steps -= 1
    }

    if (option == 1){
      forward()
    }

    if (option == 2){
      forward()
      forward()
    }

    if (option == 3){
      forward()
      forward()
      forward()
    }

  }


});


function checkSpeed()
{
 
    /*
        car1.sequence = 1
        car2.sequence = 2

        return false
    */



    if (car1.speed >= car2.speed){

      car1.sequence = 2
      car2.sequence = 1

      //NORMAL CASE
      return true

    } else {

      if (car2.delay >0){

        car1.sequence = 2
        car2.sequence = 1

        return true

      } else {
        
        car1.sequence = 1
        car2.sequence = 2

        return false
      }
      //INVERT CASE

    }

 
}

 


var car1 = {speed:speed1,total:total1,delay:0,pointer:$car1,sequence:1}
var car2 = {speed:speed2,total:total2,delay:delay,pointer:$car2,sequence:2}

checkSpeed()


 

$resetButton.click(function(){

   var steps = parseInt($step.val())
   while (steps > 0){
      backwardReset()
      steps -= 1
  }
    
});


$resetButtonb.click(function(){

   var steps = parseInt($step.val())
   while (steps > 0){
      backwardReset()
      steps -= 1
  }
  init()  
});

init()

function move(obj){

   var counter = 0;

  if (obj.total >= limit) {

    } else { 

      if (obj.delay > 0) {
        obj.delay = obj.delay - 1 

        delayStep(obj.pointer)

      }else{


        obj.total += obj.speed * scaleFactor;

        if (obj.total >= limit) {

          //EXCEED CASE
          var difference = obj.total - limit
          //difference = 0

          if (obj.sequence == 1){
          
            //forwardStepa(obj.pointer,limit*2)
            forwardStep(obj.pointer,((obj.speed * scaleFactor) - difference))
          
          }else{
            //forward7Step2a(obj.pointer,limit*2)
            forwardStep2(obj.pointer,((obj.speed * scaleFactor) - difference))
          
          }
       
          obj.total = limit;
          

        }else{
          if (obj.sequence == 1){
          
            forwardStep(obj.pointer,(obj.speed * scaleFactor))
          
          }else{
          
            forwardStep2(obj.pointer,(obj.speed * scaleFactor))
          
          }
         
           
        }

    
       
        counter = 1; 

         
      }
  }





  return counter;

}  



function moveBack(obj){


    var counter = 0;

    if (obj.total == lowerLimit){

  } else if (obj.total < lowerLimit) {
 

  } else {  


    if (obj.delay > 0) {
        obj.delay = obj.delay - 1 

        delayStep(obj.pointer)

    }else{


        obj.total -=  (obj.speed * scaleFactor);


        if (obj.total > lowerLimit) {
          
           if (obj.sequence == 1){
            backwardStep(obj.pointer,(obj.speed * scaleFactor * -1))
           }else{
            backwardStep2(obj.pointer,(obj.speed * scaleFactor * -1))
           }

        } else {

          
          var difference = lowerLimit - obj.total
          if (obj.sequence == 1){
            backwardStep(obj.pointer,((obj.speed * scaleFactor * -1) + difference))
          }else{
            backwardStep2(obj.pointer,((obj.speed * scaleFactor * -1) + difference))
          }  
          obj.total = lowerLimit

        }

        counter = 1;
        console.log(total1)
    }
  }

  return counter;
}



  function move2(obj){

     
      if (obj.total >= limit) {

      } else { 

         obj.total += distance0 * scaleFactor;
         forwardStep(obj.pointer,(distance0 * scaleFactor))

      }
   


 
}  




function moveBackReset(obj){

      resetStep(obj.pointer,obj.total)
      obj.total =  0;


}



function execute(){
     timer = setTimeout(function () {
    
        if ( forward() == true){
        //if ( forwardInverted() == true){
          execute();
        }
      }, 1000);
}


function executeInverted(){
     //timer = setTimeout(function () {
    
        //if ( forward() == true){
        if ( forwardInverted() == true){
          executeInverted();
        }
     // }, 1000);
}


$("#button3").click(function(){
  
  execute();

});

$("#button3b").click(function(){
  
  executeInverted();

});



$("#button4").click(function(){

  clearTimeout(timer);

});

$("#button4b").click(function(){

  clearTimeout(timer);

});



function distanceBetween3(){

  var biggest = Math.max(car1.total,car2.total)
  var smallest = Math.min(car1.total,car2.total)

  var answer = (biggest - smallest) / 10

  distanceBetween.val(answer);
}




function backwardStep(obj,speed){

      tl.to(obj,1,{ right: "-=" + speed, onUpdate:distanceBetween3(), ease: Linear.easeNone})
          
}

function backwardStep2(obj,speed){

      tl.to(obj,1,{ right: "-=" + speed, onUpdate:distanceBetween3(), ease: Linear.easeNone},"-=1")
    
}

function forwardStep(obj,speed){

      tl.to(obj,1,{ right: "-=" + speed, onUpdate:distanceBetween3(), ease: Linear.easeNone})
 
}


function forwardStep2(obj,speed){

      tl.to(obj,1,{ right: "-=" + speed, onUpdate:distanceBetween3(), ease: Linear.easeNone},"-=1")
 
}



function delayStep(obj){

      tl.to(obj,1,{ onUpdate:distanceBetween3(), ease: Linear.easeNone})
 
}



function resetStep(obj,speed){

      tl.to(obj,0,{ right: "-=" + (speed * -1), onUpdate:distanceBetween3(), ease: Linear.easeNone})
          
}



 

function backward(){

var stepDown = 0;

    var indicator = checkSpeed()

    if (indicator){
    
      stepDown += moveBack(car2)
      stepDown += moveBack(car1) 

    } else {
     stepDown += moveBack(car1)
     stepDown += moveBack(car2) 
    }

  if (stepDown > 0){

    $step.val(parseInt($step.val())-1);

  }
  stepDown = 0;

  //compute();
  //distanceBetween2();

}



function backwardInverted(){

var stepDown = 0;

    var indicator = checkSpeed()

    if (indicator){
    
      stepDown += move(car2)
      stepDown += moveBack(car1) 

    } else {
     stepDown += moveBack(car1)
     stepDown += move(car2) 
    }

  if (stepDown > 0){

    $step.val(parseInt($step.val())-1);

  }
  stepDown = 0;

  //compute();
  //distanceBetween2();

}



function backwardReset(){


     moveBackReset(car1)
     moveBackReset(car2) 
 
  $step.val(0);
   
  //compute();
  //distanceBetween2();

}






$("#button2").click(function(){

  backward()
 

});

$("#button2b").click(function(){

  backwardInverted()
 

});








function forward(){

  var status = false;
  var stepUp = 0;
  


  var indicator = checkSpeed()
  
    if (indicator){
          
        stepUp += move(car2) 
        stepUp += move(car1)   

    }else{
       stepUp += move(car1) 
       stepUp += move(car2)
    }

  if (stepUp > 0){
    $step.val(parseInt($step.val())+1);
    status = true;
  }

  stepUp = 0;

  //distanceBetween2();
  
  return status;

}



function forwardInverted(){

  var status = false;
  var stepUp = 0;
  
  var indicator = checkSpeed()

  var testing = true;
  
    if (indicator){
      
      if (testing){
        //FOR INVERTED 
        car1.sequence = 2
        car2.sequence = 1
        stepUp += moveBack(car2) 
        stepUp += move(car1)
   
       
       } else {


       stepUp += moveBack(car2) 
       stepUp += move(car1)
       console.log("case1")
      }

    }else{
       stepUp += move(car1) 
       stepUp += moveBack(car2)
       console.log("case2")
    }

  if (stepUp > 0){
    $step.val(parseInt($step.val())+1);
    status = true;
  }

  stepUp = 0;

  //distanceBetween2();
  
  return status;

}








$("#button1").click(function(){
 
  forward();
  //forwardInverted();

});

$("#button1b").click(function(){
 
  //forward();
  forwardInverted();

});


function init(){

  if (car2.total >= limit) {


  } else { 

    var steps = parseInt($step.val())

    while (steps > 0){
      backward()
      steps -= 1
    }

    //forwardStep(car2.pointer,(distance0 * scaleFactor))
    move2(car2)

    
    //car2.total += distance0 * scaleFactor;
  }
}



 