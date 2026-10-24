import { CircleCheck, Info } from 'lucide-react';
import { useEffect, useId, useState, type FormEvent } from 'react';
import { departments } from '../../data/navigation';
import { useShop } from '../../store/ShopContext';
import { Dialog } from '../ui/Dialog';

type Fields = 'name' | 'company' | 'phone' | 'email' | 'category' | 'quantity' | 'message';
const empty: Record<Fields, string> = { name: '', company: '', phone: '', email: '', category: '', quantity: '', message: '' };

function validate(v: Record<Fields, string>) {
  const e: Partial<Record<Fields, string>> = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  const digits = v.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit mobile number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!v.category) e.category = 'Choose a product category.';
  if (v.quantity.trim().length < 2) e.quantity = 'Tell us the approximate quantity or requirement.';
  if (v.message.length > 1000) e.message = 'Please keep the message under 1000 characters.';
  return e;
}

export function BulkEnquiryModal() {
  const { bulkOpen, closeBulk, bulkCategory, notify } = useShop();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [done, setDone] = useState(false);
  const uid = useId();

  useEffect(() => {
    if (bulkOpen) {
      setValues({ ...empty, category: bulkCategory });
      setErrors({});
      setDone(false);
    }
  }, [bulkOpen, bulkCategory]);

  const set = (k: Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    // Demo only: nothing is transmitted or stored.
    setDone(true);
    notify({ title: 'Demo enquiry received locally', text: 'No data was sent — backend not connected.', tone: 'info' });
  };

  const field = (k: Fields, label: string, opts: { type?: string; required?: boolean; autoComplete?: string; placeholder?: string; inputMode?: 'tel' | 'email' } = {}) => (
    <div>
      <label htmlFor={`${uid}-${k}`} className="mb-1.5 block text-sm font-medium">
        {label} {opts.required ? <span className="text-[#c03535]">*</span> : <span className="font-normal text-slate">(optional)</span>}
      </label>
      <input
        id={`${uid}-${k}`}
        type={opts.type ?? 'text'}
        className="field"
        value={values[k]}
        onChange={set(k)}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        inputMode={opts.inputMode}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${uid}-${k}-err` : undefined}
        aria-required={opts.required}
      />
      {errors[k] && (
        <p id={`${uid}-${k}-err`} className="mt-1 text-xs text-[#c03535]">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <Dialog open={bulkOpen} onClose={closeBulk} title={done ? 'Enquiry received (demo)' : 'Request a Bulk Quote'} className="max-w-3xl">
      {done ? (
        <div className="px-6 py-12 text-center sm:px-10">
          <CircleCheck className="mx-auto size-14 text-emerald-600" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-4 font-display text-2xl font-extrabold">Thank you, {values.name.split(' ')[0]}.</p>
          <p className="mx-auto mt-2 max-w-md text-slate">
            Your demo enquiry for <strong className="text-ink">{values.category}</strong> was validated and received locally in your browser. Nothing has been sent
            — this demo isn’t connected to a backend yet.
          </p>
          <button type="button" onClick={closeBulk} className="btn btn-dark mt-7" data-autofocus>
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4 p-5 sm:p-7">
          <p className="flex items-start gap-2 rounded-xl bg-paper p-3 text-sm text-slate ring-1 ring-line">
            <Info className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
            Demo form: details are validated in your browser only and are not transmitted or stored.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {field('name', 'Full Name', { required: true, autoComplete: 'name' })}
            {field('company', 'Company Name', { autoComplete: 'organization' })}
            {field('phone', 'Phone Number', { required: true, type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '10-digit mobile' })}
            {field('email', 'Email Address', { required: true, type: 'email', autoComplete: 'email', inputMode: 'email' })}
            <div>
              <label htmlFor={`${uid}-category`} className="mb-1.5 block text-sm font-medium">
                Product Category <span className="text-[#c03535]">*</span>
              </label>
              <select
                id={`${uid}-category`}
                className="field"
                value={values.category}
                onChange={set('category')}
                aria-invalid={!!errors.category}
                aria-describedby={errors.category ? `${uid}-category-err` : undefined}
                aria-required
              >
                <option value="">Select a category</option>
                {departments.map((d) => (
                  <option key={d.id}>{d.label}</option>
                ))}
                <option>Multiple categories</option>
              </select>
              {errors.category && (
                <p id={`${uid}-category-err`} className="mt-1 text-xs text-[#c03535]">
                  {errors.category}
                </p>
              )}
            </div>
            {field('quantity', 'Quantity / Requirements', { required: true, placeholder: 'e.g. 40 coils of 2.5 sq. mm wire' })}
          </div>
          <div>
            <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-medium">
              Message <span className="font-normal text-slate">(optional)</span>
            </label>
            <textarea
              id={`${uid}-message`}
              rows={4}
              className="field resize-y"
              value={values.message}
              onChange={set('message')}
              placeholder="Project type, location, timelines or anything else that helps."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? `${uid}-message-err` : undefined}
            />
            {errors.message && (
              <p id={`${uid}-message-err`} className="mt-1 text-xs text-[#c03535]">
                {errors.message}
              </p>
            )}
          </div>
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={closeBulk} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold px-7">
              Submit Enquiry (Demo)
            </button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
