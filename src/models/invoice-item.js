export default class InvoiceItem {
    constructor(name, quantity, price) {
        this.id = Math.floor(Math.random() * (10**10 - 10 + 1) + 10);
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.is_editing = false;
    }
}