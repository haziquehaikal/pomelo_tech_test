import { Handler } from 'aws-lambda';
import { transactionService } from '../services/transactionService';
import { generateResponse } from '../misc/utils';
import { RESET_TRANSACTIONS, HTTP_MESSAGE_500 } from '../misc/constant';

export const handler: Handler = async (event) => {

    try {
        await transactionService.clearTransactions();
        return generateResponse(200, { message: RESET_TRANSACTIONS });

    } catch (error) {
        return generateResponse(500, { message: HTTP_MESSAGE_500 });

    }


}