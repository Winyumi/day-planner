$(document).ready(function() {

    var workHours = ["9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"];

    var workHours = ["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"]; // For debugging purposes

    var agendaItems = {};

    init();

    function init() {
        showCurrentDate();
        buildTimeBlocks();
        highlightHours();

        if (localStorage.getItem("agenda")) {
            agendaItems = JSON.parse(localStorage.getItem("agenda"));
            console.log(agendaItems);
        }

    }

    function showCurrentDate() {
        $("#currentdate").html(moment().format("dddd, MMMM D, YYYY"));
    }

    function buildTimeBlocks() {
        $("#timeblocks").empty();
        $.each(workHours, function(i, hour) {
            // agendaItems[hour] = "";
            $("#timeblocks").append(
                $("<div>")
                .addClass("row time-block")
                .attr("data-hour", hour)
                .append(
                    $("<div>").text(hour).addClass("col-1 hour"),
                    $("<textarea>").addClass("col description"),
                    $("<div>").text("save").addClass("col-1 saveBtn")
                    .on("click", function() {
                        saveAgenda(hour);
                    })
                )
            );
            loadAgenda(hour);
        });
    }

    function loadAgenda(hour) {
        if (agendaItems[hour]) {
            $(`div[data-hour="${hour}"] .description`).text(agendaItems[hour]);
        }
    }

    function saveAgenda(hour) {
        agendaItems[hour] = $(`div[data-hour="${hour}"] .description`).val().trim();
        localStorage.setItem("agenda", JSON.stringify(agendaItems));
    }

    function highlightHours() {
        var currentHour = moment().format("h A");
        var currentHourSet = false;
        $("#timeblocks .time-block").each(function() {
            $(this).removeClass("past present future");
            if ($(this).attr("data-hour") == currentHour) {
                $(this).addClass("present");
                currentHourSet = true;
            } else if (currentHourSet) {
                $(this).addClass("future");
            } else {
                $(this).addClass("past");
            }
        });
    }


    var refreshTimer = setInterval(function() {
        showCurrentDate();
        highlightHours();
    }, 10000);
});