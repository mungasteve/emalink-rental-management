import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "What to check before signing a lease in Nairobi",
    category: "Tenant Guides",
    readTime: "5 min read",
    excerpt:
      "Most tenants sign leases without reading them. Here are the clauses that actually matter — and the ones that should make you walk away.",
  },
  {
    id: 2,
    title: "Why your M-Pesa rent receipts won't hold up in a dispute",
    category: "Legal",
    readTime: "4 min read",
    excerpt:
      "M-Pesa confirmations are not rent receipts. We break down what documentation you actually need as a landlord or tenant.",
  },
  {
    id: 3,
    title: "The real cost of a vacant unit in Nairobi",
    category: "Property Owners",
    readTime: "6 min read",
    excerpt:
      "It's not just lost rent. Security, maintenance decay, and re-letting costs add up fast. Here's how to calculate your actual vacancy cost.",
  },
  {
    id: 4,
    title: "Tenant rights under Kenya's Landlord and Tenant Act",
    category: "Legal",
    readTime: "7 min read",
    excerpt:
      "Most tenants don't know their rights. Most landlords don't know their obligations. This is the plain-English version of what the law actually says.",
  },
  {
    id: 5,
    title: "Westlands vs Kilimani vs Lavington: where to invest in 2026",
    category: "Market Insights",
    readTime: "8 min read",
    excerpt:
      "Rental yields, vacancy rates, and tenant profiles across Nairobi's top residential neighbourhoods — based on current market data.",
  },
  {
    id: 6,
    title: "How to handle a tenant who stops paying rent",
    category: "Property Owners",
    readTime: "5 min read",
    excerpt:
      "The steps, the timeline, and the legal process — from the first missed payment to the Rent Tribunal. What you can and can't do.",
  },
];

const categoryColors: Record<string, string> = {
  "Tenant Guides": "bg-blue-50 text-blue-700",
  Legal: "bg-amber-50 text-amber-700",
  "Property Owners": "bg-emerald-50 text-emerald-700",
  "Market Insights": "bg-purple-50 text-purple-700",
};

export default function BlogPage() {
  return (
    <div>
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
            Emalink Journal
          </p>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Property in Kenya, explained plainly.
          </h1>
          <p className="text-white/55 text-sm max-w-md leading-relaxed">
            Guides for tenants, insights for owners, and market context for
            anyone navigating Nairobi real estate.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group border border-border rounded-xl p-6 hover:border-navy-800/30 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? "bg-cream-100 text-navy-700"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h2 className="font-semibold text-navy-800 text-base mb-3 leading-snug group-hover:text-navy-600 transition-colors flex-1">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="text-xs font-medium text-navy-800 group-hover:underline">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
