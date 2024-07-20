import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import * as mime from 'mime-types';
  
  @ValidatorConstraint({ async: false })
  export class IsImageConstraint implements ValidatorConstraintInterface {
    validate(file: Express.Multer.File, args: ValidationArguments) {
      if (!file) return false;
      const mimeType = mime.lookup(file.originalname);
      return mimeType.startsWith('image/');
    }
  
    defaultMessage(args: ValidationArguments) {
      return `File ${args.property} is not a valid image`;
    }
  }
  
  export function IsImage(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsImageConstraint,
      });
    };
  }
  