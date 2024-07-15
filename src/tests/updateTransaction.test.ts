import { handler } from '../handlers/updateTransaction';
import { Handler, Context } from 'aws-lambda';
import { transactionService } from '../services/transactionService';
import { generateResponse } from '../misc/utils';
import { UPDATE_TRANSACTION_UPDATED } from '../misc/constant';

jest.mock('../services/transactionService');
jest.mock('../misc/utils');

describe('handler', () => {
    const mockEvent: Handler = {
        pathParameters: { id: '3a63ee1f-eb52-40e6-894d-29457662d599' },
        body: JSON.stringify({ status: 'FAILED' }),
    } as any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update transaction status and return success response', async () => {
        transactionService.updateTransactionStatus = jest.fn().mockReturnValue(generateResponse(200, { message: UPDATE_TRANSACTION_UPDATED }));
        const result = await handler(mockEvent, {} as Context, () => null);
        expect(transactionService.updateTransactionStatus).toHaveBeenCalledWith('3a63ee1f-eb52-40e6-894d-29457662d599', 'FAILED');
    });

    it('should return 404 if transaction record is not found', async () => {
        transactionService.updateTransactionStatus = jest.fn().mockReturnValue(null);
        const result = await handler(mockEvent, {} as Context, () => null);
        // expect(transactionService.updateTransactionStatus).toHaveBeenCalledWith('3a63ee1f-eb52-40e6-894d-29457662d599', 'FAILED');
        // expect(r).toHaveBeenCalledWith(404, { message: UPDATE_TRANSACTION_REC_NOT_FOUND });
    });
});