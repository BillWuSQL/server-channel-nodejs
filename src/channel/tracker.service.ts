import { Injectable, Logger } from '@nestjs/common';
import { MessageModel, OutgoingModel } from './models';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { State } from 'xstate';

const PREFIX = 'botState';

@Injectable()
export class TrackerService {
  private logger = new Logger(TrackerService.name);
  private client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getClient();
    
  }

  public async persist(
    namespace: string,
    sender: string,
    value: State<any, any, any, any, any>,
  ): Promise<void> {
    await this.client.xadd(
      `${PREFIX}:${namespace}:${sender}`,
      'MAXLEN',
      '~',
      100,
      '*',
      'state',
      JSON.stringify(value),
    );
  }

  public async fetch(
    namespace: string,
    content: string,
    channelCur?: any,
  ): Promise<OutgoingModel> | undefined {
    /*
    const item = await this.client.xrevrange(
      `${PREFIX}:${namespace}:${sender}`,
      '+',
      '-',
      'COUNT',
      1,
    );
    if (item.length === 0) {
      return defaultState;
    }
    */
    
    try {
      
      this.logger.debug("TrackerService content : {}", content);
      channelCur.push(content);

      const result = new OutgoingModel();
      result.status = '100';
      // result.content = channelCur.reverse();
      result.content = channelCur;

      this.logger.debug("TrackerService result : {}", JSON.stringify(result));
      return result;
    } catch (err) {
      this.logger.error(`error getting state: ${err.message}`, err);
      return null;
    }
  }
}


