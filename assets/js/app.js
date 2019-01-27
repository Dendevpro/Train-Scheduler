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

//Shows user the current time
$("#currentTime").append(moment().format("HH:mm"));

// Button on click event handler
// to add a train to the table
$("#addTrainBtn").on('click', function (event) {
    event.preventDefault();
    // Grabs user input
    // and saves as variable
    var trainName = $("#nameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(3, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    // Creates local object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    // Uploads train data to the database
    database.push(newTrain);

    // Clear out the input fields
    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
});

// Create Firebase event to add trains to the DB
// then append table content according to user input
database.on('child_added', function (snapshot) {
    var data = snapshot.val();
    var trainNames = data.name;
    var trainDestin = data.destination;
    var trainFreq = data.frequency;
    var theFirstTrain = data.firstTrain;

    // Calculate minutes until arrival
    // Take the current time in UNIX and subtract the Train First Arrival Time
    var tLeft = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFreq;
    var tMinutes = trainFreq - tLeft;
    console.log(tMinutes);

    // Calculate the arrival time
    // and add minutes to the current time
    var trainArrival = moment().add(tMinutes, "m").format("HH:mm");

    // Add each train data into the table
    $("#trainTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFreq + "</td><td class='min'>" + trainArrival + "</td><td class='min'>" + tMinutes + "</td></tr>")
});

setInterval(function () {
    window.location.reload();
}, 60000);

