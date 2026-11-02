<<<<<<< HEAD
# Horarios por secciones · Tienda

App web para generar horarios trimestrales de empleados por secciones.
Sin dependencias ni servidor: HTML + CSS + JavaScript puro.

## Cómo usarla
Abre `index.html` con doble clic en cualquier navegador moderno.
Los datos se guardan en el navegador (`localStorage`).

## Estructura
```
horarios-tienda/
├── index.html              Estructura de la página y carga de CSS/JS
├── css/
│   ├── tokens.css          Colores, glass, modo oscuro
│   ├── base.css            Reset, fondo, tipografía
│   ├── layout.css          Cabecera, contenido, barra lateral, responsive
│   ├── components/         cards, forms, buttons, timeline, modal
│   ├── pages/              planifica, horarios, home
│   └── print.css           Impresión / PDF (se carga el último)
└── js/
    ├── core/               constants, utils, state (datos + localStorage)
    ├── services/           scheduler.js  → motor gen() que reparte turnos
    ├── components/         day-toggles, timeline, warnings, edit-modal, sidebar
    ├── pages/              plan (Planifica), horarios, home
    └── app.js              Arranque
```

## Notas
- Los scripts son clásicos (no módulos ES) y comparten ámbito global, por lo que
  funcionan abriendo el archivo directamente. **El orden de los `<script>` en
  `index.html` importa**: core → services → components → pages → app.
- Reglas del generador (`js/services/scheduler.js`): un turno por persona y día,
  11 h de descanso entre turnos, respeta horas de contrato, disponibilidad por
  sección y trimestre, ausencias y ediciones manuales.
- Los colores corporativos se cambian en `css/tokens.css`.
=======
# Schedule1073
>>>>>>> bc91aa17dd77bb41a5ea06a8294ccce743fdf66c
