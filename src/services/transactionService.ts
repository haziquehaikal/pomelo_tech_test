import { Transaction } from '../interface/transaction';
import * as dotenv from 'dotenv';
dotenv.config();
import { TransactionStatus } from '../misc/enum';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';


class TransactionService {
    private transactions: Transaction[] = [];
    private dataFilePath: string;

    constructor() {
        console.log(process.env.DATASOURCE_FILENAME)
        this.dataFilePath = `${__dirname}/${process.env.DATASOURCE_FILENAME}`;
        console.log(`PERSISTENT_FILE_PATH: ${this.dataFilePath}`);

    }

    // SAVE DATA TO FILE
    private async saveDataToFile(transaction?: Transaction): Promise<void> {

        try {
            console.debug(`current length: ${this.transactions.length} `)
            this.transactions = transaction ? [...this.transactions, transaction] : this.transactions;
            fs.writeFileSync(this.dataFilePath, JSON.stringify(this.transactions, null, 2));
        } catch (err) {
            throw new Error('Error saving data to file');
        }
    }

    // LOAD DATA FROM FILE
    private async loadDataFromFile(): Promise<void> {
        this.transactions = [];
        try {
            if (!fs.existsSync(this.dataFilePath)) {
                // IF FILE NOT EXIST, CREATE FILE   
                fs.writeFileSync(this.dataFilePath, JSON.stringify([], null, 2));
                console.log('transactions.json file created with initial data.');
            }
            const data = await fs.readFileSync(this.dataFilePath, 'utf8');
            this.transactions.push(...JSON.parse(data));
        } catch (error) {
            fs.writeFileSync(this.dataFilePath, JSON.stringify(this.transactions, null, 2));
            throw new Error(`Error loading data from file: ${error}`);
        }
    }

    // CREATE NEW TXN
    public async createTransaction(amount: number, currency: string, status: TransactionStatus): Promise<Transaction> {

        try {
            await this.loadDataFromFile();

            const transaction: Transaction = {
                id: uuidv4(),
                amount,
                currency,
                status,
            };
            await this.saveDataToFile(transaction);
            console.log('Transaction created total:', this.transactions.length);
            return transaction;
        } catch (err) {
            throw new Error('Error creating transaction');
        }
    }

    // GET TXN LIST
    public async getTransactions(): Promise<Transaction[] | null> {

        try {
            this.transactions = [];
            await this.loadDataFromFile();
            console.log('Transaction retrieved total:', this.transactions.length);
            return this.transactions;
        } catch (err) {
            throw new Error('Error getting transactions');
        }
    }

    // UPDATE TXN STATUS
    public async updateTransactionStatus(id: string, status: TransactionStatus): Promise<Transaction | undefined> {

        try {
            await this.loadDataFromFile();
            const transaction = this.transactions.find(t => t.id === id);
            console.log(`Transaction found: ${transaction}`);
            if (transaction) {
                transaction.status = status;
                this.saveDataToFile();
            }
            return transaction;
        } catch (err) {
            throw new Error('Error updating transaction status');
        }
    }

    public async clearTransactions(): Promise<void> {

        try {
            fs.unlinkSync(this.dataFilePath);
            this.transactions = [];
            await this.saveDataToFile();
            console.log('Transaction retrieved after clear total:', this.transactions.length);

        } catch (err) {
            throw new Error('Error clearing transactions');
        }
    }
}

export const transactionService = new TransactionService();
