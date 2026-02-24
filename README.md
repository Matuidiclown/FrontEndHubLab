# LAP EXTRA - Angular 20

Plataforma interna de gestión para Lima Airport Partners.

## 🚀 Tecnologías

- **Angular 20** (Standalone components, Signals, `@if`/`@for` control flow)
- **Angular Material** (UI components + theming)
- **Font Awesome** (`@fortawesome/angular-fontawesome`)
- **SweetAlert2** (alertas y confirmaciones)
- **RxJS** (manejo reactivo de HTTP)

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── app.component.ts          # Root component
│   ├── app.config.ts             # Providers (router, animations, http)
│   ├── app.routes.ts             # Lazy-loaded routes
│   │
│   ├── auth/
│   │   ├── guards/
│   │   │   └── auth.guard.ts     # Protege rutas autenticadas
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts # Agrega Bearer token + manejo 401
│   │   └── login/
│   │       ├── login.component.ts
│   │       ├── login.component.html
│   │       └── login.component.scss
│   │
│   ├── core/
│   │   ├── models/
│   │   │   └── user.model.ts     # User, LoginRequest, LoginResponse, ApiResponse
│   │   └── services/
│   │       ├── api.service.ts    # Capa base HTTP (get/post/put/patch/delete)
│   │       ├── auth.service.ts   # Login, logout, token, currentUser (Signal)
│   │       ├── user.service.ts   # Perfil, update, avatar
│   │       └── alert.service.ts  # Wrapper de SweetAlert2
│   │
│   ├── shared/
│   │   └── layout/
│   │       ├── layout.component.ts
│   │       ├── layout.component.html
│   │       └── layout.component.scss
│   │
│   └── pages/
│       └── profile/
│           ├── profile.component.ts
│           ├── profile.component.html
│           └── profile.component.scss
│
├── environments/
│   ├── environment.ts            # Dev: http://localhost:3000/api
│   └── environment.prod.ts      # Prod: URL de producción
│
├── styles.scss                   # Tema Material global + SweetAlert2
└── index.html
```

---

## ⚙️ Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
ng serve

# 3. Abrir en navegador
http://localhost:4200
```

---

## 🔗 Configuración del Backend

Editar `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // ← Tu URL de backend
};
```

### Endpoints esperados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login → devuelve `{ token, user }` |
| `GET` | `/api/users/profile` | Perfil del usuario autenticado |
| `PUT` | `/api/users/:id` | Actualizar perfil |
| `POST` | `/api/users/:id/avatar` | Subir foto de perfil |

### Formato de respuesta esperado

```json
// POST /api/auth/login
{
  "token": "eyJhbGci...",
  "user": {
    "id": 1,
    "nombre": "Ricardo Samuel",
    "apellido": "Samamé Che",
    "email": "rsamame@lima-airport.com",
    "rol": "Usuario",
    "biografia": "Analista Programador TI"
  }
}

// PUT /api/users/:id
{
  "success": true,
  "message": "Perfil actualizado",
  "data": { /* usuario actualizado */ }
}
```

---

## 🔐 Flujo de Autenticación

1. Usuario ingresa credenciales en `/login`
2. `AuthService.login()` llama `POST /api/auth/login`
3. Token JWT se guarda en `localStorage`
4. `authInterceptor` añade `Authorization: Bearer <token>` a todas las requests
5. Si el backend devuelve 401 → logout automático y redirect a `/login`
6. `authGuard` protege todas las rutas bajo `/app/**`

---

## 🎨 Paleta de Colores

| Variable | Color |
|----------|-------|
| `$purple-dark` | `#1a0533` |
| `$purple-mid` | `#3b1a6b` |
| `$purple-light` | `#5b2d8e` |
| `$accent` | `#6c3fc5` |

---

## 📦 Dependencias Principales

```bash
npm install @angular/material @angular/cdk
npm install @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons
npm install sweetalert2
```
# FrontEndHubLab
