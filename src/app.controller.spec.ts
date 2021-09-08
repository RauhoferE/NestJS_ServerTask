import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';


class AuthServiceMock{
  async login(user){
    return "testToken";
  }
  
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const AuthServiceProvider = {
      provide: AuthService,
      useClass: AuthServiceMock
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceProvider]
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Welcome to my web App\n Written by Emre Rauhofer');
    });

    it('should return a jwt token', () => {
      const token = new Promise<any>((resolve, reject)=> {
        return "testToken";
      })
      appController.login("test");
    })
  });
});
