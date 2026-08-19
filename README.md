# Óptica Andina — Landing + Panel Admin

Proyecto MERN para Óptica Andina (San Salvador de Jujuy): landing de ventas + panel de administración autogestionable.

## Estructura

```
opticaAndina/
├── frontend/   # React + Vite + Tailwind
└── backend/    # Node + Express (CommonJS)
```

## Requisitos previos

- Node.js 18+
- Cuenta de MongoDB Atlas (o Mongo local)
- Cuenta de Cloudinary
- Cuenta de email SMTP para notificaciones (ej. Gmail con contraseña de aplicación)

## Backend

```bash
cd backend
npm install
cp .env.example .env   # completar variables
npm run dev
```

Variables de entorno (`backend/.env`):

| Variable | Descripción |
|---|---|
| `MONGO_URI` | Connection string de MongoDB |
| `JWT_SECRET` | Secreto para firmar tokens JWT |
| `JWT_EXPIRES_IN` | Expiración del token (ej. `7d`) |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Credenciales de Cloudinary |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Credenciales del servidor SMTP |
| `NOTIFICATION_EMAIL` | Email de la óptica que recibe las notificaciones de presupuesto |
| `FRONTEND_URL` | URL del frontend (para CORS) |

Crear el usuario administrador inicial:

```bash
node src/scripts/seedAdmin.js admin@opticaandina.com "contraseñaSegura123"
```

## Frontend

```bash
cd frontend
npm install
cp .env.example .env   # completar variables
npm run dev
```

Variables de entorno (`frontend/.env`):

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base de la API backend (ej. `http://localhost:4000/api`) |
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp de la óptica, formato internacional sin `+` (ej. `5493880000000`) |
| `VITE_INSTAGRAM_URL` | Link al Instagram @opticaandinajujuy |

## Deploy

Ambos repos se despliegan por separado en Vercel:

- **Backend**: usa `backend/vercel.json` (entry point serverless en `api/index.js`). Configurar las variables de entorno del backend en el dashboard de Vercel.
- **Frontend**: proyecto Vite estándar. Configurar `VITE_API_URL` apuntando a la URL del backend desplegado.

## Estado del proyecto

Estructura base y esqueleto de módulos creados (routing, modelos, stores, servicios, validaciones). Falta implementar el detalle visual y la lógica completa de cada componente — se avanza módulo por módulo.
# opticaAndina
