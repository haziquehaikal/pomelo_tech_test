# Pomelo Tech Test

A serverless application to manage transaction API.

## API endpoints 

- `POST /transaction` - Create new transaction
- `GET /transaction` - Get list of transactions
- `PATCH /transaction/{id}` - Update transaction status by Id
- `PUT /transaction/reset` - Clear persistent transaction data

## Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- Serverless Framework (version 3.39.0 or later)

## Installation

Install the dependency:

```sh
npm install  
```

Run the application locally:

```sh
 npm run start:dev
```

Run the unit test locally:

```sh
 npm test
```