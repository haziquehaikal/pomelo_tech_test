import { Handler } from 'aws-lambda';
import { transactionService } from '../services/transactionService';
import { generateResponse } from '../misc/utils';
import { CREATE_TRANSACTION_MISS_FIELD_ERR, CREATE_TRANSACTION_CREATED, HTTP_MESSAGE_500 } from '../misc/constant';


export const handler: Handler = async (event) => {
    try {
        const { amount, currency, status } = JSON.parse(event.body!);

        if (!amount || !currency) {

            return generateResponse(400, { message: CREATE_TRANSACTION_MISS_FIELD_ERR });
        }
        const res = await transactionService.createTransaction(amount, currency, status);
        return generateResponse(201, { message: CREATE_TRANSACTION_CREATED, id: res.id });

    } catch (error) {
        return generateResponse(500, { message: HTTP_MESSAGE_500 });
    }
};