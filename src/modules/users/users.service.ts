import { Injectable } from "@nestjs/common";
import { getManager } from "typeorm";
import { ReportQuery } from "./dto/ReportQuery.dto";

@Injectable()
export class UserService {
  constructor() {}

  async getExpenseReport (userId: string, { startDate, endDate }: ReportQuery) {
    const manager = getManager();

    // as Postgres +v9.4 has percent rank which is effective to get thee percentile rank
    // as I already prepare the sql query on client so instead of using ORM function, I used directly
    const data = await manager.query(`
      WITH Percentiles
        AS (
          SELECT m.id as merchant_id, u.id as user_id, SUM(t.amount) as totalspent,
          PERCENT_RANK() OVER (
            PARTITION by m.id
            ORDER BY SUM(t.amount)
          ) as percentile_rank
          FROM "transactions" "t" 
          inner join merchants m on t.merchant_id = m.id 
          inner join users u on t.user_id = u.id 
          AND "t"."date" 
          BETWEEN '${startDate}'::date
          AND '${endDate}'::date
          GROUP BY m.id, u.id
        )
      SELECT m.*, totalspent, percentile_rank 
      FROM Percentiles as p
      INNER JOIN merchants m on p.merchant_id = m.id 
      WHERE user_id = '${userId}';
    `);

    return data;
  }
}