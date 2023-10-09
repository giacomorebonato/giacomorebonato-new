FROM node:20

RUN npm i pnpm -g

WORKDIR /app

COPY ./ ./

ENV NODE_ENV development
RUN pnpm i --frozen-lockfile --prod=false

ENV NODE_ENV production
RUN pnpm build
RUN pnpm prune --production
RUN rm -rf src
RUN rm -rf server

EXPOSE 3000

CMD ["pnpm", "start"]
