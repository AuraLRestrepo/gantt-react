# GanttPro — Diagrama de Gantt Interactivo

Aplicación web de gestión de proyectos con diagrama de Gantt interactivo,
construida como proyecto de portafolio para demostrar dominio de React moderno
con TypeScript. El objetivo es reflejar decisiones de arquitectura reales,
no solo que "funcione".

## Stack tecnológico

| Herramienta | Versión | Decisión |
|---|---|---|
| React | 19.2 | Última versión estable |
| TypeScript | 6.0 | Strict mode activado |
| Vite | 8.0 | Dev server con ESM nativo, reemplaza CRA |
| Tailwind CSS | 4.3 | CSS-first config con `@theme`, sin `tailwind.config.js` |
| React Router | 7.x | Data Router con `createBrowserRouter` |
| Lucide React | latest | Iconos tree-shakeable como componentes React |
| ESLint + Prettier | latest | Integrados sin conflictos vía `eslint-config-prettier` |

## Estructura del proyecto
src/

├── components/

│   ├── layout/       # AppLayout, Sidebar, PageHeader

│   ├── ui/           # Avatar, Badge, Card, ProgressBar

│   └── gantt/        # GanttBar, GanttTaskTable, TimelineHeader, ViewScaleToggle

├── hooks/            # useGanttGeometry, useGanttDrag

├── lib/              # cn(), metrics, taskMeta, date

├── pages/            # Dashboard, Gantt, Projects, Resources, Reports, Settings

├── services/         # Capa de datos (mock → API real en Fase 2)

├── store/            # Estado global (Context + useReducer)

└── types/            # Tipos del dominio TypeScript

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
Las métricas del Dashboard (`completedTasks`, `overallProgress`, etc.)
se calculan desde el array de tareas en cada render, nunca se guardan
como estado separado. Evita la desincronización entre dato real y
dato calculado.

### Sistema de diseño con tokens CSS en `@theme`
Los colores son variables CSS nativas (`--color-status-completed`,
`--color-brand`, etc.) definidas en `@theme` de Tailwind v4, expuestas
también como clases cortas (`bg-brand`, `border-border`) que Tailwind
genera automáticamente a partir de los tokens.

### `Record<TaskStatus, Config>` en `taskMeta.ts`
El mapping de estado → color/label vive en un solo lugar.
Si se agrega un nuevo status al union type sin actualizar el mapping,
TypeScript marca error en compilación, no en producción.

### Estado global con Context + useReducer (`store/`)
El estado de tareas (usado por el Gantt y el Dashboard) vive en un
reducer con acciones tipadas mediante discriminated union
(`MOVE_TASK`, `RESIZE_TASK`, `SET_PROGRESS`, `SET_STATUS`). El Context
se separó en 3 archivos (`TasksContext.context.ts`, `TasksContext.tsx`,
`useTasks.ts`) para cumplir con las reglas de Fast Refresh de Vite,
que exigen que cada archivo `.tsx` exporte únicamente componentes.

### Manejo de fechas sin bugs de zona horaria
`new Date(isoString)` interpreta strings como UTC, pero `.setDate()`
y los getters (`getDate()`, `getMonth()`) operan en hora local —
mezclar ambos causa desfases de fechas. El proyecto usa
`parseLocalDate()` y `toLocalISODate()` (en `lib/date.ts`), que
parsean y serializan fechas usando exclusivamente componentes locales,
evitando por completo `toISOString()` para este propósito.

### El diagrama de Gantt sin librerías externas
Drag & drop y resize de barras implementados con eventos nativos del
mouse (`onMouseDown` + listeners de `window` para `mousemove`/`mouseup`),
sin `react-dnd` ni `dnd-kit`. El estado de arrastre combina `useRef`
(para lógica libre de stale closures dentro de los listeners) y
`useState` (para disparar re-renders con el preview visual). El cambio
real solo se confirma al store global (`moveTask`/`resizeTask`) al
soltar el mouse — mientras se arrastra, el desplazamiento es estado
local temporal, no se despacha al reducer en cada pixel de movimiento.

### Alias `@/` configurado en Vite y TypeScript
Configurado en `vite.config.ts` (resolución en build/dev) y en
`tsconfig.app.json` (análisis de tipos en el editor).

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Verificar tipos
npx tsc --noEmit -p tsconfig.app.json

# Formatear código
npm run format

# Verificar formato y linting
npm run format:check
npx eslint .
```

## Estado actual del proyecto

| Etapa | Descripción | Estado |
|---|---|---|
| 0 | Setup (Vite, TypeScript, Tailwind v4, ESLint + Prettier) | ✅ |
| 1 | Tipos del dominio (Task, Project, Member) | ✅ |
| 2 | Capa de servicios con patrón Repository | ✅ |
| 3 | Sistema de diseño con tokens CSS en @theme | ✅ |
| 4 | Layout, routing (React Router v7), Sidebar con colapso | ✅ |
| 5 | Componentes UI reutilizables (Avatar, Badge, Card, ProgressBar) | ✅ |
| 6 | Dashboard con métricas derivadas | ✅ |
| 7 | Estado global (Context + useReducer) | ✅ |
| 8 | Diagrama de Gantt interactivo: drag, resize, scroll sync, escalas | ✅ |
| 9 | Páginas restantes (Proyectos, Recursos, Reportes, Configuración) | ✅ |
| 10 | Pulido, accesibilidad y build de producción | ⏳ |

## Próximamente — Fase 2 (Backend Node)

- API REST con Express/Fastify + TypeScript
- Base de datos PostgreSQL + Prisma ORM
- Autenticación JWT
- Migración de `services/` de mock data a `fetch` real

## Autor

Desarrollado por **Aura L Restrepo** como proyecto de portafolio.
