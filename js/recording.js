
(function () {
    if (!document.createElement('canvas').getContext) {
        document.body.innerHTML = '<h1 style="height:auto;color:red;font-size:30px;">Excuse me Sir,<br /><br />You are using very old web-browser!<br /><br />Please upgrade it.</h1>';
    }
    var prepend = function (parent, elementToPrepend)
    {
        return parent.insertBefore(elementToPrepend, parent.firstChild);
    };
    var div = document.createElement('div');
    div.innerHTML = '<g:plusone size="tall"></g:plusone>';
    div.className = 'gplus-button';
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.padding = '3px 0';
    div.style.right = '30px';
    var body = document.body;
    if(body.insertBefore) prepend(body, div);
    else document.body.appendChild(div);
})();
(function () {
    var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'RequestCancelAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

window.onload = function(){
    document.getElementById('btn-record-webm').onclick = function() {
        this.disabled = true;
        navigator.mediaDevices.getUserMedia({audio: true}).then(function(audioStream) {
            var canvas = document.getElementById('content');
            var canvasStream = canvas.captureStream();
            var finalStream = new MediaStream();
            audioStream.getAudioTracks().forEach(function(track) {
                finalStream.addTrack(track);
            });
            canvasStream.getVideoTracks().forEach(function(track) {
                finalStream.addTrack(track);
            });
            var recorder = RecordRTC(finalStream, {
                type: 'video'
            });
            recorder.startRecording();
            var stop = false;
            (function looper() {
                if(stop) {
                    recorder.stopRecording(function() {
                        var blob = recorder.getBlob();
                        document.body.innerHTML = '<video controls src="' + URL.createObjectURL(blob) + '" autoplay loop></video>';
                        audioStream.stop();
                        canvasStream.stop();
                    });
                    return;
                }
                setTimeout(looper, 100);
            })();
            var seconds = 15;
            var interval = setInterval(function() {
                seconds--;
                if(document.querySelector('h1')) {
                    document.querySelector('h1').innerHTML = seconds + ' seconds remaining.';
                }
            }, 1000);
            setTimeout(function() {
                clearTimeout(interval);
                stop = true;
            }, seconds * 1000);
        });
    };
}
