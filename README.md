# API Biblioteca Digital

REST API para gestión de biblioteca digital con Node.js, Express y MongoDB.

## Características

- CRUD completo para autores, categorías, libros y préstamos
- Filtros y búsqueda por título
- Historial de préstamos por usuario
- Auto-poblado de base de datos
- Documentación Swagger
- Dockerización completa

## Instalación

### Con Docker (Recomendado)

```
git clone https://github.com/faritreascodev/biblioteca-digital-api.git
cd biblioteca-digital-api

# Configurar variables de entorno
cp .env.example .env

docker-compose up -d
```

### Local

```
npm install
npm run seed
npm run dev
```

## Endpoints

### Autores
```
GET    /api/autores
GET    /api/autores/:id
POST   /api/autores
PUT    /api/autores/:id
DELETE /api/autores/:id
```

### Categorías
```
GET    /api/categorias
GET    /api/categorias/:id
POST   /api/categorias
PUT    /api/categorias/:id
DELETE /api/categorias/:id
```

### Libros
```
GET    /api/libros
GET    /api/libros/buscar?q=término
GET    /api/libros/:id
POST   /api/libros
PUT    /api/libros/:id
DELETE /api/libros/:id
```

### Préstamos
```
GET    /api/prestamos
GET    /api/prestamos/usuario/:usuario
GET    /api/prestamos/:id
POST   /api/prestamos
PATCH  /api/prestamos/:id/devolver
DELETE /api/prestamos/:id
```

## Filtros

### Libros
# Por disponibilidad
```
GET /api/libros?disponible=true
```

# Por autor
```
GET /api/libros?autor=AUTOR_ID
```

# Por categoría
```
GET /api/libros?categoria=CATEGORIA_ID
```

### Préstamos
# Por usuario
```
GET /api/prestamos?usuario=nombre
```

# Por estado
```
GET /api/prestamos?devuelto=false
```

## Ejemplos de Uso

### Obtener libros disponibles
\`\`\`bash
curl "http://localhost:3000/api/libros?disponible=true"
\`\`\`

### Buscar libros
\`\`\`bash
curl "http://localhost:3000/api/libros/buscar?q=García"
\`\`\`

### Crear préstamo
\`\`\`bash
curl -X POST http://localhost:3000/api/prestamos \
  -H "Content-Type: application/json" \
  -d '{"libro":"LIBRO_ID","usuario":"Juan Pérez"}'
\`\`\`

### Devolver libro
\`\`\`bash
curl -X PATCH http://localhost:3000/api/prestamos/PRESTAMO_ID/devolver
\`\`\`

## Documentación

Swagger UI disponible en: `http://localhost:3000/api-docs`

## Estructura del Proyecto

```
src/
├── config/
│   └── swagger.js
├── controllers/
│   ├── autoresController.js
│   ├── categoriasController.js
│   ├── librosController.js
│   └── prestamosController.js
├── models/
│   ├── autor.model.js
│   ├── categoria.model.js
│   ├── libro.model.js
│   └── prestamo.model.js
├── routes/
│   ├── autoresRoutes.js
│   ├── categoriasRoutes.js
│   ├── librosRoutes.js
│   └── prestamosRoutes.js
├── seed/
│   └── seed.js
├── app.js
└── index.js
```

## Variables de Entorno

\`\`\`
MONGODB_URI=mongodb://localhost:27017/biblioteca_digital
PORT=3000
NODE_ENV=development
\`\`\`

# Comandos Docker
## Iniciar servicios
docker-compose up -d

## Ver logs
docker-compose logs -f api

## Parar servicios
docker-compose down

## Reconstruir
docker-compose up -d --build

## Datos de Ejemplo

La API se puebla automáticamente con:
- 5 autores latinoamericanos
- 5 categorías literarias
- 6 libros clásicos
- 5 préstamos de ejemplo

## SAY NO MORE