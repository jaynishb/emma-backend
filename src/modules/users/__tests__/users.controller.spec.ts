import { UsersController } from '../users.controller';
import { UserService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    usersController = new UsersController(userService);
  });

  describe('getReports', () => {
    it('should return valid response', async () => {
      const userId = 'user_id';
      const startDate = new Date('2021-08-15');
      const endDate = new Date('2021-09-15');
      const expectedResponse = ['test'];
      jest.spyOn(userService, 'getExpenseReport').mockResolvedValue(expectedResponse);

      const { data } = await usersController.getReports(userId, { startDate, endDate });
      expect(data).toBe(expectedResponse);
    });
  });
});