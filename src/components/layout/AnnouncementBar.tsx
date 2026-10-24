import { Headset, MapPin, MessageCircle, PackageOpen, Phone, Truck } from 'lucide-react';
import { useShop } from '../../store/ShopContext';
import { scrollToId } from '../../lib/utils';

export function AnnouncementBar() {
  const { openInfo } = useShop();
  const item = 'inline-flex items-center gap-2 whitespace-nowrap transition hover:text-gold-300';
  return (
    <div className="theme-dark border-b border-white/5 bg-ink-950 text-[0.78rem] text-muted">
      <div className="container-x flex h-9 items-center justify-between gap-6">
        <ul className="flex min-w-0 items-center gap-6">
          <li className="inline-flex items-center gap-2 whitespace-nowrap">
            <Truck className="size-3.5 text-gold-500" aria-hidden="true" />
            Delivery across India
          </li>
          <li className="hidden md:block">
            <button type="button" className={item} onClick={() => scrollToId('#bulk')}>
              <PackageOpen className="size-3.5 text-gold-500" aria-hidden="true" />
              Bulk order enquiries
            </button>
          </li>
          <li className="hidden lg:block">
            <button type="button" className={item} onClick={() => openInfo('contact')}>
              <Headset className="size-3.5 text-gold-500" aria-hidden="true" />
              Customer support
            </button>
          </li>
        </ul>
        <ul className="flex items-center gap-5">
          <li>
            <button type="button" className={item} onClick={() => openInfo('track')}>
              <MapPin className="size-3.5 text-gold-500" aria-hidden="true" />
              Track order
            </button>
          </li>
          <li className="hidden sm:block">
            <button type="button" className={item} onClick={() => openInfo('contact')}>
              <Phone className="size-3.5 text-gold-500" aria-hidden="true" />
              Store contact
            </button>
          </li>
          <li className="hidden sm:block">
            <button type="button" className={item} onClick={() => openInfo('whatsapp')}>
              <MessageCircle className="size-3.5 text-gold-500" aria-hidden="true" />
              WhatsApp enquiry
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
