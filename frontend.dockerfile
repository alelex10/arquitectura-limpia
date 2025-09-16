# imagen base de node
FROM node:22-alpine
# directorio de trabajo, se crea en el contenedor
WORKDIR /app
# copiamos todo el contenido
COPY ./apps/frontend ./

RUN npm install -g pnpm

RUN pnpm i
RUN pnpm run build


EXPOSE 4173
# iniciamos el servidor
# esto ejecuata el comando 'pnpm run start'
# este script tambien hace el build de domain
CMD [ "pnpm", "run", "preview" ]

# para construir la imagen
# docker build -f frontend.dockerfile -t frontend .

# para correr la imagen
# -d para correr en segundo plano
# docker run -d -p 4173:4173 frontend
