# Implementación incremental de rueda aleatoria

## Resumen

Dividir la construcción en 3 etapas ejecutables y testeables por separado, de menor a mayor complejidad:

1. Base con estado de configuración por defecto y layout dark.
2. Lógica y animación de la rueda usando esa configuración fija.
3. Panel derecho para editar opciones, colores y probabilidades en tiempo real.

La idea es que cada etapa deje una app usable, de modo que puedas validar comportamiento antes de pasar a la siguiente.

## Etapa 1: Base y configuración por defecto

Objetivo: dejar la app montada con una rueda renderizada desde datos estáticos en estado local, sin edición aún.

Implementar:

- Reemplazar el `Hello world` por la pantalla principal dark con dos zonas visuales:
  una principal para la rueda y una reserva visual para el panel derecho.
- Definir un estado inicial con varias opciones precargadas:
  `id`, `label`, `color`, `percentage`.
- Agregar helpers puros para:
  normalizar porcentajes, calcular segmentos angulares y resolver colores por defecto.
- Renderizar la rueda desde ese estado inicial, con los labels dentro de cada segmento.
- Mostrar abajo un bloque de estado simple:
  “hacé click para girar” o similar, aunque todavía no gire.

Resultado esperado de esta etapa:

- ya se ve la rueda final con estética oscura
- las opciones aparecen dentro de sus segmentos
- la distribución visual respeta los porcentajes
- no existe todavía interacción real de giro ni edición

Pruebas de esta etapa:

- la rueda renderiza siempre al abrir la app
- los segmentos suman 360 grados
- los labels coinciden con la configuración inicial
- el layout funciona en desktop y mobile

## Etapa 2: Giro y selección aleatoria

Objetivo: hacer funcionar la rueda sin depender todavía del panel derecho.

Implementar:

- Agregar estado para:
  `isSpinning`, `selectedOptionId`, `currentRotation`.
- Al hacer click en la rueda:
  elegir una opción ganadora según sus probabilidades reales.
- Calcular un ángulo final que alinee el centro del segmento ganador con el puntero fijo.
- Animar varias vueltas completas con desaceleración.
- Bloquear nuevos clicks mientras el giro está en curso.
- Al finalizar, anunciar debajo de la rueda cuál fue la opción elegida.

Regla clave:

- primero se elige el ganador por peso
- después se calcula la animación que hace caer la rueda en ese segmento
- no al revés

Resultado esperado de esta etapa:

- la rueda ya funciona de punta a punta
- el resultado visual coincide con el texto anunciado
- la app sigue usando solo configuración local por defecto

Pruebas de esta etapa:

- un click dispara un solo giro
- no se puede iniciar otro mientras gira
- el puntero termina sobre el segmento ganador
- el nombre mostrado abajo coincide con el segmento final
- probabilidades extremas como 1% / 99% siguen funcionando

## Etapa 3: Panel derecho de configuración

Objetivo: conectar edición en vivo sobre la rueda ya funcional.

Implementar:

- Completar el panel derecho con edición inline por fila.
- Cada fila tendrá:
  nombre, color, porcentaje y acciones de agregar/eliminar.
- El porcentaje visible tendrá hover con desplegable/control para ajustar el valor.
- Cuando se cambia el porcentaje de una opción:
  las demás se redistribuyen proporcionalmente para conservar 100%.
- Cuando se agrega o elimina una opción:
  se renormalizan los porcentajes automáticamente.
- Mientras la rueda gira:
  bloquear edición para evitar inconsistencias de estado.
- todo el estado queda almacenado en el localstorage para que durante inicios nuevos este la configuracion previa
- boton de reset para limpiar todas las config

Resultado esperado de esta etapa:

- el panel controla completamente la rueda
- todos los cambios se reflejan inmediatamente
- la rueda sigue girando con las nuevas probabilidades

Pruebas de esta etapa:

- editar nombre actualiza el label del segmento
- cambiar color actualiza el fondo del segmento
- editar porcentaje mantiene total 100
- agregar opción genera estado válido
- eliminar opción redistribuye correctamente
- no se puede dejar la rueda en un estado inválido para girar

## Cambios de diseño y estructura

Conviene separar la implementación en piezas chicas desde el principio:

- `App`: composición general de layout y estado principal
- componente de rueda: render + puntero + resultado visual
- componente de panel: edición de opciones
- helpers puros para probabilidades, segmentos y spin

Tipos internos mínimos:

- `WheelOption`
- `WheelSegment`
- `SpinState` o equivalente simple para giro actual

## Supuestos y defaults

- modo oscuro únicamente
- `SVG` para dibujar la rueda
- click directo sobre la rueda para girar
- panel inline por fila
- redistribución proporcional de probabilidades
- set inicial de opciones cargado por defecto para poder probar desde la etapa 1
- cada etapa debe quedar mergeable y usable por sí sola

# Librerias disponibles

preact
tailwindcss
motion
Zustand

