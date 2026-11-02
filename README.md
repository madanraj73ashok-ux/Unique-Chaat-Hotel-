# UNIQUE CHAAT

A complete responsive restaurant frontend with original saffron, aubergine and cream branding. Menu content reflects the supplied photograph, with uncertainty clearly disclosed. No KFC branding or assets are used.

## Open the website

Double-click **index.html** to open the finished website. The bundled UI, menu, local food photographs and SVG backgrounds, and ordering demo work without an internet connection or an installation.

For a local web preview, install Node.js 18+ if needed, open a terminal in this folder, and run:

```sh
npm start
```

Then open http://127.0.0.1:4173. The server is bound to this computer only. This is a preview server, not a production backend. Upload the static website files to a static host when the business is ready; hash routes need no server rewrite rules.

## Site architecture

| Area | Address | Purpose |
|---|---|---|
| Home | `#/` | Brand introduction, featured categories, four menu picks, sample offer and story |
| Menu | `#/menu` | 99 photo-transcribed items, 12 categories, text search and dietary filters |
| Item details | Accessible modal from each menu card | Price, disclosure, sample spice settings, chaat add-ons and quantity |
| Cart | Header basket button | Persistent local cart, quantities, removal, promo and delivery/pickup |
| Checkout | `#/checkout` | Details → review → explicit demo completion |
| Confirmation | `#/confirmation` | Temporary demo receipt, zero charged and printable summary |
| Offers | `#/offers` | Two clearly labeled sample promotions |
| Our story | `#/about` | Draft brand introduction without invented history |
| Contact | `#/contact` | Validated demo form and clearly pending business details |

## Functional now

- Responsive desktop/tablet/mobile layouts, mobile navigation and keyboard focus indicators.
- Search and combined category + vegetarian/non-vegetarian filtering; empty results and reset.
- Item dialogs with focus containment and Escape dismissal, quantity selection and sample customizations.
- Cart variants remain separate by spice and add-ons. Identical configurations merge. Maximum 20 per configuration.
- Cart, sample promo and delivery method persist in local storage. Malformed saved data is normalized.
- Demo promo `CHAAT15`: 15% off food subtotals of ₹300+, maximum ₹80. Recalculates when quantities change.
- Demo delivery ₹35; free at ₹499 food subtotal before discounts. Pickup is free. No separate tax is calculated.
- Required fields, basic Indian phone/PIN formats, address validation, editable checkout review and demo confirmation.
- Contact form validates input and explicitly says nothing was sent.
- No payment details requested. No orders or messages transmitted. No analytics, external fonts or remote image dependencies.
- Optional UI enhancement bundle: Motion Primitives animation, Watermelon animated filters, card spotlights and local SVG backgrounds. Reduced-motion preferences are honored.

## Menu provenance and decisions

99 readable entries were transcribed from the photograph, in Pizza, Burgers, Sandwiches, Wraps, Mini chaat, Noodles & pasta, Quick bites, Starters, Fried chicken, Milkshakes, Mojitos and Lassi.

- **These are photo-transcribed prices, not confirmed current prices.** The visible photograph date is 2025-11-02; this project was prepared on 2026-11-02.
- The cropped vanilla milkshake price, Green Apple Lassi price, ice creams, faloodas, fresh juices and the cropped phone number were not guessed.
- The board’s “Extra Cheese / Vegetable” pizza surcharge of ₹20 is mentioned but not enabled as an option because the exact choices and applicability need confirmation.
- “KFC Chicken Bites” is displayed as **Crispy Chicken Bites**, ₹120, for original restaurant branding.
- Obvious spelling has been normalized (for example, Paneer and Omelette). Other menu names remain close to the photograph.
- Vegetarian/non-vegetarian classification follows the board’s columns and explicit item names. Waffles is unclassified because egg content is unknown. Labels are not an allergen guarantee.
- Descriptions, representative photos, offers and customization options are placeholders. Recipes, portions, pizza sizes, drink volumes and allergens are pending.

## Needed before real orders

1. Confirm the full/current menu, prices, taxes, dietary classifications, ingredients, allergens, portions, add-ons and unavailable items. Supply the cropped part of the menu and approved real food photography if desired.
2. Provide restaurant address, phone/WhatsApp, email, opening hours, pickup instructions, service radius/PIN codes, preparation times and delivery charges.
3. Approve the brand copy and promotions; supply business history if wanted.
4. Connect a server-side menu/pricing source, inventory, order storage, service-area validation and restaurant notifications/order management.
5. Integrate payment processing server-side with verified webhooks, idempotency, final server-calculated totals, refunds and order state handling. This demo has no payment credentials or gateway.
6. Connect the contact form and publish approved privacy, terms, cancellation/refund and food/allergen policies.
7. Configure hosting/domain, HTTPS, production monitoring, backups and end-to-end checks against the real ordering service.

## Source files

- `index.html` — persistent page shell and accessible dialogs.
- `menu-data.js` — editable menu data and source annotations.
- `core.js` — pure pricing and cart normalization.
- `app.js` — route rendering and demo state/actions.
- `styles.css` / `motion.css` — responsive design and interaction styling.
- `src/ui.jsx` / `src/vendor/` — React enhancement islands and adapted/vendor component sources.
- `ui-bundle.js` — prebuilt local production bundle; no installation needed to view.
- `assets/` — local representative food photographs, photo credits and original SVG backgrounds.
- `DESIGN-SOURCES.md` / `licenses/` — source mapping and licensing.
- `TEST-REPORT.md` — checks performed and limitations.

To rebuild the enhancement bundle after editing React source:

```sh
npm install
npm run build
npm test
```

`npm test` runs the dependency-free pricing/cart checks. For browser tests, install development dependencies and run `npm run test:browser` (Google Chrome installed, or set `BROWSER_PATH` to a Chromium browser executable). The browser tests use a clean browser profile and sample data only.

## Privacy of the demo

Contact-form content is never submitted. Checkout information exists only in page memory and is cleared when leaving checkout, completing the flow or reloading. Only basket items, mode and a sample promo code persist. “Privacy & demo info” in the footer can clear saved demo state. A real privacy policy is not provided by this prototype.



## Separate admin dashboard

Open **http://127.0.0.1:4173/admin/** for the separate dashboard. It includes overview, simulated incoming orders, order status updates, menu management shared with the customer preview in this browser, sales reports and CSV exports. This is a local demo with sample orders and no staff authentication or live backend. See `admin/README.md` for functionality, calculation rules and production requirements. Run the server first, install development dependencies if needed, then use `npm run test:admin` to verify it.
