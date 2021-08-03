function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured-image" src="'+data_uri+'"/>';
    });
}
Webcam.set({
    width:350,
    height:350,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

console.log('ml5version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ZoD0Q_UVJ/model.json',modelloaded);

function modelloaded(){
    console.log("model is loaded");
}
function speak(){
    var synth = windiw.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured-image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML =results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "This is looking amazing")
        {
            document.getElementById("update_gesture").innerHTML = "&#128076";
        }
        if(results[0].label == "all the best")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077";
        }
        if(results[0].label == "That was an marvellous victory")
        {
            document.getElementById("update_gesture").innerHTML = "&#9996";
        }