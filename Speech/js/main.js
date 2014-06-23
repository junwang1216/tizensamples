// Remove this for running standalone App ----
function backAppsHome() {
    history.go(-1);
}
// -------------------------------------------

(function () {
    var canvas, track, recognition, textSpeech;

    function speechSuccessCallback(text) {
        jQuery("#speechText").val(text);
    }

    function speechErrorCallback(level, message) {
        jQuery("#speechError").html(message);
    }

    function trackErrorCallback(level, message) {
        playVoice(message);
        jQuery("#trackError").html(message);
    }

    function goTrack(direction) {
        playVoice(direction);

        switch (direction.toUpperCase()) {
        case "L":
        case "LEFT":
            track.goLeft();
            break;
        case "R":
        case "RIGHT":
            track.goRight();
            break;
        case "F":
        case "FORWARD":
        case "GO":
            track.goForward();
            break;
        case "B":
        case "BACK":
            track.goBack();
            break;
        case "S":
        case "STOP":
            track.stop();
            break;
        default:
            track.stop();
        }
    }

    function playVoice(str) {
        tizen.speech.vocalizeString(str);
    }

    function init() {
        var speechMic = document.getElementById("speechMic");

        canvas = document.getElementById("trackCanvas");
        track = new Track(canvas, trackErrorCallback);
        recognition = new SpeechRecognition();
        textSpeech = new TextSpeech(recognition, speechMic, speechSuccessCallback, speechErrorCallback);

        speechMic.addEventListener("click", function(event) {
            textSpeech.start(event);
            event.preventDefault();
        });

        jQuery("#trackLeft").bind("click", function(event) {
            goTrack("left");
            event.preventDefault();
        });

        jQuery("#trackRight").bind("click", function(event) {
            goTrack("right");
            event.preventDefault();
        });

        jQuery("#trackForward").bind("click", function(event) {
            goTrack("forward");
            event.preventDefault();
        });

        jQuery("#trackBack").bind("click", function(event) {
            goTrack("back");
            event.preventDefault();
        });

        jQuery("#trackStop").bind("click", function(event) {
            goTrack("stop");
            event.preventDefault();
        });

        document.addEventListener('tizenhwkey', function(e) {
            if (e.keyName == "back")
                tizen.application.getCurrentApplication().exit();
        });
    };

    function Track(canvas, errorCallback) {
        var _context = canvas.getContext("2d"), _point_x, _point_y, _point_r, _point_x_min, _point_y_min, _point_x_max, 
            _point_y_max, _point_x_old, _point_y_old, _time, _interval, _track = {}, _border = {}, _borderColor = {};

        function _setDefault() {
            _point_x = canvas.width / 2;
            _point_y = canvas.height / 2;
            _point_r = 4;
            _point_s = 10;
            _point_x_min = 2;
            _point_x_max = canvas.width - 4;
            _point_y_min = 2;
            _point_y_max = canvas.height - 4
            _time = null
            _interval = 500;

            _borderColor = {
                "#EEE8AA": "yellow",
                "#98FB98": "green",
                "#AFEEEE": "blue",
                "#FFC0CB": "red"
            };
            _drawRect(0, 4, "#FFC0CB");
            _drawRect(1, 4, "#EEE8AA");
            _drawRect(2, 4, "#98FB98");
            _drawRect(3, 4, "#AFEEEE");

            _context.beginPath();
            _drawPoint();
        }

        function _recordBorderValue(name, px, py, width, height) {
            _border[name] = {
                left: px,
                top: py,
                right: px + width,
                bottom: py + height
            };
        }

        function _checkBorderValue(px, py) {
            var result, name, b;
            for (name in _border) {
                b = _border[name];
                if (px > b.left && px < b.right && py > b.top && py < b.bottom) {
                    result = _borderColor[name];
                }
            }
            if (!result) result = "red";

            return result;
        }

        function _drawRect(index, count, color) {
            var px = (_point_x / count) * index,
                py = (_point_y / count)* index,
                width = _point_x * 2 - px * 2,
                height = _point_y * 2 - py * 2;
            _context.fillStyle = color;
            _context.lineWidth = 5;
            _context.fillRect(px, py, width, height);
            _recordBorderValue(color, px, py, width, height);
        }

        function _returnTrackKey() {
            return "x" + _point_x + "y" + _point_y;
        }

        function _drawPoint() {
            _context.fillStyle = "#000000";
            _context.moveTo(_point_x, _point_y);
            _context.fillRect(_point_x, _point_y, _point_r, _point_r); 

            _track[_returnTrackKey()] = true;
            _point_x_old = _point_x;
            _point_y_old = _point_y;
        }

        function _goTimer(method) {
            _time = window.setInterval(method, _interval);
        }

        function _clearTimer() {
            window.clearInterval(_time);
            _time = null;
        }

        function _checkWarning() {
            if (_point_x < _point_x_min || _point_x > _point_x_max) {
                _clearTimer();

                _point_x = _point_x_old;
                _point_y = _point_y_old;

                errorCallback("INFO", "The pointer has arrived at black border in x direction.");
                return false;
            }

            if (_point_y < _point_y_min || _point_y > _point_y_max) {
                _clearTimer();

                _point_x = _point_x_old;
                _point_y = _point_y_old;

                errorCallback("INFO", "The pointer has arrived at black border in y direction.");
                return false;
            }

            if (_track[_returnTrackKey()]) {
                _clearTimer();

                _point_x = _point_x_old;
                _point_y = _point_y_old;

                errorCallback("INFO", "The pointer has arrived at repeated position.");
                return false;
            }

            var newBorder = _checkBorderValue(_point_x, _point_y);
            var oldBorder = _checkBorderValue(_point_x_old, _point_y_old);
            if (newBorder !== oldBorder) {
                errorCallback("INFO", "The pointer has passed from " + oldBorder + " zone to " + newBorder + " zone.");
            }

            return true
        }

        this.goLeft = function() {
            _clearTimer();

            _goTimer(function() {
                var warning;

                _point_x -= _point_r;
                warning = _checkWarning();
                if (warning) {
                    _drawPoint();
                }
            });
        }

        this.goRight = function() {
            _clearTimer();

            _goTimer(function() {
                var warning;

                _point_x += _point_r;
                warning = _checkWarning();
                if (warning) {
                    _drawPoint();
                }
            });
        }

        this.goForward = function() {
            _clearTimer();

            _goTimer(function() {
                var warning;

                _point_y -= _point_r;
                warning = _checkWarning();
                if (warning) {
                    _drawPoint();
                }
            });
        }

        this.goBack = function() {
            _clearTimer();

            _goTimer(function() {
                var warning;

                _point_y += _point_r;
                warning = _checkWarning();
                if (warning) {
                    _drawPoint();
                }
            });
        }

        this.stop = function() {
            _clearTimer();
        }

        _setDefault();
    }

    function TextSpeech(recognition, element, successCallback, errorCallback) {
        var recognitionStatus, recognitionConfig, ignoreOnend, timeStamp, finalTranscript;

        var twoLine = /\n\n/g, oneLine = /\n/g, firstChar = /\S/;

        function initialize() {
            recognition.continuous = true;
            recognition.interimResults = true;

            addRecognitionListener();

            recognitionStatus = false;
            finalTranscript = "";
            recognitionConfig = {
                lang : "en_US"
            };
        }

        function addRecognitionListener() {
            recognition.onstart = function() {
                recognitionStatus = true;
                element.src = 'images/mic-animate.gif';
            };

            recognition.onerror = function(event) {
                if (event.error == 'no-speech') {
                    element.src = 'images/mic.gif';
                    showInfo("ERROR", "NO speech.");
                    ignoreOnend = true;
                }
                if (event.error == 'audio-capture') {
                    element.src = 'images/mic.gif';
                    showInfo("ERROR", "No microphone.");
                    ignoreOnend = true;
                }
                if (event.error == 'not-allowed') {
                    if (event.timeStamp - timeStamp < 100) {
                        showInfo("ERROR", "Speech recognition is blocked.");
                    } else {
                        showInfo("ERROR", "Speech recognition is denied.");
                    }
                    ignoreOnend = true;
                }
            };

            recognition.onend = function() {
                recognitionStatus = false;
                if (recognitionStatus) {
                    return;
                }
                element.src = 'images/mic.gif';
                if (!finalTranscript) {
                    showInfo("ERROR", "Speech recognition is uncompletely started.");
                    return;
                }
                showInfo("INFO", "");
            };

            recognition.onresult = function(event) {
                var interimTranscript = "";
                if (typeof (event.results) == 'undefined') {
                    recognition.onend = null;
                    recognition.stop();
                    return;
                }
                for ( var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                finalTranscript = capitalize(finalTranscript);
                successCallback(finalTranscript);
            };
        }

        function linebreak(s) {
            return s.replace(twoLine, '<p></p>').replace(oneLine, '<br>');
        }

        function capitalize(s) {
            return s.replace(firstChar, function(m) {
                return m.toUpperCase();
            });
        }

        function showInfo(level, message) {
            if (errorCallback) {
                errorCallback(level, message);
            }
        }

        this.start = function (event) {
            if (recognitionStatus) {
                recognition.stop();
                return;
            }

            recognition.lang = recognitionConfig.lang;
            recognition.start();

            ignoreOnend = false;
            element.src = 'images/mic-slash.gif';
            ignoreOnend = event.timeStamp;
        }

        initialize();
    }

    jQuery(document).ready(function() {
        init();
    });
})();
