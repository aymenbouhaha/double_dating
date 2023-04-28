import {Body, Controller, Param, ParseIntPipe, Post} from '@nestjs/common';
import { InterestService } from './interest.service';

@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}
  @Post('chooseInterest/:coupleid')
  async chooseInterests(
      @Param('coupleid', ParseIntPipe) id: number,
      @Body('interestsids') interestsids: number[]
                        )
    {
      return await this.interestService.chooseInterests(id, interestsids) ;
    }

  }

