# ZYLUX Electrical — E-commerce Homepage Demo

A single-page, fully interactive storefront homepage for **ZYLUX Electrical** (Safe • Smart • Sustainable), built with React, TypeScript, Tailwind CSS v4, Vite, Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into /dist
npm run preview    # serve the production build
npm run images     # re-generate optimised WebP images from /assets-src
```

## What's included

- **Header**: utility bar, a sticky header that compacts on scroll, search with suggestions, recent and popular searches, product thumbnails, category matches and a no-results state, plus account, wishlist and cart counters with the cart total.
- **Mega menus** for All Categories, the seven departments and Brands. They open on hover, keyboard focus or tap. Tab moves between menus; ArrowDown or Enter moves into a panel; Esc closes it.
- **Mobile**: a two-level category drawer and a full-screen search overlay.
- **Homepage sections**:
  - Hero carousel with autoplay, pause, arrows and progress indicators
  - Trust strip
  - Category grid
  - Product grid with tabs, category filter and sort
  - Promotional banners
  - Shop by application
  - Interactive smart-home scene demo
  - Brand marquee
  - Offers with a clearly labelled simulated countdown
  - Testimonials
  - Bulk enquiry section
  - Knowledge Hub guides that open in a modal
  - FAQ accordion
  - Newsletter
  - Full footer
- **Shop interactions**:
  - Cart drawer: change quantity, remove items, subtotal
  - Wishlist drawer
  - Quick view
  - Toasts
  - Bulk-quote modal with validation
  - Info modals: track order, contact, shipping, returns, privacy, terms
- The cart, wishlist and recent searches persist in `localStorage`.

Every navigation link scrolls to a section, filters the product grid or opens a dialog. There are no other routes.

## Editing content

All content is typed mock data in `src/data/`:

| File | Contents |
| --- | --- |
| `products.ts` | Product catalogue (price, MRP, specs, flags, availability, image) |
| `navigation.ts` | Departments, mega-menu columns, thumbnails, promos, demo brands |
| `content.ts` | Hero slides, trust items, category tiles, banners, applications, testimonials, FAQs, guides, info-modal text |
| `types.ts` | Shared types |

## Demo-only content (replace before launch)

- **Brands**: Lumora, Voltix, Corelink, Safeguard, Aeroflow, Ampere One, Brightwave and Nexa Smart are fictional placeholders. No partnership or dealership is implied.
- **Sample data**: all prices, ratings, review counts, offers and testimonials are samples and are labelled as such in the UI.
- **Contact details**: the phone, email, address, WhatsApp number and social links are placeholders.
- **Forms**: checkout, the bulk enquiry form and newsletter sign-up are simulated. No data is sent or stored.

## Images

- **Client-supplied**: logo, ambient living room, architectural interior, matte switch panel and wire coils. Source files are in `assets-src/`, and crops are defined in `scripts/optimize-images.mjs`.
- **Product renders**: `public/images/renders/*.svg` are studio-style placeholder renders for products without photography (MCB, RCCB, distribution board, socket, switch, bulbs, panel, floodlight, batten, exhaust fan, smart plug, multimeter). Swap them for real catalogue photos when available.
- **CC0 / public-domain photography** from rawpixel.com. No attribution is required, but sources are listed below:
  - LED spotlight / downlights — rawpixel.com/image/6021726, /6021716, /6021731
  - Filament bulb — rawpixel.com/image/5907980
  - Ceiling fan — rawpixel.com/image/6076103
  - Home interior with fan — rawpixel.com/image/6081010
  - Extension board — rawpixel.com/image/6018638
  - Plug — rawpixel.com/image/6033510
  - Pendant lights — rawpixel.com/image/6035822
  - Industrial hall — rawpixel.com/image/5960165
  - Cable drum — rawpixel.com/image/6052097
  - Office — rawpixel.com/image/5916279
  - Construction — rawpixel.com/image/6113843, /6039202
