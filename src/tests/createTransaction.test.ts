import { handler } from '../handlers/createTransaction';
import { Handler, Context } from 'aws-lambda';

describe('createTransaction', () => {
  it('should create a new transaction', async () => {
    const event: Handler = {
      body: JSON.stringify({
        "amount": "123",
        "currency": "MYR",
        "status": "PAID"

      }),
    } as any;

    const result = await handler(event, {} as Context, () => null);

    expect(result?.statusCode).toBe(201);
    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('message')
    expect(body).toHaveProperty('id')
    expect(body.id).toBeDefined();
  });

  it('should return a 400 error if required fields are missing', async () => {
    const event: Handler = {
      body: JSON.stringify({ amount: 100 }),
    } as any;

    const result = await handler(event, {} as Context, () => null);
    expect(result.statusCode).toBe(400);
    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('Missing required fields: amount and status');
  });
});