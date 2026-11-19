# LAAF

API para estandarizar los formatos de documentos educativos, como matrices y planes de aula.

Un líder de grupo, coordinador o encargado guarda un formato una sola vez y lo comparte con las personas de la institución que deben llenarlo. Todos trabajan sobre el mismo formato y solo completan la información que este pide, sin manejar un Excel.

## Modelo de datos

Las tablas son `users`, `institution`, `area`, `template_metadata` y `document_metadata`.

- Cada usuario pertenece a una institución y a un área, y tiene un rol.
- Cada área tiene un líder.
- Un usuario crea plantillas (`template_metadata`).
- Cada copia llenada de una plantilla se guarda en `document_metadata` con su dueño.

## Requisitos

- Node.js 20 o superior
- npm
- PostgreSQL 15.

## Ejecución

1. Instala las dependencias.

   ```bash
   npm install
   ```

2. Copia `.env.example` a `.env` y ajusta `DATABASE_URL` con los datos de tu base de datos.

   ```bash
   cp .env.example .env
   ```

3. Levanta PostgreSQL con Docker. Escucha en el puerto 5434.

   ```bash
   docker compose up -d postgres
   ```

   Con este contenedor, usa esta URL en `.env`:

   ```
   DATABASE_URL="postgresql://tasks_user:tasks_password@localhost:5434/r"
   ```

4. Ejecuta las migraciones.

   ```bash
   npm run migration:run
   ```

5. Inicia la API. Escucha en `http://localhost:3000`, o en el puerto de la variable `PORT`.

   ```bash
   npm run start:dev
   ```

## Endpoints

Base: `http://localhost:3000`

| Recurso | Método y ruta | Descripción |
| --- | --- | --- |
| Auth | `POST /auth/register` | Registra un usuario |
| Auth | `POST /auth/login` | Inicia sesión |
| Usuarios | `GET /users` | Lista los usuarios |
| Usuarios | `GET /users/:id` | Obtiene un usuario |
| Usuarios | `PATCH /users/:id` | Actualiza un usuario |
| Instituciones | `GET /institutions` | Lista las instituciones |
| Instituciones | `GET /institutions/:id` | Obtiene una institución |
| Instituciones | `POST /institutions` | Crea una institución |
| Instituciones | `PATCH /institutions/:id` | Actualiza una institución |
| Áreas | `GET /area` | Lista las áreas |
| Áreas | `POST /area` | Crea un área |
| Áreas | `PATCH /area/:id` | Actualiza un área |
| Plantillas | `GET /metadata-templates` | Lista las plantillas |
| Plantillas | `GET /metadata-templates/:id` | Obtiene una plantilla |
| Plantillas | `POST /metadata-templates` | Crea una plantilla |
| Plantillas | `PATCH /metadata-templates/:id` | Actualiza una plantilla |
| Plantillas | `DELETE /metadata-templates/:id` | Elimina una plantilla |
| Documentos | `GET /documents?owner_id=<uuid>` | Lista los documentos de un dueño |
| Documentos | `GET /document/:id` | Obtiene un documento |
| Documentos | `POST /document/clone` | Crea un documento a partir de una plantilla |
| Documentos | `POST /document/publish` | Publica un documento |
| Documentos | `PUT /document/:id` | Guarda los cambios de un documento |

Hay ejemplos de peticiones en la carpeta `postman/`.

## Pruebas

```bash
npm run test
```
