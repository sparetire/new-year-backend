window.onload = function () {
	var submitBtn = document.getElementById('submit');
	var form = document.getElementById('fm');
	submitBtn.onclick = function (event) {
		event.preventDefault();
		var data = new FormData(form);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				console.log('OK');
			}
		};
		xhr.open('post', '/upload', true);
		xhr.send(data);
	};
};