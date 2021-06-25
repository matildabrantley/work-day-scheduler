var schedule = $('#schedule')
var timeblock = $("#time-block"); //prototype for cloning
var timeblocks = [];

//handles any starting time and work hours
var startingHour = 9;
var workHours = 9;
for (var i=0; i<workHours; i++) {
    //clone prototype timeblock
    var newTimeBlock = timeblock.clone();
    var hour = i+startingHour;
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
    localStorage.setItem("Todo", targetButton.prev().val());
}