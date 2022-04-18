export function LogIt(originMsg: string = '') {
  return function (_target: any, _key: string, desc: PropertyDescriptor) {
    const origin = desc.value;

    desc.value = function (...args: any[]) {
      console.log(`[LogIt] :: ${this.constructor.name} :: ${originMsg}`);
      return origin.apply(this, args);
    };
  };
}

export function AsyncLogIt(originMsg: string = '') {
  return function (target: any, _key: string, desc: PropertyDescriptor) {
    const origin = desc.value;

    desc.value = async function (...args: any[]) {
      console.log(`[LogIt] :: ${this.constructor.name} :: ${originMsg}`);
      return await origin.apply(this, args);
    };
  };
}
