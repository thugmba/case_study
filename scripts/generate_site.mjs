import { mkdirSync, writeFileSync, copyFileSync } from "node:fs";

const theories = {
  "Brand equity": "customer-based-brand-equity",
  "Consumer psychology": "customer-based-brand-equity",
  "Market research limits": "defensive-marketing-strategy",
  "Corporate turnaround": "dynamic-capabilities",
  "Focus strategy": "knowledge-based-view-coordination-and-organizational-identity",
  "Brand extension limits": "brand-extension-theory",
  "Crisis management": "situational-crisis-communication-theory",
  "Quality control": "swiss-cheese-model-of-organizational-accidents",
  "Supply chain pressure": "supply-chain-fit",
  "Product recall": "situational-crisis-communication-theory",
  "Corporate fraud": "agency-theory",
  "Environmental ethics": "greenwashing-and-environmental-ethics",
  "Organizational pressure": "organizational-culture-theory",
  "Disruption": "disruptive-innovation",
  "Strategic myopia": "disruptive-innovation",
  "Business model innovation": "business-model-innovation",
  "Innovator's dilemma": "disruptive-innovation",
  "Cannibalization fear": "disruptive-innovation",
  "Strategic inertia": "architectural-innovation",
  "Subscription economics": "strategic-pricing-and-value-capture",
  "Customer lifetime value": "strategic-pricing-and-value-capture",
  "Policy enforcement timing": "perceived-price-fairness",
  "Engineering ethics": "swiss-cheese-model-of-organizational-accidents",
  "Regulatory failure": "corporate-governance-and-separation-of-ownership-and-control",
  "Shareholder vs. stakeholder": "stakeholder-theory",
  "Startup fraud": "agency-theory",
  "Due diligence failure": "corporate-governance-and-separation-of-ownership-and-control",
  "Fake-it-till-you-make-it culture": "organizational-culture-theory",
  "Corporate governance": "corporate-governance-and-separation-of-ownership-and-control",
  "Crypto regulation": "platform-governance-and-network-effects",
  "Fraud detection": "agency-theory",
  "Valuation bubble": "agency-theory",
  "Founder worship": "organizational-culture-theory",
  "Pricing transparency": "perceived-price-fairness",
  "Platform economics": "two-sided-markets",
  "Trust erosion": "platform-governance-and-network-effects",
  "M&A": "agency-theory",
  "Platform governance": "platform-governance-and-network-effects",
  "Organizational change": "organizational-culture-theory",
  "Founder control": "corporate-governance-and-separation-of-ownership-and-control",
  "Customer resistance": "perceived-price-fairness",
  "Antitrust": "two-sided-markets",
  "Two-sided markets": "two-sided-markets",
  "Leadership": "organizational-culture-theory",
  "Organizational culture": "organizational-culture-theory",
  "Strategic renewal": "dynamic-capabilities",
  "Nonprofit vs. for-profit": "corporate-governance-and-separation-of-ownership-and-control",
  "Growth vs. caution": "innovation-management",
  "Strategic pivots": "dynamic-capabilities",
  "R&D spending": "innovation-management",
  "Market timing": "dynamic-capabilities",
  "HR strategy": "good-jobs-strategy",
  "Stakeholder vs. shareholder": "stakeholder-theory",
  "Operational efficiency": "good-jobs-strategy",
  "Demand forecasting": "supply-chain-fit",
  "Pandemic strategy": "supply-chain-fit",
  "Operational flexibility": "dynamic-capabilities",
  "Dynamic pricing": "strategic-pricing-and-value-capture",
  "Price gouging ethics": "perceived-price-fairness",
  "Behavioral economics": "perceived-price-fairness",
};

const cases = [
  {
    n: 1,
    slug: "coca-cola-new-coke",
    title: "Coca-Cola's New Coke Disaster",
    years: "1985",
    category: "Classic",
    company: "The Coca-Cola Company",
    issue: "Coca-Cola changed its 99-year-old formula after taste tests suggested consumers preferred a sweeter cola. Customers interpreted the move as a violation of brand meaning, and Coca-Cola brought back Classic Coke after 79 days.",
    decision: "Should Coca-Cola trust sensory research and competitive taste-test data, or protect the emotional equity of the original formula?",
    theories: ["Brand equity", "Consumer psychology", "Market research limits"],
    why: "$4M in research suggested a product preference, but the backlash showed that product tests did not capture symbolic attachment.",
    debate: "Can market research ever capture emotional brand attachment?",
    evidence: ["Taste-test data measured flavor preference but not identity, nostalgia, or ritual.", "The reversal showed that brand equity can be more valuable than narrow product optimization.", "The case is useful for separating stated preferences from revealed behavior."],
  },
  {
    n: 2,
    slug: "lego-turnaround",
    title: "LEGO's Near-Bankruptcy Turnaround",
    years: "2003-2015",
    category: "Classic",
    company: "The LEGO Group",
    issue: "LEGO nearly collapsed after expanding into too many product lines and non-core adjacencies. The turnaround cut complexity and rebuilt innovation around the core brick system.",
    decision: "Should management cut products and reduce variety even when some lines appear successful?",
    theories: ["Corporate turnaround", "Focus strategy", "Brand extension limits"],
    why: "The case shows how focus can increase creativity by giving design and operations clearer constraints.",
    debate: "When should companies cut successful product lines, and how do they know they have over-extended?",
    evidence: ["Product variety created hidden costs in molds, parts, inventory, and forecasting.", "A clearer identity around the brick system improved coordination.", "Fan communities became a source of learning rather than a distraction."],
  },
  {
    n: 3,
    slug: "samsung-note-7",
    title: "Samsung Galaxy Note 7 Explosions",
    years: "2016",
    category: "Classic",
    company: "Samsung Electronics",
    issue: "Galaxy Note 7 batteries overheated and caught fire, forcing recalls, flight bans, and the discontinuation of a flagship product.",
    decision: "Should Samsung have killed the Note brand entirely, or separate the failed product from the broader brand?",
    theories: ["Crisis management", "Quality control", "Supply chain pressure", "Product recall"],
    why: "Samsung's recovery makes the case useful for studying crisis response after a visible product-safety failure.",
    debate: "Should Samsung have killed the Note brand entirely, and how did it recover trust?",
    evidence: ["The first recall did not fully solve the safety problem.", "Flight bans turned a product defect into a public trust crisis.", "The response required both technical root-cause analysis and reputation repair."],
  },
  {
    n: 4,
    slug: "volkswagen-dieselgate",
    title: "Volkswagen Dieselgate",
    years: "2015",
    category: "Classic",
    company: "Volkswagen Group",
    issue: "Volkswagen installed software that cheated diesel-emissions tests, affecting millions of vehicles and triggering fines, executive exits, prosecutions, and industry-wide consequences.",
    decision: "How should responsibility be assigned when misconduct is embedded in technical systems and organizational pressure?",
    theories: ["Corporate fraud", "Environmental ethics", "Organizational pressure"],
    why: "Dieselgate connects individual choices, engineering work, environmental claims, and corporate incentives.",
    debate: "Who is responsible: engineers who coded it, managers who ordered it, or executives who created pressure?",
    evidence: ["The defeat device was technical, but the incentives were organizational.", "Environmental positioning intensified the trust damage.", "The case helps distinguish legal accountability from managerial responsibility."],
  },
  {
    n: 5,
    slug: "blockbuster-netflix",
    title: "Blockbuster Rejects Netflix",
    years: "2000",
    category: "Classic",
    company: "Blockbuster",
    issue: "Blockbuster declined an opportunity to acquire Netflix and continued defending a store-based rental model while subscriptions and streaming changed home entertainment.",
    decision: "Should incumbents invest in small, low-margin threats before those threats damage the core business?",
    theories: ["Disruption", "Strategic myopia", "Business model innovation"],
    why: "The case is a compact example of how a profitable incumbent can underreact to an initially unattractive challenger.",
    debate: "Was Netflix's threat predictable, and what should Blockbuster have done differently?",
    evidence: ["Late fees and stores were assets under the old model but liabilities under the new one.", "Subscription economics changed customer expectations.", "The missed acquisition forces students to discuss hindsight bias."],
  },
  {
    n: 6,
    slug: "kodak-digital-camera",
    title: "Kodak Invented the Digital Camera, Then Died",
    years: "1975-2012",
    category: "Classic",
    company: "Eastman Kodak",
    issue: "Kodak had early digital camera technology but protected its film economics too long and eventually filed for Chapter 11 bankruptcy.",
    decision: "Should companies cannibalize their own cash cows before competitors do?",
    theories: ["Innovator's dilemma", "Cannibalization fear", "Strategic inertia"],
    why: "Kodak shows how owning a technology is not the same as having the business model and incentives to exploit it.",
    debate: "Should companies kill their own cash cows before competitors do?",
    evidence: ["Digital imaging threatened Kodak's film profit pool.", "The shift changed the architecture of photography around software, storage, and sharing.", "Strategic delay reduced Kodak's room to adapt."],
  },
  {
    n: 7,
    slug: "netflix-password-sharing",
    title: "Netflix Password Sharing Crackdown",
    years: "2023",
    category: "Recent",
    company: "Netflix",
    issue: "Netflix reversed years of tolerated password sharing and converted some unpaid account use into paid subscriptions.",
    decision: "When is it acceptable to enforce a policy that customers previously experienced as flexible?",
    theories: ["Subscription economics", "Customer lifetime value", "Policy enforcement timing"],
    why: "The case lets students examine unpopular monetization when the value proposition is strong enough to absorb backlash.",
    debate: "Is it ethical to change rules on existing customers, and did Netflix time it correctly?",
    evidence: ["The policy changed customer perceptions of entitlement.", "Subscriber growth after enforcement challenged assumptions about backlash.", "Timing mattered because the streaming market had matured."],
  },
  {
    n: 8,
    slug: "boeing-737-max",
    title: "Boeing 737 MAX Crashes",
    years: "2018-2019",
    category: "Recent",
    company: "The Boeing Company",
    issue: "Two 737 MAX crashes killed 346 people and exposed failures in software design, pilot disclosure, certification, and governance.",
    decision: "How should accountability be assigned when cost, schedule, safety, and regulatory communication interact?",
    theories: ["Engineering ethics", "Regulatory failure", "Shareholder vs. stakeholder"],
    why: "The case is high-stakes evidence that safety-critical decisions cannot be treated as ordinary cost-optimization problems.",
    debate: "Should executives face prison for safety decisions, and who failed: Boeing or regulators?",
    evidence: ["MCAS design and communication failures crossed technical and governance boundaries.", "Regulator dependence on company information created oversight risk.", "The deaths make stakeholder theory concrete."],
  },
  {
    n: 9,
    slug: "theranos-fraud",
    title: "Theranos: The $9 Billion Fraud",
    years: "2003-2018",
    category: "Recent",
    company: "Theranos",
    issue: "Theranos raised hundreds of millions of dollars while overstating blood-testing capabilities that did not reliably work as represented.",
    decision: "Where is the line between founder vision and fraud?",
    theories: ["Startup fraud", "Due diligence failure", "Fake-it-till-you-make-it culture"],
    why: "Theranos is useful because investors, directors, partners, employees, regulators, and patients all had different information and risks.",
    debate: "What is the line between vision and fraud, and why did experts fail to see through it?",
    evidence: ["Secrecy limited technical validation.", "Prestigious board members did not substitute for domain expertise.", "Patients turned investor fraud into a public-health issue."],
  },
  {
    n: 10,
    slug: "ftx-collapse",
    title: "FTX Collapse and Sam Bankman-Fried",
    years: "2022",
    category: "Recent",
    company: "FTX",
    issue: "FTX collapsed after customer funds were misused through Alameda Research, leading to criminal convictions and a major governance failure in crypto.",
    decision: "Should crypto platforms be regulated like financial institutions that custody customer assets?",
    theories: ["Corporate governance", "Crypto regulation", "Fraud detection"],
    why: "FTX makes governance failure visible because the company handled customer assets without mature controls, board oversight, or transparent risk boundaries.",
    debate: "Should crypto be regulated like banks, and how did sophisticated investors miss red flags?",
    evidence: ["Customer custody created bank-like trust obligations.", "Investor sophistication did not prevent basic governance failures.", "The collapse shows how speed and charisma can conceal control weaknesses."],
  },
  {
    n: 11,
    slug: "wework-bankruptcy",
    title: "WeWork: From $47 Billion to Bankruptcy",
    years: "2019-2023",
    category: "Recent",
    company: "WeWork",
    issue: "WeWork's IPO collapsed after investors scrutinized losses, related-party transactions, governance risks, and the gap between tech valuation and real-estate economics.",
    decision: "What governance and valuation checks should constrain charismatic founders?",
    theories: ["Valuation bubble", "Corporate governance", "Founder worship"],
    why: "The case exposes how narrative, growth, and founder charisma can overwhelm unit economics and governance discipline.",
    debate: "How did sophisticated investors get fooled, and what governance failed?",
    evidence: ["The S-1 made governance and losses more visible.", "Real-estate obligations did not behave like software economics.", "Founder control and related-party dealings damaged trust."],
  },
  {
    n: 12,
    slug: "airbnb-cleaning-fees",
    title: "Airbnb Hidden Cleaning Fees",
    years: "2022-Present",
    category: "Recent",
    company: "Airbnb",
    issue: "Airbnb faced customer frustration over low nightly prices that rose sharply at checkout because of cleaning and service fees.",
    decision: "Should platforms mandate all-in pricing even when hosts set many of the fees?",
    theories: ["Pricing transparency", "Platform economics", "Trust erosion"],
    why: "Airbnb shows how platform design can make technically legal fees feel unfair and damage trust.",
    debate: "Should platforms mandate all-in pricing, and who is responsible: platform or hosts?",
    evidence: ["Drip pricing changes perceived fairness.", "Hosts and platform rules jointly produce the customer experience.", "Transparency can improve trust while reducing short-term click appeal."],
  },
  {
    n: 13,
    slug: "twitter-x-musk",
    title: "Twitter/X Under Elon Musk",
    years: "2022-Present",
    category: "Recent",
    company: "Twitter/X",
    issue: "Elon Musk acquired Twitter for $44 billion, cut staff, changed verification, renamed the platform X, and faced advertiser and platform-governance challenges.",
    decision: "Can a large social platform be transformed through founder-style speed and unilateral control?",
    theories: ["M&A", "Platform governance", "Organizational change", "Founder control"],
    why: "The case puts platform trust, advertiser safety, employee capacity, and owner control into one live governance problem.",
    debate: "Was mass firing the right call, and can a social platform be run by one person's vision?",
    evidence: ["Staff reductions tested operational resilience.", "Verification changes altered trust signals.", "Advertiser reactions showed that platform governance is part of the product."],
  },
  {
    n: 14,
    slug: "adobe-subscription-shift",
    title: "Adobe's Subscription Model Shift",
    years: "2013",
    category: "Recent",
    company: "Adobe",
    issue: "Adobe moved Creative Suite customers from perpetual licenses to Creative Cloud subscriptions despite customer anger.",
    decision: "When should a company force customers into a new business model?",
    theories: ["Business model innovation", "Subscription economics", "Customer resistance"],
    why: "Adobe shows how painful transitions can improve recurring revenue, product delivery, and customer data if the firm manages resistance.",
    debate: "When should companies force customers to new business models, and how should they manage transition?",
    evidence: ["Subscription revenue changed cash-flow timing and customer lock-in.", "Customer backlash was real but did not prevent long-term adoption.", "The case separates value capture from customer fairness."],
  },
  {
    n: 15,
    slug: "apple-epic-app-store",
    title: "Apple's App Store Tax vs. Epic Games",
    years: "2020-Present",
    category: "Recent",
    company: "Apple",
    issue: "Epic challenged Apple's App Store commission and payment restrictions, raising antitrust questions about platform power and app-store governance.",
    decision: "Is a 30% commission fair compensation for platform access, or an abuse of gatekeeper power?",
    theories: ["Platform economics", "Antitrust", "Two-sided markets"],
    why: "The dispute shows how platform rules can be both quality controls and value-capture mechanisms.",
    debate: "Is 30% fair for platform access, and should app stores be regulated as utilities?",
    evidence: ["Apple provides distribution, trust, and payment infrastructure.", "Developers argue that payment restrictions limit competition.", "The case illustrates cross-side effects between users and developers."],
  },
  {
    n: 16,
    slug: "microsoft-nadella",
    title: "Microsoft's Cultural Transformation",
    years: "2014-Present",
    category: "Recent",
    company: "Microsoft",
    issue: "Satya Nadella shifted Microsoft from internal rivalry and Windows defensiveness toward cloud, learning culture, and cross-platform strategy.",
    decision: "Can culture change drive financial and strategic renewal?",
    theories: ["Leadership", "Organizational culture", "Strategic renewal"],
    why: "Microsoft provides a rare large-company example where culture, strategy, and financial performance changed together.",
    debate: "Can culture really drive financial results, and what did Nadella do differently?",
    evidence: ["Cloud strategy required cross-unit collaboration.", "A learning culture reduced defensive behavior.", "Leadership language changed expectations about growth and mistakes."],
  },
  {
    n: 17,
    slug: "openai-board-drama",
    title: "ChatGPT and OpenAI Board Drama",
    years: "2023",
    category: "Recent",
    company: "OpenAI",
    issue: "OpenAI's board removed Sam Altman, employees and Microsoft pushed back, and Altman returned days later with a changed board structure.",
    decision: "Can a nonprofit-style board control a high-growth AI company with major commercial partners?",
    theories: ["Corporate governance", "Nonprofit vs. for-profit", "Growth vs. caution"],
    why: "The case is useful because mission governance, investor expectations, employee power, and partner dependence collided in public.",
    debate: "Was the board right to fire Altman, and is OpenAI's structure workable?",
    evidence: ["Board authority existed legally but was fragile organizationally.", "Employee and partner reactions changed bargaining power.", "The case tests governance designs for frontier technology."],
  },
  {
    n: 18,
    slug: "meta-metaverse",
    title: "Meta's $50B Metaverse Bet",
    years: "2021-Present",
    category: "Recent",
    company: "Meta Platforms",
    issue: "Facebook renamed itself Meta and spent heavily on metaverse and VR initiatives while investors questioned adoption, timing, and founder control.",
    decision: "How long should a company fund a strategic bet before evidence of adoption arrives?",
    theories: ["Strategic pivots", "R&D spending", "Market timing", "Founder control"],
    why: "Meta lets students debate patient innovation investment versus unchecked founder-controlled spending.",
    debate: "When should companies abandon big bets, and should shareholders be able to override founders?",
    evidence: ["Dual-class control gives Zuckerberg unusual persistence.", "Reality Labs losses test investor patience.", "The pivot reflects both strategic foresight and market-timing risk."],
  },
  {
    n: 19,
    slug: "costco-employee-first",
    title: "Costco's Employee-First Model",
    years: "1983-Present",
    category: "Recent",
    company: "Costco Wholesale",
    issue: "Costco pays above many retail competitors and accepts Wall Street criticism while arguing that low turnover and operating discipline support performance.",
    decision: "Can higher wages be an efficiency strategy rather than only a cost?",
    theories: ["HR strategy", "Stakeholder vs. shareholder", "Operational efficiency"],
    why: "Costco challenges the assumption that retail efficiency requires minimizing labor cost.",
    debate: "Is Costco's model replicable, and why do not more companies copy it?",
    evidence: ["Lower turnover can reduce hidden operating costs.", "Employee investment works with disciplined process design.", "The case connects stakeholder treatment to productivity."],
  },
  {
    n: 20,
    slug: "peloton-pandemic-crash",
    title: "Peloton's Pandemic Rise and Crash",
    years: "2020-2023",
    category: "Recent",
    company: "Peloton Interactive",
    issue: "Peloton expanded capacity during pandemic demand, then faced reopening, inventory pressure, layoffs, and a sharp valuation collapse.",
    decision: "How should companies distinguish temporary demand spikes from durable shifts?",
    theories: ["Demand forecasting", "Pandemic strategy", "Operational flexibility"],
    why: "Peloton is a strong case for studying forecasting under extreme external shocks.",
    debate: "How should companies respond to sudden demand spikes, and when is expansion a mistake?",
    evidence: ["Pandemic behavior was not necessarily permanent demand.", "Capacity commitments reduced flexibility.", "The case shows the cost of scaling before demand uncertainty resolves."],
  },
  {
    n: 21,
    slug: "uber-surge-pricing",
    title: "Uber Surge Pricing Ethics",
    years: "2014-Present",
    category: "Recent",
    company: "Uber",
    issue: "Uber's dynamic pricing raises fares during demand spikes, creating tension between efficient market clearing and perceived exploitation during emergencies.",
    decision: "Should surge pricing be capped during emergencies even if caps reduce driver supply?",
    theories: ["Dynamic pricing", "Price gouging ethics", "Behavioral economics"],
    why: "Uber helps students compare economic efficiency with fairness norms under stress.",
    debate: "Is surge pricing fair, and should there be caps during emergencies?",
    evidence: ["Higher prices can attract drivers and ration scarce rides.", "Customers perceive emergency price spikes as exploitation.", "Caps can improve legitimacy but may reduce market-clearing efficiency."],
  },
];

function mdText(value) {
  return String(value).replaceAll("$", "\\$");
}

function theoryLink(name) {
  const anchor = theories[name];
  return anchor ? `[${name}]({{ '/theories/' | relative_url }}#${anchor})` : name;
}

function caseFile(c) {
  return `${String(c.n).padStart(2, "0")}-${c.slug}.md`;
}

function caseMarkdown(c) {
  const pdf = `{{ '/reports/${reportFile(c, "pdf")}' | relative_url }}`;
  return `---
layout: default
title: "${c.title.replaceAll('"', '\\"')}"
permalink: /cases/${String(c.n).padStart(2, "0")}-${c.slug}/
---

# ${mdText(c.title)}

<aside class="infobox">
  <div class="infobox-title">${c.company}</div>
  <dl>
    <dt>Period</dt><dd>${c.years}</dd>
    <dt>Category</dt><dd>${c.category}</dd>
    <dt>Core decision</dt><dd>${mdText(c.decision)}</dd>
  </dl>
  <p><a href="${pdf}">PDF report</a></p>
</aside>

## Overview

${mdText(c.issue)}

## Management Problem

${mdText(c.decision)}

## Theory Links

${c.theories.map((t) => `- ${theoryLink(t)}`).join("\n")}

## Why It Matters

${mdText(c.why)}

## Debate Question

> ${mdText(c.debate)}

## Evidence to Discuss

${c.evidence.map((e) => `- ${mdText(e)}`).join("\n")}

## Study Prompts

1. Which metric would you trust most before making the decision?
2. Which stakeholder group bears the largest downside risk?
3. Which theory explains the case best, and where does that theory fail?
4. What would you do differently if you were the decision-maker?

## Related Theory Page

See [Business and Management Theories]({{ '/theories/' | relative_url }}) for short explanations and references.
`;
}

function reportFile(c, ext) {
  const map = {
    1: "1_Coca_Cola_Report",
    2: "2_LEGO_Report",
    3: "3_Samsung_Report",
    4: "4_Volkswagen_Report",
    5: "5_Blockbuster_Report",
    6: "6_Kodak_Report",
    7: "7_Netflix_Password_Report",
    8: "8_Boeing_Report",
    9: "9_Theranos_Report",
    10: "10_FTX_Report",
    11: "11_WeWork_Report",
    12: "12_Airbnb_Report",
    13: "13_Twitter_Report",
    14: "14_Adobe_Report",
    15: "15_Apple_Epic_Report",
    16: "16_Microsoft_Report",
    17: "17_OpenAI_Report",
    18: "18_Meta_Report",
    19: "19_Costco_Report",
    20: "20_Peloton_Report",
    21: "21_Uber_Report",
  };
  return `${map[c.n]}.${ext}`;
}

function indexMarkdown() {
  const topicRows = [
    ["Ethics & Fraud", "Theranos, FTX, Volkswagen Dieselgate, Boeing 737 MAX"],
    ["Corporate Governance", "WeWork, OpenAI, Meta Metaverse, FTX"],
    ["Turnaround & Transformation", "LEGO, Microsoft"],
    ["Marketing & Branding", "Coca-Cola New Coke"],
    ["Pricing Strategy", "Netflix Password Sharing, Uber Surge, Airbnb Fees, Apple App Store, Adobe"],
    ["Crisis Management", "Samsung Note 7, Boeing 737 MAX"],
    ["Platform Economics", "Apple vs. Epic, Twitter/X, Airbnb, Uber"],
    ["Disruption", "Blockbuster/Netflix, Kodak"],
    ["Labor & HR", "Costco"],
    ["Strategic Failure", "WeWork, Peloton, Meta, Blockbuster"],
  ];
  return `---
layout: default
title: GMBA Case Study Library
permalink: /
---

# GMBA Case Study Library

This site organizes 21 business cases for MBA discussion classes. Each case is a Markdown study page connected to the shared [Business and Management Theories]({{ '/theories/' | relative_url }}) guide.

## Cases

| # | Case | Period | Main theories |
|---:|------|--------|---------------|
${cases.map((c) => `| ${c.n} | [${mdText(c.title)}]({{ '/cases/${String(c.n).padStart(2, "0")}-${c.slug}/' | relative_url }}) | ${c.years} | ${c.theories.map((t) => `[${t}]({{ '/theories/' | relative_url }}#${theories[t]})`).join(", ")} |`).join("\n")}

## Quick Reference by MBA Topic

| MBA Topic | Best Cases |
|-----------|------------|
${topicRows.map((row) => `| ${row[0]} | ${row[1]} |`).join("\n")}

## How to Use This Site

- Start with a case page and read the overview, debate question, and evidence prompts.
- Follow the theory links to understand the relevant MBA frameworks.
- Use the PDF report links when a printable classroom handout is needed.
`;
}

function layout() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ page.title }} | GMBA Case Study Library</title>
    <link rel="stylesheet" href="{{ '/assets/site.css' | relative_url }}">
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="{{ '/' | relative_url }}">GMBA Case Study Library</a>
      <nav>
        <a href="{{ '/' | relative_url }}">Cases</a>
        <a href="{{ '/theories/' | relative_url }}">Theories</a>
      </nav>
    </header>
    <main class="page">
      {{ content }}
    </main>
  </body>
</html>
`;
}

function css() {
  return `:root {
  --ink: #202124;
  --muted: #54595d;
  --line: #a2a9b1;
  --panel: #f8f9fa;
  --link: #0645ad;
  --visited: #0b0080;
  --nav: #eaecf0;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  color: var(--ink);
  background: #fff;
  font: 16px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
}

a { color: var(--link); text-decoration: none; }
a:visited { color: var(--visited); }
a:hover { text-decoration: underline; }

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 24px;
  border-bottom: 1px solid var(--line);
  background: var(--panel);
}

.brand {
  color: var(--ink);
  font-weight: 700;
}

.site-header nav {
  display: flex;
  gap: 14px;
  font-size: 14px;
}

.page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 28px 24px 56px;
}

h1, h2, h3 {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  line-height: 1.2;
}

h1 {
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--line);
  font-size: 34px;
}

h2 {
  margin-top: 30px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--nav);
  font-size: 24px;
}

h3 { font-size: 19px; }

table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0 24px;
  font-size: 14px;
}

th, td {
  border: 1px solid var(--line);
  padding: 8px 10px;
  vertical-align: top;
}

th {
  background: var(--nav);
  font-weight: 700;
}

blockquote {
  margin: 16px 0;
  padding: 10px 16px;
  border-left: 4px solid var(--line);
  background: var(--panel);
}

.infobox {
  float: right;
  width: min(330px, 100%);
  margin: 0 0 20px 24px;
  border: 1px solid var(--line);
  background: var(--panel);
  font-size: 14px;
}

.infobox-title {
  padding: 9px 12px;
  background: var(--nav);
  border-bottom: 1px solid var(--line);
  font-weight: 700;
  text-align: center;
}

.infobox dl {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 0;
  margin: 0;
}

.infobox dt,
.infobox dd {
  margin: 0;
  padding: 8px 10px;
  border-bottom: 1px solid #d8dde3;
}

.infobox dt {
  color: var(--muted);
  font-weight: 700;
}

.infobox p {
  margin: 0;
  padding: 10px;
  text-align: center;
}

@media (max-width: 760px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .infobox {
    float: none;
    margin: 0 0 20px;
  }

  table {
    display: block;
    overflow-x: auto;
  }
}
`;
}

mkdirSync("docs/_layouts", { recursive: true });
mkdirSync("docs/assets", { recursive: true });
mkdirSync("docs/cases", { recursive: true });
mkdirSync("docs/reports", { recursive: true });

writeFileSync("docs/_config.yml", `title: GMBA Case Study Library
description: Wikipedia-style GMBA Case Study Library with linked management theories.
markdown: kramdown
`);
writeFileSync("docs/_layouts/default.html", layout());
writeFileSync("docs/assets/site.css", css());
writeFileSync("docs/index.md", indexMarkdown());
writeFileSync("docs/theories.md", `---
layout: default
title: Business and Management Theories
permalink: /theories/
---

${String(await import("node:fs").then(({ readFileSync }) => readFileSync("theories.md", "utf8"))).replace(/^# /, "# ")}
`);

for (const c of cases) {
  writeFileSync(`docs/cases/${caseFile(c)}`, caseMarkdown(c));
  copyFileSync(reportFile(c, "pdf"), `docs/reports/${reportFile(c, "pdf")}`);
  copyFileSync(reportFile(c, "qmd"), `docs/reports/${reportFile(c, "qmd")}`);
}

console.log(`Generated ${cases.length} case pages in docs/cases`);
