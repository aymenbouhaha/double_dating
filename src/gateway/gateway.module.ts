import { Module } from '@nestjs/common';
import {GatewaySessionManager} from "./gateway.session";
import {Gateway} from "./gateway";

@Module({
    providers: [GatewaySessionManager , Gateway]
})
export class GatewayModule {}
