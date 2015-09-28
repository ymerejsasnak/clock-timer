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
            if (this.hours > 11) {
                this.ampm = 'PM';
            }
            else {
                this.ampm = 'AM';
            }
            if (this.hours > 12) {
                this.hours = this.hours - 12;
            }
        }

        
        this.show = function() {
            dateDiv.text(`${clock.day}, ${clock.month} ${clock.date}, ${clock.year}`);
            timeDiv.text(`${clock.hours}:${clock.minutes}:${clock.seconds} ${clock.ampm}`);
        }
    }


    function Timer() {
        this.saved = 0;
        
        this.resetTimer = function() {
            this.saved = 0;
            timerDiv.text('00:00:00');      
        }

        this.startTimer = function() {
            this.begin = Date.now();        
        }

        this.stopTimer = function() {
            this.saved = this.now;
        }

        this.update = function() {
            this.now = Date.now() - this.begin + this.saved;
        }

        this.show = function() {
            var minutes = Math.floor(this.now / 1000 / 60);
            var seconds = Math.floor((this.now % (60 * 1000)) / 1000);
            var hundredths = Math.floor((this.now % (1000)) / 10);

            timerDiv.text(`${minutes.pad(2)}:${seconds.pad(2)}:${hundredths.pad(2)}`);
        }
    }



    //perfect little padding method stolen from stackoverflow
    Number.prototype.pad = function(size) {
        var s = String(this);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }




    var dateDiv = $('#date');
    var timeDiv = $('#time');
    var timerDiv = $('#count');

    var clock = new Clock();
    var timer = new Timer();
    var timerIntervalID;

    clock.update();
    clock.show();


    //updates clock every second
    setInterval(function() {
        clock.update();
        clock.show();
    }, 1000);


    //timer button events
    $('#reset').on('click', function() {
        clearInterval(timerIntervalID);
        timer.resetTimer()
    });

    $('#start').on('click', function() {
        timer.startTimer();
        timerIntervalID = setInterval(function() {
            timer.update();
            timer.show();
        }, 1);
    });

    $('#stop').on('click', function() {
        clearInterval(timerIntervalID);
        timer.stopTimer();
    });


});