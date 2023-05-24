FROM node:18-alpine3.17

ENV NODE_ENV development

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000
EXPOSE 24678
CMD ["node", "build"]