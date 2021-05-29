// $('.js-audio').each(function (index, el) {
// 	initAudioPlayer($(this), index);
// });
// initAudioPlayer($('.js-audio'));


let player = $('js-audio');

$('.audio__slider').roundSlider({
    radius: 30,
    value: 0,
    startAngle: 90,
    width: 5,
    handleSize: '+6',
    handleShape: 'round',
    sliderType: 'min-range'
});

let videoIsMuted = true;

$('.js-audio').addClass('playing');

let bars = [...document.querySelectorAll('.bar')];
bars.forEach((bar) => {
    bar.style.cssText = 'fill: grey';
});

function makeBarsGreen() {
    bars.forEach((bar) => {
        bar.style.cssText = 'fill: #0c2';
        // mute.style.cssText = 'fill: #0c2';
    });
}

function makeBarsGrey() {
    bars.forEach((bar) => {
        bar.style.cssText = 'fill: grey';
        // mute.style.cssText = 'fill: grey';
    });
}

function changeBarsColor() {
    videoIsMuted ? makeBarsGrey() : makeBarsGreen();
}


// Play or Pause
let playBtn = document.querySelector('.play-pause');
playBtn.addEventListener('click', () => {
    // console.log(video.paused);
    if (video.paused) {
        document.querySelector('.js-audio').classList.add('playing');
        document.querySelector('.js-audio').classList.remove('paused');
        video.play();
        // $('js-audio').addClass('playing');
        // $('js-audio').removeClass('paused');
    } else {
        document.querySelector('.js-audio').classList.remove('playing');
        document.querySelector('.js-audio').classList.add('paused');
        video.pause();
        // $('js-audio').removeClass('playing');
        // $('js-audio').addClass('paused');
    }
});

// Should handle dragging the circle seeker, yet to make it work
// $('.audio__slider').on('drag, change', function (e) {
// 	let $this = $(this);
//     let $elem = $this.closest('.js-audio');
//     console.log($('.audio__slider').closest('.js-audio').find('#seekbar'));
// 	updateAudio(e, $elem);
//     $this.addClass('active');
// });

// function updateAudio(e, $elem) {
// 	// console.log(e.handle.value);
// 	let value = e.handle.value;
// 	// var thisPlayer = el.find('.js-audio'),
// 	var play = $elem.find('.play-pause'),
// 		circle = $elem.find('#seekbar'),
// 		getCircle = circle,
// 		// totalLength = getCircle.getTotalLength(),
// 		//currentTime = $elem.find('audio')[0].currentTime,
//         maxduration = $elem.find('video').duration;
//     console.log(getCircle);
// 	var y = (value * maxduration) / 100;
// 	$elem.find('video').currentTime = y;
// }


let audio = $('.js-audio').find('.slide__audio-player'),
    play = $('.js-audio').find('.play-pause'),
    circle = $('.js-audio').find('#seekbar'),
    getCircle = circle.get(0),
    totalLength = getCircle.getTotalLength();

circle.attr({
    'stroke-dasharray': totalLength,
    'stroke-dashoffset': totalLength,
});

let myVideo = document.querySelector('video');

myVideo.addEventListener('timeupdate', function () {
    let currentTime = myVideo.currentTime,
        maxduration = myVideo.duration,
        calc = totalLength - (currentTime / maxduration * totalLength);

    circle.attr('stroke-dashoffset', calc);

    let value = Math.floor((currentTime / maxduration) * 100);

    var slider = document.querySelector('.audio__slider');
    $(slider).roundSlider('setValue', value);
});

myVideo.addEventListener('ended', function () {
    circle.attr('stroke-dashoffset', totalLength);
});

audio.on('timeupdate', () => {
    let currentTime = audio.currentTime,
        maxduration = audio.duration,
        calc = totalLength - (currentTime / maxduration * totalLength);

    circle.attr('stroke-dashoffset', calc);

    let value = Math.floor((currentTime / maxduration) * 100);

    var slider = audio.closest('.js-audio').find('.audio__slider');
    $(slider).roundSlider('setValue', value);
});

audio.on('ended', () => {
    player.removeClass('playing');
    circle.attr('stroke-dashoffset', totalLength);

});