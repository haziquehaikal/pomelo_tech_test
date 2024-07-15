import { handler } from '../handlers/getTransactions';
import { Context } from 'aws-lambda';

describe('getTransactions', () => {
    it('should return a list of transactions', async () => {
        const result = await handler({} as any, {} as Context, () => null);

        expect(result.statusCode).toBe(200);
        const body = JSON.parse(result.body);


        if (body.length > 0) {
            expect(Array.isArray(body)).toBe(true);

            body.forEach((transaction: any) => {
                expect(transaction).toHaveProperty('id');
                expect(transaction).toHaveProperty('amount');
                expect(transaction).toHaveProperty('currency');
                expect(transaction).toHaveProperty('status');
            });
        }

    });
});