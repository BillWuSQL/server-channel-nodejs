import { Module } from '@nestjs/common';

import { ConfigModule, RedisModule } from 'src/modules';
import { ChannelController } from './channel.controller';
import { ParserService } from './parser.service';
import { ChannelRunnerService } from './runner.service';
import { TrackerService } from './tracker.service';

@Module({
  imports: [ConfigModule, RedisModule],
  controllers: [ChannelController],
  providers: [
    
    ParserService,
    TrackerService,
    ChannelRunnerService,
  ],
  exports: [ChannelRunnerService],
})
export class ChannelModule {}

