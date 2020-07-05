const currentTimeDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.querySelector('#custom');
const custom = form.querySelector('[name="minutes"]');
let intervalID;
let startTime;

form.addEventListener('submit', (eve) => {
	eve.preventDefault();
	if(isNaN(custom.value)) {
		custom.value = '';
		return;
	}
	startTimer(custom.value * 60);
});
buttons.forEach(e => e.addEventListener('click', () => startTimer(e.dataset.time)));

function startTimer(time) {
	//if(time )
	if(intervalID) {
		console.log('clearing interval...')
		clearInterval(intervalID);
		intervalID = null;
	}
	currentTimeDisplay.textContent = displayTime(time);
	startTime = Date.now();
	let endTime = new Date(startTime + parseInt(time)*1000);
	endTimeDisplay.textContent = `Be Back At ${endTime.getHours()}:${(endTime.getMinutes()<10?'0':'') + endTime.getMinutes()}`;
	intervalID = setInterval(() => {
		let timeLeft = Math.round((endTime - Date.now())/1000);
		if(timeLeft < 0) {
			clearInterval(intervalID);
      		return;
		}
		currentTimeDisplay.textContent = displayTime(timeLeft);
	}, 1000);
}

function displayTime(time){
	let min = Math.floor(time/60);
	let dispSeconds = time%60;
	dispSeconds = dispSeconds < 10?'0'+ dispSeconds:dispSeconds;
	return `${min}:${dispSeconds}`;
}