img="";
stats="";
objects=[];

function setup(){
    canvas=createCanvas(640 , 420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("stats").innerHTML="Status  : Detecting Objects ";
}

function preload(){
    img=loadImage("desk.avif")
}

function draw(){
    image(img , 0 , 0 , 640 , 420);
    fill("#fc4235");
    text("Desk" , 45 , 75);
    noFill();
    stroke("#fc4235");
    rect(30 , 60 , 550 , 350); 

    if(stats != "")
    {
        for(i=0 ; i  <objects.length ; i++)
        {
            document.getElementById("stats").innerHTML="Status : Object Detected";
            fill("#eb4334");
            percent=floor(objects[i].confidence * 100 );
            text(objects[i].label + " " +percent+ "%" , objects[i].x , objects[i].y);
            noFill();
            stroke("#eb4334");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}




function modelLoaded(){
    console.log("Model is Loaded");
    stats=true;
    objectDetector.detect(img , gotResult);
}

function gotResult(error ,  results){
    if(error){
        console.log(error);
    }
console.log(results);
objects=results;
}