import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/rectangle/zxcv (GET)', () => {
    return request(app.getHttpServer()).get('/rectangle/zxcv').expect(404);
  });

  it('/rectangle (PUT)', () => {
    return request(app.getHttpServer())
      .put('/rectangle')
      .send({ name: 'zxcv', width: 3, height: 4 })
      .expect(201);
  });

  it('/rectangle (PUT)', () => {
    return request(app.getHttpServer())
      .put('/rectangle')
      .send({ name: 'zxcv', width: 1, height: 2 })
      .expect(409);
  });

  it('/rectangle/zxcv (GET)', () => {
    return request(app.getHttpServer())
      .get('/rectangle/zxcv')
      .expect(200)
      .expect({ name: 'zxcv', width: 3, height: 4 });
  });

  it('/rectangle/zxcv (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/rectangle/zxcv')
      .send({ width: 4, height: 5 })
      .expect(200);
  });

  it('/rectangle/zxcv (GET)', () => {
    return request(app.getHttpServer())
      .get('/rectangle/zxcv')
      .expect(200)
      .expect({ name: 'zxcv', width: 4, height: 5 });
  });

  it('/rectangle/zxcv (DELETE)', () => {
    return request(app.getHttpServer()).delete('/rectangle/zxcv').expect(200);
  });

  it('/rectangle/zxcv (GET)', () => {
    return request(app.getHttpServer()).get('/rectangle/zxcv').expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
