import { IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'Name should be a string' })
  @MinLength(3, {
    message: 'Name min length need to be greater than 3 characters.',
  })
  name: string;

  @IsString({ message: 'Bio should be a string' })
  @MinLength(5, {
    message: 'Bio min length need to be greater than 5 characters.',
  })
  bio: string;
}
