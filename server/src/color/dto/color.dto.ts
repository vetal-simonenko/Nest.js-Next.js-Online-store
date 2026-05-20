import { IsString } from 'class-validator';

export class ColorDto {
  @IsString({
    message: 'Color is required',
  })
  name: string;

  @IsString({
    message: 'Value is required',
  })
  value: string;
}
