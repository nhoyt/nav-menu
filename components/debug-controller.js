/*
*   DebugController
*/

import DebugLogger from './debug-logger';

export default class DebugController extends DebugLogger {
  host;

  constructor (host, ...args) {
    super(...args);
    this.host = host;
    host.addController(this);
  }

  hostConnected () {
    if (this.flag) { this.tag(this.host); }
  }
}
