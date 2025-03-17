# Étape 1 : Construire l'application React
FROM node:18 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Copier les fichiers de build dans le dossier de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copier la configuration personnalisée de Nginx (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
