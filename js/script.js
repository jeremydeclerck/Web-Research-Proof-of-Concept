$(document).ready(function(){	
//http://stackoverflow.com/questions/23687635/how-to-stop-audio-in-an-iframe-using-web-audio-api-after-hiding-its-container-di
(function(){
	var log = console.log.bind(console), keyData = document.getElementById('key_data'), 
			deviceInfoInputs = document.getElementById('inputs'), deviceInfoOutputs = document.getElementById('outputs'), midi;
	var context = new AudioContext();
	var activeNotes = [];
	var btnBox = document.getElementById('content'), btn = document.getElementsByClassName('button');
	var data, cmd, channel, type, note, velocity;

	// request MIDI access
	if(navigator.requestMIDIAccess){
		navigator.requestMIDIAccess({sysex: false}).then(onMIDISuccess, onMIDIFailure);
	}
	else {
		alert("No MIDI support in your browser.");
	}

	// add event listeners
	document.addEventListener('keydown', keyController);
	document.addEventListener('keyup', keyController);
	for(var i = 0; i < btn.length; i++){
		btn[i].addEventListener('mousedown', clickPlayOn);
		btn[i].addEventListener('mouseup', clickPlayOff);	
	}
	// prepare audio files
	for(var i = 0; i < btn.length; i++){
		addAudioProperties(btn[i]);
	}

	var sampleMap = {
		key36: 1,
		key37: 2,
		key38: 3,
		key39: 4,
		key40: 5,
		key41: 6,
		key42: 7,
		key43: 8,
		key44: 9,
		key45: 10,
		key46: 11,
		key47: 12,
		key48: 13,
		key49: 14,
		key50: 15,
		key51: 16,
		key52: 17,
		key53: 18,
		key54: 19,
		key55: 20,
		key56: 21,
		key57: 22,
		key58: 23,
		key59: 24,
		key60: 25,
		key61: 26,
		key62: 27,
		key63: 28,
		key64: 29,
		key65: 30,
		key66: 31,
		key67: 32,
		key68: 33,
		key69: 34,
		key70: 35,
		key71: 36,
		key72: 37,
		key73: 38,
		key74: 39,
		key75: 40,
		key76: 41,
		key77: 42,
		key78: 43,
		key79: 44,
		key80: 45,
		key81: 46,
		key82: 47,
		key83: 48,
		key84: 49,
		key85: 50,
		key86: 51,
		key87: 52,
		key88: 53,
		key89: 54,
		key90: 55,
		key91: 56,
		key92: 57,
		key93: 58,
		key94: 59,
		key95: 60,
		key96: 61,
	};


	// user interaction 
	function clickPlayOn(e){

		e.target.classList.add('active');
		e.target.play();


	}
	
	function clickPlayOff(e){
		e.target.classList.remove('active');
		document.getElementById("content").appendChild(whiteKey);


	}



	function keyController(e){
		if(e.type == "keydown"){
			
			switch(e.keyCode){
				case 84:
				console.log('test');
				e.classList.appendChild(whiteKey);
					btn[0].play();
					break;
				case 87:
					btn[1].classList.add('active');
					e.classList.appendChild(whiteKey);
					document.getElementById('content').appendChild(whiteKey);
					console.log('test');
					btn[1].play();
					break;
				case 69:
					document.getElementById('content').appendChild(whiteKey);
					btn[2].classList.add('active');
					console.log('test');
					btn[2].play();
					break;
				case 82:
					btn[3].classList.add('active');
					document.getElementById('content').appendChild(whiteKey);
					console.log('test');
					btn[3].play();
					break;
				case 84:
					document.getElementById('content').appendChild(whiteKey);
					btn[4].classList.add('active');
					console.log('test');
					btn[4].play();
					break;					
				default:
			}
		}
		else if(e.type == "keyup"){
			switch(e.keyCode){
				case 81:
					btn[0].classList.remove('active');
					break;
				case 87:
					btn[1].classList.remove('active');
					break;
				case 69:
					btn[2].classList.remove('active');
					break;
				case 82:
					btn[3].classList.remove('active');
					break;
				case 84:
					btn[4].classList.remove('active');
					break;
				default:
					console.log(e.keyCode);
			}
		}
	}
	console.log(WebMidi.inputs);

	// midi functions
	function onMIDISuccess(midiAccess){
		midi = midiAccess;
		var inputs = midi.inputs.values();
		// loop through all inputs
		for(var input = inputs.next(); input && !input.done; input = inputs.next()){
			// listen for midi messages
			input.value.onmidimessage = onMIDIMessage;

			listInputs(input);
		}
		// listen for connect/disconnect message
		midi.onstatechange = onStateChange;

		showMIDIPorts(midi);
	}

	function onMIDIMessage(event){
		data = event.data,
		cmd = data[0] >> 4,
		channel = data[0] & 0xf,
		type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
		note = data[1],
		velocity = data[2];
		// with pressure and tilt off
		// note off: 128, cmd: 8 
		// note on: 144, cmd: 9
		// pressure / tilt on
		// pressure: 176, cmd 11: 
		// bend: 224, cmd: 14
		//log('MIDI data', data);
		switch(type){
			case 144: // noteOn message 
				noteOn(note, velocity);
				break;
			case 128: // noteOff message 
				noteOff(note, velocity);
				break;
		}
		
		
		//log('data', data, 'cmd', cmd, 'channel', channel);
		//logger(keyData, 'key data', data);
	}

	function onStateChange(event){
		showMIDIPorts(midi);
		var port = event.port, state = port.state, name = port.name, type = port.type;
		if(type == "input")
			log("name", name, "port", port, "state", state);

	}
/*
	function listInputs(inputs){
		var input = inputs.value;
			log("Input port : [ type:'" + input.type + "' id: '" + input.id + 
					"' manufacturer: '" + input.manufacturer + "' name: '" + input.name + 
					"' version: '" + input.version + "']");
	}
*/
	function noteOn(midiNote, velocity){
		player(midiNote, velocity);
	}

	function noteOff(midiNote, velocity){
		player(midiNote, velocity);
	}

	function player(note, velocity){
		var whiteKey = document.createElement("div");
		var blackKey = document.createElement("div");
		blackKey.className = "movingblack";
		whiteKey.className = "movingwhite";
		var i=0,timer=setInterval(function(){i++},1000);



		var sample = sampleMap['key'+note];
		if(sample){
			if(type == (0x80 & 0xf0) || velocity == 0){ //needs to be fixed for QuNexus, which always returns 144
				btn[sample - 1].classList.remove('active');

				return;
			}

			
			
			btn[sample - 1].classList.add('active');

			if ($(btn[sample - 1]).hasClass("white")) {
				whiteKey.style.height = "${i}px";
				console.log(i);

				btn[sample - 1].appendChild(whiteKey);
				$(whiteKey).animate({
					bottom: '1000px',
				}, 7000, "linear");
			  }

			  	if ($(btn[sample - 1]).hasClass("black")) {
				btn[sample - 1].appendChild(blackKey);
				$(blackKey).animate({
					bottom: '1000px',
				}, 7850, "linear");
			  }

		
			

		  
			btn[sample - 1].play(velocity);
		}
	}

	function onMIDIFailure(e){
		log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
	}

	// MIDI utility functions
	function showMIDIPorts(midiAccess){
		var inputs = midiAccess.inputs,
				outputs = midiAccess.outputs, 
				html;
		html = '<h4>MIDI Inputs:</h4><div class="info">';
		inputs.forEach(function(port){
			html += '<p>' + port.name + '<p>';
			html += '<p class="small">connection: ' + port.connection + '</p>';
			html += '<p class="small">state: ' + port.state + '</p>';
			html += '<p class="small">manufacturer: ' + port.manufacturer + '</p>';
			if(port.version){
				html += '<p class="small">version: ' + port.version + '</p>';
			}
		});
		deviceInfoInputs.innerHTML = html + '</div>';

		html = '<h4>MIDI Outputs:</h4><div class="info">';
		outputs.forEach(function(port){
			html += '<p>' + port.name + '<br>';
			html += '<p class="small">manufacturer: ' + port.manufacturer + '</p>';
			if(port.version){
				html += '<p class="small">version: ' + port.version + '</p>';
			}
		});
		deviceInfoOutputs.innerHTML = html + '</div>';
	}

	// audio functions
	function loadAudio(object, url){
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function(){
			context.decodeAudioData(request.response, function(buffer){
				object.buffer = buffer;
			});
		}
		request.send();
	}

	function addAudioProperties(object){
		object.name = object.id;
		object.source = object.dataset.sound;
		loadAudio(object, object.source);
		object.play = function(volume){
			var s = context.createBufferSource();
			var g = context.createGain();
			var v;
			s.buffer = object.buffer;
			s.playbackRate.value = randomRange(0.5, 2);
			if(volume){
				v = rangeMap(volume, 1, 127, 0.2, 2);
				s.connect(g);
				g.gain.value = v * v;
				g.connect(context.destination);
			}
			else{
				s.connect(context.destination);	
			}
			
			s.start();
			object.s = s;
		}
	}

	// utility functions
	function randomRange(min, max){
		return Math.random() * (max + min) + min;
	}

	function rangeMap(x, a1, a2, b1, b2){
		return ((x - a1)/(a2-a1)) * (b2 - b1) + b1;
	}

	function frequencyFromNoteNumber( note ) {
		return 440 * Math.pow(2,(note-69)/12);
	}
/*
	function logger(container, label, data){
		messages = label + " [channel: " + (data[0] & 0xf) + ", cmd: " + (data[0] >> 4) + ", type: " + (data[0] & 0xf0) + " , note: " + data[1] + " , velocity: " + data[2] + "]";
		container.textContent = messages;
	}
*/
})();



});