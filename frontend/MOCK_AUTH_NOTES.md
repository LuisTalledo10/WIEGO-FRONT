# 🛑 Notas de Simulación (Mock) - Autenticación Frontend

> **IMPORTANTE:** Eliminar este archivo una vez que el Frontend se conecte al Backend real y se consuman las APIs correspondientes.

Durante la fase de construcción de interfaces (Frontend-first), la plataforma cuenta con una autenticación simulada que permite navegar y probar los *Guards* de Angular sin necesidad de una base de datos o servidor. 

A continuación se documenta qué archivos contienen código simulado (Mocks) que deberán ser refactorizados para conectarse a HTTP:

## 1. Módulo de Login (`login.component.ts`)
**Ruta:** `src/app/features/auth/login/login.component.ts`

- **Estado Actual:** Al escribir cualquier email/contraseña y enviar el formulario, hay un `setTimeout` de 1 segundo. Luego, se inserta una cadena fija (`'mock-jwt-token-for-wiego'`) dentro de `localStorage.setItem('token', ...)` y navega al `/dashboard`.
- **Refactorización Futura:** 
  1. Inyectar `HttpClient` (o un `AuthService`).
  2. Sustituir el `setTimeout` por una petición POST a `/api/login` (ej: enviar `{ email, password }`).
  3. Almacenar el JWT *real* devuelto por el servidor en lugar del mock.

## 2. Guardián de Rutas (`auth.guard.ts`)
**Ruta:** `src/app/core/guards/auth.guard.ts`

- **Estado Actual:** Lee `localStorage.getItem('token')`. Si el string existe, asume que el usuario tiene sesión iniciada. Si no existe, lo patea al `/login`.
- **Refactorización Futura:**
  1. Idealmente se debería validar si el JWT está expirado (usando un paquete como `jwt-decode`).
  2. (Opcional) Hacer una llamada al servidor `GET /api/auth/me` para corroborar que el token no ha sido revocado.

## 3. Cierre de Sesión (`topbar.component.ts`)
**Ruta:** `src/app/layouts/dashboard-layout/topbar/topbar.component.ts`

- **Estado Actual:** La función `logout()` hace un `localStorage.removeItem('token')` y rutea al `/login`. El nombre de usuario "Luis Arturo" y la empresa "TechCorp S.A." están *hardcodeados* (escritos a fuego) como variables en el archivo TypeScript.
- **Refactorización Futura:**
  1. Si el backend maneja invalidez de sesión, añadir una petición POST a `/api/logout`.
  2. Las variables `userName` y `companyName` deberán alimentarse del estado del usuario (ya sea leyendo los *claims* del JWT real o de un State Management central tras el login exitoso).

---
*Documentado durante el Sprint 7 para facilitar la transición a la Fase de Integración con el Backend .NET.*
