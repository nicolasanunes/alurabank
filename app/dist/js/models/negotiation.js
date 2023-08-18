export class Negotiation {
    constructor(_date, quantity, value) {
        this._date = _date;
        this.quantity = quantity;
        this.value = value;
    }
    static createFrom(dateString, quantityString, valueString) {
        const regularExpression = /-/g;
        const date = new Date(dateString.replace(regularExpression, ','));
        const quantity = parseInt(quantityString);
        const value = parseFloat(valueString);
        return new Negotiation(date, quantity, value);
    }
    get date() {
        const date = new Date(this._date.getTime());
        return date;
    }
    get amount() {
        return this.quantity * this.value;
    }
    toText() {
        return `
      Data: ${this.date},
      Quantidade: ${this.quantity},
      Valor: ${this.value},
    `;
    }
    isEqual(negotiation) {
        return this.date.getDate() === negotiation.date.getDate()
            && this.date.getMonth() === negotiation.date.getMonth()
            && this.date.getFullYear() === negotiation.date.getFullYear();
    }
}
//# sourceMappingURL=negotiation.js.map