# -*- coding: utf-8 -*-
"""Builds the Canjain Global Advisors site into plain HTML files.

    python3 build.py

Every page is generated from the same head/header/footer templates, so the
title and social-preview tags can never drift apart the way they did on the
old pages.
"""

import os
import re
import shutil
import datetime
from content import (SITE_URL, FIRM, OFFICES, TEAM, SERVICE_OPTIONS, SERVICES,
                     SERVICE_BY_SLUG, REGISTER, TILES, PRACTICES, HOME_FAQS, CALENDAR)

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "docs")
TODAY = datetime.date.today().isoformat()

NAV_TAX = ["itr-filing", "tds-returns", "gst-registration", "gst-return-filing"]
NAV_SPECIALIST = ["crypto-tax", "foreign-income", "international-tax", "ecommerce-sellers"]
NAV_START = ["pvt-ltd-registration", "roc-annual-compliance", "trademark-registration", "fssai-licence"]

pages = []  # (path, priority, changefreq)


# ----------------------------------------------------------------------
# shared chrome
# ----------------------------------------------------------------------

def head(title, desc, path, og_type="website", extra=""):
    url = SITE_URL + "/" + path
    return f"""<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} | {FIRM['short']}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#005176">
<link rel="canonical" href="{url}">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="{FIRM['short']}">
<meta property="og:title" content="{title} | {FIRM['short']}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE_URL}/assets/img/og-cover.png">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title} | {FIRM['short']}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{SITE_URL}/assets/img/og-cover.png">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/cga-logo.jpeg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/site.css">
{extra}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
"""


def navlinks(slugs):
    out = []
    for s in slugs:
        svc = SERVICE_BY_SLUG[s]
        out.append(f'<a href="{s}.html">{svc["short"]}</a>')
    return "\n      ".join(out)


def header(current=""):
    def mark(href):
        return ' aria-current="page"' if href == current else ""
    return f"""<div class="topbar">
  <div class="wrap">
    <span class="topbar__name">{FIRM['legal']}</span>
    <a href="tel:{FIRM['phone_href']}">{FIRM['phone']}</a>
    <a href="mailto:{FIRM['email_sales']}">{FIRM['email_sales']}</a>
    <a href="index.html#offices">5 offices</a>
    <a href="{FIRM['pay']}" rel="noopener">Pay online</a>
  </div>
</div>

<header class="masthead">
  <div class="wrap">
    <a class="brand" href="index.html">
      <img src="assets/img/cga-logo.jpeg" alt="" data-optional width="42" height="42">
      <span class="brand__txt">Canjain Global Advisors<span>Advocate-led · CA · CS · CMA</span></span>
    </a>
    <button class="btn btn--ghost navtoggle" data-navtoggle aria-expanded="false" aria-controls="mainnav">Menu</button>
    <nav class="nav" id="mainnav" data-nav aria-label="Main">
      <a href="services.html"{mark('services.html')}>All services</a>
      <a href="itr-filing.html"{mark('itr-filing.html')}>Income tax</a>
      <a href="gst-return-filing.html"{mark('gst-return-filing.html')}>GST</a>
      <a href="about.html"{mark('about.html')}>The firm</a>
      <a href="team.html"{mark('team.html')}>Team</a>
      <a class="btn btn--primary" href="index.html#enquire">Get a quote</a>
    </nav>
  </div>
</header>
<main id="main">
"""


def band(title, text):
    return f"""<section class="band">
  <div class="wrap">
    <h2>{title}</h2>
    <p>{text}</p>
    <div class="btn-row">
      <a class="btn btn--light" href="index.html#enquire">Get a quote</a>
      <a class="btn btn--wa" href="https://wa.me/{FIRM['wa']}" rel="noopener">WhatsApp us</a>
      <a class="btn btn--ghost" style="border-color:rgba(255,255,255,.5);color:#fff" href="tel:{FIRM['phone_href']}">Call {FIRM['phone']}</a>
    </div>
  </div>
</section>
"""


def footer():
    reg_links = "\n      ".join(
        f'<li><a href="{s}.html">{SERVICE_BY_SLUG[s]["short"]}</a></li>'
        for s in ["itr-filing", "gst-registration", "gst-return-filing", "tds-returns", "crypto-tax"]
    )
    return f"""</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div class="foot__brand">
        <img src="assets/img/cga-logo.jpeg" alt="{FIRM['short']}" data-optional width="44" height="44">
        <p>Registration, taxation, licensing and regulatory practice serving clients in India and abroad.</p>
        <div class="social">
          <a href="{FIRM['fb']}" rel="noopener" aria-label="Facebook">FB</a>
          <a href="{FIRM['ig']}" rel="noopener" aria-label="Instagram">IG</a>
          <a href="{FIRM['yt']}" rel="noopener" aria-label="YouTube">YT</a>
        </div>
      </div>
      <div>
        <h4>Tax and returns</h4>
        <ul>
      {reg_links}
          <li><a href="services.html">All services</a></li>
        </ul>
      </div>
      <div>
        <h4>The firm</h4>
        <ul>
          <li><a href="about.html">About the firm</a></li>
          <li><a href="team.html">Our team</a></li>
          <li><a href="index.html#offices">Offices</a></li>
          <li><a href="index.html#process">How we work</a></li>
          <li><a href="index.html#faq">Questions</a></li>
          <li><a href="mailto:{FIRM['email_careers']}">Careers</a></li>
        </ul>
      </div>
      <div>
        <h4>Reach us</h4>
        <ul>
          <li><a href="tel:{FIRM['phone_href']}">{FIRM['phone']}</a></li>
          <li><a href="tel:{FIRM['phone2_href']}">{FIRM['phone2']}</a></li>
          <li><a href="mailto:{FIRM['email_sales']}">{FIRM['email_sales']}</a></li>
          <li><a href="mailto:{FIRM['email_support']}">{FIRM['email_support']}</a></li>
          <li><a href="{FIRM['pay']}" rel="noopener">Make a payment</a></li>
        </ul>
      </div>
      <div>
        <h4>Legal</h4>
        <ul>
          <li><a href="privacy.html">Privacy policy</a></li>
          <li><a href="terms.html">Terms of service</a></li>
          <li><a href="refund.html">Refund and cancellation</a></li>
          <li><a href="index.html#enquire">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="foot__legal">
      <p>&copy; <span data-year>2026</span> {FIRM['legal']}. All rights reserved.</p>
      <p class="disclaimer"><strong>Disclaimer:</strong> cgaindia.com is operated by {FIRM['legal']} and is not affiliated with, endorsed by, or acting on behalf of any government department or regulatory authority. Statutory and government fees are payable to the concerned authority and are separate from professional fees. Nothing on this website constitutes legal, tax or financial advice; outcomes and timelines depend on the facts of each matter and on the authority concerned.</p>
    </div>
  </div>
</footer>

<div class="actionbar">
  <a class="btn btn--primary" href="tel:{FIRM['phone_href']}">Call</a>
  <a class="btn btn--wa" href="https://wa.me/{FIRM['wa']}" rel="noopener">WhatsApp</a>
  <a class="btn btn--ghost" href="index.html#enquire">Enquire</a>
</div>

<script src="assets/js/site.js"></script>
</body>
</html>
"""


def faq_block(items, heading="Questions we are asked every week", eyebrow="Before you call", anchor="faq"):
    rows = "\n".join(
        f"""    <details>
      <summary>{q}</summary>
      <p>{a}</p>
    </details>""" for q, a in items
    )
    return f"""<section class="sec" id="{anchor}">
  <div class="wrap">
    <p class="eyebrow">{eyebrow}</p>
    <h2>{heading}</h2>
    <div class="faq">
{rows}
    </div>
  </div>
</section>
"""


def faq_schema(items):
    def esc(t):
        return t.replace('"', "&quot;").replace("&amp;", "&")
    q = ",".join(
        '{"@type":"Question","name":"%s","acceptedAnswer":{"@type":"Answer","text":"%s"}}'
        % (esc(a), esc(b)) for a, b in items
    )
    return '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[%s]}</script>\n' % q


def enquiry_section():
    opts = "\n            ".join(f'<option>{o}</option>' for o in SERVICE_OPTIONS)
    offices_contact = f"""<ul class="contactlist">
          <li><small>Phone</small><a href="tel:{FIRM['phone_href']}">{FIRM['phone']}</a> &nbsp;·&nbsp; <a href="tel:{FIRM['phone2_href']}">{FIRM['phone2']}</a></li>
          <li><small>New work</small><a href="mailto:{FIRM['email_sales']}">{FIRM['email_sales']}</a></li>
          <li><small>Existing clients</small><a href="mailto:{FIRM['email_support']}">{FIRM['email_support']}</a></li>
          <li><small>Careers</small><a href="mailto:{FIRM['email_careers']}">{FIRM['email_careers']}</a></li>
          <li><small>Payments</small><a href="{FIRM['pay']}" rel="noopener">Secure payment link</a></li>
          <li><small>Head office</small>{FIRM['head_office']}</li>
        </ul>"""
    return f"""<section class="sec sec--ink" id="enquire">
  <div class="wrap">
    <div class="form">
      <div>
        <p class="eyebrow">Talk to us</p>
        <h2>Tell us what you need done</h2>
        <p>You do not have to know the name of the form. Describe the problem, and working out which filing it is will be our job.</p>
        {offices_contact}
      </div>

      <div class="card-form">
        <div class="form__ok" data-ok tabindex="-1">Details ready. Your WhatsApp or email window should have opened — send the message and we will reply on the next working day, usually sooner.</div>
        <form id="enquiry-form" novalidate>
          <div class="two">
            <div class="field">
              <label for="f-name">Your name</label>
              <input id="f-name" name="name" type="text" autocomplete="name" required>
              <span class="err">Please enter your name.</span>
            </div>
            <div class="field">
              <label for="f-mobile">Mobile</label>
              <input id="f-mobile" name="mobile" type="tel" inputmode="numeric" autocomplete="tel" required>
              <span class="err">Enter a valid 10-digit mobile number.</span>
            </div>
          </div>
          <div class="two">
            <div class="field">
              <label for="f-email">Email <span style="font-weight:400;color:#586b77">(optional)</span></label>
              <input id="f-email" name="email" type="email" autocomplete="email">
              <span class="err">That email address does not look right.</span>
            </div>
            <div class="field">
              <label for="f-city">City / state</label>
              <input id="f-city" name="city" type="text" autocomplete="address-level2">
            </div>
          </div>
          <div class="field">
            <label for="f-service">Service required</label>
            <select id="f-service" name="service">
            {opts}
            </select>
          </div>
          <div class="field">
            <label for="f-message">Briefly, what is the situation?</label>
            <textarea id="f-message" name="message" placeholder="A line or two about the matter helps us quote accurately."></textarea>
          </div>
          <div class="btn-row" style="margin-top:.4rem">
            <button type="button" class="btn btn--wa" data-send-wa>Send on WhatsApp</button>
            <button type="button" class="btn btn--ghost" data-send-mail>Send by email</button>
          </div>
          <p class="form__note">We reply on working days, usually the same day. Your details are used only to respond to this enquiry.</p>
        </form>
      </div>
    </div>
  </div>
</section>
"""


def write(path, html, priority="0.7", freq="monthly", in_sitemap=True):
    with open(os.path.join(OUT, path), "w", encoding="utf-8") as f:
        f.write(html)
    if in_sitemap:
        pages.append((path, priority, freq))


# ----------------------------------------------------------------------
# home
# ----------------------------------------------------------------------

def build_home():
    cal = "\n      ".join(
        f'<li><span class="cal__d">{d}</span><span><span class="cal__t">{t}</span><span class="cal__s">{s}</span></span></li>'
        for d, t, s in CALENDAR
    )

    practices = "\n".join(f"""      <article class="pcard">
        <p class="pcard__auth">{auth}</p>
        <h3>{title}</h3>
        <p>{desc}</p>
        <ul>{''.join(f'<li>{i}</li>' for i in items)}</ul>
        <a class="tl" href="{href}">{cta}</a>
      </article>""" for auth, title, desc, items, href, cta in PRACTICES)

    tiles = "\n".join(
        f'      <a class="tile" href="{slug}.html"><small>{code}</small><b>{name}</b><span>{desc}</span></a>'
        for code, name, desc, slug in TILES
    )

    offices = "\n".join(
        f"""      <div class="office{' office--head' if kind == 'Head office' else ''}">
        <small>{kind}</small>
        <h3>{city}</h3>
        <address>{addr}</address>
      </div>""" for kind, city, addr in OFFICES
    )

    steps = [
        ("Tell us the situation", "A call or a form. We identify the actual filing, the authority, the government fee and a realistic timeline — before any payment."),
        ("Written scope and fee", "You get a one-page scope: what we file, what you supply, what it costs, with professional fee and statutory fee shown separately."),
        ("We prepare and file", "Documents drafted, verified and filed by the qualified professional for that matter. Acknowledgements shared as they come."),
        ("Certificate and calendar", "You receive the certificate or order, plus a due-date calendar so the next return does not arrive as a surprise."),
    ]
    steps_html = "\n".join(f'      <div class="step"><h3>{h}</h3><p>{p}</p></div>' for h, p in steps)

    reasons = [
        ("A named manager, not a ticket queue", "You get one person's number. They know your file, your due dates and what is pending at which office.", "Costs us: the efficiency of a ticket system."),
        ("Fees split honestly", "Professional fee and government fee are quoted separately, in writing, before work starts. Nothing is added at filing stage.", "Costs us: the easy margin that opacity allows."),
        ("We say no when a filing is not needed", "Plenty of licences are sold to businesses that do not require them. We check applicability first, even when it costs us the engagement.", "Costs us: the engagement, fairly often."),
        ("Every discipline in the same file", "Advocate, chartered accountant, company secretary and cost accountant work together, so tax positions, ROC records and legal drafting do not contradict each other.", "Costs us: more people on one matter."),
        ("Built for non-resident clients", "Overseas founders, NRI taxpayers and foreign subsidiaries handled fully online, with documents collected and returned digitally.", "Costs us: working across time zones."),
        ("Filed, then followed up", "An acknowledgement is not an outcome. We track the application until the certificate, order or objection actually lands.", "Costs us: the file stays open long after the invoice is settled."),
    ]
    reasons_html = "\n".join(
        f'      <div class="reason"><h3>{h}</h3><p>{p}</p><span class="cost">{c}</span></div>'
        for h, p, c in reasons
    )

    schema = ('<script type="application/ld+json">'
              '{"@context":"https://schema.org","@type":"ProfessionalService",'
              '"name":"%s","url":"%s","image":"%s/assets/img/cga-logo.jpeg",'
              '"telephone":"%s","email":"%s",'
              '"address":{"@type":"PostalAddress","streetAddress":"Aparna Tower, near Old Bus Stand","addressLocality":"Mathura","addressRegion":"Uttar Pradesh","addressCountry":"IN"},'
              '"areaServed":"IN","description":"Advocate-led compliance practice handling company registration, GST, income tax, TDS, trademark, licences and environmental compliance across India."}'
              "</script>\n") % (FIRM["legal"], SITE_URL, SITE_URL, FIRM["phone"], FIRM["email_sales"])

    html = head(
        "Company Registration, GST, Trademark &amp; Compliance in India",
        "Advocate-led compliance practice: company registration, GST and income tax, TDS, trademark and IP, sectoral licences, RBI approvals and environmental compliance. Five offices across UP, Delhi and Haryana.",
        "index.html", extra=schema + faq_schema(HOME_FAQS))
    html += header("index.html")

    html += f"""<section class="hero">
  <div class="wrap">
    <div>
      <p class="eyebrow">Advocate-led · CA · CS · CMA</p>
      <h1>Every registration, return and licence your business owes, filed on time.</h1>
      <p class="hero__lead">A single professional desk for Indian statutory work. Tell us the problem in your own words; working out which form it actually is, and which authority it goes to, is our job.</p>
      <div class="btn-row">
        <a class="btn btn--light" href="#enquire">Tell us the situation</a>
        <a class="btn btn--wa" href="https://wa.me/{FIRM['wa']}" rel="noopener">WhatsApp us</a>
      </div>
      <div class="hero__marks">
        <span>Advocate-led practice</span>
        <span>5 offices — UP, Delhi, Haryana</span>
        <span>Indian and overseas clients</span>
      </div>
    </div>

    <aside class="cal">
      <h2>The monthly cycle</h2>
      <p class="cal__note">Four dates most late fees come from.</p>
      <ul class="cal__list">
      {cal}
      </ul>
      <p class="cal__foot">QRMP filers follow a quarterly cycle, and dates move when the government grants an extension. <a href="#enquire">Ask us to map your exact calendar.</a></p>
    </aside>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">What we do</p>
    <h2>Six practices, one file for your business</h2>
    <p class="sec__lead">Most firms hand you between departments. Here, one manager holds your file and pulls in the right professional — advocate, chartered accountant, company secretary or cost accountant — as the matter demands.</p>
    <div class="grid grid--3" style="margin-top:2.4rem">
{practices}
    </div>
  </div>
</section>

<section class="sec sec--mist">
  <div class="wrap">
    <p class="eyebrow">Frequently requested</p>
    <h2>The filings clients ask for most</h2>
    <p class="sec__lead">Prices move with state, turnover and category, so we quote after a short conversation rather than advertising a number that changes at checkout.</p>
    <div class="tiles" style="margin-top:2.2rem">
{tiles}
    </div>
    <div class="btn-row"><a class="btn btn--ghost" href="services.html">See the full service register</a></div>
  </div>
</section>

<section class="sec sec--ink" id="process">
  <div class="wrap">
    <p class="eyebrow">How an engagement runs</p>
    <h2>Four stages, and you always know which one you are in</h2>
    <div class="steps">
{steps_html}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="founder">
      <div class="founder__pic">
        <img src="assets/img/neeraj-advocate.jpg" alt="Neeraj Jain, Founder and CEO of Canjain Global Advisors" data-optional>
      </div>
      <div>
        <p class="eyebrow">Who you are dealing with</p>
        <blockquote class="pull">Business grow karne ke liye sirf sales nahi, <em>compliance bhi strong honi chahiye.</em></blockquote>
        <p>The firm was built on a simple idea: a business owner should be able to describe a problem in ordinary language and have somebody else work out which form it is, which authority it goes to and what it will cost.</p>
        <p>Critical matters are reviewed personally. The rest runs on a system that does not depend on one person remembering a date.</p>
        <p class="sign">Neeraj Jain<span>Founder &amp; CEO, {FIRM['legal']}</span></p>
        <div class="btn-row">
          <a class="btn btn--primary" href="about.html">Read about the firm</a>
          <a class="btn btn--ghost" href="team.html">Meet the team</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--ink">
  <div class="wrap">
    <p class="eyebrow">Why Canjain</p>
    <h2>Compliance is not a product. It is somebody being accountable.</h2>
    <p class="sec__lead" style="color:#bdccd6">{FIRM['legal']} is led by an advocate and works with associated chartered accountants, company secretaries and cost accountants across India. Everything is delivered from India, for clients in India and abroad.</p>
    <div class="stats">
      <div class="stat"><b>19</b><span>People on the floor</span></div>
      <div class="stat"><b>5</b><span>Offices</span></div>
      <div class="stat"><b>200+</b><span>Filing types handled</span></div>
      <div class="stat"><b>1</b><span>Point of contact</span></div>
    </div>
    <div class="reasons">
{reasons_html}
    </div>
  </div>
</section>

<section class="sec" id="offices">
  <div class="wrap">
    <p class="eyebrow">Where we are</p>
    <h2>Five offices, one file</h2>
    <p class="sec__lead">Walk in at any office, or work with us entirely online. Documents move between offices internally, so you never repeat yourself.</p>
    <div class="offices">
{offices}
    </div>
    <div class="strip">
      <figure class="shot"><img src="assets/img/office-01.jpg" alt="Filing desks at the Canjain Global Advisors office" data-optional><figcaption>The filing floor — GST, TDS and ROC work runs from these desks.</figcaption></figure>
      <figure class="shot"><img src="assets/img/office-02.jpg" alt="Client meeting desk" data-optional><figcaption>Where you sit down with the manager holding your file.</figcaption></figure>
      <figure class="shot"><img src="assets/img/neeraj-office.jpg" alt="Neeraj Jain at his desk" data-optional><figcaption>Critical matters are reviewed personally.</figcaption></figure>
      <figure class="shot"><img src="assets/img/neeraj-desk.jpg" alt="Inside the office on a working day" data-optional><figcaption>Inside the office, on an ordinary working day.</figcaption></figure>
    </div>
  </div>
</section>

"""
    html += faq_block(HOME_FAQS)
    html += enquiry_section()
    html += footer()
    write("index.html", html, "1.0", "weekly")


# ----------------------------------------------------------------------
# services register
# ----------------------------------------------------------------------

def build_services():
    groups = []
    for g in REGISTER:
        rows = []
        for name, desc, slug in g["items"]:
            href = f"{slug}.html" if slug else "index.html#enquire"
            rows.append(f'        <li><a href="{href}"><b>{name}</b><span>{desc}</span></a></li>')
        groups.append(f"""    <section class="register" id="{g['id']}">
      <div class="register__head">
        <h2>{g['title']}</h2>
        <small>{g['authority']}</small>
      </div>
      <p style="margin-top:1rem">{g['intro']}</p>
      <ul class="rlist">
{chr(10).join(rows)}
      </ul>
    </section>""")

    jump = " ".join(
        f'<a class="btn btn--ghost" href="#{g["id"]}">{g["title"]}</a>' for g in REGISTER
    )

    html = head("All services — the full register",
                "Company registration, GST, income tax, TDS, trademark and IP, sectoral licences, RBI approvals and environmental compliance — the complete service register at Canjain Global Advisors.",
                "services.html")
    html += header("services.html")
    html += f"""<section class="page-hero">
  <div class="wrap">
    <p class="crumbs"><a href="index.html">Home</a> / Services</p>
    <p class="eyebrow">Service register</p>
    <h1>Every filing we handle, in one list</h1>
    <p>Registrations, returns, licences and approvals across the MCA, GST, income tax, the trademark registry, sectoral regulators and the pollution boards. If your filing is not listed, ask — this is what we do most, not the limit of it.</p>
    <div class="btn-row">{jump}</div>
  </div>
</section>

<div class="wrap" style="padding-block:clamp(2rem,4vw,3rem)">
{chr(10).join(groups)}
</div>

<section class="sec sec--mist">
  <div class="wrap">
    <h2>Not sure which one applies to you?</h2>
    <p class="sec__lead">Describe the situation in your own words. We will identify the filing, the authority and a realistic timeline before you pay anything.</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="index.html#enquire">Get a quote</a>
      <a class="btn btn--ghost" href="tel:{FIRM['phone_href']}">Call {FIRM['phone']}</a>
    </div>
  </div>
</section>
"""
    html += footer()
    write("services.html", html, "0.9", "monthly")


# ----------------------------------------------------------------------
# service pages
# ----------------------------------------------------------------------

def build_service(svc):
    handle = "\n".join(f"      <li>{i}</li>" for i in svc["handle"])
    supply = "\n".join(f"      <li>{i}</li>" for i in svc["supply"])
    steps = "\n".join(f'      <div class="step"><h3>{h}</h3><p>{p}</p></div>' for h, p in svc["steps"])
    related = "\n".join(
        f'        <li><a href="{r}.html">{SERVICE_BY_SLUG[r]["short"]}</a></li>' for r in svc["related"]
    )
    intro = "\n    ".join(f"<p>{p}</p>" for p in svc["intro"])
    c_label, c_h, c_p = svc["callout"]
    cta_h, cta_p = svc["cta"]

    html = head(svc["title"], svc["meta"], f'{svc["slug"]}.html',
                og_type="article", extra=faq_schema(svc["faqs"]))
    html += header(f'{svc["slug"]}.html')
    html += f"""<section class="page-hero">
  <div class="wrap">
    <p class="crumbs"><a href="index.html">Home</a> / <a href="services.html">Services</a> / {svc['name']}</p>
    <p class="eyebrow">{svc['authority']}</p>
    <h1>{svc['name']}</h1>
    <p>{svc['lead']}</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="index.html#enquire">Get a quote</a>
      <a class="btn btn--wa" href="https://wa.me/{FIRM['wa']}?text={svc['name'].replace(' ', '%20')}" rel="noopener">Ask on WhatsApp</a>
    </div>
  </div>
</section>

<div class="wrap layout">
  <article class="prose">
    {intro}

    <h2>What we handle</h2>
    <ul>
{handle}
    </ul>

    <h2>What you supply</h2>
    <ul>
{supply}
    </ul>
    <p style="margin-top:1rem">{svc['supply_note']}</p>

    <div class="callout">
      <p class="eyebrow">{c_label}</p>
      <h3>{c_h}</h3>
      <p>{c_p}</p>
      <p><a href="index.html#enquire"><strong>Describe your situation</strong></a></p>
    </div>

    <p class="note">Professional fee and government fee are quoted separately, in writing, before any work starts.</p>
  </article>

  <aside class="side">
    <div class="side__box">
      <h4>Reviewed by</h4>
      <div class="side__by">
        <div class="person__ph"><img src="assets/img/neeraj-sq.jpg" alt="" data-optional><span aria-hidden="true">N</span></div>
        <div><b>Neeraj Jain</b><span>Founder &amp; CEO, Advocate</span></div>
      </div>
    </div>
    <div class="side__box">
      <h4>Related work</h4>
      <ul>
{related}
      </ul>
    </div>
    <div class="side__cta">
      <h4>Time-bound matter?</h4>
      <p>If a notice or a due date is involved, call rather than email. Reply windows are short and an extension is easier to get before the date than after.</p>
      <a class="btn btn--light" href="tel:{FIRM['phone_href']}">Call {FIRM['phone']}</a>
    </div>
  </aside>
</div>

<section class="sec sec--ink">
  <div class="wrap">
    <p class="eyebrow">How the engagement runs</p>
    <h2>Four stages, and you always know which one you are in</h2>
    <div class="steps">
{steps}
    </div>
  </div>
</section>

"""
    html += faq_block(svc["faqs"], heading="Questions we are asked about this",
                      eyebrow="Before you call", anchor="faq")
    html += band(cta_h, cta_p)
    html += footer()
    write(f'{svc["slug"]}.html', html, "0.8", "monthly")


# ----------------------------------------------------------------------
# about
# ----------------------------------------------------------------------

def build_about():
    journey = [
        ("One desk, and the filings nobody wanted",
         "The practice began the way most do — with returns, registrations and the paperwork larger firms found too small to bother with. The clients were local traders, shopkeepers and first-time founders. The work was unglamorous and it taught the thing that mattered most: what actually confuses people."),
        ("Advocate, and the change that followed",
         "Enrolling as an advocate changed what the firm could take on. A notice is not a filing problem — it is a drafting and representation problem. Once replies, submissions and appearances came in-house, clients stopped being handed off at the exact moment their matter turned serious."),
        ("Every discipline in the same room",
         "A tax position that ignores the ROC record, or a legal draft that ignores the tax consequence, creates work later. Chartered accountants, company secretaries and cost accountants were brought into the same files as the advocate side — so one matter gets one consistent answer instead of three partial ones."),
        ("Five offices, because distance was costing clients",
         "Safidon, Rohtak, Mathura and two offices in Delhi. Not a franchise plan — a response to clients travelling further than they should have to for a signature or a document. Compliance work is easier when the person handling it is somebody you can walk in and see."),
        ("Clients who are not in the country",
         "NRI returns, foreign income, cross-border withholding and inbound investment now run alongside the domestic practice, handled fully online with documents collected and returned digitally. The client in Dubai and the client in Jind get the same file discipline."),
    ]
    journey_html = "\n".join(
        f'      <div class="step"><h3>{h}</h3><p>{p}</p></div>' for h, p in journey
    )

    values = [
        ("We tell you when you do not need it",
         "Plenty of licences and registrations are sold to businesses that are not required to hold them. We check applicability first and say so plainly.",
         "Costs us: the engagement, fairly often."),
        ("Fees are split, in writing, before we start",
         "Professional fee and government fee are separate lines. Nothing is added at filing stage, and no statutory fee is quietly marked up.",
         "Costs us: the easy margin that opacity allows."),
        ("Bad news travels fast",
         "If a deadline is missed, an application is rejected or a position is weaker than hoped, you hear it from us immediately — not at the next review.",
         "Costs us: difficult conversations we could have delayed."),
        ("A named person, not a queue",
         "You get one person's number. They know your file, your due dates and what is pending at which office.",
         "Costs us: the efficiency of a ticket system."),
        ("Filed is not finished",
         "An acknowledgement is not an outcome. We track the application until the certificate, order or objection actually lands.",
         "Costs us: the file stays open long after the invoice is settled."),
    ]
    values_html = "\n".join(
        f'      <div class="reason"><h3>{h}</h3><p>{p}</p><span class="cost">{c}</span></div>'
        for h, p, c in values
    )

    clients = [
        ("The first-time founder", "Has an idea and a co-founder, and no idea what a DIN is. Needs the entity set up correctly the first time, because fixing a wrong incorporation later is far more expensive than doing it right."),
        ("The established trader", "Has been running for years and is competent at the business itself. Needs the monthly cycle to simply happen — GST, TDS, returns — without a phone call every month."),
        ("The company with a notice", "Something has already gone wrong and there is a date on the letter. Needs a reply drafted properly and an honest read on how serious it actually is."),
        ("The client outside India", "NRI, overseas founder or foreign parent. Needs residential status settled, treaty positions taken correctly, and everything handled without being in the room."),
    ]
    clients_html = "\n".join(
        f'      <article class="pcard"><h3>{h}</h3><p>{p}</p></article>' for h, p in clients
    )

    html = head("About the firm",
                "How Canjain Global Advisors started, what it stands for and how it works — from one desk to five offices, and the standards the firm holds itself to.",
                "about.html")
    html += header("about.html")
    html += f"""<section class="page-hero">
  <div class="wrap">
    <p class="crumbs"><a href="index.html">Home</a> / About the firm</p>
    <p class="eyebrow">{FIRM['legal']}</p>
    <h1>A firm built around one uncomfortable question</h1>
    <p>Why does a business owner have to become an amateur tax expert just to stay on the right side of the law? Everything below follows from refusing to accept that as normal.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">The starting point</p>
    <h2>Most compliance failures are not acts of dishonesty</h2>
    <p>They are acts of confusion. A trader who did not know that stock in another state's warehouse needed its own registration. A founder who paid TDS on time but under the wrong section. A family that missed a form because nobody told them it existed.</p>
    <p>None of these people set out to break a rule. They simply could not see the rule from where they were standing, and the penalty system does not distinguish between the two.</p>
    <p>That gap — between what the law expects and what an ordinary business owner can reasonably be expected to know — is where this firm operates.</p>
  </div>
</section>

<section class="sec sec--ink">
  <div class="wrap">
    <p class="eyebrow">The journey</p>
    <h2>From one desk to five offices</h2>
    <p class="sec__lead" style="color:#bdccd6">Nothing here happened in a single leap. Each stage was a response to something a client needed and we could not yet do properly.</p>
    <div class="steps">
{journey_html}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="grid grid--2">
      <div>
        <p class="eyebrow">Vision</p>
        <h2 style="font-size:var(--step-2)">Compliance should be boring</h2>
        <p>Not stressful, not mysterious, and never a thing you discover you were wrong about two years later. The end goal is a client who has genuinely stopped thinking about due dates, because somebody competent is already thinking about them.</p>
        <p>If a client is anxious about a deadline, that is our failure before it is theirs.</p>
      </div>
      <div>
        <p class="eyebrow">Mission</p>
        <h2 style="font-size:var(--step-2)">Take the burden, not just the file</h2>
        <p>To make statutory compliance accessible to businesses that cannot afford a full-time finance department — by absorbing the complexity ourselves rather than passing it back as a checklist the client has to decode.</p>
        <p>You describe the problem in ordinary language. Working out which form it is, which authority it goes to and what it will cost is our job, not yours.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--mist">
  <div class="wrap">
    <p class="eyebrow">What we hold ourselves to</p>
    <h2>Five commitments, and what each one costs us</h2>
    <p class="sec__lead">Values are only real if they occasionally work against you. Here is what each of ours costs the firm when it is honoured.</p>
    <div class="reasons">
{values_html}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="eyebrow">How the firm is built</p>
    <h2>Systems, so that nothing depends on one person's memory</h2>
    <p>A compliance practice fails in a predictable way: one capable person holds every date in their head, and then that person is unwell, or on leave, or simply overloaded in the last week of a month when four different deadlines land together.</p>
    <p>So the firm is deliberately built the other way. Every client sits on a master compliance tracker with their entity type, registrations and recurring due dates. Work is assigned to a named executive with a named backup. Critical matters are reviewed personally at the top, but the routine cycle does not depend on that review to run on time.</p>
    <p>It is a less romantic way to run a professional firm. It is also the only way a client's GSTR-3B gets filed in a month when everything else has gone wrong.</p>
  </div>
</section>

<section class="sec sec--mist">
  <div class="wrap">
    <p class="eyebrow">Who we work with</p>
    <h2>Four kinds of client, four different problems</h2>
    <div class="grid grid--2" style="margin-top:2.2rem">
{clients_html}
    </div>
  </div>
</section>

<section class="sec sec--ink">
  <div class="wrap">
    <div class="founder">
      <div class="founder__pic"><img src="assets/img/neeraj-advocate.jpg" alt="Neeraj Jain, Founder and CEO" data-optional></div>
      <div>
        <p class="eyebrow">A note from the founder</p>
        <blockquote class="pull">Business grow karne ke liye sirf sales nahi, <em>compliance bhi strong honi chahiye.</em></blockquote>
        <p>Growth built on weak compliance is not growth — it is exposure that has not been discovered yet. I have seen good businesses lose more to a penalty they did not see coming than they made on the deal that caused it.</p>
        <p>What I want from this firm is simple. That a client can call one number, describe a problem in their own words, and put it down. That is the whole idea.</p>
        <p class="sign">Neeraj Jain<span>Founder &amp; CEO, {FIRM['legal']}</span></p>
      </div>
    </div>
  </div>
</section>

"""
    html += band("Start with the situation, not the form",
                 "You do not have to know what the filing is called. Describe what has happened and we will identify the filing, the authority and a realistic timeline before you pay anything.")
    html += footer()
    write("about.html", html, "0.8", "yearly")


# ----------------------------------------------------------------------
# team
# ----------------------------------------------------------------------

def build_team():
    groups = []
    for group, members in TEAM.items():
        cards = []
        for name, role, qual, phone, photo in members:
            initial = name.strip()[0]
            phone_html = f'<a href="tel:{phone}">{phone[:3]} {phone[3:8]} {phone[8:]}</a>' if phone else ""
            qual_html = f"<em>{qual}</em>" if qual else ""
            cards.append(f"""        <div class="person">
          <div class="person__ph"><img src="assets/img/{photo}" alt="{name}" data-optional><span aria-hidden="true">{initial}</span></div>
          <b>{name}</b>
          <small>{role}</small>
          {qual_html}
          {phone_html}
        </div>""")
        groups.append(f"""    <div class="teamgroup">
      <h3>{group}</h3>
      <div class="people">
{chr(10).join(cards)}
      </div>
    </div>""")

    html = head("The team",
                "The nineteen people behind Canjain Global Advisors — leadership, senior executives, assistants and junior assistants across five offices in UP, Delhi and Haryana.",
                "team.html")
    html += header("team.html")
    html += f"""<section class="page-hero">
  <div class="wrap">
    <p class="crumbs"><a href="index.html">Home</a> / Team</p>
    <p class="eyebrow">Nineteen people, five offices</p>
    <h1>The faces that do the work</h1>
    <p>Compliance is not a product you buy off a shelf. It is somebody being accountable for a date. These are the people who are accountable for yours.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p>Every engagement is assigned to a named person who tracks your due dates and knows what is pending at which office. Advocates, chartered accountants, company secretaries and cost accountants are brought into the file as the matter demands.</p>
{chr(10).join(groups)}
    <p class="note">Matters that require a qualified professional to sign or file are signed and filed by one. The team above prepares, verifies and follows up on your paperwork.</p>
  </div>
</section>

<section class="sec sec--mist">
  <div class="wrap">
    <h2>Want to work with this team?</h2>
    <p class="sec__lead">We take on article assistants and qualified professionals across Safidon, Delhi, Rohtak and Mathura. Send a CV and tell us which side of the practice interests you.</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="mailto:{FIRM['email_careers']}?subject=Application%20%E2%80%94%20CGA%20India">Email your CV</a>
      <a class="btn btn--ghost" href="index.html#enquire">Talk to the firm</a>
    </div>
  </div>
</section>
"""
    html += footer()
    write("team.html", html, "0.6", "yearly")


# ----------------------------------------------------------------------
# legal pages
# ----------------------------------------------------------------------

LEGAL = {
"privacy": ("Privacy policy",
 "How Canjain Global Advisors collects, uses, stores and protects the personal and financial information shared with the firm.",
 """
<p class="updated">Last updated: {today}</p>
<p>This policy explains what information {legal} ("we", "the firm") collects through cgaindia.com and in the course of an engagement, why we hold it, and what you can ask us to do with it.</p>

<h2>Information we collect</h2>
<ul>
<li><strong>Information you send us.</strong> Name, mobile number, email address, city and the description of your matter, submitted through the enquiry form, WhatsApp, email or a phone call.</li>
<li><strong>Engagement information.</strong> Where you become a client, the documents and records needed for the filing — which may include PAN, Aadhaar, financial statements, bank details, invoices and government correspondence.</li>
<li><strong>Website usage.</strong> Standard technical information such as browser type and pages visited, where analytics are in use.</li>
</ul>

<h2>How we use it</h2>
<ul>
<li>To respond to your enquiry and to quote for the work.</li>
<li>To prepare, verify and file returns, applications and replies on your instructions.</li>
<li>To meet our own obligations — record retention, audit trail, and any disclosure required by law or by a competent authority.</li>
<li>To contact you about due dates and the status of matters we are handling for you.</li>
</ul>

<h2>What we do not do</h2>
<p>We do not sell, rent or trade your information. We do not share client records with third parties for marketing. Information is disclosed outside the firm only where you have asked us to, where the filing itself requires it (for instance, uploading a document to a government portal), or where we are compelled to by law.</p>

<h2>Credentials and portal access</h2>
<p>Where you provide access to a government portal, those credentials are used only for the work you have engaged us for. We will never ask you to share a one-time password over a public channel, and no member of the firm is authorised to request payment to a personal account.</p>

<h2>Retention</h2>
<p>Engagement records are retained for the period required under the applicable tax, corporate and professional rules, and thereafter disposed of securely. Enquiries that do not become engagements are retained only for as long as needed to follow up.</p>

<h2>Your choices</h2>
<p>You may ask us for a copy of the information we hold about you, ask us to correct it, or ask us to stop sending you non-essential communication. Write to <a href="mailto:{email}">{email}</a> and we will respond within a reasonable period.</p>

<h2>Third-party services</h2>
<p>Payments are processed by our payment gateway provider, and their own terms and privacy policy apply to the transaction. Links to government portals and other websites are provided for convenience; we are not responsible for their content or practices.</p>

<h2>Changes</h2>
<p>This policy may be updated from time to time. The version on this page, with the date shown above, is the one in force.</p>

<h2>Contact</h2>
<p>{legal}, {office}. Email <a href="mailto:{email}">{email}</a>, phone <a href="tel:{phone_href}">{phone}</a>.</p>
"""),

"terms": ("Terms of service",
 "The terms on which Canjain Global Advisors provides professional services, including scope, fees, client responsibilities and limitation of liability.",
 """
<p class="updated">Last updated: {today}</p>
<p>These terms govern use of cgaindia.com and the professional services provided by {legal}. Where a separate engagement letter is signed for a matter, that letter prevails to the extent of any inconsistency.</p>

<h2>Nature of the website</h2>
<p>This website is informational. Nothing on it is legal, tax or financial advice, and no advocate-client or professional relationship is created by reading it or by sending an enquiry. A relationship begins only when we confirm a scope in writing and you accept it.</p>

<h2>Scope of work</h2>
<p>Every engagement is defined by a written scope setting out what we will file or draft, what you will supply, and the fee. Work outside that scope is quoted separately before it is taken up. Nothing we quote includes representation before a court or tribunal unless expressly stated.</p>

<h2>Fees</h2>
<ul>
<li>Professional fees and statutory or government fees are quoted separately.</li>
<li>Statutory fees are payable to the concerned authority and are not marked up.</li>
<li>Fees are generally payable in advance unless the scope says otherwise.</li>
<li>Government fees, once paid to an authority, are not recoverable from that authority regardless of the outcome.</li>
</ul>

<h2>Your responsibilities</h2>
<p>We rely on the documents and information you provide. You are responsible for their accuracy and completeness, and for telling us of anything that changes the position — a notice received, a transaction completed, a change in directors or premises. Delay in supplying documents is the most common cause of a missed deadline, and we cannot accept responsibility for consequences that follow from it.</p>

<h2>Timelines and outcomes</h2>
<p>Timelines given are estimates based on ordinary processing by the relevant authority. We do not control and cannot guarantee the decision of any authority, the grant of any registration or licence, or the outcome of any proceeding. Any indication of likely outcome is an opinion, not an assurance.</p>

<h2>Limitation of liability</h2>
<p>To the extent permitted by law, our liability in respect of any matter is limited to the professional fee received for that matter. We are not liable for indirect or consequential loss, including loss of profit or business opportunity. Nothing in these terms limits liability that cannot lawfully be limited.</p>

<h2>Confidentiality</h2>
<p>Information you share is treated as confidential and used only for the engagement, subject to disclosure required by law or by a competent authority.</p>

<h2>Termination</h2>
<p>Either party may end an engagement in writing. Fees for work already performed remain payable, and we will hand over documents and the status of pending matters on settlement of outstanding dues.</p>

<h2>Governing law</h2>
<p>These terms are governed by the laws of India, and the courts at the place of the head office have jurisdiction, unless a separate engagement letter provides otherwise.</p>

<h2>Contact</h2>
<p>{legal}, {office}. Email <a href="mailto:{email}">{email}</a>, phone <a href="tel:{phone_href}">{phone}</a>.</p>
"""),

"refund": ("Refund and cancellation policy",
 "When a fee paid to Canjain Global Advisors can be refunded, what is non-refundable, and how to request a cancellation.",
 """
<p class="updated">Last updated: {today}</p>
<p>Professional work is charged for the time and expertise applied to it, and statutory fees are paid onward to the authority. This policy explains what that means in practice.</p>

<h2>Before work begins</h2>
<p>If you cancel before we have begun work on the matter, the professional fee is refunded in full. Tell us in writing at <a href="mailto:{email}">{email}</a> as soon as you decide.</p>

<h2>After work begins</h2>
<p>Once preparation has started, the professional fee is refundable in proportion to the work not yet done, at our reasonable assessment. Where the filing has already been made, the professional fee for that filing is not refundable.</p>

<h2>Government and statutory fees</h2>
<p>Fees paid to any authority — the registry, the trademark registry, a licensing body, a portal — are not refundable by us once paid, irrespective of the outcome of the application. This is a rule of the authority, not of the firm. Where a fee has been collected but not yet paid onward, it is refunded in full.</p>

<h2>Third-party costs</h2>
<p>Digital signature certificates, notarisation, stamp duty, courier and similar costs are not refundable once incurred.</p>

<h2>Rejection by an authority</h2>
<p>An application rejected by an authority is not a failure of service and does not by itself create a right to refund. Where a rejection is caused by an error on our part, we correct and re-file it at no further professional fee to you.</p>

<h2>Duplicate or excess payment</h2>
<p>Any duplicate or excess payment is refunded in full to the original payment method.</p>

<h2>How to request a refund</h2>
<p>Write to <a href="mailto:{email}">{email}</a> with the payment reference and the matter it relates to. We acknowledge within two working days and, where a refund is due, process it to the original payment method. Time taken by the bank or gateway to credit the amount is outside our control.</p>

<h2>Contact</h2>
<p>{legal}, {office}. Email <a href="mailto:{email}">{email}</a>, phone <a href="tel:{phone_href}">{phone}</a>.</p>
"""),
}


def build_legal():
    for slug, (title, desc, body) in LEGAL.items():
        filled = body.format(today=TODAY, legal=FIRM["legal"], email=FIRM["email_support"],
                             office=FIRM["head_office"], phone=FIRM["phone"],
                             phone_href=FIRM["phone_href"])
        html = head(title, desc, f"{slug}.html")
        html += header(f"{slug}.html")
        html += f"""<section class="page-hero">
  <div class="wrap">
    <p class="crumbs"><a href="index.html">Home</a> / {title}</p>
    <h1>{title}</h1>
  </div>
</section>

<div class="wrap legal">
{filled}
</div>
"""
        html += footer()
        write(f"{slug}.html", html, "0.3", "yearly")


def build_404():
    html = head("Page not found", "The page you were looking for is not here. Use the service register or tell us what you need.", "404.html")
    html += header()
    html += f"""<section class="page-hero">
  <div class="wrap">
    <p class="eyebrow">404</p>
    <h1>That page is not here</h1>
    <p>The link may be old, or the page may have moved. The full service register is the quickest way to find what you were looking for.</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="services.html">See all services</a>
      <a class="btn btn--ghost" href="index.html">Go to the homepage</a>
      <a class="btn btn--wa" href="https://wa.me/{FIRM['wa']}" rel="noopener">Ask on WhatsApp</a>
    </div>
  </div>
</section>
"""
    html += footer()
    write("404.html", html, in_sitemap=False)


# ----------------------------------------------------------------------
# assets, sitemap, robots
# ----------------------------------------------------------------------

LOGO_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="CGA">
<rect width="64" height="64" rx="6" fill="#005176"/>
<path d="M14 44V20h9c6 0 9 3 9 8s-3 8-9 8h-4v8z" fill="#fff"/>
<path d="M36 20h14v5h-9v5h8v5h-8v9h-5z" fill="#c9a227"/>
</svg>
"""

OG_SVG = """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#003b57"/><stop offset="1" stop-color="#00688f"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<circle cx="1080" cy="90" r="230" fill="#ffffff" opacity="0.05"/>
<text x="80" y="190" font-family="Manrope,Arial,sans-serif" font-size="26" font-weight="700" fill="#8fd0ee">ADVOCATE-LED · CA · CS · CMA</text>
<text x="80" y="290" font-family="Manrope,Arial,sans-serif" font-size="66" font-weight="800" fill="#ffffff">Canjain Global Advisors</text>
<text x="80" y="372" font-family="Inter,Arial,sans-serif" font-size="34" fill="#cfe3ee">Every registration, return and licence</text>
<text x="80" y="422" font-family="Inter,Arial,sans-serif" font-size="34" fill="#cfe3ee">your business owes — filed on time.</text>
<rect x="80" y="480" width="120" height="4" fill="#c9a227"/>
<text x="80" y="546" font-family="Inter,Arial,sans-serif" font-size="26" fill="#a9cde0">cgaindia.com · 5 offices · UP, Delhi, Haryana</text>
</svg>
"""


def build_assets():
    img = os.path.join(OUT, "assets", "img")
    with open(os.path.join(img, "favicon.svg"), "w", encoding="utf-8") as f:
        f.write(LOGO_SVG)
    with open(os.path.join(img, "og-cover.svg"), "w", encoding="utf-8") as f:
        f.write(OG_SVG)


def build_sitemap():
    urls = "\n".join(
        f"  <url><loc>{SITE_URL}/{p}</loc><lastmod>{TODAY}</lastmod>"
        f"<changefreq>{c}</changefreq><priority>{pr}</priority></url>"
        for p, pr, c in pages
    )
    with open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(f'<?xml version="1.0" encoding="UTF-8"?>\n'
                f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n')
    with open(os.path.join(OUT, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(f"User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n")
    with open(os.path.join(OUT, "CNAME"), "w", encoding="utf-8") as f:
        f.write("cgaindia.com\n")
    open(os.path.join(OUT, ".nojekyll"), "w").close()


# ----------------------------------------------------------------------

def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, "assets", "img"))
    here = os.path.dirname(os.path.abspath(__file__))
    shutil.copytree(os.path.join(here, "assets", "css"), os.path.join(OUT, "assets", "css"))
    shutil.copytree(os.path.join(here, "assets", "js"), os.path.join(OUT, "assets", "js"))

    build_home()
    build_services()
    for svc in SERVICES:
        build_service(svc)
    build_about()
    build_team()
    build_legal()
    build_404()
    build_assets()
    build_sitemap()

    print("built %d pages into %s" % (len(pages) + 1, OUT))
    for p, _, _ in pages:
        print("  ", p)


if __name__ == "__main__":
    main()
