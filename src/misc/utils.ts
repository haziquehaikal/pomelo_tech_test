
export const generateResponse = (statusCode: any, body: any) => {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    };
}