FROM node:16

WORKDIR /usr

COPY server/package.json ./
COPY server/tsconfig.json ./

COPY server/ ./
RUN npm install


# GitHub Actions cannot tolerate eslint outcome with no "pages"-folder found
# (which is a result of next-extension needed in frontend). Therefore linting
# is done manually while coding.

# RUN npm run lint


EXPOSE 3001

CMD ["npm", "run", "deployment:test_server"]