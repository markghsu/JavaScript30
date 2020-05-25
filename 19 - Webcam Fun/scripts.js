const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const rgbsliders = document.querySelectorAll('.rgb input');
let height = 0;
let width = 320;
let streaming = false;
let intervalid = null;
const levels = {};
levels['rmin'] = 0;
levels['rmax'] = 0;
levels['bmin'] = 0;
levels['bmax'] = 0;
levels['gmin'] = 0;
levels['gmax'] = 0;

if (navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: true })
		.then((stream) => {
			video.srcObject = stream;
			video.play();
			intervalid = setInterval(() => {
				ctx.drawImage(video,0,0,width,height);
				ctx.putImageData(applyFilters(ctx.getImageData(0,0,width,height)), 0, 0);
			},100);
		})
		.catch((err) => {
			console.log("Error...",err);
		})
} else {
	document.documentElement.innerHTML = "<h1>Error, could not load media devices</h1>";
}

video.addEventListener('canplay', (evt) => {
	if(!streaming) {
		height = video.videoHeight / (video.videoWidth/width);
		video.setAttribute('width', width);
		canvas.setAttribute('width', width);
		video.setAttribute('height', height);
		canvas.setAttribute('height', height);
		streaming = true;
	}},false);

function takePhoto() {
	snap.currentTime = 0;
	snap.play();
	let data = canvas.toDataURL('image/png');
	let img = document.createElement('img');
    img.setAttribute('src', data);
    strip.appendChild(img);
}

rgbsliders.forEach((t) => t.addEventListener('change', changeColor));

function changeColor(evt) {
	let prop = this.name;
	let val = this.value;
	levels[prop] = val;
}

function applyFilters (pixels) {
	let data = pixels.data;
	//RED BOOST
	// for(let i = 0; i < data.length; i += 4) {
	// 	data[i] += 100;
	// 	data[i+1] -= 50;
	// 	data[i+2] -= 50;
	// }
	// GreenScreen
	for(let i = 0; i < data.length; i += 4) {
		if(data[i] > levels['rmin'] && data[i] < levels['rmax'] && data[i + 1] > levels['gmin'] && data[i + 1] < levels['gmax'] && data[i + 2] > levels['bmin'] && data[i + 2] < levels['bmax']) data[i + 3] = 0;
	}
	return pixels;
}