let detections = {};


const videoElement = document.getElementsByClassName('input_video')[0];

function getHands(results) {
	detections = results;
	console.log(detections);
}

const hands = new Hands({locateFile: (file) => {
	return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
	maxNumHands: 2,
	modelComplexity: 1,
	minDetectionConfidence: 0.5,
	minTrackingConfidence: 0.5
});
hands.onResults(getHands);

const camera = new Camera(videoElement, {
	onFrame: async () => {
		await hands.send({image: videoElement});
	},
	width: 640,
	height: 480
});
camera.start();