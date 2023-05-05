import {WebSocket} from 'ws';
import * as Y from 'yjs';
import {WebsocketProvider} from 'y-websocket';
import {v4 as uuid} from 'uuid';

export class NoBCWebsocketProvider extends WebsocketProvider {
  connectBc() {
    // making this a no-op to avoid broadcast-channel based communication
    // b/w docs in tests
    return;
  }
}

const wsUrl = (port: number) => `ws://localhost:${port}`;

const wait = async (seconds: number) => await new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const run = async () => {
  const id = uuid();

  const doc1 = new Y.Doc();
  const doc2 = new Y.Doc();

  const wsp1 = new NoBCWebsocketProvider(wsUrl(3001), id, doc1, {WebSocketPolyfill: WebSocket as any});
  const wsp2 = new NoBCWebsocketProvider(wsUrl(3002), id, doc2, {WebSocketPolyfill: WebSocket as any});

  await wait(1);

  console.log('states 1 - uninitialized');
  console.log(wsp1.awareness.getStates());

  console.log('states 2 - uninitialized');
  console.log(wsp2.awareness.getStates());

  wsp1.awareness.setLocalStateField('foo', 1);
  wsp2.awareness.setLocalStateField('foo', 2);

  await wait(0.3);

  console.log('states 1 - initialized');
  console.log(wsp1.awareness.getStates());

  console.log('states 2 - initialized');
  console.log(wsp2.awareness.getStates());

  wsp1.awareness.setLocalStateField('foo', 4);
  wsp2.awareness.setLocalStateField('foo', 3);

  await wait(0.3);
  
  console.log('states 1 - changed');
  console.log(wsp1.awareness.getStates());

  console.log('states 2 - changed');
  console.log(wsp2.awareness.getStates());
  
  await wait(0.3);

  wsp1.awareness.destroy();
  wsp1.destroy();
  doc1.destroy();
  
  await wait(0.3);

  console.log('states 2 - post states 1 destroyed');
  console.log(wsp2.awareness.getStates());

  await wait(0.3);

  wsp2.awareness.destroy();
  wsp2.destroy();
  doc2.destroy();
}

run();