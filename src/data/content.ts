import { BadgeCheck, Factory, Headset, PackageOpen, Zap } from 'lucide-react';
import type { CategoryTile, Cta, Guide, HeroSlide, InfoKey, Testimonial } from './types';

export const heroSlides: HeroSlide[] = [
  {
    id: 'brand',
    eyebrow: 'ZYLUX Electrical · Safe • Smart • Sustainable',
    title: ['Powering every space.', 'Elevating every experience.'],
    text: 'Discover smart lighting, reliable wiring, elegant switches, and essential electrical solutions for every space.',
    image: '/images/hero-living.webp',
    imageSm: '/images/hero-living-sm.webp',
    alt: 'Contemporary living room with warm architectural LED cove lighting',
    position: 'object-[70%_center]',
    ctas: [
      { label: 'Explore Products', action: { type: 'scroll', target: '#products' } },
      { label: 'Shop Categories', action: { type: 'scroll', target: '#categories' } },
    ],
  },
  {
    id: 'lighting',
    eyebrow: 'Lighting Collection',
    title: ['Lighting that', 'transforms spaces.'],
    text: 'From efficient everyday lighting to sophisticated decorative solutions.',
    image: '/images/hero-architectural.webp',
    imageSm: '/images/hero-architectural-sm.webp',
    alt: 'Open-plan living space with linear LED profile lighting and floor-to-ceiling glass',
    position: 'object-center',
    ctas: [{ label: 'Explore Lighting', action: { type: 'browse', department: 'lighting' } }],
  },
  {
    id: 'cables',
    eyebrow: 'Wires & Cables',
    title: ['Built for reliability.', 'Designed for performance.'],
    text: 'Explore wiring and cable solutions for homes, businesses, and industrial projects.',
    image: '/images/hero-cables.webp',
    imageSm: '/images/hero-cables-sm.webp',
    alt: 'Coils of red, yellow, blue, black and green copper house wire',
    position: 'object-[80%_center]',
    ctas: [{ label: 'Explore Wires & Cables', action: { type: 'browse', department: 'wires' } }],
  },
  {
    id: 'smart',
    eyebrow: 'Smart Electrical Solutions',
    title: ['Smarter control', 'starts here.'],
    text: 'Modern switches, protection devices, and intelligent electrical accessories.',
    image: '/images/hero-switch.webp',
    imageSm: '/images/hero-switch-sm.webp',
    alt: 'Matte black three-gang touch switch panel with illuminated indicators',
    position: 'object-[75%_center]',
    ctas: [{ label: 'Discover Smart Solutions', action: { type: 'browse', department: 'smart' } }],
  },
];

export const trustItems = [
  { icon: BadgeCheck, title: 'Quality-focused Selection', text: 'Curated ranges for dependable installs' },
  { icon: Zap, title: 'Electrical Essentials', text: 'Lighting, wiring, switching & protection' },
  { icon: Factory, title: 'Home & Industrial Solutions', text: 'Residential to plant-floor requirements' },
  { icon: PackageOpen, title: 'Bulk Order Enquiries', text: 'Project quotes for contractors' },
  { icon: Headset, title: 'Dedicated Product Support', text: 'Help choosing the right product' },
];

export const categoryTiles: CategoryTile[] = [
  { label: 'LED Lighting', image: '/images/p-led-spot.webp', hint: 'Bulbs · Panels · Downlights', action: { type: 'browse', department: 'lighting', sub: 'LED Lighting' } },
  { label: 'Decorative Lighting', image: '/images/pendant-lights.webp', hint: 'Pendants · Chandeliers · Strips', action: { type: 'browse', department: 'lighting', sub: 'Decorative Lighting' } },
  { label: 'Switches & Sockets', image: '/images/smart-switch.webp', hint: 'Modular · Premium · Smart', action: { type: 'browse', department: 'switches' } },
  { label: 'Wires & Cables', image: '/images/wire-coils.webp', hint: 'House wires · FRLS · Armoured', action: { type: 'browse', department: 'wires' } },
  { label: 'Fans & Ventilation', image: '/images/p-ceiling-fan.webp', hint: 'BLDC · Ceiling · Exhaust', action: { type: 'browse', department: 'fans' } },
  { label: 'MCBs & Protection', image: '/images/renders/mcb.svg', hint: 'MCB · RCCB · RCBO · SPD', action: { type: 'browse', department: 'protection', sub: 'Circuit Protection' } },
  { label: 'Distribution Boards', image: '/images/renders/db.svg', hint: 'SPN · TPN · Enclosures', action: { type: 'browse', department: 'protection', sub: 'Distribution Boards' } },
  { label: 'Electrical Accessories', image: '/images/extension-board.webp', hint: 'Extensions · Plugs · Fittings', action: { type: 'browse', department: 'accessories' } },
  { label: 'Smart Home', image: '/images/ambient-living.webp', hint: 'Smart bulbs · Plugs · Scenes', action: { type: 'browse', department: 'smart' } },
  { label: 'Industrial Electricals', image: '/images/industrial-hall.webp', hint: 'Cables · Protection · Control', action: { type: 'browse', sub: 'industrial' } },
  { label: 'Outdoor Lighting', image: '/images/outdoor-garden.webp', hint: 'Flood · Garden · Wall lights', action: { type: 'browse', department: 'lighting', sub: 'Outdoor Lighting' } },
  { label: 'Tools & Testers', image: '/images/renders/multimeter.svg', hint: 'Multimeters · Testers', action: { type: 'browse', department: 'accessories', sub: 'Tools & Testers' } },
];

export const promoBanners: { id: string; eyebrow: string; title: string; cta: Cta; image: string; alt: string }[] = [
  {
    id: 'lighting',
    eyebrow: 'Modern Lighting',
    title: 'Brighter spaces. Better living.',
    cta: { label: 'Shop Lighting', action: { type: 'browse', department: 'lighting' } },
    image: '/images/modern-interior.webp',
    alt: 'Minimalist lounge with warm linear LED ceiling lighting',
  },
  {
    id: 'switches',
    eyebrow: 'Smart Switches',
    title: 'The next generation of control.',
    cta: { label: 'Explore Switches', action: { type: 'browse', department: 'switches' } },
    image: '/images/smart-switch.webp',
    alt: 'Close-up of a matte black touch switch panel',
  },
  {
    id: 'wiring',
    eyebrow: 'Wiring Solutions',
    title: 'Strong connections begin inside.',
    cta: { label: 'Discover Cables', action: { type: 'browse', department: 'wires' } },
    image: '/images/wire-coils.webp',
    alt: 'Colour-coded copper wire coils with stripped conductor ends',
  },
];

export const applications: { title: string; text: string; image: string; alt: string; cta: Cta }[] = [
  {
    title: 'Residential',
    text: 'Lighting, switches, home wiring, and smart accessories.',
    image: '/images/fan-interior.webp',
    alt: 'Bright family home interior with pendant lights and ceiling fan',
    cta: { label: 'Explore Residential', action: { type: 'browse', tab: 'featured' } },
  },
  {
    title: 'Commercial',
    text: 'Office lighting, power accessories, and distribution solutions.',
    image: '/images/office.webp',
    alt: 'Modern office workspace with city skyline views',
    cta: { label: 'Explore Commercial', action: { type: 'browse', sub: 'commercial' } },
  },
  {
    title: 'Industrial',
    text: 'Industrial cables, circuit protection, and electrical control components.',
    image: '/images/industrial-hall.webp',
    alt: 'Industrial production hall with high-bay pendant lighting',
    cta: { label: 'Explore Industrial', action: { type: 'browse', sub: 'industrial' } },
  },
  {
    title: 'Architects & Contractors',
    text: 'Project-focused electrical product sourcing and bulk enquiries.',
    image: '/images/contractors.webp',
    alt: 'Construction team working on a building site',
    cta: { label: 'Start a Project Enquiry', action: { type: 'bulk' } },
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Ananya (sample)',
    role: 'Homeowner',
    location: 'Demo profile',
    text: 'Choosing warm and neutral lighting for each room felt simple. The guidance on colour temperature helped us get the living room glow just right.',
    rating: 5,
  },
  {
    name: 'Ravi (sample)',
    role: 'Electrician',
    location: 'Demo profile',
    text: 'Having wires, MCBs and accessories listed in one place with clear specs saves time when I put together a material list for a site.',
    rating: 5,
  },
  {
    name: 'Meera (sample)',
    role: 'Interior Designer',
    location: 'Demo profile',
    text: 'The decorative lighting and premium switch plates are presented beautifully, which makes it easier to share options with my clients.',
    rating: 4,
  },
  {
    name: 'Karthik (sample)',
    role: 'Electrical Contractor',
    location: 'Demo profile',
    text: 'The bulk enquiry form is straightforward. I can list categories and quantities for a full project in a single request.',
    rating: 5,
  },
  {
    name: 'Fatima (sample)',
    role: 'Commercial Purchaser',
    location: 'Demo profile',
    text: 'Clean product information for panels, battens and distribution boards made comparing options for our office fit-out quick.',
    rating: 4,
  },
  {
    name: 'Joseph (sample)',
    role: 'Homeowner',
    location: 'Demo profile',
    text: 'Wishlist and quick view made it easy to shortlist switches and sockets for our renovation before visiting the store.',
    rating: 5,
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: 'What types of electrical products does ZYLUX Electrical offer?',
    a: 'ZYLUX Electrical focuses on electrical products for residential, commercial and industrial use, including lighting, switches and sockets, wires and cables, fans and ventilation, circuit protection and distribution boards, electrical accessories and smart-home products. The exact range and brands available can be confirmed with the store team.',
  },
  {
    q: 'Can I enquire about bulk electrical orders?',
    a: 'Yes. Use the “Request a Bulk Quote” form on this page to share your project details, product categories and approximate quantities. In this demo the form is not connected to a backend, so no information is sent.',
  },
  {
    q: 'How can I choose the right wire or cable?',
    a: 'Wire selection depends on the circuit load, cable run length, installation method and applicable electrical codes. Our Knowledge Hub guide on electrical wires explains common sizes and insulation types, and a licensed electrician should confirm the final specification for your installation.',
  },
  {
    q: 'Do you offer products for commercial and industrial projects?',
    a: 'The catalogue is organised to cover commercial and industrial requirements such as panel lighting, armoured and multicore cables, circuit protection and distribution. Share your requirements through the bulk enquiry form to discuss specific products.',
  },
  {
    q: 'How do I ask about pricing and product availability?',
    a: 'Prices shown on this homepage are sample figures for demonstration. For current pricing and availability, contact the store using the details in the Contact section once they are published, or submit an enquiry.',
  },
  {
    q: 'Can I contact ZYLUX Electrical for product recommendations?',
    a: 'Yes. The team can help you shortlist suitable products for your space or project. Use the contact options in the footer or the enquiry form, and include details such as room type, load requirements or quantities.',
  },
];

export const popularSearches = ['LED panel', 'Modular switch', '2.5 sq mm wire', 'MCB', 'BLDC fan', 'Smart bulb', 'Extension board', 'Floodlight'];
export const demoRecentSearches = ['FRLS wire', 'Downlight', 'RCCB 30mA'];

export const guides: Guide[] = [
  {
    id: 'led',
    tag: 'Lighting',
    title: 'How to Choose the Right LED Lighting for Your Home',
    excerpt: 'Lumens, colour temperature and beam angle explained, so every room gets the light it needs.',
    image: '/images/ambient-living.webp',
    readTime: '5 min read',
    body: [
      { kind: 'p', text: 'LED lighting is efficient and long-lasting, but choosing well means looking beyond wattage. These are the key factors to compare when you shop.' },
      { kind: 'h', text: '1. Look at lumens, not just watts' },
      { kind: 'p', text: 'Lumens measure how much light a lamp produces, while watts measure how much power it uses. Two LEDs with the same wattage can produce different light output, so compare lumens when brightness matters.' },
      { kind: 'h', text: '2. Pick the right colour temperature' },
      {
        kind: 'list',
        items: [
          'Warm white (around 2700K–3000K): cosy and relaxed — living rooms, bedrooms, dining areas.',
          'Neutral white (around 4000K): balanced and clear — kitchens, home offices, corridors.',
          'Cool daylight (around 5700K–6500K): crisp and bright — task areas, garages, utility spaces.',
        ],
      },
      { kind: 'h', text: '3. Consider colour rendering (CRI)' },
      { kind: 'p', text: 'CRI describes how naturally colours appear under a light source. A CRI of 80 or higher suits most homes; 90+ is useful where colour accuracy matters, such as dressing areas or artwork.' },
      { kind: 'h', text: '4. Match beam angle and fitting type' },
      { kind: 'p', text: 'Narrow beams (for example 24°–38°) create focused accent lighting, while wide beams spread light evenly for general illumination. Panels and battens suit ambient lighting; spotlights and downlights add focus.' },
      { kind: 'h', text: '5. Check ingress protection for wet or outdoor areas' },
      { kind: 'p', text: 'Bathrooms and outdoor spaces need fittings with a suitable IP rating, such as IP44 or IP65 depending on exposure. Always check the manufacturer’s guidance for the location.' },
      { kind: 'note', text: 'If you plan to use dimmers, confirm that both the LED lamp and the dimmer are listed as compatible.' },
    ],
  },
  {
    id: 'wires',
    tag: 'Wiring',
    title: 'Understanding Different Types of Electrical Wires',
    excerpt: 'Conductor sizes, insulation types like FR and FRLS, and colour coding in plain language.',
    image: '/images/p-wire-ends.webp',
    readTime: '6 min read',
    body: [
      { kind: 'p', text: 'Wires and cables carry power safely only when they are correctly specified for the load and installation. Here is an overview of the terms you will see when shopping.' },
      { kind: 'h', text: 'Conductor size (sq. mm)' },
      { kind: 'p', text: 'The cross-sectional area of the conductor determines how much current it can carry. Typical domestic examples include 1.0–1.5 sq. mm for lighting circuits, 2.5 sq. mm for socket circuits and 4–6 sq. mm for heavier loads, but the right size depends on load, run length and installation method.' },
      { kind: 'h', text: 'Insulation types' },
      {
        kind: 'list',
        items: [
          'PVC: the standard general-purpose insulation for house wiring.',
          'FR (Flame Retardant): insulation formulated to resist the spread of flame.',
          'FRLS (Flame Retardant Low Smoke): also limits smoke emission, useful for enclosed spaces and multi-storey buildings.',
          'HFFR / ZHFR (Halogen Free): reduces toxic and corrosive gases if exposed to fire.',
        ],
      },
      { kind: 'h', text: 'Single-strand vs multi-strand' },
      { kind: 'p', text: 'Multi-strand (flexible) conductors are easier to route through conduits and bends, while flexible cables with fine strands suit appliances and control wiring.' },
      { kind: 'h', text: 'Colour coding' },
      { kind: 'p', text: 'Colour-coded insulation helps identify phase, neutral and earth conductors. Follow the colour convention required by the current electrical code for your installation, and keep it consistent throughout the project.' },
      { kind: 'note', text: 'Wiring should always be designed and installed by a licensed electrician in line with applicable standards and regulations.' },
    ],
  },
  {
    id: 'mcb-rccb',
    tag: 'Protection',
    title: 'MCB vs RCCB: What’s the Difference?',
    excerpt: 'Two essential protection devices that guard against very different electrical faults.',
    image: '/images/renders/mcb.svg',
    readTime: '4 min read',
    body: [
      { kind: 'p', text: 'MCBs and RCCBs both sit in your distribution board, but they protect against different faults. Most modern installations use both, or a combined device called an RCBO.' },
      { kind: 'h', text: 'MCB — Miniature Circuit Breaker' },
      { kind: 'p', text: 'An MCB trips when current exceeds its rating due to an overload or a short circuit, protecting the wiring from overheating. MCBs are selected by current rating and trip curve (B, C or D) to suit the type of load.' },
      { kind: 'h', text: 'RCCB — Residual Current Circuit Breaker' },
      { kind: 'p', text: 'An RCCB monitors the balance between the outgoing and returning current. If some current leaks to earth — for example through faulty insulation or a person touching a live part — it trips. A 30mA sensitivity is commonly used for personal protection.' },
      {
        kind: 'table',
        head: ['', 'MCB', 'RCCB'],
        rows: [
          ['Protects against', 'Overload & short circuit', 'Earth leakage / residual current'],
          ['Typical rating', 'Current, e.g. 6A–63A', 'Current + sensitivity, e.g. 40A / 30mA'],
          ['Overload protection', 'Yes', 'No — pair with an MCB'],
          ['Shock protection', 'No', 'Yes (at suitable sensitivity)'],
        ],
      },
      { kind: 'h', text: 'What about RCBOs?' },
      { kind: 'p', text: 'An RCBO combines MCB and RCCB functions in one device, protecting an individual circuit against overload, short circuit and earth leakage.' },
      { kind: 'note', text: 'Selection of protection devices should be done by a qualified electrician based on the installation design and local regulations.' },
    ],
  },
];

export const infoContent: Record<InfoKey, { title: string; intro: string; points?: string[] }> = {
  track: {
    title: 'Track your order',
    intro: 'Order tracking will connect to the live order system once the online store is launched. Enter any order number below to preview how tracking will look.',
  },
  contact: {
    title: 'Contact ZYLUX Electrical',
    intro: 'Store contact details will be published by ZYLUX Electrical. The fields below are placeholders for this demonstration.',
    points: ['Phone: +91 XXXXX XXXXX (to be confirmed)', 'Email: hello@your-domain.in (placeholder)', 'Address: Store address to be confirmed', 'Hours: To be confirmed'],
  },
  whatsapp: {
    title: 'WhatsApp enquiry',
    intro: 'A WhatsApp enquiry shortcut will open a chat with the store once the business number is configured. No number is connected in this demo.',
  },
  shipping: {
    title: 'Shipping information',
    intro: 'Delivery coverage, timelines and charges will be published by ZYLUX Electrical before launch.',
    points: ['Delivery across India (coverage details to be confirmed)', 'Bulk and project deliveries can be discussed through an enquiry', 'Charges and timelines will be shown at checkout once live'],
  },
  returns: {
    title: 'Returns',
    intro: 'The returns and exchange policy will be published by ZYLUX Electrical. Until then, please contact the store directly for any product questions.',
  },
  privacy: {
    title: 'Privacy Policy (demo)',
    intro: 'This homepage is a design demonstration. Forms do not transmit or store personal information on a server. Your cart and wishlist are saved only in your own browser’s local storage, and you can clear them at any time.',
  },
  terms: {
    title: 'Terms & Conditions (demo)',
    intro: 'All products, brands, prices, ratings and testimonials shown here are sample content for a client demonstration and do not represent live offers, stock or verified reviews. Final terms will be provided by ZYLUX Electrical.',
  },
  account: {
    title: 'Your account',
    intro: 'Account sign-in, order history and saved addresses will be available when the store goes live. In this demo, your cart and wishlist are remembered on this device.',
  },
};
