import { Controller, Get, Param, Query } from "@nestjs/common";
import { ReportQuery } from "./dto/ReportQuery.dto";
import { UserService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService,
  ) {}

  @Get('/:userId/report')
  async getReports(@Param('userId') userId: string, @Query() query: ReportQuery) {
    try { 
      const report = await this.userService.getExpenseReport(userId, query);
      return { data: report }
    } catch (error) {
      console.error(`Error in getting expense report for user ${userId}`, error);
      throw error;
    }
  }
}
