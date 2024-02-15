# Colocamos la versión de node que tengo instalada
FROM node:latest

# WORKDIR: Establece el directorio de trabajo dentro del contenedor como /app
# todo lo que se copie en la imagen de docker se almacenará en este directorio
WORKDIR /app

# Copiamos package.json al directorio de trabajo
COPY package*.json ./

# Instalamos dependecias
RUN npm install

# Copiamos el resto del código de la app al directorio de trabajo
COPY . .

# Exponemos el puerto en el que la app se ejecutará
EXPOSE 3001

# Variables de entorno
ENV PORT=3001
ENV MONGO_URI=mongodb+srv://clientAPIGMusic:hCQja67Z6HdtNfoV@clustegmusic.s8mj2ho.mongodb.net/gmusic?retryWrites=true&w=majority
ENV JWT_SECRET_KEY=BB4@Y$CPs(F)XjUM

ENV CLOUDINARY_CLOUD_NAME=dewjlaphv
ENV CLOUDINARY_API_KEY=742735726526623
ENV CLOUDINARY_API_SECRET=AcqKejarGcCvtmDCFUQW-2VfI1I

# Instalar nodemon como dependencia de desarrollo
RUN npm install --only=development nodemon

CMD [ "node", "server.js" ]