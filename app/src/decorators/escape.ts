export function escape(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: Array<any>) {
    let return1 = originalMethod.apply(this, args);
    if(typeof return1 === 'string') {
      console.log(`@escape em ação na classe ${this.constructor.name} para o método ${propertyKey}`);
      return1 = return1.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    return return1;
  }
  return descriptor;
}