# YJS horizontal scaling playground.

Use this repo in front of [this repo](https://github.com/kapv89/yjs-scalable-ws-backend) to perform various operations on running yjs on top of horizontally scaled websocket-server-cluster with y-websocket

# How to use
1. clone (https://github.com/kapv89/yjs-scalable-ws-backend)
2. `cd yjs-scalable-ws-backend`
3. `git checkout main`
4. `npm ci`
5. `docker-compose up` in terminal 1
6. `npm run tables` in terminal 2
7. `SERVER_PORT=3001 npm run dev` in terminal 2
8. `SERVER_PORT=3002 npm run dev` in terminal 3
9. Open terminal 4 and `cd ..`
10. clone (https://github.com/kapv89/yjs-scalable-ws-backend-test)
11. `cd yjs-scalable-ws-backend-test`
12. `npm ci`
13. `npm run test`