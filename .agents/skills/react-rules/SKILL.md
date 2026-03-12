---
name: react-rules
description: Reglas para crear o modificar aplicaciones React con TypeScript, Zustand, Zod y React Hook Form. Usar cuando el usuario pida crear una app o componente React, agregar o modificar componentes, hooks, estado global, formularios o logica de UI en proyectos React. Tambien usar cuando se necesite definir estructura inicial de proyecto React con TypeScript y buenas practicas de arquitectura y estado.
---

# React Rules

## Overview

Aplicar una base consistente para proyectos React con TypeScript y una estructura simple, tipada y mantenible. Priorizar componentes pequenos, estado predecible, validacion explicita y effects limitados a sincronizacion con sistemas externos.

## Workflow

1. Confirmar si la tarea es crear un proyecto React nuevo o modificar uno existente.
2. Revisar primero la version estable actual de React en documentacion oficial si la solicitud exige una version concreta o "la ultima".
3. Si se crea un proyecto nuevo, preferir una base React + TypeScript y definir una estructura minima clara antes de escribir componentes.
4. Si se modifica un proyecto existente, respetar la estructura y herramientas ya presentes salvo que el usuario pida migracion.
5. Aplicar las reglas de esta skill en componentes, hooks, stores, formularios y consumo de datos.

## Proyecto Nuevo

Usar una estructura pequena y directa:

```text
src/
  app/
    providers/
    router/
    store/
  components/
  features/
  hooks/
  lib/
  pages/
  schemas/
  types/
  main.tsx
```

Mantener `features/` como unidad de negocio cuando la app crezca. Si la tarea es pequena, no forzar capas extras.

## Versiones Y Dependencias

- React: usar `19.1.1` o una version estable superior confirmada en la documentacion oficial. No asumir `19.2.4` si no existe.
- TypeScript: usarlo por defecto en lugar de JavaScript.
- Zustand: usar `create()` para stores globales con estado y acciones explicitas.
- Zod: validar datos con esquemas (`z.object`, `z.string`, etc.) y `parse` o `safeParse`.
- React Hook Form: integrarlo con Zod en formularios React.
- React Query o SWR: usarlo cuando se obtengan datos de API que deban compartirse, cachearse o refrescarse.

Leer [react-stack.md](./references/react-stack.md) cuando se necesiten comandos base, dependencias recomendadas o un ejemplo minimo de store y formulario.

## Reglas De Componentes

- Mantener los componentes pequenos, simples y con una sola responsabilidad.
- Mover la logica reutilizable a custom hooks como `useAuth` o `useFetch`.
- Compartir logica entre eventos usando funciones reutilizables o hooks.
- Para comunicar cambios al padre, usar callbacks por props y ejecutarlos desde el hijo.
- No llamar hooks dentro de bucles, condicionales o funciones anidadas.
- Evitar side effects durante el render. Componentes y hooks deben ser puros.

## Reglas De Estado

- No mutar el estado directamente. Crear nuevas copias de objetos o arrays.
- Usar Zustand para estado global; mantener acciones pequenas y orientadas a eventos.
- Para reiniciar o ajustar estado, preferir `key`, derivar desde props o actualizar en handlers.
- Usar `useMemo` para cachear calculos costosos, no como parche por defecto.

## Reglas De Effects

- Usar `useEffect` solo para sincronizar con sistemas externos como API, DOM o librerias.
- No usar `useEffect` para logica derivada de props o estado; calcularla en render o en event handlers.
- Mantener los effects simples y con dependencias claras.
- La logica causada por interaccion del usuario debe vivir en event handlers, no en `useEffect`.

## Reglas De Formularios Y Datos

- Definir esquemas Zod cerca del dominio o dentro de `schemas/`.
- Validar entradas externas antes de guardar en estado o enviar a una API.
- En formularios, integrar React Hook Form con Zod y mostrar errores tipados y concretos.
- Si el componente consume datos remotos compartidos, preferir React Query o SWR antes que fetch manual repetido.

## Salida Esperada

Cuando la tarea implique crear o modificar codigo React:

- Crear archivos `.ts` y `.tsx`.
- Mantener tipado explicito en props, estado y datos externos.
- Evitar sobrearquitectura; elegir la menor estructura que resuelva el caso.
- Explicar brevemente cualquier decision de stack que cambie lo existente.

## Ejemplos De Activacion

- "Crea una app React con TypeScript para administrar cursos."
- "Agrega un formulario con React Hook Form y Zod."
- "Necesito un store global con Zustand para autenticacion."
- "Refactoriza este componente React para separar hooks y UI."
- "Agrega cache de datos con React Query."

## Recursos

- Referencia tecnica: [react-stack.md](./references/react-stack.md)
