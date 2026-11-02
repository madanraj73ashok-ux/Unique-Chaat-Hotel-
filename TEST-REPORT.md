# Verification report

Tested locally on 2026-11-02 using installed Google Chrome through Playwright, against the delivered files in a clean browser context. No real orders or messages were sent.

## Passed

- All 99 IDs unique; all menu prices positive integer rupee amounts; sampled Pani Poori price ₹50 matches the supplied board.
- Cart normalization rejects unknown items, ignores unknown/duplicate extras, bounds quantities and merges equivalent configurations.
- Unit prices account for add-ons and quantities. Different spice configurations remain distinct. Drinks discard spice/add-ons.
- Promo below/at threshold and maximum cap; delivery below/above ₹499; free pickup; invalid code; empty basket total.
- Complete browser flow: search → dietary filter → category → Dahi Poori → Fiery → extra sev → quantity 2 → add → reload and retain cart.
- Invalid promo rejection, stored code below minimum, quantity increase unlocking offer, delivery/pickup recalculation.
- Arithmetic scenario: 4 × (₹80 + ₹15) = ₹380; 15% discount ₹57; delivery ₹35; total ₹358. Pickup total ₹323.
- Empty required checkout rejected; sample phone, address, city and PIN accepted; details review; demo completion shows ₹358 order value and ₹0 charged; basket cleared.
- Contact form accepts valid sample content and explicitly confirms nothing was sent.
- Mobile hamburger opens/closes; navigating closes it; mobile add/remove updates cart and empty state.
- Six routes at widths 360, 390, 768, 1024 and 1440 px: no horizontal document overflow and one main heading each (30 combinations).
- Escape closes item customization. Browser runtime error collection was empty.
- Full flow repeated successfully after introducing the React/Motion Primitives/Watermelon enhancement bundle.

The desktop homepage, mobile homepage, mobile customization, and checkout confirmation were visually inspected using screenshots. The food illustrations and missing business information are explicitly labeled.

## Limits

This verifies the frontend prototype. It is not a full accessibility audit, real payment test, order-system test, delivery-service test or confirmation of menu accuracy. Current prices and cropped/unreadable menu entries must still be confirmed. Chromium was tested; Safari/Firefox and real iOS/Android devices were not available for this run.

Native desktop Computer Use ended because its helper could not reliably determine the active browser URL. Browser tests and screenshots were completed separately against the local files. The embedded app-browser connection to localhost timed out, so the standalone `index.html` is the reliable preview deliverable.

Photo update: replaced rendered food illustrations with 15 local Pexels photographs. Verified all 99 menu photo elements and all homepage images decode successfully. Repeated the ordering/browser checks successfully and inspected mobile/desktop crops. Source details are in PHOTO-CREDITS.md.


Final visual update: black background; transparent gold lettering extracted using the built-in image tool; individual photo registry replaces category fallback. 74 photos reviewed, including 11 distinct pizza photos. Unverified variants use explicit pending panels. Photo credits are accessible from the footer.

Payment plan update: Cash on Delivery and GPay on Delivery choices added, with pickup wording when applicable. Eight logic tests pass. Browser checks passed for default cash, selecting GPay, review/back persistence, fulfillment switching without losing delivery details, mobile fit, no-charge demo confirmation and admin collection instructions.
