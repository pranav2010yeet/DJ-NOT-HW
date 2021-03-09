leftwristscore=0
rightWristscore=0
song=""
leftwristx=0
leftwristy=0
rightwristx=0
rightwristy=0

function preload(){
song=loadSound("The Score - Unstoppable.mp3")
}

function setup(){
    canvas=createCanvas(500,500)
                 canvas.center()
      video=createCapture(VIDEO)
                    video.hide()
             video.size(500,500)      
posenet=ml5.poseNet(video, modelloaded)       
posenet.on("pose",gotposes)      

} 


function gotposes(results){
    if (results.length>0) {
        console.log(results)
      leftwristx=floor(results[0].pose.leftWrist.x)
      leftwristy=floor(results[0].pose.leftWrist.y)
    rigthwristy=floor(results[0].pose.rightWrist.y)
    rightwristx=floor(results[0].pose.rightWrist.x)
    leftwristscore=results[0].pose.keypoints[9].score
    rightWristscore=results[0].pose.keypoints[10].score
}

}

function modelloaded(){
console.log("loaded")
}




function draw(){
        image(video,0,0,500,500)
   fill("red")
   stroke("red")
   // code for volume control with left wrist 
   if(leftwristscore>0.2){

    circle(leftwristx,leftwristy,30)
    volume=Number(leftwristy)/500
    console.log(volume)
    song.setVolume(volume)
    document.getElementById("volume").innerHTML="Volume: "+volume
    
   }
   

    
}

function play(){
    song.play()
song.setVolume(1)
song.rate(1)
}
function stop(){
    song.stop()
}