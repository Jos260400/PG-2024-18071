FROM node:21

# Moverse al folder app
WORKDIR /app

# Copiar folder dist a donde estoy en la compu virtual
COPY dist/ .

# Copiar archivo packagejson a donde estoy en la compu virtual
COPY package.json .

# Instala todas las dependencias
RUN npm install --production

# Instalar un servidor para correr el programa
RUN npm install -g serve

# Aceptar conexiones por el puerto 3000
EXPOSE 3000

# The `-s` flag in the `serve` command stands for "single-page application" (SPA) mode
# Correr el servidor
CMD [ "serve", "-s", "." ]


# Fase 1: instalacion de este archivo
# docker build . -t"nombre"
# docker run --rm -d -p 3000:3000 --name app-1 aplicacion-fe                                                                   
