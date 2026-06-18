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

│   └── ui/           # Avatar, Badge, Card, ProgressBar

├── hooks/            # Custom hooks reutilizables

├── lib/              # Funciones puras: cn(), metrics, taskMeta

├── pages/            # Una página = una ruta

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
dato calculado, que es una fuente común de bugs silenciosos.

### Sistema de diseño con tokens CSS en `@theme`
Los colores son variables CSS nativas (`--color-status-completed`,
`--color-brand`, etc.) definidas en `@theme` de Tailwind v4.
Consecuencia práctica: los tokens son accesibles como `var(--color-...)`
en cualquier contexto — componentes React, SVG inline (el Gantt los usa),
o estilos calculados en runtime.

### `Record<TaskStatus, Config>` en `taskMeta.ts`
El mapping de estado → color/label vive en un solo lugar.
Al usar `Record<TaskStatus, {...}>`, TypeScript garantiza que si
se agrega un nuevo status al union type, hay que actualizar
el mapping — error en compilación, no en producción.

### Alias `@/` configurado en Vite y TypeScript
Configurado en `vite.config.ts` (resolución en build/dev) y en
`tsconfig.app.json` (análisis de tipos en el editor). Ambos necesarios
porque son sistemas de resolución independientes.

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
| 6 | Dashboard con métricas derivadas | 🔄 En progreso |
| 7 | Estado global (Context + useReducer) | ⏳ |
| 8 | Diagrama de Gantt interactivo con drag & drop | ⏳ |
| 9 | Páginas restantes (Proyectos, Recursos, Reportes, Config) | ⏳ |
| 10 | Pulido, accesibilidad y build de producción | ⏳ |

## Próximamente — Fase 2 (Backend Node)

- API REST con Express/Fastify + TypeScript
- Base de datos PostgreSQL + Prisma ORM
- Autenticación JWT
- Migración de `services/` de mock data a `fetch` real

## Autor

Desarrollado por **Aura L Restrepo** como proyecto de portafolio.
