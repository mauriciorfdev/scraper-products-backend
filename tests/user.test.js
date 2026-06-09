import request from 'supertest';
import { app } from '../app.js';
import { UserModel } from '../models/user.model.js';

describe('GET /api/users/profile', () => {
  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/api/users/profile');
    expect(res.statusCode).toBe(401); //jest
    expect(res.body.msg).toBe('Token not provided'); //jest
  });

  it('should return 401 if token is invalid', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer invalid-token');
    expect(res.statusCode).toBe(401); //jest
    expect(res.body.msg).toBe('Invalid or expired token'); //jest
  });

  it('should return 200 if valid token', async () => {
    const user = {
      name: 'User Name',
      password: 'userpassword',
      email: 'user@gmail.com',
    };
    //insert user
    await request(app).post('/api/auth/register').send(user);
    //login user, retrieve token
    const loginRes = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password,
    });
    const token = loginRes.body.token;

    //access profile
    const profileRes = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(profileRes.statusCode).toBe(200); //jest
  });
});

describe('GET /api/users', () => {
  it('should return 403 if user is not an admin', async () => {
    const user = {
      name: 'User Name',
      password: 'userpassword',
      email: 'user@gmail.com',
    };
    //register and login
    await request(app).post('/api/auth/register').send(user);
    const loginRes = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password,
    });
    const token = loginRes.body.token;
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.msg).toBe('Admin access required');
  });

  it('should return 200 if user is admin', async () => {
    //create admin
    const adminUser = {
      name: 'Admin',
      email: 'admin@email.com',
      password: 'adminpassword',
      role: 'admin',
    };
    await UserModel.create(adminUser);
    //admin login
    const loginRes = await request(app).post('/api/auth/login').send({
      email: adminUser.email,
      password: adminUser.password,
    });
    const token = loginRes.body.token;
    //admin access
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
