import request from 'supertest';
import { app } from '../app.js';
import { UserModel } from '../models/user.model.js';

describe('GET /api/users', () => {
  it('should return 403 if user is not an admin', async () => {
    //create user
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
    const authCookie = loginRes.headers['set-cookie'];
    const res = await request(app).get('/api/users').set('Cookie', authCookie);
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
    const authCookie = loginRes.headers['set-cookie'];
    //admin access
    const res = await request(app).get('/api/users').set('Cookie', authCookie);
    expect(res.statusCode).toBe(200);
  });
});
