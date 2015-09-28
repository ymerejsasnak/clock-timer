$(function(){
    'use strict';

    
    function Clock() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                        'September', 'October', 'November', 'December'];

        this.update = function() {
            this.dateObject = new Date();

            //date
            this.day = days[this.dateObject.getDay()];
            this.month = months[this.dateObject.getMonth()];
            this.date = this.dateObject.getDate();            
            this.year = this.dateObject.getFullYear();

            //time
            this.hours = this.dateObject.getHours();
            this.minutes = this.dateObject.getMinutes().pad(2);
            this.seconds = this.dateObject.getSeconds().pad(2);
            if (this.hours > 12) {
                this.hours = this.hours - 12;
                this.ampm = 'PM';
            }
            else {
                this.ampm = 'AM';
            }
        }

        
        this.show = function() {
            dateDiv.text(`${clock.day}, ${clock.month} ${clock.date}, ${clock.year}`);
            timeDiv.text(`${clock.hours}:${clock.minutes}:${clock.seconds} ${clock.ampm}`);
        }
    }


    function Timer() {

    }


    //perfect little padding method stolen from stackoverflow
    Number.prototype.pad = function(size) {
        var s = String(this);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }







    var dateDiv = $('#date');
    var timeDiv = $('#time');

    var clock = new Clock();

    clock.update();
    clock.show();

    //updates clock every second
    setInterval(function() {
        clock.update();
        clock.show();
    }, 1000);




});