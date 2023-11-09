const request = require('supertest');
const app = require('../config/express');
const {expect} = require('chai');


describe('findUserTest', ()=>{
    it('finUser should return an user with 200 status code when called with existent user phone', async () => {
        const response = await request(app).get('/api/users/').query({term: '1084579275'});
        expect(response.status).to.equal(200);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('name').that.is.a('string');
        expect(response.body).to.have.property('phone').that.is.a('string');
        expect(response.body).to.have.property('email').that.is.a('string');
    });

    it('finUser should return an user with 200 status code when called with existent user email', async () => {
        const response = await request(app).get('/api/users/').query({term: 'mail4@mail.com'});
        expect(response.status).to.equal(200);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('name').that.is.a('string');
        expect(response.body).to.have.property('phone').that.is.a('string');
        expect(response.body).to.have.property('email').that.is.a('string');
    });

    it('finUser should return an array of users with 200 status code when called without term', async () => {
        const response = await request(app).get('/api/users/').query();
        expect(response.status).to.equal(200);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('array')
    });

    it('finUser should return a message with 404 status code when called with inexistent user phone', async () => {
        const response = await request(app).get('/api/users/').query({term: '0987612345'});
        expect(response.status).to.equal(404);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object');

        expect(response.body).to.have.property('message').that.is.a('string').and.equal('User Not Found');
    });

    it('finUser should return a message with 404 status code when called with inexistent user email', async () => {
        const response = await request(app).get('/api/users/').query({term: 'mails@mailc.com'});
        expect(response.status).to.equal(404);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object');

        expect(response.body).to.have.property('message').that.is.a('string').and.equal('User Not Found');
    });
});
