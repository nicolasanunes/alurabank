import { executionTime } from "../decorators/executionTime.js";
import { inspect } from "../decorators/inspect.js";

export abstract class View<T> {

  //protected permite às classes filhas acessarem um elemento privado da classe pai;
  protected element: HTMLElement;

  constructor (selector: string) {
    const element = document.querySelector(selector);
    if(element) {
      this.element = element as HTMLElement;
    } else {
      throw Error ('Seletor não existe no DOM!');
    }
  }

  public update(model: T): void {
    let template = this.template(model);
    this.element.innerHTML = template;
  }

  protected abstract template(model: T): string;
}
