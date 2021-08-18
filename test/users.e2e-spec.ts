import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '../src/modules/users/users.module';
import { UserService } from '../src/modules/users/users.service';

describe('Users', () => {
  let app: INestApplication;
  let usersService = { getExpenseReport: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UserService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET :userId/report`, () => {
    return request(app.getHttpServer())
      .get('/users/2/report')
      .expect(200)
      .expect({
        data: usersService.getExpenseReport(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});