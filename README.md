# A M Hardware & Software Services at Doorstep

Frontend web application built with **Next.js (App Router)**, **React**, **TypeScript**, and **Bootstrap 5**.
Service queries, doorstep technician bookings, and ticket status checks are sent directly via **WhatsApp** or **Email**—no backend server required.

## Run Locally
1. Install Node.js 18+ (tested with Node 24).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Production Build
```bash
npm run build
npm start
```

## Key Features
- Responsive Bootstrap 5 UI with Bootstrap Icons & Plus Jakarta Sans typography
- Interactive Quick-Select hero & clickable hardware/service cards that pre-fill the booking form
- Validated doorstep booking form with auto-generated Ticket Reference (`AM-YYYY-XXXXXX`)
- Direct **Send via WhatsApp** (`wa.me`) and **Send via Email** (`mailto:`) query submission + copyable message preview
- Service coverage selector for **Noida**, **Ghaziabad**, and **Vijay Nagar, Ghaziabad**
- Browser-saved recent ticket references + WhatsApp/Email ticket status check
- FAQ accordion & floating WhatsApp / Call quick actions
