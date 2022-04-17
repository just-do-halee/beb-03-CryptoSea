import { Err } from '../functions/result.function';

export function TryCatch() {
  return function (_target: any, _key: string, desc: PropertyDescriptor) {
    const origin = desc.value;

    desc.value = function (...args: any[]) {
      try {
        return origin.apply(this, args);
      } catch (e) {
        return Err(e.message);
      }
    };
  };
}

export function AsyncTryCatch(originMsg: string = '') {
  return function (_target: any, _key: string, desc: PropertyDescriptor) {
    const origin = desc.value;

    desc.value = async function (...args: any[]) {
      try {
        return await origin.apply(this, args);
      } catch (e) {
        console.error(e); // put
        if (e.message) e = e.message;
        return Err(`${originMsg}${e}`);
      }
    };
  };
}
