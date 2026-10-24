import { Cable, Fan, House, Lightbulb, Plug, ShieldCheck, ToggleRight } from 'lucide-react';
import type { Department, DepartmentId } from './types';

/** Fictional demo brands used across the catalogue. Replace with confirmed brand partners. */
export const demoBrands = [
  { name: 'Lumora', focus: 'LED & architectural lighting', style: 'font-display font-extrabold tracking-[0.18em] uppercase' },
  { name: 'Voltix', focus: 'Switches & sockets', style: 'font-display font-bold italic tracking-tight' },
  { name: 'Corelink', focus: 'Wires & cables', style: 'font-sans font-semibold tracking-[0.3em] uppercase' },
  { name: 'Safeguard', focus: 'Circuit protection', style: 'font-display font-extrabold tracking-tight' },
  { name: 'Aeroflow', focus: 'Fans & ventilation', style: 'font-sans font-light tracking-[0.12em] uppercase' },
  { name: 'Ampere One', focus: 'Electrical accessories', style: 'font-display font-semibold tracking-wide' },
  { name: 'Brightwave', focus: 'Decorative lighting', style: 'font-display font-medium italic tracking-[0.06em]' },
  { name: 'Nexa Smart', focus: 'Smart home', style: 'font-sans font-bold tracking-[0.2em] uppercase' },
];

/** Example brand names a client may want to show once partnerships are confirmed. */
export const plannedBrandExamples = [
  'Philips',
  'Havells',
  'Legrand',
  'Schneider Electric',
  'Anchor by Panasonic',
  'Polycab',
  'Finolex',
  'Wipro',
];

export const departments: Department[] = [
  {
    id: 'lighting',
    label: 'Lighting',
    heading: 'Lighting',
    description: 'Efficient everyday LED lighting, decorative statement pieces and durable outdoor fixtures.',
    icon: Lightbulb,
    image: '/images/p-cob-downlight.webp',
    columns: [
      { title: 'LED Lighting', items: ['LED Bulbs', 'LED Tube Lights', 'LED Battens', 'LED Panels', 'Ceiling Lights', 'Downlights'] },
      {
        title: 'Decorative Lighting',
        items: ['Chandeliers', 'Pendant Lights', 'Wall Lights', 'Strip Lights', 'Profile Lights', 'Smart Ambient Lights'],
      },
      { title: 'Outdoor Lighting', items: ['Flood Lights', 'Street Lights', 'Garden Lights', 'Outdoor Wall Lights', 'Solar Lights'] },
    ],
    thumbs: [
      { label: 'Downlights', image: '/images/p-cob-downlight.webp', sub: 'Downlights' },
      { label: 'Pendants', image: '/images/p-pendant.webp', sub: 'Pendant Lights' },
      { label: 'LED Battens', image: '/images/renders/batten.svg', sub: 'LED Battens' },
      { label: 'Flood Lights', image: '/images/renders/flood.svg', sub: 'Flood Lights' },
    ],
    promo: {
      eyebrow: 'Featured collection',
      title: 'Illuminate Every Space',
      text: 'Layered ambient, task and accent lighting for modern interiors.',
      image: '/images/ambient-living.webp',
      cta: 'Shop Lighting',
    },
    brands: ['Lumora', 'Brightwave', 'Nexa Smart'],
  },
  {
    id: 'switches',
    label: 'Switches & Sockets',
    heading: 'Switches & Sockets',
    description: 'Modular, premium and smart switching with sockets for every room and appliance.',
    icon: ToggleRight,
    image: '/images/smart-switch.webp',
    columns: [
      {
        title: 'Switches',
        items: ['Modular Switches', 'Premium Switches', 'Smart Switches', 'Dimmer Switches', 'Weatherproof Switches', 'Industrial Switches'],
      },
      { title: 'Sockets & Controls', items: ['Electrical Sockets', 'USB Sockets', 'Fan Regulators', 'Switch Plates'] },
    ],
    thumbs: [
      { label: 'Modular Switches', image: '/images/renders/switch.svg', sub: 'Modular Switches' },
      { label: 'Sockets', image: '/images/renders/socket.svg', sub: 'Electrical Sockets' },
      { label: 'Touch Panels', image: '/images/p-switch-modular.webp', sub: 'Smart Switches' },
      { label: 'Smart Plugs', image: '/images/renders/smart-plug.svg', sub: 'Smart Plugs' },
    ],
    promo: {
      eyebrow: 'Premium switching',
      title: 'The Next Generation of Control',
      text: 'Tactile, matte-finish switch panels with locator LEDs.',
      image: '/images/smart-switch.webp',
      cta: 'Explore Switches',
    },
    brands: ['Voltix', 'Nexa Smart'],
  },
  {
    id: 'wires',
    label: 'Wires & Cables',
    heading: 'Wires & Cables',
    description: 'House wiring, flexible and multicore cables, industrial runs and cable management.',
    icon: Cable,
    image: '/images/wire-coils.webp',
    columns: [
      { title: 'Building Wires', items: ['House Wires', 'FR Wires', 'FRLS Wires', 'Flexible Cables'] },
      { title: 'Power & Industrial', items: ['Multicore Cables', 'Armoured Cables', 'Industrial Cables', 'Control Cables'] },
      { title: 'Data & Management', items: ['Coaxial Cables', 'LAN Cables', 'Cable Management', 'Cable Accessories'] },
    ],
    thumbs: [
      { label: 'House Wires', image: '/images/p-wire-red.webp', sub: 'House Wires' },
      { label: 'FRLS Wires', image: '/images/p-wire-yellow.webp', sub: 'FRLS Wires' },
      { label: 'Flexible Cables', image: '/images/p-wire-ends.webp', sub: 'Flexible Cables' },
      { label: 'Armoured Cables', image: '/images/p-cable-drum.webp', sub: 'Armoured Cables' },
    ],
    promo: {
      eyebrow: 'Wiring solutions',
      title: 'Strong Connections Begin Inside',
      text: 'Copper house wires and cables for homes, offices and plants.',
      image: '/images/wire-coils.webp',
      cta: 'Discover Cables',
    },
    brands: ['Corelink'],
  },
  {
    id: 'fans',
    label: 'Fans & Ventilation',
    heading: 'Fans & Ventilation',
    description: 'Energy-efficient ceiling fans, exhaust fans and air movement for every space.',
    icon: Fan,
    image: '/images/p-ceiling-fan.webp',
    columns: [
      { title: 'Fans', items: ['Ceiling Fans', 'BLDC Fans', 'Wall Fans', 'Table Fans', 'Pedestal Fans'] },
      { title: 'Ventilation', items: ['Exhaust Fans', 'Industrial Fans', 'Ventilation Accessories'] },
    ],
    thumbs: [
      { label: 'BLDC Fans', image: '/images/p-ceiling-fan.webp', sub: 'BLDC Fans' },
      { label: 'Exhaust Fans', image: '/images/renders/exhaust.svg', sub: 'Exhaust Fans' },
      { label: 'Ceiling Fans', image: '/images/fan-interior.webp', sub: 'Ceiling Fans' },
    ],
    promo: {
      eyebrow: 'Efficient air movement',
      title: 'Quiet Comfort, Lower Consumption',
      text: 'BLDC ceiling fans with remote control and refined finishes.',
      image: '/images/fan-interior.webp',
      cta: 'Shop Fans',
    },
    brands: ['Aeroflow'],
  },
  {
    id: 'protection',
    label: 'Protection & Distribution',
    heading: 'Protection & Distribution',
    description: 'Circuit protection, distribution boards and control gear for safe installations.',
    icon: ShieldCheck,
    image: '/images/renders/mcb.svg',
    columns: [
      { title: 'Circuit Protection', items: ['MCBs', 'RCCBs', 'RCBOs', 'Isolators', 'Surge Protection Devices'] },
      { title: 'Distribution', items: ['Distribution Boards', 'Changeover Switches', 'Fuse Units', 'Enclosures'] },
      { title: 'Control & Panel', items: ['Contactors', 'Relays', 'Panel Accessories'] },
    ],
    thumbs: [
      { label: 'MCBs', image: '/images/renders/mcb.svg', sub: 'MCBs' },
      { label: 'RCCBs', image: '/images/renders/rccb.svg', sub: 'RCCBs' },
      { label: 'Distribution Boards', image: '/images/renders/db.svg', sub: 'Distribution Boards' },
    ],
    promo: {
      eyebrow: 'Safety first',
      title: 'Protection Built Into Every Circuit',
      text: 'MCBs, RCCBs and boards for homes, commercial and industrial panels.',
      image: '/images/industrial-hall.webp',
      cta: 'Shop Protection',
    },
    brands: ['Safeguard'],
  },
  {
    id: 'accessories',
    label: 'Electrical Accessories',
    heading: 'Electrical Accessories',
    description: 'Power accessories, installation fittings, consumables and testing tools.',
    icon: Plug,
    image: '/images/extension-board.webp',
    columns: [
      { title: 'Power', items: ['Plugs & Tops', 'Extension Boards', 'Power Strips', 'Adapters'] },
      {
        title: 'Fittings & Installation',
        items: ['Lamp Holders', 'Ceiling Roses', 'Junction Boxes', 'Conduits', 'Connectors', 'Terminal Blocks'],
      },
      { title: 'Finishing & Tools', items: ['Cable Ties', 'Insulation Tapes', 'Cable Glands', 'Tools & Testers'] },
    ],
    thumbs: [
      { label: 'Extension Boards', image: '/images/p-extension-board.webp', sub: 'Extension Boards' },
      { label: 'Plugs & Tops', image: '/images/p-plug.webp', sub: 'Plugs & Tops' },
      { label: 'Tools & Testers', image: '/images/renders/multimeter.svg', sub: 'Tools & Testers' },
    ],
    promo: {
      eyebrow: 'Everyday essentials',
      title: 'Power, Neatly Managed',
      text: 'Extension boards, plugs and fittings that finish every installation.',
      image: '/images/extension-board.webp',
      cta: 'Shop Accessories',
    },
    brands: ['Ampere One'],
  },
  {
    id: 'smart',
    label: 'Smart Home',
    heading: 'Smart Home',
    description: 'Connected lighting, intelligent switching and automation modules.',
    icon: House,
    image: '/images/renders/smart-bulb.svg',
    columns: [
      { title: 'Smart Lighting', items: ['Smart Bulbs', 'Smart Lighting Controls', 'Motion Sensors'] },
      { title: 'Smart Control', items: ['Smart Switches', 'Smart Plugs', 'Smart Fans', 'Automation Modules'] },
    ],
    thumbs: [
      { label: 'Smart Bulbs', image: '/images/renders/smart-bulb.svg', sub: 'Smart Bulbs' },
      { label: 'Smart Plugs', image: '/images/renders/smart-plug.svg', sub: 'Smart Plugs' },
      { label: 'Smart Switches', image: '/images/p-switch-modular.webp', sub: 'Smart Switches' },
    ],
    promo: {
      eyebrow: 'Connected living',
      title: 'Make Every Connection Smarter',
      text: 'Scenes, schedules and app control for lighting and power.',
      image: '/images/modern-interior.webp',
      cta: 'Explore Smart Home',
    },
    brands: ['Nexa Smart', 'Voltix'],
  },
];

export const departmentById = (id: DepartmentId) => departments.find((d) => d.id === id)!;

export type NavItem =
  | { kind: 'mega'; id: 'all' | 'brands' | DepartmentId; label: string }
  | { kind: 'link'; id: string; label: string; target: string };

export const navItems: NavItem[] = [
  { kind: 'mega', id: 'all', label: 'All Categories' },
  ...departments.map((d) => ({ kind: 'mega' as const, id: d.id, label: d.label })),
  { kind: 'mega', id: 'brands', label: 'Brands' },
  { kind: 'link', id: 'offers', label: 'Offers', target: '#offers' },
  { kind: 'link', id: 'bulk', label: 'Bulk Orders', target: '#bulk' },
];
