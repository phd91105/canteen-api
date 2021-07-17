import {
  IsNotEmpty,
  IsNumber,
  MaxLength,
  ValidationArguments,
} from 'class-validator';
import { Message } from '../constants';

export class ImportSectionDTO {
  @IsNotEmpty({ message: Message.ERROR.ECL002('Section Name') })
  @MaxLength(50, {
    message: (args: ValidationArguments): string =>
      Message.ERROR.ECL011('Section Name', '$constraint1', args.value.length),
  })
  name: string;

  remarks?: string;

  @IsNotEmpty({ message: Message.ERROR.ECL002('Leader ID') })
  @IsNumber({}, { message: Message.ERROR.ECL006('Leader ID') })
  leaderId: number;

  @IsNotEmpty({ message: Message.ERROR.ECL002('Floor Number') })
  @IsNumber({}, { message: Message.ERROR.ECL006('Floor Number') })
  floorNum: number;

  constructor(importSectionDTO: ImportSectionDTO) {
    this.name = importSectionDTO.name;
    this.remarks = importSectionDTO.remarks;
    this.leaderId = importSectionDTO.leaderId;
    this.floorNum = importSectionDTO.floorNum;
  }
}
