# UNIQUE CHAAT Admin Dashboard

Separate entry point: **http://127.0.0.1:4173/admin/** (or `admin/index.html`). Run `npm start` from the project root to start the local preview.

## Working functionality

- **Overview:** today's sample net food sales, order counts, active queue, average food order, seven-day sales chart and recent orders.
- **Orders:** local sample order inbox, search by order/guest/dish, status filters, pagination, details, price snapshots, kitchen note and activity history. “Receive demo order” creates an incoming sample order. Accept → Preparing → Ready → Delivered/Collected. Cancellation records a reason. Status persists across reloads and synchronizes between admin tabs on the same origin.
- **Menu:** imports all 99 photographed-menu entries. Search, category and availability filters, pagination, create/edit, price updates, availability, archive and restore. Duplicate active names, blank fields and invalid prices are rejected. Changes persist locally and appear on the customer preview after refresh at the same site address in the same browser. New items have an explicit pending-photo panel. Original menu source files and historical order prices are retained.
- **Reports:** seven-day, thirty-day and custom ranges; completed-order food sales, discounts, delivery fees, order value, best-selling dishes and daily sales charts. Exports filtered orders or sales as CSV. Cancelled/active orders are excluded from completed sales. Date groups use Asia/Kolkata. CSV values are escaped, including protection against spreadsheet formula interpretation.
- Responsive sidebar/mobile navigation, keyboard focus indicators, modal dialogs and reduced-motion support.

## Data and calculation rules

Orders and guests are fictional. A sample history is initialized on first use, including current orders and the last 30 days. The customer site's demo checkout does **not** feed this queue; use “Receive demo order” to test incoming orders.

`unique-chaat-admin-orders-v1` stores sample orders in local storage. `unique-chaat-catalog-v1` stores menu overrides shared with the customer preview on the same origin. Browser storage is not a server, database, access-control mechanism or reliable real order inbox. A different browser/device/address has separate state. The original 99-item menu remains the baseline. No real personal information or payment details are used.

Food sales = completed order food subtotals minus discounts. Delivery fees are separate. Average food order = net food sales divided by completed orders. Historical orders retain their original unit prices. Reports use order-creation dates and current statuses; changing an order to Completed includes it under its creation date. All actual charges are ₹0.

## Needed for production

Staff authentication, server-enforced permissions, database-backed menu/orders, server-side pricing/validation, stock handling, payment/webhook verification, customer order integration, push/realtime notifications and audit logging. Business-specific GST, refund and accounting/reporting rules must also be supplied. This dashboard intentionally has no pretend password screen and is explicitly labeled a local demo; it must not be exposed as a live administration service.

## Validation

Browser tests cover simulated incoming orders, status progression, persistence, cancellation, search, menu editing, customer-preview synchronization, item availability, archiving/restoration, creating items, date filtering/validation, CSV export, mobile navigation and 16 route/width combinations. Screenshots are saved in this folder. The portable logic checks include `tests/catalog.test.cjs` at the project root.

## Payment plan
Sample orders show Cash or GPay to be collected at delivery/pickup. Exports include the planned method. No online advance payment is offered, and collection is not verified by the demo. See PAYMENT-PLAN.md in the project root.
