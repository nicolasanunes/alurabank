import { TodaysNegotiations } from "../interfaces/todaysNegotiation.js";
import { Negotiation } from "../models/negotiation.js";

export class NegotiationsService {
  public getTodaysNegotitations(): Promise<Negotiation[]> {
    return fetch('http://localhost:8080/data')
    .then(res => res.json())
    .then((data: Array<TodaysNegotiations>) => {
      return data.map(currentlyData => {
        return new Negotiation(
          new Date(), 
          currentlyData.quantity, 
          currentlyData.amount,
        )
      })
    })
  }
}