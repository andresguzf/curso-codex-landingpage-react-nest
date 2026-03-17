# 🚀 Plataforma Fullstack Cursos (React + NestJS + Supabase)

Proyecto fullstack con frontend en React y backend en NestJS, usando Prisma y Supabase como base de datos en la nube. Incluye autenticación JWT, panel admin y subida de imágenes con Cloudinary.

---

## 📦 Estructura del Proyecto

apps/
 ├─ web/   → Frontend React (Vite + Zustand)
 └─ api/   → Backend NestJS (Prisma + Supabase)

### Frontend
- React + Vite + TypeScript
- Zustand para estado global
- React Router (`/`, `/login`, `/admin`)
- Panel admin con CRUD de cursos
- Upload de imágenes + fallback SVG

### Backend
- NestJS modular
- Prisma ORM + Supabase (PostgreSQL)
- Autenticación JWT
- Validación con Zod
- Upload de imágenes con Cloudinary

---

## ⚙️ Instalación

npm install

---

## ▶️ Desarrollo

npm run dev        # frontend + backend
npm run dev:web    # solo frontend
npm run dev:api    # solo backend

---

## 🌐 URLs

- Frontend: http://localhost:5173  
- Backend: http://localhost:3000  

---

## 🧱 Base de Datos (Prisma + Supabase)

Configura tu `.env`:

DATABASE_URL=postgresql://postgres:TU_PASSWORD@db.xxx.supabase.co:5432/postgres

Comandos:

npm run prisma:generate
npm run prisma:migrate:deploy
npm run prisma:seed

---

## 🔐 Autenticación

- Login con JWT (`POST /auth/login`)
- Rutas protegidas en `/admin`
- Uso de Bearer Token en endpoints privados

---

## 📡 API Principal

- GET /courses
- GET /courses/paginated
- POST /courses 🔒
- PATCH /courses/:id 🔒
- DELETE /courses/:id 🔒
- POST /uploads/course-image 🔒
- POST /auth/login

---

## 🖼️ Upload de Imágenes

- Subida vía backend a Cloudinary
- Se guarda `image_url` en la base de datos
- Fallback automático a SVG si no hay imagen

---

## 🧪 Testing

npm run build
npm run test -w @cursos/api

Validar:
- login
- CRUD cursos
- paginación
- subida de imágenes

---

## 🧠 Arquitectura

- Controllers delgados
- Lógica en services
- Prisma como capa de acceso a datos
- Zod para validación
- Estado frontend desacoplado

---

## 📝 Notas

- Proyecto preparado para producción básica
- Supabase reemplaza SQLite
- Cloudinary para gestión de imágenes

---

## 📌 Tecnologías

- React / Vite / Zustand
- NestJS / Prisma
- Supabase (PostgreSQL)
- Cloudinary
- Zod / JWT

---

## 📄 Licencia

Uso educativo / demostración
