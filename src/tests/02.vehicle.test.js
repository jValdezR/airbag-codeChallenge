/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../config/express');
const { expect } = require('chai');
const {API_KEY_NAME, API_KEY_VALUE} = require('../config/vars').server;
describe('createVehicle', () => {

	it('createVehicle should return a message with 406 status code when called without vehicle niv', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');
		// console.log(response.body);
		expect(response.body).to.have.property('message').and.equal('\"niv\" is required');
	});

	it('createVehicle should return a message with 406 status code when called without vehicle plate', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'niv': '4T1BE32K55U678432',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"plate\" is required');
	});

	it('createVehicle should return a message with 406 status code when called without vehicle brand', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678432',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"brand\" is required');
	});

	it('createVehicle should return a message with 406 status code when called without vehicle typeOfVehicle', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'brand': 'Mazda',
			'niv': '4T1BE32K55U678432',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"typeOfVehicle\" is required');
	});

	it('createVehicle should return a message with 406 status code when called without vehicle price', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'niv': '4T1BE32K55U678432',
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"price\" is required');
	});

	it('createVehicle should return a vehicle with 200 status code when called with valid object', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678432',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('id').that.is.a('string');
		expect(response.body).to.have.property('plate').that.is.a('string');
		expect(response.body).to.have.property('niv').that.is.a('string');
		expect(response.body).to.have.property('brand').that.is.a('string');
		expect(response.body).to.have.property('typeOfVehicle').that.is.a('string');
		expect(response.body).to.have.property('price').that.is.a('number');
		expect(response.body.userId).to.satisfy(userId => userId === null || typeof userId === 'string');

	});

	it('createVehicle should return a message with 400 status code when called with existent plate', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678432',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(400);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Key (plate)=(135-754-911) already exists.');
	});

	it('createVehicle should return a message with 400 status code when called with existent niv', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-922',
			'niv': '4T1BE32K55U678432',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(400);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Key (niv)=(4T1BE32K55U678432) already exists.');
	});

	it('createVehicle should return a message with 406 status code when called with not valid niv', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U64',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('The \"niv\" does not match the NIV pattern.');
	});

	it('createVehicle should return a message with 406 status code when called with not valid brand', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678421',
			'brand': 'Mazd',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"brand\" must be one of [Mazda, Honda, Toyota, Renault, Volkswagen]');
	});

	it('createVehicle should return a message with 406 status code when called with not valid typeOfVehicle', async () => {
		const response = await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678421',
			'brand': 'Mazda',
			'typeOfVehicle': 'suav',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"typeOfVehicle\" must be one of [sedan, hb, suv, roadster]');
	});
});

describe('findVehicle', () => {
	it('findVehicle should return a vehicle with 200 status code when called with existent vehicle id', async () => {
		// const response = await request(app).get('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: 'b270384d-cc8d-45ea-a08a-c8c7f79167ec' }); // Use this test with a valid id
		const response = await request(app).get('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '135-754-911' });
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('id').that.is.a('string');
		expect(response.body).to.have.property('plate').that.is.a('string');
		expect(response.body).to.have.property('niv').that.is.a('string');
		expect(response.body).to.have.property('brand').that.is.a('string');
		expect(response.body).to.have.property('typeOfVehicle').that.is.a('string');
		expect(response.body).to.have.property('price').that.is.a('number');
		expect(response.body.userId).to.satisfy(userId => userId === null || typeof userId === 'string');

	});

	it('findVehicle should return a vehicle with 200 status code when called with existent vehicle plate', async () => {
		const response = await request(app).get('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '135-754-911' });
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('id').that.is.a('string');
		expect(response.body).to.have.property('plate').that.is.a('string');
		expect(response.body).to.have.property('niv').that.is.a('string');
		expect(response.body).to.have.property('brand').that.is.a('string');
		expect(response.body).to.have.property('typeOfVehicle').that.is.a('string');
		expect(response.body).to.have.property('price').that.is.a('number');
		expect(response.body.userId).to.satisfy(userId => userId === null || typeof userId === 'string');

	});

	it('findVehicle should return a vehicle with 200 status code when called with existent vehicle niv', async () => {
		const response = await request(app).get('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' });
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('id').that.is.a('string');
		expect(response.body).to.have.property('plate').that.is.a('string');
		expect(response.body).to.have.property('niv').that.is.a('string');
		expect(response.body).to.have.property('brand').that.is.a('string');
		expect(response.body).to.have.property('typeOfVehicle').that.is.a('string');
		expect(response.body).to.have.property('price').that.is.a('number');
		expect(response.body.userId).to.satisfy(userId => userId === null || typeof userId === 'string');

	});

	it('findVehicle should return an array of vehicles with 200 status code when called without term', async () => {
		const response = await request(app).get('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({});
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('array');
	});

	it('findVehicle should return a message with 404 status code when called with inexistent vehicle id', async () => {
		// const response = await request(app).get('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: 'b270384d-cc8d-45ea-a08a-c8c7f79167ed' }); // Use this test with valid id
		const response = await request(app).get('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '135-754-800' });
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.');
	});

	it('findVehicle should return a message with 404 status code when called with inexistent vehicle plate', async () => {
		const response = await request(app).get('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '135-754-800' });
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.');
	});

	it('findVehicle should return a message with 404 status code when called with inexistent vehicle niv', async () => {
		const response = await request(app).get('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678800' });
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.');
	});
});



// To use the tests of update and remove vehicle, be sure that are data on database and check the terms that you are using, or the tests going to fail.

describe('updateVehicle', () => {
	it('updateVehicle should return a message with 406 status code when called without vehicle niv', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-911',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');
		expect(response.body).to.have.property('message').and.equal('\"niv\" is required');
	});

	it('updateVehicle should return a message with 406 status code when called without vehicle plate', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'niv': '4T1BE32K55U678432',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"plate\" is required');
	});

	it('updateVehicle should return a message with 406 status code when called without vehicle brand', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678432',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"brand\" is required');
	});

	it('updateVehicle should return a message with 406 status code when called without vehicle typeOfVehicle', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-911',
			'brand': 'Mazda',
			'niv': '4T1BE32K55U678432',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"typeOfVehicle\" is required');
	});

	it('updateVehicle should return a message with 406 status code when called without vehicle price', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-911',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'niv': '4T1BE32K55U678432',
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"price\" is required');
	});

	it('updateVehicle should return a vehicle with 200 status code when called with valid object', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678432',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 30000,
		});
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('id').that.is.a('string');
		expect(response.body).to.have.property('plate').that.is.a('string');
		expect(response.body).to.have.property('niv').that.is.a('string');
		expect(response.body).to.have.property('brand').that.is.a('string');
		expect(response.body).to.have.property('typeOfVehicle').that.is.a('string');
		expect(response.body).to.have.property('price').that.is.a('number');
		expect(response.body.userId).to.satisfy(userId => userId === null || typeof userId === 'string');

	});

	it('updateVehicle should return a message with 400 status code when called with existent plate', async () => {
		await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-922',
			'niv': '4T1BE32K55U678442',
			'brand': 'Renault',
			'typeOfVehicle': 'hb',
			'price': 50000,
		});
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-922',
			'niv': '4T1BE32K55U678432',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(400);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Key (plate)=(135-754-922) already exists.');
	});

	it('updateVehicle should return a message with 400 status code when called with existent niv', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-901',
			'niv': '4T1BE32K55U678442',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(400);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Key (niv)=(4T1BE32K55U678442) already exists.');
	});

	it('updateVehicle should return a message with 406 status code when called with not valid niv', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U64',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('The \"niv\" does not match the NIV pattern.');
	});

	it('updateVehicle should return a message with 406 status code when called with not valid brand', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678421',
			'brand': 'Mazd',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"brand\" must be one of [Mazda, Honda, Toyota, Renault, Volkswagen]');
	});

	it('updateVehicle should return a message with 406 status code when called with not valid typeOfVehicle', async () => {
		const response = await request(app).patch('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678432' }).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678421',
			'brand': 'Mazda',
			'typeOfVehicle': 'suav',
			'price': 50000,
		});
		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('\"typeOfVehicle\" must be one of [sedan, hb, suv, roadster]');
	});
});

describe('removeVehicle', () => {
	it('removeVehicle should return a message with 200 status code when called with existent vehicle plate', async () => {
		const response = await request(app).delete('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '135-754-911' });
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);

		expect(response.body).to.have.property('message').and.equal('Vehicle removed');

	});

	it('removeVehicle should return a message with 200 status code when called with existent vehicle niv', async () => {
		const response = await request(app).delete('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678442' });
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle removed');

	});

	it('removeVehicle should return a message with 404 status code when called with inexistent vehicle id', async () => {
		const response = await request(app).delete('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '9666c9bc-d2c6-4248-bdb5-81cccf4501f3' });
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.');
	});

	it('removeVehicle should return a message with 404 status code when called with inexistent vehicle plate', async () => {
		const response = await request(app).delete('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '135-754-975' });
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.');
	});

	it('removeVehicle should return a message with 404 status code when called with inexistent vehicle niv', async () => {
		const response = await request(app).delete('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).query({ term: '4T1BE32K55U678420' });
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.');
	});
});

describe('getPrice', () => {
	it('getPrice should return an array of vehicle with the price in different currencies', async () => {
		await request(app).post('/api/vehicles/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'plate': '135-754-911',
			'niv': '4T1BE32K55U678432',
			'brand': 'Mazda',
			'typeOfVehicle': 'suv',
			'price': 50000,
		});
		const response = await request(app).get('/api/vehicles/price/').set(API_KEY_NAME, API_KEY_VALUE);
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('array');
	});
});