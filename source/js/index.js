import vue from 'vue';
import api from './api.js';
import config from './config.js';

const header = new vue({
	el: '#vue-app',
	data: {
		links: config.links,
		ui: {
			disableInput: true,
		},
		captcha: {
			id: '',
			input: '',
			data: '',
			status: 'Generate a captcha image',
			width: { ...config.captcha.width, value: config.captcha.width.default },
			height: { ...config.captcha.height, value: config.captcha.height.default },
			noise: { ...config.captcha.noise, value: config.captcha.noise.default },
			chars: { ...config.captcha.chars, value: config.captcha.chars.default },
			background: { value: config.captcha.background.default }
		},
	},
	methods: {
		setStatusNetworkError() {
			this.captcha.status = 'A network error occured. Please try again later';
		},

		onCheckCaptcha: function(event) {
			event.preventDefault();

			this.captcha.status = 'Checking captcha';
			this.ui.disableInput = true;

			api.checkCaptcha(this.captcha.id, this.captcha.input).then(
				(res) => {
					if(res.error) {
						this.setStatusNetworkError();
						console.error('Error response from API', res);
						this.ui.disableInput = false;
					}
					else if(res.valid === true) {
						this.captcha.status = 'YOU DIT IT!. Try another one!';
					}
					else {
						this.captcha.status = 'Input does not match captcha. Try again';
						this.ui.disableInput = false;
					}
				},
				(err) => {
					this.ui.disableInput = false;
					console.error('Error getting new captcha', err);
				}
			);

		},

		onNewCaptcha: function(event) {
			event.preventDefault();

			const cdata = this.captcha;
			const options = {
				width: cdata.width.value,
				height: cdata.height.value,
				noise: cdata.noise.value,
				size: cdata.chars.value,
				background: cdata.background.value,
			};

			if(options.background.startsWith('#')) {
				options.background = options.background.substring(1);
			}

			this.captcha.status = 'Loading';
			this.ui.disableInput = true;

			api.getCaptcha(options).then(
				(res) => {
					if(res.error) {
						console.log('Error response from API', res);
						this.setStatusNetworkError();
					}
					else {
						this.ui.disableInput = false;
						this.captcha.status = '';
						this.captcha.input = '';
						this.captcha.id = res.id;
						this.captcha.data = res.data;
					}
				},
				(err) => {
					console.error('Error getting new captcha', err);
					this.setStatusNetworkError();
				}
			);
		},
	},
});
