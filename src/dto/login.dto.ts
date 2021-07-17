import { IsNotEmpty, IsString } from 'class-validator';
import { Message } from '../constants';

export class LoginDTO {
  @IsNotEmpty({ message: Message.ERROR.ECL002('Email') })
  @IsString()
  user: string;

  @IsNotEmpty({ message: Message.ERROR.ECL002('Password') })
  @IsString()
  password: string;

  constructor(loginDTO: LoginDTO) {
    this.user = loginDTO.user;
    this.password = loginDTO.password;
  }
}
