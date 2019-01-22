// Initialize Firebase
var config = {
    apiKey: "AIzaSyB6wOIcpCHFuEFzOUkFDaF7nKrygxwbYcg",
    authDomain: "train-scheduler-f07ca.firebaseapp.com",
    databaseURL: "https://train-scheduler-f07ca.firebaseio.com",
    projectId: "train-scheduler-f07ca",
    storageBucket: "train-scheduler-f07ca.appspot.com",
    messagingSenderId: "182967098733"
};
firebase.initializeApp(config);

var database = firebase.database().ref();

// var trainData = firebase.database().ref();
//Shows user the current time
$("#currentTime").append(moment().format("HH:mm"));

// Button on click event handler
// to add a train to the table
$("#addTrainBtn").on('click', function (event) {
    event.preventDefault();
    // Grabs user input
    // and saves as variable
    var trainName = $("#nameInput").val();
    var destination = $("#destinationInput").val();
    var firstTrain = $("#firstTrainInput").val();
    var frequency = $("#frequencyInput").val();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    // Uploads train data to the database
    console.log(newTrain);
    database.push(newTrain);



})