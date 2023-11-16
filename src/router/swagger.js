/* eslint-disable no-undef */
const path = require('path');
const swaggerSpec = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Airbag code challenge documentation',
			version: '1.0.0',
			description: 'Api for Airbag challenge, don\'t forget user your api_key_name and api_key_value in the header of each request!!!',
		},
		servers:[
			{
				url: 'http://localhost:3000'
			}
		]
	},
	apis: [`${path.join(__dirname, './*.routes.js')}`],
};

module.exports = swaggerSpec;