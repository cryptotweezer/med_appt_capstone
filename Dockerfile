# Usa la imagen oficial de Node.js como base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto donde corre la app (tu server Express)
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "start"]
