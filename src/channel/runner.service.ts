import { Inject, Injectable, Logger } from '@nestjs/common';
import { StateMachine, interpret } from 'xstate';
import { Subject } from 'rxjs';
import fetch from 'node-fetch';

import { MessageModel, OutgoingModel } from './models';
import { TrackerService } from './tracker.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChannelRunnerService {
  private logger = new Logger(ChannelRunnerService.name);

  private channelMaps = new Map<string, []>();

  constructor(
    private readonly configService: ConfigService,
    private readonly tracker: TrackerService,
  ) {
    this.channelMaps.set('main', null);
  }

  process(
    namespace: string,
    channel: string,
    content: string,
  ): Subject<OutgoingModel> {
    const dispatcher = new Subject<OutgoingModel>();
    const channelCur = this.channelMaps.has(channel) ? this.channelMaps.get(channel) : [];

    this.tracker.fetch.bind(this.tracker, dispatcher);

    this.tracker
      .fetch(namespace, content, channelCur)
      .then((result) => {

        this.channelMaps.set(channel, result.content);
        dispatcher.next(result);

        this.logger.debug("ChannelRunnerService result : {}, {}", channel, JSON.stringify(result));
        dispatcher.complete();
      })
      
      .catch((err) => {
        this.logger.error(err.message, err.stack);
        dispatcher.complete();
      });

      
    return dispatcher;
  }

  /*
  run(namespace: string, content: string, channel: any): void {
    const callbackUrl = `${this.configService.get<string>(
      'channel.callbackUrl',
    )}-${namespace}`;
    this.process(namespace, content, channel).subscribe((message) => {
      fetch(callbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...message }),
      });
    });
  }
  */
}
