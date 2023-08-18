export function executionTime(onSeconds: boolean = false) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: Array<any>) {
      let divider = 1;
      let unity = 'milisegundos';
      if(onSeconds) {
        divider = 1000;
        unity = 'segundos';
      }
      const t1 = performance.now();
      const return1 = originalMethod.apply(this, args);
      const t2 = performance.now();
      console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / divider} ${unity}!`);
      return return1;
    }
    return descriptor;
  }
}
