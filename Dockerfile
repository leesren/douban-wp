FROM nginx:1.15.10-alpine
# Create app directory
# WORKDIR /usr/workplace/fontend

# If you need to install global npm dependencies, 
# it is recommended to place those dependencies in the non-root user directory
# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# optionally if you want to run npm global bin without specifying path
# ENV PATH=$PATH:/home/node/.npm-global/bin
# Install app dependencies
# COPY package*.json ./

# RUN npm install webpack webpack-dev-server webpack-cli svgo -g && npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./douban /usr/share/nginx/html

EXPOSE 8377

# ENTRYPOINT ["sh", "/docker-entrypoint.sh"]

# CMD ["echo","http://localhost:3003"] 

# Build image
# docker build -t zenberge/page:latest .
# docker build -t zenberge/page:latest .

# Run docker
# docker run -e NODE_ENV=staging --name pm2_test -p 3500:3500  -d  pm2_test:v1
