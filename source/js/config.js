
export default {
	links: [
		{ label: 'Github', href: 'https://github.com/ninjaboynaru/CaptchaIt' },
		{ label: 'Portfolio', href: 'http://www.choxjs.com' }
	],
	captcha: {
		width: {
			default: 150,
			min: 20,
			max: 600,
		},
		height: {
			default: 50,
			min: 20,
			max: 600,
		},
		noise: {
			default: 1,
			min: 0,
			max: 12,
		},
		chars: {
			default: 4,
			min: 1,
			max: 12,
		},
		background: {
			default: '#cc9966',
		}
	}
}
