import { HttpException, HttpStatus } from "@nestjs/common";

export class ChannelException extends HttpException {
    constructor () {
        super('Channel Exp', HttpStatus.FORBIDDEN)
    }
}