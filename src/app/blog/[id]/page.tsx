import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "What to check before signing a lease in Nairobi",
    category: "Tenant Guides",
    readTime: "5 min read",
    excerpt: "Most tenants sign leases without reading them. Here are the clauses that actually matter — and the ones that should make you walk away.",
    content: `Most tenants in Nairobi sign a lease agreement the same way they accept app terms and conditions — quickly, without reading it. That's a mistake that can cost you your deposit, your peace of mind, or months of legal headache.

Here are the clauses that actually matter.

**1. The notice period**
Kenyan law requires a minimum notice period before either party can terminate a lease. Check what yours says. Some landlords insert 3-month notice clauses that are heavily skewed in their favour. If the notice period is asymmetric — longer for you than for them — negotiate it before signing.

**2. What's included in the rent**
Is water included? Electricity? Service charge? Garbage collection? Get this in writing. "We'll sort it out" is not a lease clause.

**3. The deposit terms**
The deposit should be clearly stated — how much, what it covers, and the conditions under which it's returned. If the lease says "the landlord may deduct for damages at their discretion," that's a red flag. Deductions should be itemised and evidenced.

**4. Rent escalation**
Does the rent increase automatically each year? By how much? Some leases have 10–15% annual escalation clauses buried in the fine print. Know what you're agreeing to.

**5. Subletting and guests**
If you plan to have a long-term partner or family member stay, check whether the lease restricts this. Some leases prohibit subletting entirely — which is fine — but others restrict occupancy in ways that are unreasonable.

**6. Maintenance responsibilities**
Who fixes what? Generally, structural repairs are the landlord's responsibility and minor maintenance is the tenant's. But "minor" is subjective. A good lease defines this clearly.

**The bottom line:** If a landlord refuses to give you time to read the lease, that tells you everything you need to know about how they'll behave when something goes wrong.`,
  },
  {
    id: 2,
    title: "Why your M-Pesa rent receipts won't hold up in a dispute",
    category: "Legal",
    readTime: "4 min read",
    excerpt: "M-Pesa confirmations are not rent receipts. We break down what documentation you actually need as a landlord or tenant.",
    content: `Every month, thousands of Nairobi tenants pay rent via M-Pesa and screenshot the confirmation message. Every month, thousands of landlords receive that payment and do nothing else. And every month, the foundation for a future dispute is quietly being laid.

**The problem with M-Pesa confirmations**

An M-Pesa confirmation message proves that money moved from one number to another. It does not prove:
- What the payment was for
- Which property or unit it covers
- Which month it covers
- That the landlord accepted it as rent

In a Rent Tribunal dispute, an M-Pesa confirmation alone is weak evidence. A landlord can claim the payment was for something else entirely, or that it was a partial payment, or that it was received late.

**What you actually need**

A proper rent receipt should include:
- The tenant's full name
- The property address and unit number
- The period the payment covers (e.g. "June 2025 rent")
- The amount paid
- The payment method and reference number
- The landlord's or agent's signature

**For landlords**

Issue receipts. Every time. It protects you too — it creates a clear record of what was paid, when, and for what. If a tenant later claims they paid and you have no record, you're in a difficult position.

**For tenants**

If your landlord doesn't issue receipts, send a WhatsApp message after every payment: "Hi, confirming rent payment of KES 45,000 for June 2025, Unit 3A. M-Pesa ref: QWE123456." Get a reply acknowledging it. That thread is your receipt.

Emalink generates formal receipts automatically for every payment processed through the platform.`,
  },
  {
    id: 3,
    title: "The real cost of a vacant unit in Nairobi",
    category: "Property Owners",
    readTime: "6 min read",
    excerpt: "It's not just lost rent. Security, maintenance decay, and re-letting costs add up fast. Here's how to calculate your actual vacancy cost.",
    content: `Most landlords calculate vacancy cost as: days vacant × daily rent. That's wrong, and it leads to bad decisions — like holding out for a higher rent when a slightly lower rent with a good tenant would have been far more profitable.

**The full vacancy cost**

Let's take a 2BR apartment in Westlands renting at KES 45,000/month.

*Lost rent:* If vacant for 2 months, that's KES 90,000 gone.

*Service charges and utilities:* Even vacant, you're likely paying water, electricity (for common areas), and service charge. Call it KES 5,000/month — another KES 10,000.

*Security deterioration:* Vacant units attract break-ins. A single break-in can cost KES 30,000–80,000 in repairs and replacements.

*Maintenance decay:* Plumbing seals dry out. Mould grows in bathrooms. Pests move in. A unit that's been vacant for 3 months often needs KES 15,000–40,000 in remediation before it's rentable again.

*Re-letting costs:* Photography, listings, viewings, agent fees (typically 1 month's rent). Add KES 45,000.

*Total for a 2-month vacancy:* KES 90,000 + 10,000 + 0 (if lucky) + 20,000 + 45,000 = **KES 165,000 minimum.**

**The implication**

If you're holding out for KES 50,000 instead of KES 45,000, you need the higher-rent tenant to stay for at least 33 months just to break even on the 2-month vacancy. That's nearly 3 years.

A good tenant at market rate, placed quickly, is almost always the better financial decision.`,
  },
  {
    id: 4,
    title: "Tenant rights under Kenya's Landlord and Tenant Act",
    category: "Legal",
    readTime: "7 min read",
    excerpt: "Most tenants don't know their rights. Most landlords don't know their obligations. This is the plain-English version of what the law actually says.",
    content: `Kenya's Landlord and Tenant (Shops, Hotels and Catering Establishments) Act and the broader common law framework give tenants more protection than most people realise. Here's what you need to know.

**Right to quiet enjoyment**
Once you have a valid lease, the landlord cannot enter your premises without notice — typically 24 hours minimum. Showing up unannounced is a breach of your right to quiet enjoyment. If it happens repeatedly, you have grounds for a complaint to the Rent Tribunal.

**Right to a habitable property**
The landlord is obligated to maintain the property in a condition fit for habitation. This includes structural integrity, working plumbing, and protection from the elements. If the roof leaks and the landlord refuses to fix it, you can apply to the Tribunal for an order compelling repairs.

**Protection against arbitrary eviction**
A landlord cannot evict you without following due process. This means:
1. Written notice (the period depends on your lease and the reason)
2. If you dispute the notice, the matter goes to the Rent Tribunal
3. The landlord cannot forcibly remove you, change locks, or cut utilities to force you out — this is illegal

**Deposit protection**
Your deposit must be returned within a reasonable time after you vacate (typically 30 days), minus any legitimate deductions. The landlord must provide an itemised list of deductions. Withholding a deposit without justification is actionable.

**Right to a receipt**
You are entitled to a receipt for every payment you make. This is not optional.

**What the law doesn't cover**
The Act primarily covers commercial premises. Residential tenancies are governed more by common law and the terms of your specific lease. This is why the lease document matters so much.`,
  },
  {
    id: 5,
    title: "Westlands vs Kilimani vs Lavington: where to invest in 2025",
    category: "Market Insights",
    readTime: "8 min read",
    excerpt: "Rental yields, vacancy rates, and tenant profiles across Nairobi's top residential neighbourhoods — based on current market data.",
    content: `If you're buying property in Nairobi for rental income, the neighbourhood you choose will determine your yield, your tenant quality, and your vacancy rate more than almost any other factor. Here's how the three most popular investment neighbourhoods compare in 2025.

**Westlands**

*Average 2BR rent:* KES 40,000–65,000/month
*Typical tenant:* Young professionals, expats, corporate tenants
*Vacancy rate:* Low (high demand, good transport links)
*Yield:* 6–8% gross

Westlands has benefited enormously from the growth of Nairobi's tech and finance sectors. Proximity to Sarit Centre, Westgate, and major corporate offices makes it perennially popular. The downside: property prices have risen sharply, compressing yields. New developments are also increasing supply.

**Kilimani**

*Average 2BR rent:* KES 55,000–90,000/month
*Typical tenant:* Mid-to-senior professionals, small families, NGO workers
*Vacancy rate:* Moderate (more supply than Westlands)
*Yield:* 5–7% gross

Kilimani commands higher rents but also higher purchase prices. The neighbourhood has seen significant apartment development over the past decade, which has increased vacancy rates in some pockets. Location quality varies significantly — properties on the main roads command premiums, while those on back streets can sit vacant longer.

**Lavington**

*Average 2BR rent:* KES 55,000–80,000/month
*Typical tenant:* Families, expats, long-term renters
*Vacancy rate:* Low (limited supply, high demand)
*Yield:* 5–7% gross

Lavington's appeal is its residential character — quieter, greener, and less congested than Westlands or Kilimani. Tenants here tend to stay longer, which reduces turnover costs. Supply is constrained by the neighbourhood's predominantly low-density zoning, which supports values.

**The verdict**

For pure yield, Westlands edges ahead. For tenant stability and lower management intensity, Lavington wins. Kilimani sits in the middle — higher rents but more competition for tenants.

In all three cases, the quality of the specific building and management matters as much as the neighbourhood.`,
  },
  {
    id: 6,
    title: "How to handle a tenant who stops paying rent",
    category: "Property Owners",
    readTime: "5 min read",
    excerpt: "The steps, the timeline, and the legal process — from the first missed payment to the Rent Tribunal. What you can and can't do.",
    content: `A tenant who stops paying rent is one of the most stressful situations a landlord can face. Here's the process — what you should do, what you shouldn't do, and how long it realistically takes.

**Step 1: The first missed payment (Day 1–7)**
Don't panic. Contact the tenant directly — call first, then follow up in writing (WhatsApp is fine). Many missed payments are genuine oversights or temporary cash flow issues. Give them 7 days to pay or explain the situation.

**Step 2: Formal written notice (Day 8–30)**
If there's no payment and no satisfactory explanation, issue a formal written notice. This should state:
- The amount owed
- The deadline to pay (typically 30 days)
- That failure to pay will result in legal action

Keep a copy. Send it via registered post or hand-deliver with a witness.

**Step 3: Rent Tribunal (Day 31+)**
If the tenant still hasn't paid, you can file a complaint with the Business Premises Rent Tribunal (for commercial) or pursue the matter through the courts (for residential). The Tribunal process typically takes 2–4 months.

**What you cannot do**
- Change the locks
- Remove the tenant's belongings
- Cut off water or electricity
- Threaten or harass the tenant

All of these are illegal, regardless of how much rent is owed. Doing any of them can result in a counter-claim against you that exceeds the unpaid rent.

**Prevention is better than cure**
A thorough tenant screening process — employment verification, reference checks, and a proper lease — dramatically reduces the risk of non-payment. The cost of a bad tenant is almost always higher than the cost of a vacant unit.`,
  },
];

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) return notFound();

  const categoryColors: Record<string, string> = {
    "Tenant Guides": "bg-blue-50 text-blue-700",
    Legal: "bg-amber-50 text-amber-700",
    "Property Owners": "bg-emerald-50 text-emerald-700",
    "Market Insights": "bg-purple-50 text-purple-700",
  };

  return (
    <div>
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? "bg-cream-100 text-navy-700"}`}>
              {post.category}
            </span>
            <span className="text-white/40 text-xs">{post.readTime}</span>
          </div>
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-gold-500 pl-5">
          {post.excerpt}
        </p>
        <div className="prose prose-navy max-w-none">
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("**") && block.endsWith("**")) {
              return <h2 key={i} className="font-[var(--font-heading)] text-xl font-bold text-navy-800 mt-8 mb-3">{block.replace(/\*\*/g, "")}</h2>;
            }
            if (block.startsWith("*") && block.endsWith("*")) {
              return <p key={i} className="text-sm font-semibold text-navy-700 mb-1">{block.replace(/\*/g, "")}</p>;
            }
            if (block.match(/^\d\./)) {
              const items = block.split("\n").filter(Boolean);
              return (
                <ol key={i} className="list-decimal list-inside space-y-1 mb-4 text-muted-foreground text-sm leading-relaxed">
                  {items.map((item, j) => <li key={j}>{item.replace(/^\d\.\s/, "")}</li>)}
                </ol>
              );
            }
            if (block.startsWith("-")) {
              const items = block.split("\n").filter(Boolean);
              return (
                <ul key={i} className="list-disc list-inside space-y-1 mb-4 text-muted-foreground text-sm leading-relaxed">
                  {items.map((item, j) => <li key={j}>{item.replace(/^-\s/, "")}</li>)}
                </ul>
              );
            }
            return <p key={i} className="text-muted-foreground leading-relaxed mb-4 text-sm">{block}</p>;
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">More from the Emalink Journal</p>
          <div className="flex flex-wrap gap-3">
            {posts.filter((p) => p.id !== post.id).slice(0, 3).map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`}
                className="text-sm font-medium text-navy-800 hover:text-navy-600 hover:underline transition-colors">
                {p.title} →
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
