# Design and component sources

The site retains an original UNIQUE CHAAT identity. These sources were reviewed and applied at the user’s request. They are not restaurant partners or endorsements.

| Source | What is actually used | Integration |
|---|---|---|
| [Motion Primitives](https://motion-primitives.com/docs/animated-group) | The actual `AnimatedGroup` component from the official repository; blur-slide preset and a 0.1-second stagger for the hero headline | Vendored React/TypeScript source in `src/vendor/animated-group.tsx`, rendered by `src/ui.jsx` and compiled into the shipped bundle. Reduced motion overrides movement and blur. |
| [Watermelon UI Continuous Tabs](https://ui.watermelon.sh/animated-components/continuous-tabs) | Adapted official Continuous Tabs source with spring-animated shared background pill | `src/vendor/continuous-tabs.jsx`. Restyled to the restaurant palette, wired to dietary filtering, retains keyboard focus and adds `aria-pressed`, unique layout-group IDs and reduced-motion support. |
| [21st.dev spotlight guidance](https://21st.dev/blog/react-spotlight-effect-components) and [component catalog](https://21st.dev/) | Pointer-tracked radial spotlight pattern, richer interactive cards and button highlight treatment | Original native implementation in `src/ui.jsx` and `motion.css`; uses one delegated listener and CSS variables. This is a design-pattern implementation, not an installed proprietary 21st component. |
| [Haikei](https://haikei.app/) / [Layered Waves](https://app.haikei.app/?generator=layered-waves) | Organic blob composition, layered wave and scatter background styles | Original locally authored SVGs `haikei-blobs.svg`, `haikei-waves.svg`, `haikei-scatter.svg`. These are Haikei-inspired editable assets, **not exports from the Haikei application**. |

Motion Primitives source: https://raw.githubusercontent.com/ibelick/motion-primitives/main/components/core/animated-group.tsx

Watermelon source: https://registry.watermelon.sh/r/continuous-tabs.json

Upstream MIT license texts are included in `licenses/`. React, React DOM, Motion and transitive runtime license texts are also included. The bundled script carries its generated license notice companion.

No code was copied from sign-in-gated components. No KFC marks, slogans, packaging or assets were used. Food illustrations have been replaced with 15 locally stored representative Pexels photographs. See PHOTO-CREDITS.md and assets/photos/credits.json for sources and licensing. Related items may share a category photo; actual dishes may vary.

## Motion behavior

- Hero headline: Motion Primitives `AnimatedGroup`, 20 px slide, blur fade and staggered segments.
- Dietary segmented filters: Watermelon shared layout pill, spring stiffness 380 / damping 30 / mass 0.9.
- Menu cards/sections: intersection-triggered reveal; no hidden content dependency if animation support is unavailable.
- Cart: animated delivery-threshold indicator using Motion, plus an accessible progress bar.
- Dialog/cart entrances: short transitions; native modal semantics and focus containment remain intact.
- Hover spotlight: pointer events only, no touch tracking and no React render loop.
- All nonessential movement and shine are disabled under `prefers-reduced-motion: reduce`.
- No continuously running infinite animations or auto-advancing promotional content.



## Current brand and photography revision

The supplied photographed gold wordmark was cleaned using the built-in image tool, background-extraction mode. Prompt: remove the photographed background and small tagline; preserve only the two gold calligraphic words Unique Chaat and their flourishes on true transparency. Final asset: assets/unique-chaat-lettering.png. The photo registry now selects each menu image individually; source and license attribution are in photo-credits.html and assets/dishes/credits.json. Black theme overrides are in dark.css.
