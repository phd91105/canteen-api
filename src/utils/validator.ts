import { ValidationError } from 'class-validator';

export function transformError(error: ValidationError[]): string[] {
  const validErrorObj: { [key: string]: string }[] = [];
  const validErrorArray: string[] = [];
  error.forEach((error: ValidationError) =>
    validErrorObj.push(error.constraints!),
  );
  validErrorObj.forEach((error) =>
    validErrorArray.push(...Object.values(error)),
  );
  return validErrorArray;
}
