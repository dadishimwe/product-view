import Link from "next/link";
import { GlobalSearch } from "@/components/explore/GlobalSearch";
import { popularStacks } from "@/data/stacks";
import { getProductsBySlugs } from "@/lib/products";
import { ExploreRecent } from "@/components/explore/ExploreRecent";
import { ExploreCompareLink } from "@/components/explore/ExploreCompareLink";

export default function ExplorePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6">
      <section className="catalog-frame space-y-5 p-6 sm:p-8">
        <p className="field-label">MSP hardware catalog</p>
        <h1 className="font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[2.35rem]">
          Spec the edge before you rack it.
        </h1>
        <p className="max-w-lg text-sm leading-relaxed text-graphite">
          Peplink, Starlink, and Fortinet in one workbook — search by SKU, compare
          port counts, and build quote sessions per client site.
        </p>
        <GlobalSearch large />
      </section>

      <ExploreRecent />

      <ExploreCompareLink />

      <section aria-labelledby="stacks-heading">
        <h2 id="stacks-heading" className="field-label mb-4">
          Popular stacks
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {popularStacks.map((stack) => {
            const products = getProductsBySlugs(stack.productSlugs);
            return (
              <li key={stack.id} className="catalog-panel p-4">
                <h3 className="font-display font-bold text-ink">{stack.name}</h3>
                <p className="mt-1 text-sm text-graphite">{stack.description}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}`} className="text-link">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/products" className="pill-btn pill-btn-primary">
          Open full catalog
        </Link>
        <Link href="/library" className="pill-btn">
          Quote sessions
        </Link>
      </div>
    </div>
  );
}
