import { jsTPS_Transaction } from '../lib/jsTPS.js';

export class AddItem_Transaction extends jsTPS_Transaction {
    #operations;
    #item;
    #index;

    constructor(operations, item, index) {
        super();
        this.#operations = operations;
        this.#item = item;
        this.#index = index;
    }

    doTransaction() {
        this.#operations.addItem(this.#item, this.#index);
    }

    undoTransaction() {
        this.#operations.removeItemAt(this.#index);
    }

    toString() {
        return `AddItem_Transaction(index ${this.#index})`;
    }
}