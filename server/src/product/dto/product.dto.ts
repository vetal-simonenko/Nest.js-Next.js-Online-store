import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
  @IsString({
    message: 'Title is required',
  })
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  title: string;

  @IsString({
    message: 'Description is required',
  })
  @IsNotEmpty({
    message: 'Description cannot be empty',
  })
  description: string;

  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: 'Price must be a number',
    },
  )
  @IsNotEmpty({
    message: 'Price cannot be empty',
  })
  price: number;

  @IsArray({
    message: 'Images must be an array',
  })
  @IsString({
    each: true,
    message: 'Each image must be a string',
  })
  @ArrayMinSize(1, {
    message: 'At least one image is required',
  })
  @IsNotEmpty({
    each: true,
    message: 'Image path cannot be empty',
  })
  images: string[];

  @IsString({
    message: 'Category is required',
  })
  @IsNotEmpty({
    message: 'Category ID cannot be empty',
  })
  categoryId: string;

  @IsString({
    message: 'Color is required',
  })
  @IsNotEmpty({
    message: 'Color ID cannot be empty',
  })
  colorId: string;
}
