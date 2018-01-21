
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
distance0 = 0
 
//FORWARD INV 20 80 OK -- 2-1 2-1 1-2

var $ispeed1 = $("#speed1"); 
var $ispeed2 = $("#speed2");
var $idistance0 = $("#distance0"); 
var $idelay = $("#delay");

$ispeed1.change(function(){
  speed1 = parseInt($("#speed1").val()); 
  car1.speed = speed1    

});

$ispeed2.change(function(){
  speed2 = parseInt($("#speed2").val());
  car2.speed = speed2

});

$idelay.change(function(){
  delay = $("#delay").val();
  car2.delay = delay

});

$idistance0.change(function(){

  distance0 = parseInt($("#distance0").val()); 
  init();

  //console.log("Here")

});




var car1 = {speed:speed1,total:total1,delay:0,pointer:$car1,sequence:1}
var car2 = {speed:speed2,total:total2,delay:delay,pointer:$car2,sequence:2}
 


$("#button1").click(function(){
 
  forward();
  //forwardInverted();

});

$("#button1b").click(function(){
 
  //forward();
  forwardInverted();

});

$("#button2").click(function(){

  backward()
 

});

$("#button2b").click(function(){

  backwardInverted()
 

});



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


$resetButton.click(function(){

  executeRev()
  init()    
});


$resetButtonb.click(function(){

  executeRev()
  init()  
});



function move(obj){

  if (obj.total >= limit) {

    } else { 

      if (obj.delay > 0) {
        obj.delay = obj.delay - 1 
  

      }else{

        obj.total += obj.speed * scaleFactor;

        if (obj.total >= limit) {

            //EXCEED CASE
            var difference = obj.total - limit
            obj.total = limit;
            return forwardStep(obj.pointer,((obj.speed * scaleFactor) - difference))
            
          
        }else{
          
            return forwardStep(obj.pointer,(obj.speed * scaleFactor))
            
        }

         
      }
  }


}  



function moveBack(obj){
 

  if (obj.total == lowerLimit){

  } else if (obj.total < lowerLimit) {
 

  } else {  


    if (obj.delay > 0) {
        obj.delay = obj.delay - 1 

 

    }else{


        obj.total -=  (obj.speed * scaleFactor);


        if (obj.total > lowerLimit) {
          
         
          return backwardStep(obj.pointer,(obj.speed * scaleFactor * -1))
          
        } else {

          
          var difference = lowerLimit - obj.total
          obj.total = lowerLimit
          
          return backwardStep(obj.pointer,((obj.speed * scaleFactor * -1) + difference))
         

        }

    }
  }

}



function move2(obj){
   
    if (obj.total >= limit) {

    } else { 

      obj.total += distance0 * scaleFactor;
      return forwardStep(obj.pointer,(distance0 * scaleFactor))

    }

}  



function execute(){
     timer = setTimeout(function () {
    
        if ( forward() == true){
        //if ( forwardInverted() == true){
          execute();
        }
      }, 1000);
}

function executeRev(){
     timer = setTimeout(function () {
    
        if ( backward() == true){
        //if ( forwardInverted() == true){
          executeRev();
        }
      }, 1000);
}

function executeInverted(){
     //timer = setTimeout(function () {
    
        //if ( forward() == true){
        if ( forwardInverted() == true){
          executeInverted();
        }
      //}, 1000);
}


function executeRevInverted(){
    // timer = setTimeout(function () {
    
        if ( backwardInverted() == true){
        //if ( forwardInverted() == true){
          executeRevInverted();
        }
      //}, 1000);
}




function backwardStep(obj,speed){

      return TweenMax.to(obj,1,{ x: "+=" + speed, onUpdate:distanceBetween3, ease: Linear.easeNone})
          
}
 

function forwardStep(obj,speed){
      
      return TweenMax.to(obj,1,{ x: "+=" + speed, onUpdate:distanceBetween3, ease: Linear.easeNone})
 

}

 
function distanceBetween3(){

  var biggest = Math.max(car1.total,car2.total)
  var smallest = Math.min(car1.total,car2.total)

  var answer = (biggest - smallest) / 10

  distanceBetween.val(answer);

}
 

function backward(){
    calcLimit()
    var status = false;
    var stepDown = 0;

    var first = moveBack(car1)
    var second = moveBack(car2)


    if (first){
      stepDown += 1
    }
    if (second){
      stepDown += 1
    }

    if (stepDown == 2 ){
      tl.add(combine(first,second))
    }

    if (stepDown == 1){
        if (first){
          tl.add(first)
        }
        if (second){
          tl.add(second)
        }
    }



  if (stepDown > 0){

    $step.val(parseInt($step.val())-1);
    status = true

  }
  stepDown = 0;


  return status
 
}



function backwardInverted(){
    calcLimit()
    var status = false;
    var stepDown = 0;
    var first = moveBack(car1)
    var second = move(car2)


    if (first){
      stepDown += 1
    }
    if (second){
      stepDown += 1
    }

    if (stepDown == 2 ){
      tl.add(combine(first,second))
    }

    if (stepDown == 1){
        if (first){
          tl.add(first)
        }
        if (second){
          tl.add(second)
        }
    }

 
    if (stepDown > 0){

      $step.val(parseInt($step.val())-1);
      status = true
    }
    stepDown = 0;
    return status;
}





function combine(first,second){

      //var test3
        var tl2 = new TimelineMax()
        tl2.add("step")   
        tl2.add(first,"step")
        tl2.add(second,"step")   
        return tl2
}

function calcLimit(input){
  
  var roadLength = document.getElementById('road').offsetWidth
  var car2length = document.getElementById('car2').offsetWidth
  scaleFactor = Math.floor(roadLength / 100)
  roadLength = roadLength - car2length

  limit = roadLength


  console.log(scaleFactor,roadLength,limit)

}


function forward(){
  calcLimit()
  var status = false;
  var stepUp = 0;
  
  //var indicator = checkSpeed()

    var first = move(car1)
    var second = move(car2)
    

    if (first){
      stepUp += 1
    }
    if (second){
      stepUp += 1
    }

    if (stepUp == 2 ){
      tl.add(combine(first,second))
    }

    if (stepUp == 1){
        if (first){
          tl.add(first)
        }
        if (second){
          tl.add(second)
        }
    }
  
  if (stepUp > 0){
    
    $step.val(parseInt($step.val())+1);
    status = true;
    
  }

  stepUp = 0;
  return status;


}



function forwardInverted(){
  calcLimit()
  var status = false;
  var stepUp = 0;
  
  var first = move(car1)
  var second = moveBack(car2)

    if (first){
      stepUp += 1
    }
    if (second){
      stepUp += 1
    }

    if (stepUp == 2 ){
      tl.add(combine(first,second))
    }

    if (stepUp == 1){
      if (first){
          tl.add(first)
      }
      if (second){
          tl.add(second)
      }
    }


  if (stepUp > 0){
    $step.val(parseInt($step.val())+1);
    status = true;
  }

  stepUp = 0;

  return status;

}


function init(){
  calcLimit()
  if (car2.total >= limit) {


  } else { 

    //executeRev()
    tl.add(move2(car2))

    

  }
}



 