import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidateBy,
  buildMessage,
} from 'class-validator';
import { isMetaAttribute } from 'src/nft/entities/metadata.function';
import { isCID } from '../functions/validator.function';

export function IsCID(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isCID',
      validator: {
        validate: (value, _args): boolean => isCID(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be valid CID',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

export function IsMetaAttributes(
  validationOptions: ValidationOptions & { partial?: boolean } = {},
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMetaAttributes',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'invalid attributes type.',
        ...validationOptions,
      },
      validator: {
        validate(value: any, _args: ValidationArguments) {
          const { partial } = validationOptions;
          if (partial && value === undefined) return true;
          console.log(value);
          try {
            let arr = value;
            if (typeof arr === 'string') arr = JSON.parse(value);
            if (Array.isArray(arr) === false) return false;
            for (const obj of arr) {
              if (typeof obj !== 'object') return false;
              if (isMetaAttribute(obj, partial) === false) return false;
            }
          } catch (_) {
            return false;
          }
          return true;
        },
      },
    });
  };
}
