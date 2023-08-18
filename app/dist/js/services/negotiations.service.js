import { Negotiation } from "../models/negotiation.js";
export class NegotiationsService {
    getTodaysNegotitations() {
        return fetch('http://localhost:8080/data')
            .then(res => res.json())
            .then((data) => {
            return data.map(currentlyData => {
                return new Negotiation(new Date(), currentlyData.quantity, currentlyData.amount);
            });
        });
    }
}
//# sourceMappingURL=negotiations.service.js.map