import Link from "next/link";
import { GlobalSearch } from "@/components/explore/GlobalSearch";
import { popularStacks } from "@/data/stacks";
import { getProductsBySlugs } from "@/lib/products";
import { ExploreRecent } from "@/components/explore/ExploreRecent";
import { ExploreCompareLink } from "@/components/explore/ExploreCompareLink";

export default function ExplorePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Spec client deployments faster
        </h1>
        <p className="max-w-xl text-neutral-600 leading-relaxed">
          Search Peplink, Starlink, and Fortinet hardware, compare specs side by
          side, and build quote sessions without leaving the catalog.
        </p>
        <GlobalSearch large />
      </section>

      <ExploreRecent />

      <ExploreCompareLink />

      <section aria-labelledby="stacks-heading">
        <h2
          id="stacks-heading"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500"
        >
          Popular stacks
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {popularStacks.map((stack) => {
            const products = getProductsBySlugs(stack.productSlugs);
            return (
              <li
                key={stack.id}
                className="rounded-2xl border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-sm"
              >
                <h3 className="font-semibold text-neutral-950">{stack.name}</h3>
                <p className="mt-1 text-sm text-neutral-600">{stack.description}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-accent hover:underline"
                      >
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

      <div className="flex flex-wrap gap-3 text-sm font-medium">
        <Link
          href="/products"
          className="rounded-full bg-accent px-4 py-2 text-white active:scale-[0.97] transition-transform"
        >
          Open full catalog
        </Link>
        <Link
          href="/library"
          className="rounded-full border border-neutral-300 px-4 py-2 active:scale-[0.97] transition-transform hover:bg-neutral-50"
        >
          Quote sessions
        </Link>
      </div>
    </div>
  );
}
