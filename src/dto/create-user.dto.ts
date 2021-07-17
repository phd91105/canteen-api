import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
  Matches,
  ValidationArguments,
} from 'class-validator';
import { Message, UserRole } from '../constants';

export class CreateUserDTO {
  @IsNotEmpty({ message: Message.ERROR.ECL002('Email') })
  @IsString()
  @Matches(/^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/, {
    message: Message.ERROR.ECL007,
  })
  @MaxLength(255, {
    message: (args: ValidationArguments): string =>
      Message.ERROR.ECL011('Email', '$constraint1', args.value.length),
  })
  email: string;

  @IsNotEmpty({ message: Message.ERROR.ECL002('User Name') })
  @IsString()
  @MaxLength(50, {
    message: (args: ValidationArguments): string =>
      Message.ERROR.ECL011('User Name', '$constraint1', args.value.length),
  })
  name: string;

  @IsNotEmpty({ message: Message.ERROR.ECL002('User Flag') })
  @IsNumber({}, { message: Message.ERROR.ECL002('User Flag') })
  userFlag: UserRole;

  @IsNotEmpty({ message: Message.ERROR.ECL002('Section') })
  @IsNumber()
  sectionId: number;

  @IsNotEmpty({ message: Message.ERROR.ECL002('Joining Date') })
  joiningDate: Date;

  @IsNotEmpty({ message: Message.ERROR.ECL002('Password') })
  @IsString()
  @MinLength(8, { message: Message.ERROR.ECL015 })
  @MaxLength(20, { message: Message.ERROR.ECL015 })
  @Matches(/^([a-z\d]+-)*[a-z\d]+$/, {
    message: Message.ERROR.ECL005('Password'),
  })
  password: string;

  constructor(createUserDTO: CreateUserDTO) {
    this.email = createUserDTO.email;
    this.name = createUserDTO.name;
    this.userFlag = createUserDTO.userFlag;
    this.sectionId = createUserDTO.sectionId;
    this.joiningDate = createUserDTO.joiningDate;
    this.password = createUserDTO.password;
  }
}
