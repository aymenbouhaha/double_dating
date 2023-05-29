import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up.dto';

export class UpdateProfilDto extends PartialType(SignUpDto) {}
