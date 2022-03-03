FROM node:16

WORKDIR /usr

COPY server/package.json ./
COPY server/tsconfig.json ./

COPY server/ ./
RUN npm install
RUN npm run lint

EXPOSE 3001

CMD ["npm", "run", "deployment:test_server"]