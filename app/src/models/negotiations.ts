import { Model } from "../interfaces/model.js";
import { Negotiation } from "./negotiation.js";

export class Negotiations implements Model<Negotiations> {

  private negotiations: Array<Negotiation> = [];

  public add(negotiation: Negotiation) {
    this.negotiations.push(negotiation);
  }

  public list(): ReadonlyArray<Negotiation> {
    return this.negotiations;
  }

  public toText(): string {
    return JSON.stringify(this.negotiations, null, 2);
  }

  public isEqual(negotiations: Negotiations): boolean {
    return JSON.stringify(this.negotiations) === JSON.stringify(negotiations.list());
  }
}

const negotiations = new Negotiations();
negotiations.list().forEach(n => {
  n.value
});