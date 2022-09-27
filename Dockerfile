FROM node:14.15.4-slim

USER node

WORKDIR /home/node/app

# Para o container não morrer
CMD ["sh", "-c", "npm install && tail -f /dev/null"] 