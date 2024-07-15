import { Handler } from 'aws-lambda';
import { transactionService } from '../services/transactionService';
import { generateResponse } from '../misc/utils';
import { HTTP_MESSAGE_500 } from '../misc/constant';


export const handler: Handler = async () => {

    try {
        return generateResponse(200, await transactionService.getTransactions());

    } catch (error) {
        return generateResponse(500, { message: HTTP_MESSAGE_500 });
    }
};