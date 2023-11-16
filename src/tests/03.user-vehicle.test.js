/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../config/express');
const { expect } = require('chai');
const {API_KEY_NAME, API_KEY_VALUE} = require('../config/vars').server;

describe('createUserVehicle', () => {
	it('createUserVehicle should return a message with 200 status code when called with valid terms', async () => {
		const response = await request(app).post('/api/user-vehicle/').set(API_KEY_NAME, API_KEY_VALUE).send({
			userTerm: 'mail@mail.com',
			vehicleTerm: '4T1BE32K55U678432'
		});
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Association created');
	});

	it('createUserVehicle should return a message with 404 status code when called with inexistent user phone', async () => {
		const response = await request(app).post('/api/user-vehicle/').set(API_KEY_NAME, API_KEY_VALUE).send({
			userTerm: '0981234567',
			vehicleTerm: '4T1BE32K55U678432'
		});
		expect(response.status).to.equal(404);
		// expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('User Not Found.');
	});

	it('createUserVehicle should return a message with 404 status code when called with inexistent user email', async () => {
		const response = await request(app).post('/api/user-vehicle/').set(API_KEY_NAME, API_KEY_VALUE).send({
			userTerm: 'malmail@mail.com',
			vehicleTerm: '4T1BE32K55U678432'
		});
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('User Not Found.');
	});

	it('createUserVehicle should return a message with 404 status code when called with inexistent vehicle id', async () => {
		const response = await request(app).post('/api/user-vehicle/').set(API_KEY_NAME, API_KEY_VALUE).send({
			userTerm: 'mail@mail.com',
			vehicleTerm: 'b270384d-cc8d-45ea-a08a-c8c7f79167ka'
		});
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.');
	});

	it('createUserVehicle should return a message with 404 status code when called with inexistent vehicle plate', async () => {
		const response = await request(app).post('/api/user-vehicle/').set(API_KEY_NAME, API_KEY_VALUE).send({
			userTerm: 'mail@mail.com',
			vehicleTerm: '135-754-980'
		});
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.');
	});

	it('createUserVehicle should return a message with 404 status code when called with inexistent vehicle niv', async () => {
		const response = await request(app).post('/api/user-vehicle/').set(API_KEY_NAME, API_KEY_VALUE).send({
			userTerm: 'mail@mail.com',
			vehicleTerm: '4T1BE32K55U678418'
		});
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.');
	});

	it('createUserVehicle should return a message with 400 status code when called for an existent associaton', async () => {
		const response = await request(app).post('/api/user-vehicle/').set(API_KEY_NAME, API_KEY_VALUE).send({
			userTerm: 'mail@mail.com',
			vehicleTerm: '4T1BE32K55U678432'
		});
		expect(response.status).to.equal(400);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').and.equal('Vehicle is already assigned.');
		await request(app).delete('/api/vehicles/').query({ term: '4T1BE32K55U678432' });
	});
    
});

