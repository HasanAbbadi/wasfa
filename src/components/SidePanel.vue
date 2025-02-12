<template>
  <div id="side-panel">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style>
#side-panel {
  position: fixed;
  display: flex;
  justify-content: space-around;
  background-color: var(--color-background-soft);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  padding: 10px;
  z-index: 99;
  user-select: none;
}

#side-panel {
  bottom: 0;
  right: 0;
  height: 100%;
}

#side-panel {
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  top: 0;
  height: 100%;
  border-radius: 0;
  gap: 1rem;
  padding-inline: 1.2rem;
}

#side-panel .content {
  flex: 1;
  margin: auto;
  margin-top: 1.5em;
}

#side-panel:has(.content *) {
  width: minmax(80%, 500px);
}

/* https://css-shape.com/inverted-radius/ */
#side-panel::before {
  --r: 2px; /* the radius */
  --s: calc(var(--r) * 9); /* size of inner curve */
  --x: 0px; /* horizontal offset (no percentane) */
  --y: 0px; /* vertical offset (no percentage) */
  --width: 20px;

  content: '';
  position: absolute;
  top: 0;
  inset-inline-start: calc(var(--width) * -1);

  width: var(--width);
  aspect-ratio: 1;
  background: var(--color-background-soft);
  --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000 72%);
  --_g: conic-gradient(from 180deg at var(--r) calc(100% - var(--r)), #0000 25%, #000 0);
  --_d: (var(--s) + var(--r));
  mask:
    calc(var(--_d) + var(--x)) 100% var(--_m),
    0 calc(100% - var(--_d) - var(--y)) var(--_m),
    radial-gradient(var(--s) at 0 100%, #0000 99%, #000 calc(100% + 1px)) calc(var(--r) + var(--x))
      calc(-1 * var(--r) - var(--y)),
    var(--_g) calc(var(--_d) + var(--x)) 0,
    var(--_g) 0 calc(-1 * var(--_d) - var(--y));
  mask-repeat: no-repeat;
  z-index: 100;
}

@media (max-width: 1024px) {
  #side-panel {
    display: none;
  }
}
</style>
