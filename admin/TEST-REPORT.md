# Admin dashboard verification

Tested on 2026-11-02 using installed Google Chrome and Playwright against the local HTTP preview, with a fresh browser profile and fictional sample data.

Passed browser checks:

- Overview and sample historical sales load without JavaScript errors.
- Receiving a simulated incoming order increments the New queue count.
- Accept, prepare, mark ready, hand over/deliver and complete; status persists on reload.
- Cancelling a sample order records a reason, closes the order and excludes it from completed sales.
- Order search empty state and reset.
- Editing Dahi Poori from ₹80 to ₹95 appears in the customer site after refresh.
- Marking the item unavailable hides it from the customer menu after refresh; re-enabling restores it.
- Archive, archived filter and restore.
- Adding a new test dish appears in the customer preview after refresh.
- Report quick ranges, summary values, sample CSV download and invalid date rejection.
- Overview, Orders, Menu and Reports at widths 360, 390, 768 and 1440 px: one main heading and no horizontal document overflow in all 16 combinations.
- Mobile sidebar closes when navigating, including selecting a current link.
- Runtime error collection empty.

Seven pure logic tests also pass: original cart/pricing checks plus catalog override validation, original menu preservation, new item normalization and archive/category behavior.

Screenshots reviewed: desktop overview, mobile overview, Orders and Sales Reports. Tables scroll within their panels on mobile.

Production authentication, database-backed order reception, payments, customer checkout-to-inbox integration and real-device testing are not part of this local demo. Customer checkout continues to be a separate demo flow; “Receive demo order” is the inbox simulator.
