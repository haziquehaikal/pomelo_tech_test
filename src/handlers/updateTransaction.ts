import { Handler } from 'aws-lambda';
import { transactionService } from '../services/transactionService';
import { generateResponse } from '../misc/utils';
import { UPDATE_TRANSACTION_REC_NOT_FOUND, UPDATE_TRANSACTION_UPDATED, HTTP_MESSAGE_500 } from '../misc/constant';


export const handler: Handler = async (event) => {


    try {
        const { id } = event.pathParameters!;
        const { status } = JSON.parse(event.body!);

        console.log(`PARAM : ${id} , ${status}`);

        const response = await transactionService.updateTransactionStatus(id, status);
        if (!response) {
            return generateResponse(404, { message: UPDATE_TRANSACTION_REC_NOT_FOUND });
        }

        return generateResponse(200, { message: UPDATE_TRANSACTION_UPDATED });

    } catch (error) {
        return generateResponse(500, { message: HTTP_MESSAGE_500 });
    }
};