import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'uniqueArray', async: false })
export class UniqueArrayConstraint implements ValidatorConstraintInterface {
  validate(array: any[], args: ValidationArguments) {
    return array.length === new Set(array).size;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Each element in the array must be unique';
  }
}
