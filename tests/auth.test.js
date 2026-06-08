import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app.js';
import { UserModel } from '../models/user.model.js';
process.env.JWT_SECRET = 'test-secret';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('POST /api/auth/register', () => {
  it('should return 201 if user created', async () => {
    const newUser = {
      name: 'User Name',
      password: 'userpassword',
      email: 'user@gmail.com',
    };
    const res = await request(app).post('/api/auth/register').send(newUser); //supertest
    expect(res.statusCode).toBe(201); //jest
  });

  it('should return 400 if email is missing', async () => {
    const newUser = {
      name: 'User Name',
      password: 'userpassword',
    };
    const res = await request(app).post('/api/auth/register').send(newUser); //supertest
    expect(res.statusCode).toBe(400); //jest
  });

  it('should return 400 if invalid email address', async () => {
    const newUser = {
      name: 'User Name',
      password: 'userpassword',
      email: '123123',
    };
    const res = await request(app).post('/api/auth/register').send(newUser);
    expect(res.statusCode).toBe(400); //jest
    expect(res.body.errors[0].message).toBe('Invalid email address'); //jest
  });

  it('should return 409 if email duplicated', async () => {
    const newUser = {
      name: 'User Name',
      password: 'userpassword',
      email: 'user@gmail.com',
    };
    await request(app).post('/api/auth/register').send(newUser); //first insertion
    const res = await request(app).post('/api/auth/register').send(newUser); // second insertion
    expect(res.statusCode).toBe(409); //jest
  });
});

describe('POST /api/auth/login', () => {
  it('should return 401 when user does not exist', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@test.com',
      password: 'myPassword',
    });
    expect(res.statusCode).toBe(401);
  });

  it('should return 401 when password is incorrect', async () => {
    const user = {
      name: 'User Name',
      email: 'test@test.com',
      password: 'myPassword',
    };
    await request(app).post('/api/auth/register').send(user);
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@test.com',
      password: 'wrongPassword',
    });
    expect(res.statusCode).toBe(401);
  });

  it('should return 200 with correct login', async () => {
    const newUser = {
      name: 'User Name',
      password: 'userpassword',
      email: 'user@gmail.com',
    };
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(newUser);
    const loginRes = await request(app).post('/api/auth/login').send({
      password: 'userpassword',
      email: 'user@gmail.com',
    });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
  });
});
