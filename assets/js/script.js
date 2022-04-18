var events = [];
var currentTime = moment().hour();

//Places current date at the top of the calendar
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

//Pushes events array into localStorage
var saveEvents = function () {
  localStorage.setItem("events", JSON.stringify(events));
};

//Pulls events out of localStorage and loads them onto the correct rows
var loadEvents = function () {
  events = JSON.parse(localStorage.getItem("events"));
  // does nothing if no events in localStorage
  if (events) {
    // loop over object properties
    $.each(events, function (index, value) {
      var eventId = value.id;
      var eventText = value.text;
      //assign text with matching id to textarea el with the same id
      $("#"+eventId).val(eventText);
    });
  }
};

//finds each textarea element id, compares to current hour, sets color class
$("textarea").each(function () {
  var time = $(this).attr("id");

  if (time < currentTime) {
    $(this).addClass("past");
  } else if (time > currentTime) {
    $(this).addClass("future");
  } else {
    $(this).addClass("present");
  }
});
loadEvents();
//listens for any click of a button with .saveBtn class
$(".saveBtn").on("click", function () {
  //finds sibling elements in the same parent <div>
  var clickedEventId = $(this).siblings("textarea").attr("id");
  var clickedEventText = $(this).siblings("textarea").val().trim();
  //creates new object to capture data on save
  var eventDataObj = {
    id: clickedEventId,
    text: clickedEventText
  };
  
  //loadEvents() sets events to null if there is nothing in localStorage,
  //so this if statement sets it back to an empty array so push() will work.
  if(events === null){
    events = [];
  }
  events.push(eventDataObj);
  saveEvents();
});




