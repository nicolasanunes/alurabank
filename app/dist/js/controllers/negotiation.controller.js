var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInject } from "../decorators/domInject.js";
import { executionTime } from "../decorators/executionTime.js";
import { inspect } from "../decorators/inspect.js";
import { DaysOfWeek } from "../enums/daysOfWeek.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { NegotiationsService } from "../services/negotiations.service.js";
import { print } from "../utils/print.js";
import { MessageView } from "../views/message.view.js";
import { NegotiationsView } from "../views/negotiations.view.js";
export class NegotiationController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView('#negotiationsView');
        this.messageView = new MessageView('#messageView');
        this.negotiationsService = new NegotiationsService();
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.createFrom(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);
        if (!this.businessDay(negotiation.date)) {
            this.messageView.update('Apenas negociações em dias úteis são aceitas!');
            return;
        }
        this.negotiations.add(negotiation);
        print(negotiation, this.negotiations);
        this.cleanForm();
        this.updateView();
    }
    importData() {
        this.negotiationsService
            .getTodaysNegotitations()
            .then(todaysNegotiations => {
            return todaysNegotiations.filter(todaysNegotiation => {
                return !this.negotiations
                    .list()
                    .some(negotiation => negotiation
                    .isEqual(todaysNegotiation));
            });
        })
            .then(todaysNegotiations => {
            for (let negotiation of todaysNegotiations) {
                this.negotiations.add(negotiation);
            }
            this.negotiationsView.update(this.negotiations);
        });
    }
    businessDay(date) {
        return date.getDay() > DaysOfWeek.SUNDAY && date.getDay() < DaysOfWeek.SATURDAY;
    }
    cleanForm() {
        this.inputDate.value = '';
        this.inputQuantity.value = '';
        this.inputValue.value = '';
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Negociação adicionada com sucesso!');
    }
}
__decorate([
    domInject('#date')
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInject('#quantity')
], NegotiationController.prototype, "inputQuantity", void 0);
__decorate([
    domInject('#value')
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    inspect(),
    executionTime()
], NegotiationController.prototype, "add", null);
//# sourceMappingURL=negotiation.controller.js.map