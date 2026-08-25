# PLANNING.md

## Wiego — Frontend UI/UX Planning

# 1. Objetivo

Construir el frontend completo de Wiego en Angular, preparado para integrarse con un backend en .NET.

El proyecto se dividirá en cinco grandes etapas:

```text
FASE 1 → Fundaciones del proyecto
FASE 2 → Design System
FASE 3 → Autenticación y layouts
FASE 4 → Módulos financieros
FASE 5 → Integración, calidad y optimización
```

---

# 2. Arquitectura funcional

```text
PUBLIC WEBSITE
│
├── Inicio
├── Soluciones
├── Características
├── Seguridad
├── Precios
└── Contacto


AUTHENTICATION
│
├── Iniciar sesión
├── Recuperar contraseña
├── Verificar OTP
├── MFA
└── Autorización biométrica


PRIVATE PLATFORM
│
├── Dashboard
│
├── Dispersión de pagos
│   ├── Listado
│   ├── Nueva dispersión
│   └── Detalle
│
├── Cargar nómina
│
├── Operaciones
│   ├── Todas
│   ├── Exitosas
│   ├── Pendientes
│   └── Fallidas
│
├── Saldo y movimientos
│
├── Beneficiarios
│
├── Conciliación
│
├── Reportes
│
└── Configuración
    ├── Empresa
    ├── Usuarios
    ├── Roles
    ├── Seguridad
    └── Preferencias
```

---

# 3. FASE 1 — Configuración inicial

## Objetivo

Tener un proyecto Angular limpio, escalable y preparado para crecer.

---

## Tareas

- [ ] Crear proyecto Angular.
- [ ] Configurar SCSS.
- [ ] Configurar Angular Router.
- [ ] Configurar aliases.
- [ ] Crear estructura `core`.
- [ ] Crear estructura `shared`.
- [ ] Crear estructura `features`.
- [ ] Crear estructura `layouts`.
- [ ] Configurar variables de entorno.
- [ ] Configurar API base URL.
- [ ] Configurar HttpClient.
- [ ] Crear interceptors.
- [ ] Crear Error Handler.
- [ ] Configurar fuentes.
- [ ] Instalar librería de iconos.
- [ ] Instalar librería de gráficos.
- [ ] Configurar Angular Material/CDK según compatibilidad.
- [ ] Crear estilos globales.

---

# 4. FASE 2 — Branding

## Assets necesarios

```text
Logo horizontal
Isotipo
Logo claro
Logo oscuro
Favicon
Apple touch icon
SVG oficial
PNG de respaldo
```

---

## Crear archivos

```text
assets/branding/logo.svg
assets/branding/logo-icon.svg
assets/branding/logo-light.svg
assets/branding/logo-dark.svg
```

---

# 5. FASE 3 — Design System

Esta fase debe completarse antes de construir módulos grandes.

---

## 5.1 Foundation

Crear:

```text
Colors
Typography
Spacing
Radius
Shadows
Breakpoints
Animations
Z-Index
```

---

## 5.2 Botones

Crear:

```text
Primary Button
Secondary Button
Outline Button
Ghost Button
Danger Button
Icon Button
```

Estados:

```text
Default
Hover
Active
Disabled
Loading
```

---

## 5.3 Inputs

Crear:

```text
Text Input
Email Input
Password Input
Search Input
Currency Input
Select
Multi Select
Date Picker
Date Range
File Upload
OTP Input
```

Estados:

```text
Default
Focus
Filled
Error
Disabled
Success
```

---

## 5.4 Cards

Crear:

```text
Base Card
Stat Card
Balance Card
Chart Card
Action Card
Feature Card
Operation Card
```

---

## 5.5 Feedback

Crear:

```text
Toast
Alert
Modal
Confirm Dialog
Danger Dialog
Empty State
Skeleton
Loader
Progress
```

---

## 5.6 Data Display

Crear:

```text
Table
Pagination
Status Badge
Avatar
Tooltip
Dropdown
Tabs
Stepper
Breadcrumb
```

---

# 6. FASE 4 — Landing Page

Ruta:

```text
/
```

---

## Sección 1 — Header

Contenido:

```text
[LOGO]

Inicio
Soluciones
Características
Seguridad
Precios

[Iniciar sesión]
[Solicitar demo]
```

---

## Sección 2 — Hero

Título:

```text
Automatiza tu nómina.
Mueve cientos de pagos
con una sola operación.
```

Descripción:

```text
Wiego permite a las empresas dispersar pagos
de forma inteligente, segura y automatizada.
```

CTAs:

```text
Solicitar demo
Conocer más
```

Visual:

- Dashboard flotante.
- Elementos morados.
- Gradientes naranja.
- Referencias visuales a movimiento de dinero.
- Espacio negativo.
- Diseño premium.

---

## Sección 3 — Trust Indicators

Mostrar:

```text
Automatización
Seguridad
Trazabilidad
Integración
```

---

## Sección 4 — Features

Cards:

```text
Dispersión masiva
Validación inteligente
Autorización biométrica
Conciliación automática
Reportes en tiempo real
Seguridad bancaria
```

---

## Sección 5 — Cómo funciona

Stepper horizontal:

```text
1. Cargar archivo
→
2. Validación
→
3. Resumen
→
4. Autorización
→
5. Procesamiento
→
6. Completado
```

---

## Sección 6 — Beneficios

Layout:

```text
Contenido visual + beneficios
```

Beneficios:

```text
Ahorra horas de trabajo operativo
Reduce errores manuales
Centraliza tus pagos
Controla cada operación
Obtén trazabilidad total
```

---

## Sección 7 — Seguridad

Destacar:

```text
Autorización biométrica
Trazabilidad
Validaciones
Autenticación
Auditoría
```

---

## Sección 8 — CTA Final

```text
Simplifica la forma en que tu empresa mueve dinero.

[Solicitar una demo]
```

---

## Sección 9 — Footer

Columnas:

```text
Producto
Empresa
Legal
Contacto
```

---

# 7. FASE 5 — Autenticación

## Pantalla Login

Ruta:

```text
/login
```

Campos:

```text
Correo electrónico
Contraseña
Recordarme
```

Acciones:

```text
Iniciar sesión
Olvidé mi contraseña
```

---

## Recuperación

```text
/forgot-password
```

Flujo:

```text
Email
→
Código
→
Nueva contraseña
→
Confirmación
```

---

## OTP

```text
/verify
```

Componente:

```text
6 dígitos
```

---

# 8. FASE 6 — Dashboard

Ruta:

```text
/dashboard
```

---

## Layout

### Sidebar

```text
Dashboard

Dispersión de pagos
Cargar nómina
Operaciones

Saldo y movimientos
Beneficiarios
Conciliación

Reportes

Configuración
```

---

## Dashboard Header

```text
Buenos días, {usuario}

Aquí tienes el resumen de tu actividad financiera.
```

---

## KPI Cards

```text
Saldo disponible
Total dispersado
Operaciones exitosas
Pendientes
Fallidas
```

---

## Gráfico principal

### Dispersión de pagos

Tipo:

```text
Line Chart / Area Chart
```

Filtros:

```text
7 días
30 días
Este mes
Este año
```

---

## Últimas operaciones

Mostrar:

```text
Concepto
Fecha
Monto
Estado
```

Acción:

```text
Ver todas
```

---

## Estado de pagos

Donut Chart:

```text
Exitosos
Pendientes
Fallidos
```

---

## Top bancos

Bar chart horizontal.

---

## Acciones rápidas

```text
Nueva dispersión
Cargar nómina
Registrar beneficiario
Ver reportes
```

---

# 9. FASE 7 — Dispersión de pagos

## Listado

Ruta:

```text
/dispersions
```

Header:

```text
Dispersión de pagos

Gestiona y supervisa todas las operaciones de pago.

[Nueva dispersión]
```

---

## Filtros

```text
Fecha
Estado
Banco
Monto
Empresa
```

---

## Tabla

```text
Código
Fecha
Concepto
Beneficiarios
Monto
Estado
Acciones
```

---

# 10. FASE 8 — Nueva dispersión

Ruta:

```text
/dispersions/new
```

Stepper completo.

---

## STEP 01 — Cargar archivo

Componentes:

```text
File Upload
Download Template
Format Information
```

---

## STEP 02 — Validación

Mostrar:

```text
Total de registros
Registros válidos
Registros con errores
Monto total
Saldo disponible
```

Tabla:

```text
Fila
Beneficiario
Campo
Error
Acción
```

---

## STEP 03 — Resumen

Card principal:

```text
Total de pagos
Beneficiarios
Monto
Comisión
Saldo actual
Saldo posterior
```

---

## STEP 04 — Autorización

UI preparada para:

```text
Face ID
Fingerprint
OTP
MFA
```

El método debe venir definido por el backend.

---

## STEP 05 — Procesamiento

Pantalla de progreso:

```text
Procesando dispersión

684 de 1000 pagos procesados

[Progress Bar]
```

---

## STEP 06 — Resultado

```text
Operación completada
```

KPI:

```text
Exitosos
Pendientes
Fallidos
```

Acciones:

```text
Ver detalle
Descargar comprobante
Nueva dispersión
```

---

# 11. FASE 9 — Cargar nómina

Ruta:

```text
/payroll-upload
```

Pantalla especializada en:

- Importación
- Validación
- Preview
- Corrección
- Confirmación

Formatos:

```text
XLSX
CSV
TXT
```

---

# 12. FASE 10 — Operaciones

Ruta:

```text
/operations
```

Tabs:

```text
Todas
Exitosas
Pendientes
Fallidas
```

---

## Tabla

```text
ID
Fecha
Origen
Destino
Banco
Monto
Estado
Detalle
```

---

# 13. FASE 11 — Detalle de operación

Ruta:

```text
/operations/:id
```

Secciones:

```text
Información general
Beneficiarios
Timeline
Resultado
Errores
Auditoría
```

---

# 14. FASE 12 — Saldo y movimientos

Ruta:

```text
/balance
```

## Hero financiero

```text
Saldo disponible

S/ 245,680.50

[Ocultar saldo]
```

---

## Movimientos

Tipos:

```text
Recarga
Dispersión
Comisión
Ajuste
Devolución
```

Tabla con:

```text
Fecha
Tipo
Descripción
Monto
Saldo resultante
```

---

# 15. FASE 13 — Beneficiarios

Ruta:

```text
/beneficiaries
```

Acciones:

```text
Registrar
Editar
Desactivar
Buscar
Importar
```

Campos:

```text
Nombre
Documento
Banco
Tipo de cuenta
Número de cuenta
CCI
Estado
```

La información sensible debe enmascararse cuando corresponda.

---

# 16. FASE 14 — Conciliación

Ruta:

```text
/reconciliation
```

Dashboard:

```text
Total esperado
Total procesado
Conciliado
Pendiente
Diferencia
```

Tabla:

```text
Fecha
Operación
Monto esperado
Monto procesado
Estado
Diferencia
```

---

# 17. FASE 15 — Reportes

Ruta:

```text
/reports
```

Reportes:

```text
Dispersión
Operaciones
Errores
Beneficiarios
Bancos
Comisiones
Movimientos
```

Filtros:

```text
Fecha
Empresa
Banco
Estado
```

Acciones:

```text
Exportar
Descargar
Imprimir
```

---

# 18. FASE 16 — Configuración

Ruta:

```text
/settings
```

---

## Empresa

```text
Datos generales
Información fiscal
Datos de contacto
Logo
```

---

## Usuarios

```text
Nombre
Correo
Rol
Estado
Último acceso
```

---

## Roles

Ejemplos:

```text
Administrador
Finanzas
Operador
Auditor
Solo lectura
```

---

## Seguridad

```text
MFA
Autorización biométrica
Sesiones activas
Cambio de contraseña
Dispositivos autorizados
```

---

# 19. Integración Backend

## Primera integración

Implementar:

```text
Environment
API URL
HTTP Client
Auth Token
Interceptors
Error Handler
```

---

## Contrato recomendado

Cada feature debe tener:

```text
models/
services/
api/
facade/
```

Ejemplo:

```text
features/dispersions/
│
├── components/
├── pages/
├── models/
├── services/
├── facade/
└── dispersion.routes.ts
```

---

# 20. Manejo de errores

Estados de backend:

```text
400 → Validación
401 → Sesión expirada
403 → Sin permisos
404 → No encontrado
409 → Conflicto
422 → Regla de negocio
500 → Error interno
```

Cada error debe tener una experiencia visual clara.

---

# 21. Real-time Processing

Preparar arquitectura para actualizaciones en tiempo real.

Posibles usos:

```text
Progreso de dispersión
Estado de operación
Notificaciones
Procesamiento masivo
```

La implementación final dependerá de cómo el backend .NET exponga los eventos.

---

# 22. Responsive Planning

## Desktop

```text
≥ 1280px
```

Sidebar visible.

Grid completo.

---

## Tablet

```text
768px – 1279px
```

Sidebar colapsable.

Cards reorganizadas.

---

## Mobile

```text
< 768px
```

Sidebar tipo drawer.

Tablas con:

- Scroll horizontal controlado.
- Vista alternativa de cards cuando sea necesario.

---

# 23. Estados obligatorios por pantalla

Toda página debe considerar:

```text
Loading
Success
Empty
Error
No permissions
Offline cuando corresponda
```

---

# 24. Orden recomendado de desarrollo

## Sprint 1 — Foundation

```text
Proyecto
Arquitectura
Tokens
Branding
Tipografía
Routing
Layout base
```

---

## Sprint 2 — Design System

```text
Buttons
Inputs
Cards
Badges
Modals
Tables
Loaders
Skeletons
Empty States
```

---

## Sprint 3 — Authentication

```text
Login
Forgot Password
OTP
Guards
Interceptors
Session
```

---

## Sprint 4 — Dashboard

```text
Sidebar
Topbar
KPIs
Charts
Operations
Quick Actions
```

---

## Sprint 5 — Dispersión

```text
Listado
Nueva dispersión
File Upload
Validation
Summary
Authorization
Processing
Result
```

---

## Sprint 6 — Financial Modules

```text
Balance
Movements
Beneficiaries
Operations
Reconciliation
```

---

## Sprint 7 — Reports & Settings

```text
Reports
Exports
Company
Users
Roles
Security
```

---

## Sprint 8 — Finalization

```text
Responsive
Accessibility
Performance
Error handling
API integration
QA
Polish
```

---

# 25. Checklist de calidad final

## UI

- [ ] Diseño consistente.
- [ ] Sin componentes duplicados.
- [ ] Design Tokens aplicados.
- [ ] Responsive.
- [ ] Estados hover.
- [ ] Estados focus.
- [ ] Estados disabled.
- [ ] Loading states.
- [ ] Empty states.
- [ ] Error states.

## UX

- [ ] Flujos financieros claros.
- [ ] Confirmaciones críticas.
- [ ] Prevención de doble envío.
- [ ] Feedback inmediato.
- [ ] Información financiera legible.
- [ ] Tablas fáciles de escanear.
- [ ] Acciones principales visibles.

## Código

- [ ] Feature-based architecture.
- [ ] Lazy loading.
- [ ] Guards.
- [ ] Interceptors.
- [ ] Servicios por dominio.
- [ ] Modelos tipados.
- [ ] Sin lógica duplicada.
- [ ] Sin datos mock en producción.

## Integración

- [ ] API URL configurable.
- [ ] Autenticación integrada.
- [ ] Errores controlados.
- [ ] Tokens gestionados correctamente.
- [ ] Estados de carga.
- [ ] Preparado para eventos en tiempo real.

---

# Resultado esperado

Al finalizar, Wiego debe tener una experiencia visual comparable a una fintech B2B moderna y premium.

El usuario debe poder:

```text
Ingresar
↓
Visualizar su situación financiera
↓
Cargar una nómina
↓
Validar errores
↓
Revisar el resumen
↓
Autorizar la operación
↓
Procesar cientos o miles de pagos
↓
Supervisar el progreso
↓
Consultar resultados
↓
Analizar operaciones y movimientos
```

La plataforma debe ser consistente, escalable y preparada para evolucionar sin necesidad de rediseñar cada módulo desde cero.