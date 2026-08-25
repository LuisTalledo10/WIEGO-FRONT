# AGENT.md

## Wiego — Frontend Development Agent Guide

### 1. Propósito del proyecto

Wiego es una plataforma financiera B2B orientada a la automatización de dispersión masiva de pagos, nóminas, honorarios y transferencias empresariales.

El frontend será desarrollado en Angular y consumirá una API Backend desarrollada en .NET.

La plataforma debe transmitir visualmente:

- Confianza financiera
- Seguridad
- Tecnología
- Automatización
- Rapidez
- Escalabilidad
- Claridad operativa
- Profesionalismo B2B

El diseño debe sentirse como una combinación entre:

- Una plataforma bancaria moderna
- Un SaaS financiero premium
- Un dashboard empresarial de alto nivel
- Una fintech tecnológica

La interfaz nunca debe parecer una plantilla genérica de administración.

---

# 2. Principios obligatorios para el agente

Antes de crear cualquier pantalla, componente o funcionalidad, seguir estas reglas.

## 2.1 No duplicar componentes

Si un componente ya existe o puede reutilizarse, debe reutilizarse.

Ejemplos:

- No crear botones manuales en cada página.
- No crear inputs diferentes para cada formulario.
- No repetir lógica de modales.
- No duplicar tablas.
- No crear badges manualmente.
- No repetir loaders.
- No repetir estados de error.

Todo debe construirse a partir de componentes reutilizables.

---

## 2.2 Mobile first, pero optimizado para escritorio

Wiego es principalmente una plataforma B2B para equipos financieros y empresas.

Prioridad de diseño:

1. Desktop
2. Laptop
3. Tablet
4. Mobile

El dashboard debe funcionar correctamente desde 1280px en adelante.

Breakpoints recomendados:

```scss
$breakpoint-mobile: 640px;
$breakpoint-tablet: 768px;
$breakpoint-laptop: 1024px;
$breakpoint-desktop: 1280px;
$breakpoint-wide: 1536px;
```

---

## 2.3 Nunca utilizar colores arbitrarios

Todos los colores deben provenir del Design System.

No usar:

```css
color: blue;
background: red;
```

Utilizar tokens:

```scss
color: var(--color-primary);
background: var(--color-surface);
```

---

## 2.4 Nunca utilizar valores repetidos sin token

No repetir constantemente:

```css
border-radius: 12px;
padding: 24px;
color: #332477;
```

Crear tokens globales.

---

## 2.5 Separar UI, lógica y acceso a datos

La arquitectura debe respetar:

```text
UI Components
↓
Feature Components
↓
Facade / State
↓
Services
↓
HTTP Client
↓
.NET API
```

Los componentes presentacionales no deben conocer directamente detalles de la API.

---

# 3. Stack tecnológico

## Core

- Angular
- TypeScript
- SCSS
- Angular Router
- Angular Reactive Forms
- Angular HttpClient
- RxJS

## Librerías recomendadas

### Componentes base

[Angular Material](https://material.angular.dev/?utm_source=chatgpt.com)

Utilizar Angular Material principalmente para:

- Dialog
- Tooltip
- Menu
- Select
- Datepicker
- Snackbar
- Progress spinner
- Accessibility base
- CDK Overlay

No utilizar Angular Material como diseño visual completo.

Los componentes deben personalizarse para respetar la identidad visual de Wiego.

---

### Utilidades y componentes

[Angular CDK](https://material.angular.dev/cdk/categories?utm_source=chatgpt.com)

Usar para:

- Overlay
- Drag and Drop
- Accessibility
- Responsive utilities
- Portal
- Virtual scrolling cuando sea necesario

---

### Iconografía

[Lucide Icons for Angular](https://lucide.dev/guide/packages/lucide-angular?utm_source=chatgpt.com)

Lucide será la librería principal de iconos.

Reglas:

- No usar múltiples librerías de iconos.
- No usar emojis como iconos del sistema.
- Preferir iconos outline.
- Tamaño estándar: 18px, 20px o 24px.
- Stroke consistente.
- No utilizar iconos excesivamente decorativos.

---

### Gráficos

[Apache ECharts](https://echarts.apache.org/?utm_source=chatgpt.com)

Usar mediante una integración compatible con Angular.

Gráficos principales:

- Line chart
- Bar chart
- Donut chart
- Area chart
- Horizontal bar chart

Aplicaciones:

- Dispersión de pagos
- Evolución de saldo
- Estado de pagos
- Distribución por bancos
- Tendencias mensuales
- Operaciones exitosas/fallidas

---

### Animaciones

Utilizar las capacidades nativas de Angular y CSS.

Las animaciones deben ser:

- Sutiles
- Rápidas
- Funcionales
- Nunca excesivas

Duraciones:

```scss
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
```

---

# 4. Tipografía

## Tipografía principal

[Inter](https://fonts.google.com/specimen/Inter?utm_source=chatgpt.com)

Usar Inter para toda la interfaz.

Razones:

- Excelente legibilidad
- Profesional
- Moderna
- Ideal para números financieros
- Buena visualización en tablas
- Excelente para dashboards

---

## Pesos

```text
400 — Regular
500 — Medium
600 — SemiBold
700 — Bold
```

No abusar del peso 700.

---

## Escala tipográfica

```scss
--font-size-xs: 0.75rem;      // 12px
--font-size-sm: 0.875rem;     // 14px
--font-size-base: 1rem;       // 16px
--font-size-lg: 1.125rem;     // 18px
--font-size-xl: 1.25rem;      // 20px
--font-size-2xl: 1.5rem;      // 24px
--font-size-3xl: 1.875rem;    // 30px
--font-size-4xl: 2.25rem;     // 36px
--font-size-5xl: 3rem;        // 48px
```

---

# 5. Colorimetría oficial

## Brand Colors

```scss
--wiego-purple: #332477;
--wiego-deep-purple: #21174F;
--wiego-indigo: #5140B8;

--wiego-orange: #FF5A1F;
--wiego-orange-dark: #E94A12;
--wiego-orange-active: #C93C0B;

--wiego-gold: #FFAA18;
```

---

## Gradiente institucional

```scss
--gradient-brand: linear-gradient(
  135deg,
  #3F2C9B 0%,
  #5140B8 35%,
  #FF5A1F 70%,
  #FFAA18 100%
);
```

Usar únicamente para:

- Branding
- Hero sections
- Elementos destacados
- Empty states premium
- Ilustraciones
- Algunos indicadores especiales

No utilizar como fondo general del dashboard.

---

## Background Colors

```scss
--color-background: #F7F7FA;
--color-surface: #FFFFFF;
--color-surface-secondary: #F1EFFF;
--color-surface-hover: #F8F7FC;
--color-border: #E8E6EF;
--color-border-strong: #D8D4E3;
```

---

## Text Colors

```scss
--color-text-primary: #21174F;
--color-text-secondary: #625E73;
--color-text-tertiary: #908BA0;
--color-text-disabled: #B8B4C2;
--color-text-inverse: #FFFFFF;
```

---

## Semantic Colors

```scss
--color-success: #16A36A;
--color-success-bg: #E8F7EF;

--color-warning: #E6A117;
--color-warning-bg: #FFF6DD;

--color-error: #D92D45;
--color-error-bg: #FDECEF;

--color-info: #3F6FD8;
--color-info-bg: #EDF3FF;

--color-processing: #5140B8;
--color-processing-bg: #F1EFFF;
```

---

# 6. Design Tokens

## Border Radius

```scss
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

Uso:

```text
Inputs: 8px
Buttons: 8px
Cards: 16px
Modals: 20px
Badges: 9999px
```

---

## Spacing System

Utilizar múltiplos de 4.

```scss
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

---

## Shadows

```scss
--shadow-sm: 0 1px 2px rgba(33, 23, 79, 0.04);

--shadow-md:
  0 4px 12px rgba(33, 23, 79, 0.08);

--shadow-lg:
  0 12px 32px rgba(33, 23, 79, 0.10);

--shadow-xl:
  0 20px 48px rgba(33, 23, 79, 0.12);
```

Las sombras deben ser muy suaves.

---

# 7. Arquitectura del proyecto

```text
src/
│
├── app/
│   │
│   ├── core/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── buttons/
│   │   │   ├── inputs/
│   │   │   ├── cards/
│   │   │   ├── badges/
│   │   │   ├── tables/
│   │   │   ├── modals/
│   │   │   ├── empty-state/
│   │   │   ├── loading/
│   │   │   └── feedback/
│   │   │
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── utils/
│   │
│   ├── layouts/
│   │   ├── public-layout/
│   │   ├── auth-layout/
│   │   └── dashboard-layout/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── dispersions/
│   │   ├── payroll-upload/
│   │   ├── operations/
│   │   ├── balance/
│   │   ├── beneficiaries/
│   │   ├── reconciliation/
│   │   ├── reports/
│   │   ├── settings/
│   │   └── company/
│   │
│   ├── app.routes.ts
│   └── app.component.ts
│
├── assets/
│   ├── branding/
│   ├── images/
│   ├── illustrations/
│   └── icons/
│
└── styles/
    ├── _tokens.scss
    ├── _colors.scss
    ├── _typography.scss
    ├── _spacing.scss
    ├── _breakpoints.scss
    ├── _animations.scss
    └── styles.scss
```

---

# 8. Layouts

## 8.1 Public Layout

Para:

- Landing page
- Características
- Soluciones
- Precios
- Seguridad
- Contacto

Estructura:

```text
Header
Main Content
Footer
```

---

## 8.2 Auth Layout

Para:

- Login
- Registro
- Recuperar contraseña
- Verificación OTP
- Autorización biométrica
- MFA

Diseño:

```text
┌───────────────────────────────┬──────────────────────┐
│                               │                      │
│          FORMULARIO           │   BRAND VISUAL       │
│                               │   GRADIENT / LOGO    │
│                               │                      │
└───────────────────────────────┴──────────────────────┘
```

En mobile mostrar únicamente el formulario.

---

## 8.3 Dashboard Layout

Estructura:

```text
┌───────────────┬───────────────────────────────────────┐
│               │ Topbar                                │
│               ├───────────────────────────────────────┤
│   SIDEBAR     │                                       │
│               │                                       │
│               │            PAGE CONTENT               │
│               │                                       │
│               │                                       │
└───────────────┴───────────────────────────────────────┘
```

---

# 9. Sidebar

## Desktop

Ancho:

```scss
width: 264px;
```

Background:

```scss
background: var(--wiego-deep-purple);
```

Logo en la parte superior.

---

## Menú

```text
GENERAL
Dashboard

PAGOS
Dispersión de pagos
Cargar nómina
Operaciones

FINANZAS
Saldo y movimientos
Beneficiarios
Conciliación

ANÁLISIS
Reportes

SISTEMA
Configuración
```

---

## Item normal

```text
Icono
Texto
```

Color:

```scss
color: rgba(255, 255, 255, 0.72);
```

---

## Item activo

```scss
background: rgba(255, 255, 255, 0.10);
color: #FFFFFF;
border-left: 3px solid #FF5A1F;
```

Debe tener transición suave.

---

# 10. Topbar

Elementos:

```text
[ Título / Breadcrumb ]

                         [ Notificaciones ] [ Empresa ] [ Avatar ]
```

Debe incluir:

- Breadcrumb
- Notificaciones
- Selector de empresa
- Avatar del usuario
- Menú de perfil

---

# 11. Sistema de botones

Crear un componente reutilizable:

```text
app-button
```

Inputs recomendados:

```text
variant
size
loading
disabled
iconLeft
iconRight
fullWidth
type
```

---

## Variantes

### Primary

```scss
background: #FF5A1F;
color: #FFFFFF;
```

Uso:

- Nueva dispersión
- Procesar
- Confirmar
- Continuar
- Aprobar operación

---

### Secondary

```scss
background: #332477;
color: #FFFFFF;
```

Uso:

- Guardar
- Acciones principales secundarias

---

### Outline

```scss
background: transparent;
border: 1px solid #D8D4E3;
color: #332477;
```

---

### Ghost

```scss
background: transparent;
color: #625E73;
```

---

### Danger

```scss
background: #D92D45;
color: #FFFFFF;
```

Debe requerir confirmación para acciones destructivas importantes.

---

## Tamaños

```text
Small: 32px
Medium: 40px
Large: 48px
```

---

# 12. Sistema de Inputs

Crear:

```text
app-input
app-password-input
app-select
app-search-input
app-currency-input
app-date-picker
app-file-upload
app-otp-input
```

Todos deben soportar:

```text
label
placeholder
hint
error
required
disabled
readonly
prefixIcon
suffixIcon
```

---

## Estados

```text
Default
Hover
Focus
Filled
Error
Disabled
Success
```

Focus:

```scss
border-color: #5140B8;
box-shadow: 0 0 0 3px rgba(81, 64, 184, 0.12);
```

Error:

```scss
border-color: #D92D45;
```

---

# 13. Cards

Crear:

```text
app-card
app-stat-card
app-balance-card
app-action-card
app-feature-card
```

---

## Card base

```scss
background: #FFFFFF;
border: 1px solid #E8E6EF;
border-radius: 16px;
box-shadow: var(--shadow-sm);
```

Padding:

```scss
24px;
```

---

# 14. Stat Cards

Utilizar en dashboard.

Ejemplo:

```text
┌────────────────────────────┐
│ [ICON]                     │
│                            │
│ Saldo disponible           │
│ S/ 245,680.50              │
│ Actualizado hace 2 min     │
└────────────────────────────┘
```

Tipos:

- Saldo disponible
- Total dispersado
- Operaciones exitosas
- Pendientes
- Fallidas

---

# 15. Sistema de tablas

Crear componente:

```text
app-data-table
```

Soportar:

- Loading
- Empty
- Pagination
- Sorting
- Search
- Filters
- Columnas configurables
- Responsive
- Skeleton

Columnas comunes:

```text
Fecha
Código
Concepto
Beneficiario
Banco
Monto
Estado
Acciones
```

Las tablas financieras deben alinear montos a la derecha.

Ejemplo:

```text
S/ 1,250.00
USD 4,520.50
```

---

# 16. Badges de estado

Crear:

```text
app-status-badge
```

Estados:

```text
Completado
En proceso
Pendiente
Fallido
Cancelado
Validado
Observado
```

Ejemplo:

```text
COMPLETADO → Verde
EN PROCESO → Morado
PENDIENTE → Amarillo
FALLIDO → Rojo
```

---

# 17. Sistema de modales

Crear:

```text
app-modal
app-confirm-dialog
app-danger-confirm-dialog
```

Tipos:

- Información
- Confirmación
- Advertencia
- Error
- Éxito

Para operaciones financieras críticas mostrar:

```text
Resumen
Monto total
Cantidad de beneficiarios
Comisión
Saldo disponible
Saldo posterior
```

Nunca permitir ejecutar una dispersión sin una confirmación final.

---

# 18. Toasts y feedback

Crear servicio centralizado:

```text
NotificationService
```

Tipos:

```text
success
error
warning
info
```

Ejemplos:

```text
Nómina cargada correctamente.
Se detectaron 3 registros con errores.
La operación está siendo procesada.
La dispersión fue completada.
```

---

# 19. Loading States

Crear:

```text
app-loader
app-page-loader
app-button-loader
app-skeleton
```

No utilizar únicamente texto como:

```text
Cargando...
```

Las tablas deben tener skeleton.

Las cards deben tener skeleton.

Los botones deben bloquearse mientras ejecutan operaciones.

---

# 20. Empty States

Crear:

```text
app-empty-state
```

Cada empty state debe incluir:

- Ilustración
- Título
- Descripción
- Acción

Ejemplo:

```text
Aún no tienes dispersiones

Cuando realices tu primera operación,
podrás visualizarla aquí.

[Nueva dispersión]
```

---

# 21. Gestión de imágenes

Ubicación:

```text
assets/images/
assets/illustrations/
assets/branding/
```

Reglas:

- No utilizar imágenes aleatorias.
- No depender de URLs externas para imágenes críticas.
- Utilizar SVG para iconos e ilustraciones.
- Optimizar imágenes.
- Preferir WebP para fotografías.
- El logo debe tener versiones:
  - Horizontal
  - Isotipo
  - Light
  - Dark
  - SVG
  - PNG

---

# 22. Dashboard principal

Ruta:

```text
/dashboard
```

Contenido:

## Header

```text
Buenos días, {nombre}
Resumen financiero de tu empresa
```

---

## Primera fila

Cinco Stat Cards:

```text
Saldo disponible
Total dispersado
Operaciones exitosas
Pendientes
Fallidas
```

---

## Segunda fila

```text
┌──────────────────────────────────┬───────────────────────┐
│                                  │                       │
│     Dispersión de pagos          │ Últimas operaciones   │
│     Line / Area Chart            │                       │
│                                  │                       │
└──────────────────────────────────┴───────────────────────┘
```

---

## Tercera fila

```text
┌───────────────┬───────────────┬────────────────────┐
│ Estado pagos  │ Top bancos    │ Acciones rápidas   │
│ Donut Chart   │ Bar Chart     │                    │
└───────────────┴───────────────┴────────────────────┘
```

---

# 23. Módulo de dispersión

Ruta:

```text
/dispersions
```

Acciones:

- Ver operaciones
- Crear dispersión
- Revisar estado
- Cancelar cuando sea permitido
- Reintentar pagos fallidos

---

# 24. Flujo Nueva Dispersión

Debe ser un Stepper reutilizable.

## Paso 1

### Cargar archivo

Formatos:

```text
XLSX
CSV
TXT
```

UI:

```text
Drag & Drop
Seleccionar archivo
Descargar plantilla
```

---

## Paso 2

### Validación

Mostrar:

```text
Total registros
Registros válidos
Registros observados
Monto total
Saldo disponible
```

Tabla de errores.

---

## Paso 3

### Resumen

Mostrar:

```text
Cantidad de pagos
Monto total
Comisión
Saldo disponible
Saldo restante
```

---

## Paso 4

### Autorización

Soportar:

```text
Biometría
OTP
Segundo factor
```

El frontend debe estar preparado para recibir el método requerido desde el backend.

---

## Paso 5

### Procesamiento

Mostrar progreso en tiempo real cuando el backend lo permita.

Ejemplo:

```text
Procesando pagos
684 / 1000 completados
```

---

## Paso 6

### Resultado

```text
✓ 980 exitosos
⚠ 15 pendientes
✕ 5 fallidos
```

Botones:

```text
Ver detalle
Descargar comprobante
Nueva dispersión
```

---

# 25. Integración con .NET Backend

Nunca colocar lógica financiera sensible únicamente en el frontend.

El frontend:

- Envía solicitudes
- Valida UX
- Muestra información
- Gestiona estado visual

El backend:

- Autoriza
- Calcula
- Valida dinero
- Procesa operaciones
- Maneja ledger
- Gestiona transacciones

---

## Servicios por dominio

```text
AuthService
DashboardService
DispersionService
PayrollService
OperationService
BalanceService
BeneficiaryService
ReconciliationService
ReportService
CompanyService
```

---

## HTTP Interceptors

Implementar:

```text
AuthInterceptor
ErrorInterceptor
LoadingInterceptor
```

Responsabilidades:

### AuthInterceptor

Agregar token.

### ErrorInterceptor

Centralizar errores.

### LoadingInterceptor

Gestionar loading global cuando corresponda.

---

# 26. Estados de API

Cada petición debe manejar:

```text
Idle
Loading
Success
Error
```

Nunca dejar pantallas vacías mientras carga la información.

---

# 27. Seguridad visual

Para información financiera:

- Ocultar información sensible cuando corresponda.
- Agregar botón para mostrar/ocultar saldo.
- Enmascarar cuentas.
- No almacenar información sensible innecesariamente.
- Limpiar información temporal al cerrar sesión.
- Confirmar acciones críticas.
- Deshabilitar doble clic en operaciones.

---

# 28. Accesibilidad

Obligatorio:

- Navegación por teclado.
- Focus visible.
- Labels correctos.
- Contraste suficiente.
- Botones con nombre accesible.
- Tooltips para iconos ambiguos.
- No depender únicamente del color para comunicar estados.

---

# 29. Convenciones de código

## Componentes

```text
kebab-case
```

Ejemplo:

```text
dispersion-summary.component.ts
```

---

## Clases TypeScript

```text
PascalCase
```

---

## Variables y métodos

```text
camelCase
```

---

## Booleanos

Prefijos:

```text
isLoading
isOpen
hasError
canSubmit
```

---

# 30. Definition of Done

Una pantalla está terminada únicamente si:

- [ ] Es responsive.
- [ ] Utiliza componentes reutilizables.
- [ ] Utiliza Design Tokens.
- [ ] Tiene loading state.
- [ ] Tiene error state.
- [ ] Tiene empty state si corresponde.
- [ ] Tiene estados hover y focus.
- [ ] Es accesible.
- [ ] No tiene datos mock hardcodeados en producción.
- [ ] Está preparada para consumir la API .NET.
- [ ] No tiene errores de TypeScript.
- [ ] No duplica código.
- [ ] Respeta la identidad visual de Wiego.
- [ ] Las acciones financieras tienen confirmación cuando corresponde.

---

# 31. Regla final para el agente

Antes de crear un nuevo componente, verificar:

1. ¿Ya existe?
2. ¿Puede reutilizarse uno existente?
3. ¿Debe formar parte del Design System?
4. ¿Necesita loading?
5. ¿Necesita error state?
6. ¿Necesita empty state?
7. ¿Debe ser responsive?
8. ¿Cómo consumirá la API .NET?
9. ¿La acción es financiera o crítica?
10. ¿Respeta los colores y componentes oficiales?

La prioridad absoluta es construir una plataforma consistente, escalable, segura visualmente y preparada para crecer como una fintech B2B empresarial.