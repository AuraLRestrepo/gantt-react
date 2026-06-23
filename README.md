# GanttPro — Diagrama de Gantt Interactivo

Aplicación web de gestión de proyectos con diagrama de Gantt interactivo,
construida como proyecto de portafolio para demostrar dominio de React moderno
con TypeScript. El objetivo es reflejar decisiones de arquitectura reales,
no solo que "funcione".

## Stack tecnológico

| Herramienta       | Versión | Decisión                                                |
| ----------------- | ------- | ------------------------------------------------------- |
| React             | 19.2    | Última versión estable                                  |
| TypeScript        | 6.0     | Strict mode activado                                    |
| Vite              | 8.0     | Dev server con ESM nativo, reemplaza CRA                |
| Tailwind CSS      | 4.3     | CSS-first config con `@theme`, sin `tailwind.config.js` |
| React Router      | 7.x     | Data Router con `createBrowserRouter`                   |
| Vitest            | 4.1     | Test runner integrado nativamente con Vite              |
| Lucide React      | latest  | Iconos tree-shakeable como componentes React            |
| ESLint + Prettier | latest  | Integrados sin conflictos vía `eslint-config-prettier`  |

## Estructura del proyecto

src/

├── components/

│ ├── layout/ # AppLayout, Sidebar, PageHeader

│ ├── ui/ # Avatar, Badge, Card, ProgressBar, EmptyState

│ └── gantt/ # GanttBar, GanttTaskTable, TimelineHeader, ViewScaleToggle

├── hooks/ # useGanttGeometry, useGanttDrag, useIsMobile

├── lib/ # cn(), metrics, taskMeta, date

├── pages/ # Dashboard, Gantt, Projects, Resources, Reports, Settings

├── services/ # Capa de datos (mock → API real en Fase 2)

├── store/ # Estado global (Context + useReducer)

├── test/ # Tests unitarios (Vitest)

└── types/ # Tipos del dominio TypeScript

## Decisiones de arquitectura

### Tipos antes que componentes

El dominio se modela en `src/types/index.ts` antes de tocar la UI.
Los tipos usan union types (`"pending" | "in-progress" | "completed" | "blocked"`)
en vez de `enum` — desaparecen al compilar, cero peso en el bundle.
Las fechas son `string` ISO (`"YYYY-MM-DD"`) para mapear directamente
con el JSON que devolverá la API REST en la Fase 2.

### Patrón Repository en `services/`

Los datos nunca se exportan como arrays directos. Siempre a través
de funciones (`getTasks()`, `getMemberById(id)`). Hoy devuelven
mock data; en la Fase 2 (Node) solo cambia el cuerpo de esas funciones
a `fetch()` — el resto de la app no se entera del cambio.

### Datos derivados en `lib/metrics.ts`

Las métricas del Dashboard se calculan desde el array de tareas en
cada render, nunca se guardan como estado separado. Evita la
desincronización entre dato real y dato calculado.

### Sistema de diseño con tokens CSS en `@theme`

Los colores son variables CSS nativas (`--color-status-completed`,
`--color-brand`, etc.) definidas en `@theme` de Tailwind v4, expuestas
también como clases cortas (`bg-brand`, `border-border`) que Tailwind
genera automáticamente a partir de los tokens.

### `Record<TaskStatus, Config>` en `taskMeta.ts`

El mapping de estado → color/label vive en un solo lugar. Si se agrega
un nuevo status al union type sin actualizar el mapping, TypeScript
marca error en compilación, no en producción.

### Estado global con Context + useReducer (`store/`)

El estado de tareas vive en un reducer con acciones tipadas mediante
discriminated union (`MOVE_TASK`, `RESIZE_TASK`, `SET_PROGRESS`,
`SET_STATUS`). Dividido en 4 archivos para cumplir con las reglas de
Fast Refresh de Vite (cada `.tsx` exporta solo componentes):

- `TasksContext.context.ts` — el contrato (createContext + tipo)
- `tasksReducer.ts` — lógica pura del reducer, testeable sin JSX
- `TasksContext.tsx` — solo el Provider
- `useTasks.ts` — el hook de consumo

### Manejo de fechas sin bugs de zona horaria

`new Date(isoString)` interpreta strings como UTC, pero `.setDate()`
y los getters (`getDate()`, `getMonth()`) operan en hora local —
mezclar ambos causa desfases de fechas. El proyecto usa
`parseLocalDate()` y `toLocalISODate()` (en `lib/date.ts`), que
parsean y serializan fechas usando exclusivamente componentes locales,
evitando por completo `toISOString()` para este propósito. Cubierto
por tests, incluyendo una prueba de round-trip que detectaría
cualquier regresión a este bug.

### El diagrama de Gantt sin librerías externas

Drag & drop y resize de barras implementados con eventos nativos del
mouse (`onMouseDown` + listeners de `window` para `mousemove`/`mouseup`),
sin `react-dnd` ni `dnd-kit`. El estado de arrastre combina `useRef`
(lógica libre de stale closures dentro de los listeners) y `useState`
(para disparar re-renders con el preview visual). El cambio real solo
se confirma al store global al soltar el mouse.

### Sidebar responsive sin efectos innecesarios

`useIsMobile()` expone el estado del viewport vía `matchMedia` +
listener de `change`. El colapso del Sidebar en pantallas pequeñas se
calcula directamente durante el render (`collapsed = manuallyCollapsed
|| isMobile`), evitando el anti-patrón de sincronizar estado derivado
mediante un `useEffect` adicional (cascading renders).

### Accesibilidad básica

`aria-label` en controles de solo-ícono (Sidebar colapsado, barras del
Gantt), `role="button"` + `tabIndex={0}` en las barras del Gantt para
hacerlas alcanzables por teclado, y `:focus-visible` con contorno
explícito en toda la app.

### Alias `@/` configurado en Vite y TypeScript

Configurado en `vite.config.ts` (resolución en build/dev) y en
`tsconfig.app.json` (análisis de tipos en el editor). Vitest reutiliza
la configuración de Vite, por lo que el alias funciona en tests sin
configuración adicional.

## Testing

20 tests unitarios con Vitest, enfocados en lógica con casos de borde
reales (no en componentes puramente presentacionales):

| Archivo                | Tests | Qué cubre                                                                                             |
| ---------------------- | ----- | ----------------------------------------------------------------------------------------------------- |
| `metrics.test.ts`      | 3     | Agregaciones del Dashboard, caso de array vacío                                                       |
| `date.test.ts`         | 8     | Parseo/serialización de fechas, inmutabilidad, round-trip anti-zona-horaria                           |
| `TasksContext.test.ts` | 9     | Las 4 acciones del reducer (mover, redimensionar, progreso, status), clamps, inmutabilidad del estado |

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Verificar tipos
npx tsc --noEmit -p tsconfig.app.json

# Correr tests
npm run test          # una vez
npm run test:watch    # modo watch

# Formatear código
npm run format
npx eslint .

# Build de producción
npm run build
npm run preview       # sirve el build localmente para verificar
```

## Estado actual del proyecto

| Etapa | Descripción                                                            | Estado |
| ----- | ---------------------------------------------------------------------- | ------ |
| 0     | Setup (Vite, TypeScript, Tailwind v4, ESLint + Prettier)               | ✅     |
| 1     | Tipos del dominio (Task, Project, Member)                              | ✅     |
| 2     | Capa de servicios con patrón Repository                                | ✅     |
| 3     | Sistema de diseño con tokens CSS en @theme                             | ✅     |
| 4     | Layout, routing (React Router v7), Sidebar con colapso                 | ✅     |
| 5     | Componentes UI reutilizables                                           | ✅     |
| 6     | Dashboard con métricas derivadas                                       | ✅     |
| 7     | Estado global (Context + useReducer)                                   | ✅     |
| 8     | Diagrama de Gantt interactivo: drag, resize, scroll sync, escalas      | ✅     |
| 9     | Páginas restantes (Proyectos, Recursos, Reportes, Configuración)       | ✅     |
| —     | Testing unitario (20 tests, Vitest)                                    | ✅     |
| 10    | Pulido: accesibilidad, responsive, estados vacíos, build de producción | ✅     |

**Frontend completo.**

## Mejoras futuras conocidas

- Estado vacío para "0 tareas" implementado en Dashboard y Gantt, pero
  no probado visualmente con datos reales vacíos (el mock data siempre
  tiene 13 tareas fijas) — validar una vez conectado a la API real.
- El Gantt no tiene una versión optimizada para pantallas móviles
  (requiere scroll horizontal por diseño); fuera de alcance para esta
  fase.

## Próximamente — Fase 2 (Backend Node)

- API REST con Express/Fastify + TypeScript
- Base de datos PostgreSQL + Prisma ORM
- Autenticación JWT
- Migración de `services/` de mock data a `fetch` real

## Autor

Desarrollado por **Aura L Restrepo** como proyecto de portafolio.
