$(document).ready(function(){
(function(){
	btn = document.getElementsByClassName('button');
	var data, cmd, type, note, velocity, midi;
	var myColor;

	$("#custom").spectrum({
		color: "#20f2f9",
		change: function(color){
			myColor = color.toHexString();
		console.log(myColor);
		}
	});

	if(navigator.requestMIDIAccess){
		navigator.requestMIDIAccess({sysex: false}).then(onMIDISuccess);
	}

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

	function onMIDISuccess(midiAccess){
		midi = midiAccess;
		var inputs = midi.inputs.values();
		for(var input = inputs.next(); input && !input.done; input = inputs.next()){
			input.value.onmidimessage = onMIDIMessage;
		}
	}

	function onMIDIMessage(event){
		data = event.data,
		cmd = data[0] >> 4,
		channel = data[0] & 0xf,
		type = data[0] & 0xf0,
		note = data[1],
		velocity = data[2];

		if(cmd==8){
			isReleased = true;
		}
		switch(type){
			case 144: // noteOn message
				noteOn(note, velocity);
				break;
			case 128: // noteOff message
				noteOff(note, velocity);
				break;
		}

	}

	function noteOn(midiNote, velocity){
		player(midiNote, velocity);
	}

	function noteOff(midiNote, velocity){
		player(midiNote, velocity);
	}

	function player(note, velocity){
		var whiteKey = document.createElement("div");
		var blackKey = document.createElement("div");
		var isPlaying;
		var colors = ["#fe4a49",  "#2ab7ca", "#fed766"];
		blackKey.className = "movingblack";
		blackKey.style.backgroundColor = myColor; // set to myColor for colorpicker
		whiteKey.style.backgroundColor = myColor; //set to myColor for colorpicker
		whiteKey.className = "movingwhite";
		var height = 0;

		var sample = sampleMap['key'+note];
		if(sample){

			if(type == (0x80 & 0xf0) || velocity == 0){ 
				$('.active').css('background-color', "");

				btn[sample - 1].classList.remove('active');
				isPlaying=true;
				return;
			}

			btn[sample - 1].classList.add('active');

			if ($(btn[sample - 1]).hasClass("active")){
				isPlaying = false;

				function move(){
					if(isPlaying===false){
						if ($(btn[sample - 1]).hasClass("active")){
							$('.active').css('background-color', myColor); // set to myColor for colorpicker

						height += 2.5;
						whiteKey.style.height = height + 'px';
						blackKey.style.height = height + 'px';
						requestAnimationFrame(move);
						}
					}
				}
				requestAnimationFrame(move);
			}

			if ($(btn[sample - 1]).hasClass("white")) {

				btn[sample - 1].appendChild(whiteKey);
				$(whiteKey).animate({
					top: '-2000px',
				}, 13500, "linear");
			  }
			  	if ($(btn[sample - 1]).hasClass("black")) {
				btn[sample - 1].appendChild(blackKey);
				$(blackKey).animate({
					top: '-2000px',
				}, 13520, "linear");
			  }

			btn[sample - 1].play(velocity);
		}
	}

	function loadAudio(object, url){
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function(){
			context.decodeAudioData(request.response, function(buffer){
				object.buffer = buffer;
			});
		}
	}

	function addAudioProperties(object){
		object.name = object.id;
		object.source = object.dataset.sound;
		loadAudio(object, object.source);
		object.play = function(volume){
		}
	}

})();

});