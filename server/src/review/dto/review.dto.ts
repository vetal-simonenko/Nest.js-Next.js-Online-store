import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsString({ message: 'Review text must be a string' })
  @IsNotEmpty({ message: 'Review text is required' })
  text: string;

  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(1, { message: 'Minimum rating is 1' })
  @Max(5, { message: 'Maximum rating is 5' })
  @IsNotEmpty({ message: 'Rating is required' })
  rating: number;
}
