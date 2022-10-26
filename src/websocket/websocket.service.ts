import { Injectable } from "@nestjs/common";
import * as WebSocket from "ws";

@Injectable()
export class WSService {
  private ws = new WebSocket(process.env.OPTA_WEBSOCKET_URL);

  constructor() {
    this.ws.on("open", () => {
      this.ws.send(Math.random());
    });
  }

  send(data: any) {
    this.ws.send(data);
  }

  onMessage(handler: Function) {

  }
}