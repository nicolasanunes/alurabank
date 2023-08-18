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
  @domInject('#date')
  private inputDate: HTMLInputElement;
  @domInject('#quantity')
  private inputQuantity: HTMLInputElement;
  @domInject('#value')
  private inputValue: HTMLInputElement;
  private negotiations = new Negotiations();
  private negotiationsView = new NegotiationsView('#negotiationsView');
  private messageView = new MessageView('#messageView');
  private negotiationsService = new NegotiationsService();

  constructor() {
    this.negotiationsView.update(this.negotiations);
  }

  @inspect()
  @executionTime()
  public add(): void {
    const negotiation = Negotiation.createFrom(
      this.inputDate.value,
      this.inputQuantity.value,
      this.inputValue.value,
    );
    if(!this.businessDay(negotiation.date)) {
      this.messageView.update('Apenas negociações em dias úteis são aceitas!');
      return;
    }
    this.negotiations.add(negotiation);
    print(negotiation, this.negotiations);
    this.cleanForm();
    this.updateView();
  }

  public importData(): void {
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
      for(let negotiation of todaysNegotiations) {
        this.negotiations.add(negotiation);
      }
      this.negotiationsView.update(this.negotiations);
    });
  }

  private businessDay(date: Date) {
    return date.getDay() > DaysOfWeek.SUNDAY && date.getDay() < DaysOfWeek.SATURDAY;
  }

  private cleanForm(): void {
    this.inputDate.value = '';
    this.inputQuantity.value = '';
    this.inputValue.value = '';
    this.inputDate.focus();
  }

  private updateView(): void {
    this.negotiationsView.update(this.negotiations);
    this.messageView.update('Negociação adicionada com sucesso!');
  }
}
