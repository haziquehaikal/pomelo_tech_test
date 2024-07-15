import { TransactionStatus } from "../misc/enum";

export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
}