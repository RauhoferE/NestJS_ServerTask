import { Test, TestingModule } from '@nestjs/testing';
import { Information, UserInformationService } from './user-information.service';

describe('UserInformationService', () => {
  let service: UserInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInformationService],
    }).compile();

    service = module.get<UserInformationService>(UserInformationService);
  });

  it('Should be described', async () => {
    expect(service).toBeDefined();
  })

  describe('addUser', () => {
    it('Should add a User to the userpool and return true', async () => {
      expect(await service.addUser(<Information>{
        nickname: "testtest",
        name: "t",
        surname:"est",
        age: 15,
        email: "t.est@gmail.com",
        password: "password",
        role: 'User'
      })).toBe(true);
      });
    it('Should not add a user and return false, because the username is too short', async () => {
      expect(await service.addUser(<Information>{
        nickname: "test",
        name: "t",
        surname:"est",
        age: 15,
        email: "t.est@gmail.com",
        password: "password",
        role: 'User'
      })).toBe(false);
    });
    it('Should not add a user and return false, because the password is too short', async () => {
      expect(await service.addUser(<Information>{
        nickname: "testtest",
        name: "t",
        surname:"est",
        age: 15,
        email: "t.est@gmail.com",
        password: "pass",
        role: 'User'
      })).toBe(false);
    });
    it('Should not add a user and return false, because the password is undefined', async () => {
      expect(await service.addUser(<Information>{
        nickname: "testtest",
        name: "t",
        surname:"est",
        age: 15,
        email: "t.est@gmail.com",
        role: 'User'
      })).toBe(false);
    });
    it('Should not add a user and return false, because the username is undefined', async () => {
      expect(await service.addUser(<Information>{
        name: "t",
        surname:"est",
        age: 15,
        email: "t.est@gmail.com",
        password: "password",
        role: 'User'
      })).toBe(false);
    });
    it('Should not add a user and return false, because the info is null', async () => {
      expect(await service.addUser(null)).toBe(false);
    });
    });

  describe('deleteUser', () => {
    it('should delete the given user and return true', async () => {
      let ik = await service.addUser(<Information>{
        nickname: "testtest",
        name: "t",
        surname:"est",
        age: 15,
        email: "t.est@gmail.com",
        password: "password",
        role: 'User'
      });
      
      expect(await service.deleteUser("testtest")).toBe(true);
      expect(await service.returnInformation("testtest")).toEqual(expect.anything());
    })
  })
  describe('try to deleteUser', () => {
    it('should not delete the given user and return false, because the name is not found', async () => {

      expect(await service.deleteUser("testtest")).toBe(false);
      expect(await service.returnInformation("testtest")).toBeNull();
    })
  })
  });

