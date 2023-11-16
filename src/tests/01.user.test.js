/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../config/express');
const {expect} = require('chai');
const {API_KEY_NAME, API_KEY_VALUE} = require('../config/vars').server;

describe('createUserTest',() => {

	it('createUser must create and return an user when called with valid data object', async ()=>{
		const response = await request(app).post('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'name': 'Daniel',
			'phone': '1234567890',
			'email': 'mail@mail.com'
		});

		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('id').that.is.a('string');
		expect(response.body).to.have.property('name').that.is.a('string');
		expect(response.body).to.have.property('phone').that.is.a('string');
		expect(response.body).to.have.property('email').that.is.a('string');
	});

	it('createUser return a message when called with existent phone', async ()=>{
		const response = await request(app).post('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'name': 'Daniel',
			'phone': '1234567890',
			'email': 'mail@mail.com'
		});

		expect(response.status).to.equal(400);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('Key (phone)=(1234567890) already exists.');
	});

	it('createUser return a message when called with existent email', async ()=>{
		const response = await request(app).post('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'name': 'Daniel',
			'phone': '1234567891',
			'email': 'mail@mail.com'
		});

		expect(response.status).to.equal(400);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('Key (email)=(mail@mail.com) already exists.');
	});

	it('createUser return a message when called with name < 3 len', async ()=>{
		const response = await request(app).post('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'name': 'Da',
			'phone': '0881654313',
			'email': 'maddil4@mail.com'
		});

		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('\"name\" length must be at least 3 characters long');
	});

	it('createUser return a message when called with phone > 10 len', async ()=>{
		const response = await request(app).post('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'name': 'Jen',
			'phone': '12345678901',
			'email': 'mail@mail.com'
		});

		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('\"phone\" length must be less than or equal to 10 characters long');
	});

	it('createUser return a message when called with phone that contains leeters', async ()=>{
		const response = await request(app).post('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'name': 'Jen',
			'phone': '098765asdf',
			'email': 'maddil4@mail.com'
		});

		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('Phone contains letters.');
	});

	it('createUser return a message when called without name', async ()=>{
		const response = await request(app).post('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'phone': '0987651234',
			'email': 'maddil4@mail.com'
		});

		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('\"name\" is required');
	});

	it('createUser return a message when called without phone', async ()=>{
		const response = await request(app).post('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'name': 'Jen',
			'email': 'maddil4@mail.com'
		});

		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('\"phone\" is required');
	});

	it('createUser return a message when called without email', async ()=>{
		const response = await request(app).post('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).send({
			'name': 'Jen',
			'phone': '0987651234',
		});

		expect(response.status).to.equal(406);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('\"email\" is required');
	});

});


describe('findUserTest', ()=> {
	it('finUser should return an user with 200 status code when called with existent user phone', async () => {
		const response = await request(app).get('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).query({term: '1234567890'});
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('id').that.is.a('string');
		expect(response.body).to.have.property('name').that.is.a('string');
		expect(response.body).to.have.property('phone').that.is.a('string');
		expect(response.body).to.have.property('email').that.is.a('string');
	});

	it('finUser should return an user with 200 status code when called with existent user email', async () => {
		const response = await request(app).get('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).query({term: 'mail@mail.com'});
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('id').that.is.a('string');
		expect(response.body).to.have.property('name').that.is.a('string');
		expect(response.body).to.have.property('phone').that.is.a('string');
		expect(response.body).to.have.property('email').that.is.a('string');
	});

	it('finUser should return an user with 200 status code when called with existent user id', async () => {
		// const response = await request(app).get('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).query({term: '09b07ac5-ce8e-42f2-bc9d-d0c7b83e6677'}); //Use this test with valid id
		const response = await request(app).get('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).query({term: 'mail@mail.com'});
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('id').that.is.a('string');
		expect(response.body).to.have.property('name').that.is.a('string');
		expect(response.body).to.have.property('phone').that.is.a('string');
		expect(response.body).to.have.property('email').that.is.a('string');
	});

	it('finUser should return an array of users with 200 status code when called without term', async () => {
		const response = await request(app).get('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).query();
		expect(response.status).to.equal(200);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('array');
	});

	it('finUser should return a message with 404 status code when called with inexistent user phone', async () => {
		const response = await request(app).get('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).query({term: '0987612345'});
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('User Not Found.');
	});

	it('finUser should return a message with 404 status code when called with inexistent user email', async () => {
		const response = await request(app).get('/api/users/').set(API_KEY_NAME, API_KEY_VALUE).query({term: 'mails@mailc.com'});
		expect(response.status).to.equal(404);
		expect(response.type).to.match(/json/);
		expect(response.body).to.be.an('object');

		expect(response.body).to.have.property('message').that.is.a('string').and.equal('User Not Found.');
	});
});

