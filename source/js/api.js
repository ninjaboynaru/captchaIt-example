export default (function() {
	const productionUrl = 'http://localhost:8080/captcha';
	const developmentUrl = 'http://localhost:8080/captcha';
	let currentUrl = '';

	if(process.env.NODE_ENV	=== 'production') {
		currentUrl = productionUrl;
	}
	else {
		currentUrl = developmentUrl;
		console.log('----', currentUrl);
	}

	function getCaptcha(options = {}) {
		let queryString = '';

		for(const option of Object.keys(options)) {
			queryString += `${option}=${options[option]}&`;
		}

		const url = `${currentUrl}/?${queryString}`;

		return fetch(url, { method: 'GET' }).then(function(res) {
			return res.json();
		});
	}

	function checkCaptcha(id, text) {
		const body = JSON.stringify({ id, text });
		const headers = { 'Content-Type': 'application/json' };

		return fetch(currentUrl, { method: 'POST', headers, body }).then(function(res){
			return res.json();
		});
	}


	return { getCaptcha, checkCaptcha }
})();
