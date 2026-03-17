import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Courses API (e2e)', () => {
  let app: INestApplication;
  let accessToken = '';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.enableCors({
      origin: ['http://localhost:5173'],
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /courses returns seeded data', async () => {
    const response = await request(app.getHttpServer())
      .get('/courses')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /courses/paginated returns paginated seeded data', async () => {
    const response = await request(app.getHttpServer())
      .get('/courses/paginated?page=1&limit=5')
      .expect(200);

    expect(Array.isArray(response.body.items)).toBe(true);
    expect(response.body.items.length).toBeLessThanOrEqual(5);
    expect(response.body.pagination).toMatchObject({
      page: 1,
      limit: 5,
    });
    expect(typeof response.body.pagination.total).toBe('number');
  });

  it('POST /courses rejects unauthenticated requests', async () => {
    await request(app.getHttpServer())
      .post('/courses')
      .send({
        slug: 'curso-sin-auth',
        title: 'Curso sin autenticacion',
        category: 'Backend',
        description: 'Intento sin token.',
        hours: 8,
        rating: 4.5,
        price: 50,
      })
      .expect(401);
  });

  it('authenticates and performs protected create, update and delete', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'Admin12345',
      })
      .expect(201);

    accessToken = loginResponse.body.access_token;
    expect(accessToken).toBeTruthy();

    const createResponse = await request(app.getHttpServer())
      .post('/courses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        slug: 'curso-e2e-test',
        title: 'Curso backend end to end',
        category: 'Backend',
        description: 'Curso creado desde prueba e2e.',
        hours: 10,
        rating: 4.6,
        price: 49.9,
      })
      .expect(201);

    expect(createResponse.body.slug).toBe('curso-e2e-test');
    expect(createResponse.body.image_url).toBeNull();
    expect(createResponse.body.best_sellers).toBe(false);
    expect(createResponse.body.tags).toEqual([]);

    const courseId = createResponse.body.id;

    const updateResponse = await request(app.getHttpServer())
      .patch(`/courses/${courseId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Curso backend end to end actualizado',
        best_sellers: true,
        tags: ['e2e', 'nestjs'],
      })
      .expect(200);

    expect(updateResponse.body.title).toContain('actualizado');
    expect(updateResponse.body.best_sellers).toBe(true);
    expect(updateResponse.body.tags).toEqual(['e2e', 'nestjs']);

    await request(app.getHttpServer())
      .delete(`/courses/${courseId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(204);
  });
});
