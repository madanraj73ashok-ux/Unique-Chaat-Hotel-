# Payment plan — UNIQUE CHAAT

Customers pay when receiving their food. The checkout choices are:

1. **Cash on delivery** — hand cash to delivery staff when the order arrives.
2. **GPay on delivery** — pay using the staff-provided QR or UPI details when the order arrives.

For pickup, the same choices read **Cash at pickup** and **GPay at pickup**. There is no advance online payment step, payment redirect or online card option. No QR or payment address is invented or embedded in the checkout.

The selected method is retained through checkout review and the temporary demo confirmation. Admin sample-order details show the intended payment method and handover instructions; order CSV exports include the method. A completed demo order does not prove that payment was collected. No actual money is charged or verified by this prototype.

The customer checkout and admin simulator remain separate demo flows until a real order backend is connected. Once live ordering is implemented, the server must store the selected method with the order. Staff will need to verify GPay receipt on the business’s receiving account at handover, and record the actual collection method and status.

The business will supply its receiving GPay/UPI account or QR to delivery staff before live operation. It is not needed to preview this payment-choice flow.
