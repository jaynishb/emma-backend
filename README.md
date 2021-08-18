## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

> http://localhost:5000

## Endpoints
Endpoint: /users/:userId/reports
Method: GET
Query parameter: 
 - startDate: Date
 - endDate: Date

## Database
There is a one reason to choose sql based on the requirement, SQL has percent_rank function to get the percentile rank.

To handle big data, We can use trino[https://trino.io/] or presto[https://prestodb.io/], highly parallel and distributed query engine, that is built from the ground up for efficient, low latency analytics on top of the our database flavour. Also *Database Sharding* is a really good option here to handle the big data.

## Design data
As per the given requirement, created api will be invoked by the automated batched for weekly and monthly reports. 

To make this more effective, we can create a `day-transaction` table in database where we store `user_id`, `merchant_id`, `date`, and `total` (day's total amount). When user adds a new transaction, it will calculate and store to `day-transaction`. 

Example 
```
id  user_id  merchant_id    date       total 
1      1         2       2021-08-15     80
2      3         3       2021-08-15     30
3      1         3       2021-08-17     50
```
This will make more easy to calculate weekly and monthly reports.

## Scalability 
To scale app horizontaly, a regular devops practice can also adds up like handling multiple instances in kubernetes and trigging jobs through any async messaging service like kafka, pulsur or AWS sqs to distribute the jobs loads to multiple app instance.

