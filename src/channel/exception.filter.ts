import { ArgumentsHost, ExceptionFilter, Module, Catch, HttpException } from '@nestjs/common';
import { OutgoingMessage } from 'http';

import { ChannelException } from './exceptions';
import { OutgoingModel } from './models';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // throw new Error('Method not implemented.');
    const res = OutgoingModel;
    const ctx = host.switchToHttp;
    const result = new OutgoingModel();
    result.status = '-100';
    result.content = null;

    if (exception instanceof ChannelException) {
      
    } else {
      
    }
  }
  
}


