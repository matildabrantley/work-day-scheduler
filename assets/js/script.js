var schedule = $('#schedule')
var timeblock = $("#time-block"); //prototype for cloning
var timeblocks = [];
var now = moment();

//handles any starting time and work hours
var startingHour = 9;
var workHours = 9;
for (var h=0; h<workHours; h++) {
    var hour = h+startingHour;

    //clone prototype timeblock, give clone's textarea unique id "hour-<hour>"
    var newTimeBlock = timeblock.clone();
    var textArea = newTimeBlock.find("textarea");
    var newId = "hour-" + hour;
    textArea.attr("id", newId); 
    
    if (localStorage[newId] != undefined)
        textArea.text(localStorage[newId]);

    //compare time block to real time
    if (hour < now.hour()) 
        textArea.addClass("past");
    else if (hour == now.hour())
        textArea.addClass("present");
    else
        textArea.addClass("future");


    //ternary AM/PM picker
    var amPm = hour < 12 ? "AM" : "PM"; 
    //for us night shifters
    if (hour == 0) 
        hour = 12;
    //1pm and later
    else if (hour > 12)
        hour -= 12;
    newTimeBlock.find(".hour").text(hour + amPm);
    newTimeBlock.appendTo(schedule);
}

//remove prototype timeblock at start
schedule.children().first().remove();

schedule.on('click', '.saveBtn', saveItem);

function saveItem(event){
    var targetButton = $(event.target);
    var textArea = targetButton.prev();
    console.log(textArea);
    localStorage.setItem(textArea.attr("id"), textArea.val());
}