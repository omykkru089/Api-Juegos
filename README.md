# 🎮 API de Juegos

API RESTful desarrollada con [NestJS](https://nestjs.com/) y TypeScript para la gestión de información relacionada con videojuegos. Este proyecto sirve como base para aplicaciones que requieran operaciones CRUD sobre datos de juegos.

## 🚀 Tecnologías Utilizadas

- **NestJS**: Framework progresivo de Node.js para construir aplicaciones eficientes y escalables del lado del servidor.
- **TypeScript**: Lenguaje de programación tipado que se transpila a JavaScript.
- **Docker**: Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.
- **Docker Compose**: Herramienta para definir y administrar aplicaciones multi-contenedor de Docker.
- **ESLint & Prettier**: Herramientas para mantener un código limpio y consistente.

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/omykkru089/Api-Juegos.git
   cd Api-Juegos
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno según tus necesidades.

## 🛠️ Uso

### Desarrollo

```bash
npm run start
```

### Modo Watch (Desarrollo en caliente)

```bash
npm run start:dev
```

### Producción

```bash
npm run start:prod
```

## 🐳 Uso con Docker

Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

1. Construye y levanta los contenedores:

   ```bash
   docker-compose up --build
   ```

2. La API estará disponible en `http://localhost:3000`.

## 🧪 Pruebas

Ejecuta las pruebas unitarias:

```bash
npm run test
```

Ejecuta las pruebas de integración:

```bash
npm run test:e2e
```

Verifica la cobertura de pruebas:

```bash
npm run test:cov
```

## 📁 Estructura del Proyecto

```
Api-Juegos/
├── src/                # Código fuente de la aplicación
├── test/               # Pruebas unitarias y de integración
├── .eslintrc.js        # Configuración de ESLint
├── .prettierrc         # Configuración de Prettier
├── docker-compose.yml  # Configuración de Docker Compose
├── package.json        # Dependencias y scripts del proyecto
├── tsconfig.json       # Configuración de TypeScript
└── README.md           # Documentación del proyecto
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
