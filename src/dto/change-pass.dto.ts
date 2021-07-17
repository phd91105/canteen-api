import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  NotEquals,
  ValidateIf,
} from 'class-validator';
import { Message } from '../constants';

export class UpdatePasswordDTO {
  @IsString()
  @MinLength(8, { message: Message.ERROR.ECL015 })
  @MaxLength(20, { message: Message.ERROR.ECL015 })
  @Matches(/^([a-z\d]+-)*[a-z\d]+$/, {
    message: Message.ERROR.ECL005('Password'),
  })
  @NotEquals(null)
  @ValidateIf((_, value) => value !== '')
  password?: string;

  constructor(updatePasswordDTO: UpdatePasswordDTO) {
    this.password = updatePasswordDTO.password;
  }
}
