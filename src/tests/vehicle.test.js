const request = require('supertest');
const app = require('../config/express');
const { expect } = require('chai');

describe('findVehicle', () => {
    it('findVehicle should return a vehicle with 200 status code when called with existent vehicle id', async () => {
        const response = await request(app).get('/api/vehicles/').query({ term: 'b270384d-cc8d-45ea-a08a-c8c7f79167ec' });
        expect(response.status).to.equal(200);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('plate').that.is.a('string');
        expect(response.body).to.have.property('niv').that.is.a('string');
        expect(response.body).to.have.property('brand').that.is.a('string');
        expect(response.body).to.have.property('typeOfVehicle').that.is.a('string');
        expect(response.body).to.have.property('price').that.is.a('number');
        expect(response.body.userId).to.satisfy(userId => userId === null || typeof userId === 'string');

    });

    it('findVehicle should return a vehicle with 200 status code when called with existent vehicle plate', async () => {
        const response = await request(app).get('/api/vehicles/').query({ term: '135-754-976' });
        expect(response.status).to.equal(200);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('plate').that.is.a('string');
        expect(response.body).to.have.property('niv').that.is.a('string');
        expect(response.body).to.have.property('brand').that.is.a('string');
        expect(response.body).to.have.property('typeOfVehicle').that.is.a('string');
        expect(response.body).to.have.property('price').that.is.a('number');
        expect(response.body.userId).to.satisfy(userId => userId === null || typeof userId === 'string');

    });

    it('findVehicle should return a vehicle with 200 status code when called with existent vehicle niv', async () => {
        const response = await request(app).get('/api/vehicles/').query({ term: '4T1BE32K55U678421' });
        expect(response.status).to.equal(200);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('plate').that.is.a('string');
        expect(response.body).to.have.property('niv').that.is.a('string');
        expect(response.body).to.have.property('brand').that.is.a('string');
        expect(response.body).to.have.property('typeOfVehicle').that.is.a('string');
        expect(response.body).to.have.property('price').that.is.a('number');
        expect(response.body.userId).to.satisfy(userId => userId === null || typeof userId === 'string');

    });

    it('findVehicle should return an array of vehicles with 200 status code when called without term', async () => {
        const response = await request(app).get('/api/vehicles/').query({});
        expect(response.status).to.equal(200);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('array')
    });

    it('findVehicle should return a message with 404 status code when called with inexistent vehicle id', async () => {
        const response = await request(app).get('/api/vehicles/').query({ term: 'b270384d-cc8d-45ea-a08a-c8c7f79167ed' });
        expect(response.status).to.equal(404);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.')
    });

    it('findVehicle should return a message with 404 status code when called with inexistent vehicle plate', async () => {
        const response = await request(app).get('/api/vehicles/').query({ term: '135-754-975' });
        expect(response.status).to.equal(404);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.')
    });

    it('findVehicle should return a message with 404 status code when called with inexistent vehicle niv', async () => {
        const response = await request(app).get('/api/vehicles/').query({ term: '4T1BE32K55U678420' });
        expect(response.status).to.equal(404);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('Vehicle Not Found.')
    });
});

describe('createVehicle', () => {

    it('createVehicle should return a message with 406 status code when called without vehicle niv', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-911",
            "brand": "Mazda",
            "typeOfVehicle": "suv",
            "price": 50000,
        })
        expect(response.status).to.equal(406);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')
        // console.log(response.body);
        expect(response.body).to.have.property('message').and.equal('\"niv\" is required');
    });

    it('createVehicle should return a message with 406 status code when called without vehicle plate', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "niv": "4T1BE32K55U678432",
            "brand": "Mazda",
            "typeOfVehicle": "suv",
            "price": 50000,
        })
        expect(response.status).to.equal(406);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('\"plate\" is required');
    });

    it('createVehicle should return a message with 406 status code when called without vehicle brand', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-911",
            "niv": "4T1BE32K55U678432",
            "typeOfVehicle": "suv",
            "price": 50000,
        })
        expect(response.status).to.equal(406);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('\"brand\" is required');
    });

    it('createVehicle should return a message with 406 status code when called without vehicle typeOfVehicle', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-911",
            "brand": "Mazda",
            "niv": "4T1BE32K55U678432",
            "price": 50000,
        })
        expect(response.status).to.equal(406);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('\"typeOfVehicle\" is required');
    });

    it('createVehicle should return a message with 406 status code when called without vehicle price', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-911",
            "brand": "Mazda",
            "typeOfVehicle": "suv",
            "niv": "4T1BE32K55U678432",
        })
        expect(response.status).to.equal(406);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('\"price\" is required');
    });

    it('createVehicle should return a vehicle with 200 status code when called with valid object', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-911",
            "niv": "4T1BE32K55U678432",
            "brand": "Mazda",
            "typeOfVehicle": "suv",
            "price": 50000,
        })
        expect(response.status).to.equal(200);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('plate').that.is.a('string');
        expect(response.body).to.have.property('niv').that.is.a('string');
        expect(response.body).to.have.property('brand').that.is.a('string');
        expect(response.body).to.have.property('typeOfVehicle').that.is.a('string');
        expect(response.body).to.have.property('price').that.is.a('number');
        expect(response.body.userId).to.satisfy(userId => userId === null || typeof userId === 'string');

    });

    it('createVehicle should return a message with 400 status code when called with existent plate', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-976",
            "niv": "4T1BE32K55U678432",
            "brand": "Mazda",
            "typeOfVehicle": "suv",
            "price": 50000,
        })
        expect(response.status).to.equal(400);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('Key (plate)=(135-754-976) already exists.');
    });

    it('createVehicle should return a message with 400 status code when called with existent niv', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-922",
            "niv": "4T1BE32K55U678432",
            "brand": "Mazda",
            "typeOfVehicle": "suv",
            "price": 50000,
        })
        expect(response.status).to.equal(400);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('Key (niv)=(4T1BE32K55U678432) already exists.');
    });

    it('createVehicle should return a message with 406 status code when called with not valid niv', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-911",
            "niv": "4T1BE32K55U684",
            "brand": "Mazda",
            "typeOfVehicle": "suv",
            "price": 50000,
        })
        expect(response.status).to.equal(406);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('The \"niv\" does not match the NIV pattern.');
    });

    it('createVehicle should return a message with 406 status code when called with not valid brand', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-911",
            "niv": "4T1BE32K55U678421",
            "brand": "Mazd",
            "typeOfVehicle": "suv",
            "price": 50000,
        })
        expect(response.status).to.equal(406);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('\"brand\" must be one of [Mazda, Honda, Toyota, Renault, Volkswagen]');
    });

    it('createVehicle should return a message with 406 status code when called with not valid typeOfVehicle', async () => {
        const response = await request(app).post('/api/vehicles/').send({
            "plate": "135-754-911",
            "niv": "4T1BE32K55U678421",
            "brand": "Mazda",
            "typeOfVehicle": "suav",
            "price": 50000,
        })
        expect(response.status).to.equal(406);
        expect(response.type).to.match(/json/);
        expect(response.body).to.be.an('object')

        expect(response.body).to.have.property('message').and.equal('\"typeOfVehicle\" must be one of [sedan, hb, suv, roadster]');
    });
})