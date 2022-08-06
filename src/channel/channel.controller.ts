import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { reduce } from 'rxjs/operators';

import { MessageModel, OutgoingModel } from './models';
import { ChannelRunnerService } from './runner.service';
import { ParserService } from './parser.service';


@Controller('channel')
export class ChannelController {
  private logger = new Logger(ChannelController.name);

  constructor(
    private readonly runner: ChannelRunnerService,
    private readonly parser: ParserService,
  ) {}

  @Get('/:namespace/config')
  botMachineConfig(@Param('namespace') namespace: string): any {
    return null;
  }

  @Post('/:namespace/messages')
  processMessage(
    @Param('namespace') namespace: string,
    @Body() { channel, content }: MessageModel,
  ): Observable<OutgoingModel[]> {

    this.logger.debug("ChannelController result: {}, {}", channel, content);
    const dispatcher = this.runner.process(
      namespace,
      channel,
      this.parser.parseMessage(content),
    );
    this.logger.debug("ChannelController dispatcher: {}, {}", JSON.stringify(dispatcher));
    
    return dispatcher.pipe(
      reduce(
        ([status, content] ) => [
          
          { ...content },
        ],
        [] as OutgoingModel[],
      ),
    );
    
  }
}
