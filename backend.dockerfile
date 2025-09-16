# imagen base de node
FROM node:22-alpine
# directorio de trabajo, se crea en el contenedor
WORKDIR /app
# copiamos todo el contenido
COPY ./ ./

RUN npm install -g pnpm

RUN pnpm --filter ./domain i
# el buld lo hace el package.json de la raiz del monorepo

RUN pnpm --filter ./apps/backend i
RUN pnpm --filter ./apps/backend run prisma:generate
RUN pnpm --filter ./apps/backend run build


EXPOSE 3000
# iniciamos el servidor
# esto ejecuata el comando 'pnpm run start'
# este script tambien hace el build de domain
CMD [ "pnpm", "run", "start:backend" ]

# para construir la imagen
# docker build -f backend.dockerfile -t backend .

# para correr la imagen
# -d para correr en segundo plano
# docker run -d -p 3000:3000 backend
