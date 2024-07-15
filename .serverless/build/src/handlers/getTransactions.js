var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handlers/getTransactions.ts
var getTransactions_exports = {};
__export(getTransactions_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(getTransactions_exports);

// src/services/transactionService.ts
var TransactionService = class {
  //STORE TEMP STATE
  transactions = [];
  createTransaction(transaction) {
    this.transactions.push(transaction);
  }
  getTransactions() {
    return this.transactions;
  }
};
var transactionService = new TransactionService();

// src/handlers/getTransactions.ts
var handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(transactionService.getTransactions())
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=getTransactions.js.map
