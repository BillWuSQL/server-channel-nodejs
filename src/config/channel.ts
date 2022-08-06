import { registerAs } from '@nestjs/config';

export default registerAs('channel', () => ({
  callbackUrl: process.env.BOT_CALLBACK_URL,
}));
