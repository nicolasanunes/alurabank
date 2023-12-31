export function inspect() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: Array<any>) {
      console.log(`--- Método ${propertyKey}`);
      console.log(`------ parâmetros: ${JSON.stringify(args)}`);
      const return1 = originalMethod.apply(this, args);
      console.log(`------ retorno: ${JSON.stringify(return1)}`);
      return return1;
    }
    return descriptor;
  }
}