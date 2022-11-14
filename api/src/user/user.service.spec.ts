import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Cache } from 'cache-manager';
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({ isGlobal: true, ttl: 60 })],
      providers: [UserService],
    }).compile();

    const cacheManager = await module.get<Cache>(CACHE_MANAGER);

    cacheManager.set('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        gender: 1,
        tc: '12345678901',
        dateOfBirth: '1990-01-01',
        phone: '5554443322',
        token: {
          value:
            'e7c8ff111eee3f6026d91efbdb2699661dc462e8f2a0aed7ab997e3b1f0a8066a721ae94f3a2ec411',
          isVerified: false,
        },
        isPhoneVerified: true,
      },
    ]);

    service = await module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user given by tc', async () => {
    const tc = '12345678901';
    const user = await service.getByTc(tc);
    expect(user.tc).toEqual(tc);
  });

  it('should not return a user given by tc', async () => {
    const tc = '12345678902';
    const user = await service.getByTc(tc);
    expect(user).toEqual(undefined);
  });

  it('should create a user', async () => {
    const user = await service.create({ tc: '12345678903' });
    expect(user.tc).toEqual('12345678903');
    expect(user.isPhoneVerified).toEqual(false);
  });
});
