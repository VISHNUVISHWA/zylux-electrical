import { Info } from 'lucide-react';
import { guides } from '../../data/content';
import { useShop } from '../../store/ShopContext';
import { Dialog } from '../ui/Dialog';
import { Img } from '../ui/primitives';

export function GuideModal() {
  const { guideId, openGuide, runAction } = useShop();
  const guide = guides.find((g) => g.id === guideId);
  const related = { led: 'lighting', wires: 'wires', 'mcb-rccb': 'protection' } as const;

  return (
    <Dialog open={!!guide} onClose={() => openGuide(null)} title={guide?.title ?? 'Guide'} className="max-w-3xl">
      {guide && (
        <article>
          <div className="relative aspect-[21/9] bg-[#eceef1]">
            <Img src={guide.image} alt="" className="size-full object-cover" />
          </div>
          <div className="space-y-4 p-6 text-[0.98rem] leading-relaxed text-ink/85 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
              {guide.tag} · {guide.readTime}
            </p>
            {guide.body.map((b, i) => {
              switch (b.kind) {
                case 'h':
                  return (
                    <h3 key={i} className="pt-2 font-display text-lg font-bold text-ink">
                      {b.text}
                    </h3>
                  );
                case 'p':
                  return <p key={i}>{b.text}</p>;
                case 'list':
                  return (
                    <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-gold-500">
                      {b.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                case 'table':
                  return (
                    <div key={i} className="overflow-x-auto rounded-xl ring-1 ring-line">
                      <table className="w-full min-w-[440px] text-left text-sm">
                        <thead className="bg-paper">
                          <tr>
                            {b.head.map((h) => (
                              <th key={h} scope="col" className="px-4 py-3 font-semibold text-ink">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {b.rows.map((r) => (
                            <tr key={r[0]} className="border-t border-line">
                              {r.map((c, j) =>
                                j === 0 ? (
                                  <th key={j} scope="row" className="px-4 py-3 font-medium text-ink">
                                    {c}
                                  </th>
                                ) : (
                                  <td key={j} className="px-4 py-3">
                                    {c}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                case 'note':
                  return (
                    <p key={i} className="flex gap-2 rounded-xl bg-gold-500/10 p-4 text-sm text-ink ring-1 ring-gold-500/25">
                      <Info className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
                      {b.text}
                    </p>
                  );
              }
            })}
            <div className="flex flex-wrap gap-3 border-t border-line pt-6">
              <button type="button" onClick={() => { openGuide(null); runAction({ type: 'browse', department: related[guide.id as keyof typeof related] }); }} className="btn btn-dark">
                Shop related products
              </button>
              <button type="button" onClick={() => openGuide(null)} className="btn btn-outline">
                Close guide
              </button>
            </div>
          </div>
        </article>
      )}
    </Dialog>
  );
}
