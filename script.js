/*global $*/
var timeToggle = true;
var refreshToggle = true;
var eventToggle = 0;
var clockSound = new Audio("audio/bubbles.mp3");

$(document).ready(function(){
    $('#decrease-session').on('click', function(){
        if(timeToggle){
            var setTime = $('#set-time').text();
            if(setTime > 1){
                setTime--;
                $('#set-time').text(setTime);
                if((setTime + 1) < 60) {
                    displayTime(setTime, $('#min'));
                } else {
                    if((setTime + 1) % 60 == 0) {
                        displayTime((setTime / 60), $('#hour'));
                    } else {
                        displayTime((setTime / 60), $('#hour'));
                    }
                    displayTime( calcTime(setTime, 60), $('#min'));
                }
            }
        }
    });
    $('#increase-session').on('click', function(){
        if(timeToggle) {
            var setTime = $('#set-time').text();
            setTime++;
            $('#set-time').text(setTime);
            if(setTime < 60) {
                displayTime(setTime, $('#min'));
            } else {
                displayTime(setTime / 60, $('#hour'));
                displayTime( calcTime(setTime, 60), $('#min'));
            }
        }
    });
     $('#decrease-break').on('click', function(){
        if(timeToggle) {
            var setBreak = $('#set-break').text();
            if(setBreak > 1){
                setBreak--;
                $('#set-break').text(setBreak);
            }
        }
    });
    $('#increase-break').on('click', function(){
        if(timeToggle){
            var setBreak = $('#set-break').text();
            if(setBreak < 45){
                setBreak++;
                $('#set-break').text(setBreak);
            }
        }
    });
    $('#refresh').on('click', function() {
        refreshToggle = true;
        $('#time').css('color', 'black');
        timeToggle = true;
        $("#set-time").text(25);
        displayTime(0, $("#hour"));
        displayTime(25, $("#min"));
        displayTime(0, $("#sec"));
    });
    $('#pause').on('click', function() {
        timeToggle = true;
    });
    $('#stop').on('click', function() {
        timeToggle = true;
        $('#time').css('color', 'white');
        var seconds = $("#set-time").text() * 60;
        seconds = updateHour(seconds);
        seconds = updateMinute(seconds);
        updateSeconds(seconds);
    });
    $('#play').on('click', function(){
        refreshToggle = false;
        timeToggle = false;
        $('#time').css('color', 'green');
        var seconds = parseInt($('#hour').text()) * 3600 + parseInt($('#min').text()) * 60 + parseInt($('#sec').text());



        var newSeconds = 0;
        var timer = setInterval(function(){
            // console.log(seconds);
            if(timeToggle){
                clearInterval(timer);
                return;
            }
            if(seconds == 0){
                eventToggle++;
            }
            if(eventToggle % 2 != 0 && seconds == 0) {
                clockSound.play();
                seconds = $("#set-break").text() * 60;
                $("#current-event").text("Break");
                $("#time").css('color', 'red');
            } else if(eventToggle % 2 == 0 && seconds == 0){
                clockSound.play();
                seconds = $("#set-time").text() * 60;
                $("#current-event").text("Session");
                $("#time").css('color', 'green');
            }
            if(seconds > 0){
                seconds--;
            }
            newSeconds = updateHour(seconds);
            newSeconds = updateMinute(newSeconds);
            updateSeconds(newSeconds);
        }, 1000);
    });
}); //document ready ends
function updateHour(time_sec) {
    displayTime(time_sec / 3600, $('#hour'));
    return calcTime(time_sec, 3600);
}
function updateMinute(time_sec) {
    displayTime(time_sec / 60, $('#min'));
    return calcTime(time_sec, 60);
}
function updateSeconds(time_sec) {
    displayTime(time_sec, $('#sec'));
}
function displayTime(time, $tag) {
    if(time < 10) {
        $tag.text('0' + Math.floor(time));
    } else {
        $tag.text(Math.floor(time));
    }
}
function calcTime(time, unit) {
    if(time % unit == 0){
        return 0;
    } else {
        return(time - Math.floor(time / unit) * unit);
    }
}
