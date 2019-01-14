# Web-Research-Proof-of-Concept

<h2>Kan je Midi live weergeven, opnemen en exporteren. </h2>

<h4> 1-12-18 </h4> <br>
Research naar haalbaarheid en zoeken naar compatibele en beste talen te gebruiken. <br>
https://web.archive.org/web/20141227205754/http://www.sonicspot.com:80/guide/midifiles.html <br>
https://www.midi.org/ <br>
https://www.pygame.org/docs/ref/midi.html <br>
https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-midi-api/ <br>

Opstarten connectie midi keyboard en web browser <br>
piano noten library <br>
https://github.com/pffy/mp3-piano-sound/tree/master/mp3 <br>

<h4> 11-12-18 </h4> <br>
Positioneren van keyboard, goed zetten van keys, styling <br>

Research naar weergaven afspelen keys met gebruik van jQuery. <br>
https://jquery.com/ <br>
https://github.com/djipco/webmidi <br>
https://github.com/hazzik/livequery/blob/master/README.md <br>
https://github.com/hazzik/livequery <br>

<h4> 12-12-18 </h4>
Keys weergave aanpassen aan de lengte dat ze worden ingedrukt <br>
https://github.com/xobs/midi-to-keypress <br>
https://rustup.rs/ <br>
https://gist.github.com/nick-thompson/3995530 <br>
http://www.javascriptkit.com/javatutors/requestanimationframe.shtml <br>

Color Picker toevoegen <br>
http://acko.net/blog/farbtastic-jquery-color-picker-plug-in/ <br>
http://bgrins.github.io/spectrum/ <br>

<h4> 13-12-18 </h4>
Research doen naar opnemen / recorden van de screen <br>
https://stackoverflow.com/questions/50543591/screen-recording-the-browser-window-using-javascript <br>
https://github.com/mgechev/jscapture <br>
https://chrome.google.com/webstore/detail/screencastify-screen-vide/mmeijimgabbpbgpdklnllpncmdofkcpn <br>
https://stackoverflow.com/questions/7597310/invoking-a-google-chrome-extension-from-javascript <br>

<h4> 14-12-18 </h4> <br>
Screen Recording <br>
https://github.com/w69b/castify-api-docs <br>
https://webrtc.github.io/samples/src/content/capture/canvas-record/ <br>
https://github.com/spite/ccapture.js/ <br>
https://github.com/muaz-khan/Ffmpeg.js/blob/master/audio-plus-canvas-recording.html <br>
https://github.com/muaz-khan/WebRTC-Experiment <br>
https://github.com/muaz-khan/Chrome-Extensions/tree/master/screen-recording#call-from-your-own-website <br>
https://github.com/muaz-khan/Ffmpeg.js <br>
PROBLEEM: opnemen lukt (screencastify): video en audio kwaliteit heel slecht <br>

<h4> 12-01-19 </h4> <br>
Zoeken naar mogelijkheden om met canvas te werken ipv divs voor snellere video en betere audio kwaliteit -- niet mogelijk <br>
proberen FPS issues op te lossen met casting <br>
chrome://flags/#enable-experimental-web-platform-features Enabled <br>
RTC Screen recording -> werkende versie met deftige FPS gevonden zonder audio <br>
proberen audio apart op te nemen en te mergen: <br>
https://github.com/muaz-khan/WebRTC-Experiment/blob/master/RecordRTC/simple-demos/audio-recording.html <br>
https://github.com/muaz-khan/WebRTC-Experiment/blob/master/ffmpeg/merging-wav-and-webm-into-mp4.html <br>
------ <br>
niet gelukt, verder researchen <br>
<br>
Video-only recording geimplementeerd op project. Audio verder researchen <br>

<h4> 13-01-19 </h4> <br>
Verder researchen naar audio opnemen <br>
https://www.codepool.biz/capture-record-audio-html5.html <br>
succesvol audio opnemen <br>
Status: 2 aparte files ( audio in wav en video en webm ) <br>
proberen samen te krijgen door middel van FFMPEG <br>
https://github.com/muaz-khan/Ffmpeg.js <br>
https://github.com/streamproc/Record-Entire-Meeting/blob/master/Concatenate-Recordings.js#L43 <br>
Tussenscherm proberen uitschakelen <br>
https://w3c.github.io/mediacapture-screen-share/#dfn-display-surface <br>

<h4> 14-01-19 </h4> <br>
https://stackoverflow.com/questions/49936547/ability-to-record-web-page-within-browser-without-any-extension <br>
