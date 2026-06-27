import { writeFileSync } from "node:fs";

const preamble = `format:
  pdf:
    documentclass: scrartcl
    classoption: [DIV=11, numbers=noendperiod]
    papersize: a4
    fontsize: 11pt
    geometry:
      - top=1in
      - bottom=1in
      - left=1in
      - right=1in
    linestretch: 1.5
    mainfont: "TeX Gyre Heros"
    sansfont: "TeX Gyre Heros"
    monofont: "TeX Gyre Cursor"
    colorlinks: true
    linkcolor: "blue"
    urlcolor: "blue"
    number-sections: true
    date-format: "MMMM YYYY"
    include-in-header:
      text: |
        \\usepackage{fancyhdr}
        \\usepackage{xcolor}
        \\usepackage{booktabs}
        \\usepackage{array}
        \\usepackage{longtable}
        \\usepackage{colortbl}
        \\usepackage{needspace}
        \\usepackage{etoolbox}
        \\definecolor{navy}{HTML}{1A2B4C}
        \\definecolor{darkgray}{HTML}{333333}
        \\definecolor{lightgray}{HTML}{F5F5F5}
        \\definecolor{footergray}{HTML}{666666}
        \\makeatletter
        \\newcommand{\\globalcolor}[1]{%
          \\color{#1}\\global\\let\\default@color\\current@color
        }
        \\makeatother
        \\AtBeginDocument{\\globalcolor{darkgray}}
        \\setlength{\\aboverulesep}{0pt}
        \\setlength{\\belowrulesep}{0pt}
        \\setkomafont{title}{\\fontsize{28pt}{34pt}\\selectfont\\color{navy}\\fontseries{l}\\sffamily}
        \\setkomafont{subtitle}{\\fontsize{14pt}{18pt}\\selectfont\\color{footergray}\\sffamily}
        \\setkomafont{section}{\\fontsize{16pt}{20pt}\\selectfont\\color{navy}\\bfseries\\sffamily}
        \\setkomafont{subsection}{\\fontsize{13pt}{16pt}\\selectfont\\color{darkgray}\\bfseries\\sffamily}
        \\setkomafont{subsubsection}{\\fontsize{11pt}{14pt}\\selectfont\\color{darkgray}\\bfseries\\sffamily}
        \\RedeclareSectionCommand[beforeskip=-12pt, afterskip=6pt]{section}
        \\RedeclareSectionCommand[beforeskip=-9pt, afterskip=4pt]{subsection}
        \\RedeclareSectionCommand[beforeskip=-6pt, afterskip=3pt]{subsubsection}
        \\pagestyle{fancy}
        \\fancyhf{}
        \\fancyfoot[C]{\\fontsize{9pt}{11pt}\\selectfont\\color{footergray}\\thepage}
        \\fancyfoot[L]{\\fontsize{9pt}{11pt}\\selectfont\\color{footergray}Innovation Analytics Lab}
        \\fancyfoot[R]{\\fontsize{9pt}{11pt}\\selectfont\\color{footergray}Tunghai University}
        \\renewcommand{\\headrulewidth}{0pt}
        \\fancypagestyle{plain}{
          \\fancyhf{}
          \\fancyfoot[C]{\\fontsize{9pt}{11pt}\\selectfont\\color{footergray}\\thepage}
          \\fancyfoot[L]{\\fontsize{9pt}{11pt}\\selectfont\\color{footergray}Innovation Analytics Lab}
          \\fancyfoot[R]{\\fontsize{9pt}{11pt}\\selectfont\\color{footergray}Tunghai University}
          \\renewcommand{\\headrulewidth}{0pt}
        }
        \\setlength{\\parskip}{6pt}
        \\setlength{\\parindent}{0pt}
        \\widowpenalty=10000
        \\clubpenalty=10000`;

const sources = {
  brand: [
    ["Aaker, D. A., & Keller, K. L. (1990). Consumer evaluations of brand extensions. *Journal of Marketing, 54*(1), 27-41. <https://doi.org/10.1177/002224299005400102>", "Provides the brand-extension logic used to analyze when a famous brand can stretch beyond its original category."],
    ["Keller, K. L. (1993). Conceptualizing, measuring, and managing customer-based brand equity. *Journal of Marketing, 57*(1), 1-22. <https://doi.org/10.1177/002224299305700101>", "Supplies the customer-based brand equity framework used to evaluate emotional attachment and brand trust."],
  ],
  disruption: [
    ["Christensen, C. M. (1997). *The innovator's dilemma: When new technologies cause great firms to fail*. Harvard Business School Press.", "Provides the core theory for explaining why incumbents ignore or underfund disruptive entrants."],
    ["Henderson, R. M., & Clark, K. B. (1990). Architectural innovation: The reconfiguration of existing product technologies and the failure of established firms. *Administrative Science Quarterly, 35*(1), 9-30. <https://doi.org/10.2307/2393549>", "Explains how established firms can miss threats that alter system architecture rather than only component technology."],
  ],
  governance: [
    ["Jensen, M. C., & Meckling, W. H. (1976). Theory of the firm: Managerial behavior, agency costs and ownership structure. *Journal of Financial Economics, 3*(4), 305-360. <https://doi.org/10.1016/0304-405X%2876%2990026-X>", "Frames the governance problem created when managers, founders, investors, or boards have misaligned incentives."],
    ["Fama, E. F., & Jensen, M. C. (1983). Separation of ownership and control. *Journal of Law and Economics, 26*(2), 301-325. <https://doi.org/10.1086/467037>", "Supports the analysis of board oversight, control rights, and monitoring failure."],
  ],
  platform: [
    ["Rochet, J.-C., & Tirole, J. (2003). Platform competition in two-sided markets. *Journal of the European Economic Association, 1*(4), 990-1029. <https://doi.org/10.1162/154247603322493212>", "Provides the two-sided-market framework used to evaluate platform pricing, access, and governance decisions."],
    ["Parker, G., Van Alstyne, M., & Choudary, S. P. (2016). *Platform revolution: How networked markets are transforming the economy*. W. W. Norton.", "Explains platform design tradeoffs among users, producers, governance rules, and network effects."],
  ],
  crisis: [
    ["Coombs, W. T. (2007). Protecting organization reputations during a crisis: The development and application of situational crisis communication theory. *Corporate Reputation Review, 10*(3), 163-176. <https://doi.org/10.1057/palgrave.crr.1550049>", "Provides a crisis-communication framework for assessing responsibility, response speed, and reputation recovery."],
    ["Reason, J. (1990). *Human error*. Cambridge University Press.", "Supports the analysis of how complex systems fail through layered human, process, and organizational weaknesses."],
  ],
  pricing: [
    ["Kahneman, D., Knetsch, J. L., & Thaler, R. H. (1986). Fairness as a constraint on profit seeking: Entitlements in the market. *American Economic Review, 76*(4), 728-741. <https://www.jstor.org/stable/1806070>", "Frames why customers may reject profitable pricing decisions when they violate perceived fairness."],
    ["Nagle, T. T., Muller, G., & Gruyaert, E. (2024). *The strategy and tactics of pricing* (7th ed.). Routledge.", "Provides the pricing-strategy lens for evaluating willingness to pay, segmentation, and value capture."],
  ],
  innovation: [
    ["Van de Ven, A. H. (1986). Central problems in the management of innovation. *Management Science, 32*(5), 590-607. <https://doi.org/10.1287/mnsc.32.5.590>", "Frames the organizational challenge of balancing experimentation, governance, and implementation discipline."],
    ["Teece, D. J., Pisano, G., & Shuen, A. (1997). Dynamic capabilities and strategic management. *Strategic Management Journal, 18*(7), 509-533.", "Supports the analysis of how firms renew capabilities when technologies, markets, or business models shift."],
  ],
  culture: [
    ["Schein, E. H. (2010). *Organizational culture and leadership* (4th ed.). Jossey-Bass.", "Provides the culture-change framework for evaluating leadership, norms, and organizational learning."],
    ["Edmondson, A. C. (1999). Psychological safety and learning behavior in work teams. *Administrative Science Quarterly, 44*(2), 350-383. <https://doi.org/10.2307/2666999>", "Supports the case discussion of speaking up, learning, and error correction inside organizations."],
  ],
};

const cases = [
  {
    n: 1, file: "1_Coca_Cola_Report.qmd", title: "Coca-Cola's New Coke Disaster", years: "1985",
    company: "The Coca-Cola Company", issue: "Coca-Cola replaced its flagship formula after taste-test research suggested consumers preferred a sweeter cola, then reversed course after a public backlash over the loss of Coca-Cola Classic.",
    theory: "Brand equity, consumer psychology, market research limits", debate: "Can market research ever capture emotional brand attachment?",
    refs: [...sources.brand, ["Hauser, J. R., & Shugan, S. M. (1983). Defensive marketing strategies. *Marketing Science, 2*(4), 319-360. <https://doi.org/10.1287/mksc.2.4.319>", "Supports the competitive-response analysis of Pepsi, taste tests, and defensive brand strategy."], ["Rothman, L. (2015, April 23). Here's what New Coke tasted like. *TIME*. <https://time.com/3822869/new-coke-history/>", "Documents the New Coke chronology and consumer reaction for classroom discussion."]]
  },
  {
    n: 2, file: "2_LEGO_Report.qmd", title: "LEGO's Near-Bankruptcy Turnaround", years: "2003-2015",
    company: "The LEGO Group", issue: "LEGO nearly collapsed after expanding into too many products and adjacencies, then recovered by cutting complexity and rebuilding around the core brick system.",
    theory: "Corporate turnaround, focus strategy, brand extension limits", debate: "When should companies cut successful product lines, and how do they know they have over-extended?",
    refs: [["Kogut, B., & Zander, U. (1996). What firms do? Coordination, identity, and learning. *Organization Science, 7*(5), 502-518. <https://doi.org/10.1287/orsc.7.5.502>", "Supports the argument that LEGO's recovery depended on organizational coordination and identity."], ["Muniz, A. M., Jr., & O'Guinn, T. C. (2001). Brand community. *Journal of Consumer Research, 27*(4), 412-432. <https://doi.org/10.1086/319618>", "Provides a scholarly basis for analyzing LEGO fan communities as strategic assets."], ...sources.innovation, ["Robertson, D. C., & Breen, B. (2013). *Brick by brick: How LEGO rewrote the rules of innovation and conquered the global toy industry*. Crown Business.", "Supplies the main case-specific narrative on LEGO's overextension and turnaround."]]
  },
  {
    n: 3, file: "3_Samsung_Report.qmd", title: "Samsung Galaxy Note 7 Explosions", years: "2016",
    company: "Samsung Electronics", issue: "Galaxy Note 7 batteries overheated and caught fire, forcing recalls, flight bans, and the discontinuation of a flagship product.",
    theory: "Crisis management, quality control, supply chain pressure, product recall", debate: "Should Samsung have killed the Note brand entirely, and how did it recover trust?",
    refs: [...sources.crisis, ...sources.innovation, ["U.S. Consumer Product Safety Commission. (2016). *Samsung recalls Galaxy Note7 smartphones due to serious fire and burn hazards*. <https://www.cpsc.gov/Recalls/2016/samsung-recalls-galaxy-note7-smartphones>", "Provides official recall facts and safety-risk framing."], ["Samsung Newsroom. (2017). *Samsung Electronics announces cause of Galaxy Note7 incidents in press conference*. <https://news.samsung.com/global/samsung-electronics-announces-cause-of-galaxy-note7-incidents-in-press-conference>", "Documents Samsung's stated root-cause explanation and corrective actions."]]
  },
  {
    n: 4, file: "4_Volkswagen_Report.qmd", title: "Volkswagen Dieselgate", years: "2015",
    company: "Volkswagen Group", issue: "Volkswagen used defeat-device software to cheat diesel-emissions tests, triggering criminal, regulatory, financial, and reputational consequences.",
    theory: "Corporate fraud, environmental ethics, organizational pressure", debate: "Who is responsible: engineers, managers, or executives who created the pressure?",
    refs: [...sources.governance, ["Siano, A., Vollero, A., Conte, F., & Amabile, S. (2017). More than words: Expanding the taxonomy of greenwashing after the Volkswagen scandal. *Journal of Business Research, 71*, 27-37. <https://doi.org/10.1016/j.jbusres.2016.11.002>", "Connects Dieselgate to greenwashing, stakeholder trust, and environmental communications."], ["U.S. Environmental Protection Agency. (n.d.). *Volkswagen violations*. <https://www.epa.gov/vw>", "Provides official U.S. regulatory documentation of the emissions violations."]]
  },
  {
    n: 5, file: "5_Blockbuster_Report.qmd", title: "Blockbuster Rejects Netflix", years: "2000",
    company: "Blockbuster", issue: "Blockbuster failed to acquire Netflix and continued defending a store-based rental model while streaming and subscription economics reshaped home entertainment.",
    theory: "Disruption, strategic myopia, business model innovation", debate: "Was Netflix's threat predictable, and what should Blockbuster have done differently?",
    refs: [...sources.disruption, ...sources.platform, ["Netflix, Inc. (n.d.). *Annual reports and proxies*. <https://ir.netflix.net/financials/annual-reports-and-proxies/default.aspx>", "Provides official Netflix financial history for comparing the rejected acquisition with later scale."]]
  },
  {
    n: 6, file: "6_Kodak_Report.qmd", title: "Kodak Invented the Digital Camera, Then Died", years: "1975-2012",
    company: "Eastman Kodak", issue: "Kodak had early digital imaging capabilities but protected the film business too long, eventually filing for Chapter 11 bankruptcy.",
    theory: "Innovator's dilemma, cannibalization fear, strategic inertia", debate: "Should companies kill their own cash cows before competitors do?",
    refs: [...sources.disruption, ["Lucas, H. C., Jr., & Goh, J. M. (2009). Disruptive technology: How Kodak missed the digital photography revolution. *Journal of Strategic Information Systems, 18*(1), 46-55. <https://doi.org/10.1016/j.jsis.2009.01.002>", "Provides a case-specific scholarly analysis of Kodak's digital-photography failure."], ["Eastman Kodak Company. (2013). *Kodak emerges from Chapter 11*. <https://www.kodak.com/en/company/press-release/kodak-emerges-from-chapter-11/>", "Documents Kodak's post-bankruptcy restructuring endpoint from the company perspective."]]
  },
  {
    n: 7, file: "7_Netflix_Password_Report.qmd", title: "Netflix Password Sharing Crackdown", years: "2023",
    company: "Netflix", issue: "Netflix reversed years of tolerated password sharing and converted unpaid account use into paid subscriptions despite customer resistance.",
    theory: "Subscription economics, customer lifetime value, policy enforcement timing", debate: "Is it ethical to change rules on existing customers, and did Netflix time it correctly?",
    refs: [...sources.pricing, ...sources.platform, ["Netflix, Inc. (2023). *Quarterly earnings materials*. <https://ir.netflix.net/financials/quarterly-earnings/default.aspx>", "Provides official subscriber and financial reporting around the password-sharing crackdown."], ["Netflix. (2023). *An update on sharing*. <https://about.netflix.com/en/news/an-update-on-sharing>", "Documents Netflix's public explanation for restricting account sharing."]]
  },
  {
    n: 8, file: "8_Boeing_Report.qmd", title: "Boeing 737 MAX Crashes", years: "2018-2019",
    company: "The Boeing Company", issue: "Two 737 MAX crashes killed 346 people and exposed failures in software design, pilot disclosure, regulator interaction, and safety governance.",
    theory: "Engineering ethics, regulatory failure, shareholder vs. stakeholder", debate: "Should executives face prison for safety decisions, and who failed: Boeing or regulators?",
    refs: [...sources.crisis, ...sources.governance, ["U.S. Department of Justice. (2021). *Boeing charged with 737 Max fraud conspiracy and agrees to pay over $2.5 billion*. <https://www.justice.gov/archives/opa/pr/boeing-charged-737-max-fraud-conspiracy-and-agrees-pay-over-25-billion>", "Provides official criminal-resolution facts, including the $2.5 billion settlement and 346 crash victims."], ["U.S. House Committee on Transportation and Infrastructure. (2020). *Final committee report: The design, development & certification of the Boeing 737 MAX*. <https://transportation.house.gov/committee-activity/boeing-737-max-investigation>", "Provides congressional investigation evidence on certification, design, and oversight failures."]]
  },
  {
    n: 9, file: "9_Theranos_Report.qmd", title: "Theranos: The $9 Billion Fraud", years: "2003-2018",
    company: "Theranos", issue: "Theranos raised hundreds of millions of dollars by overstating blood-testing capabilities that did not reliably work as represented.",
    theory: "Startup fraud, due diligence failure, fake-it-till-you-make-it culture", debate: "What is the line between vision and fraud, and why did experts fail to see through it?",
    refs: [...sources.governance, ["U.S. Securities and Exchange Commission. (2018). *Theranos, CEO Holmes, and former president Balwani charged with massive fraud*. <https://www.sec.gov/newsroom/press-releases/2018-41>", "Provides official fraud allegations and investor-misrepresentation facts."], ["Carreyrou, J. (2018). *Bad blood: Secrets and lies in a Silicon Valley startup*. Knopf.", "Supplies the detailed investigative account of Theranos's technology claims, governance gaps, and whistleblowers."]]
  },
  {
    n: 10, file: "10_FTX_Report.qmd", title: "FTX Collapse and Sam Bankman-Fried", years: "2022",
    company: "FTX", issue: "FTX collapsed after customer funds were misused through Alameda Research, producing criminal convictions and a major governance failure in crypto.",
    theory: "Corporate governance, crypto regulation, fraud detection", debate: "Should crypto be regulated like banks, and how did sophisticated investors miss red flags?",
    refs: [...sources.governance, ["U.S. Department of Justice. (2024). *Samuel Bankman-Fried sentenced to 25 years for his orchestration of multiple fraudulent schemes*. <https://www.justice.gov/usao-sdny/pr/samuel-bankman-fried-sentenced-25-years-his-orchestration-multiple-fraudulent>", "Provides official sentencing and fraud-summary facts for the FTX case."], ["Commodity Futures Trading Commission. (2024). *Federal court orders FTX to pay $12.7 billion to customers and fraud victims*. <https://www.cftc.gov/PressRoom/PressReleases/8946-24>", "Provides official restitution and disgorgement figures for the collapsed exchange."]]
  },
  {
    n: 11, file: "11_WeWork_Report.qmd", title: "WeWork: From $47 Billion to Bankruptcy", years: "2019-2023",
    company: "WeWork", issue: "WeWork's IPO collapsed after investors scrutinized losses, related-party transactions, governance risks, and the gap between tech valuation and real-estate economics.",
    theory: "Valuation bubble, corporate governance, founder worship", debate: "How did sophisticated investors get fooled, and what governance failed?",
    refs: [...sources.governance, ["The We Company. (2019). *Form S-1 registration statement*. U.S. Securities and Exchange Commission. <https://www.sec.gov/Archives/edgar/data/1533523/000119312519220499/d781982ds1.htm>", "Provides primary disclosure on WeWork's business model, losses, governance, and related-party risks before the failed IPO."], ["WeWork Inc. (2023). *WeWork takes strategic action to significantly strengthen balance sheet and further streamline real estate footprint*. <https://www.wework.com/newsroom/wework-takes-strategic-action-to-significantly-strengthen-balance-sheet-and-further-streamline-real-estate-footprint>", "Documents WeWork's Chapter 11 restructuring rationale and operational footprint reduction."]]
  },
  {
    n: 12, file: "12_Airbnb_Report.qmd", title: "Airbnb Hidden Cleaning Fees", years: "2022-Present",
    company: "Airbnb", issue: "Airbnb faced customer frustration over low nightly prices that rose sharply at checkout because of cleaning and service fees.",
    theory: "Pricing transparency, platform economics, trust erosion", debate: "Should platforms mandate all-in pricing, and who is responsible: platform or hosts?",
    refs: [...sources.pricing, ...sources.platform, ["Airbnb. (2022). *Introducing total price display and other upgrades*. <https://news.airbnb.com/introducing-total-price-display-and-other-upgrades/>", "Documents Airbnb's response to fee-transparency complaints through total-price display."], ["Federal Trade Commission. (2022). *Federal Trade Commission explores rule cracking down on junk fees*. <https://www.ftc.gov/news-events/news/press-releases/2022/10/federal-trade-commission-explores-rule-cracking-down-junk-fees>", "Provides regulatory context for drip pricing and fee transparency."]]
  },
  {
    n: 13, file: "13_Twitter_Report.qmd", title: "Twitter/X Under Elon Musk", years: "2022-Present",
    company: "Twitter/X", issue: "Elon Musk acquired Twitter for $44 billion, cut staff, changed verification, renamed the platform X, and faced advertiser and governance challenges.",
    theory: "M&A, platform governance, organizational change, founder control", debate: "Was mass firing the right call, and can a social platform be run by one person's vision?",
    refs: [...sources.platform, ...sources.culture, ["Twitter, Inc. (2022). *Current report on Form 8-K: Completion of acquisition by X Holdings II, Inc.* U.S. Securities and Exchange Commission. <https://www.sec.gov/Archives/edgar/data/1418091/000119312522276345/d302576d8k.htm>", "Provides primary documentation of the $44 billion acquisition closing and ownership change."], ["The Guardian. (2024, September 5). *Advertiser exodus from X gathers pace with 26% planning to cut spending*. <https://www.theguardian.com/media/article/2024/sep/05/advertiser-exodus-x-survey-2025-elon-musk>", "Documents advertiser trust concerns and revenue pressure after the Musk takeover."]]
  },
  {
    n: 14, file: "14_Adobe_Report.qmd", title: "Adobe's Subscription Model Shift", years: "2013",
    company: "Adobe", issue: "Adobe stopped selling perpetual Creative Suite licenses and forced a transition to Creative Cloud subscriptions despite customer resistance.",
    theory: "Business model innovation, subscription economics, customer resistance", debate: "When should companies force customers to new business models, and how should they manage the transition?",
    refs: [...sources.pricing, ...sources.innovation, ["Adobe. (2013). *Adobe accelerates shift to the cloud*. <https://news.adobe.com/news/news-details/2013/Adobe-Accelerates-Shift-to-the-Cloud/default.aspx>", "Documents Adobe's official announcement of the Creative Cloud subscription pivot."], ["Adobe Inc. (n.d.). *Financial documents and SEC filings*. <https://www.adobe.com/investor-relations/financial-documents.html>", "Provides official financial reporting used to assess the subscription model's long-run impact."]]
  },
  {
    n: 15, file: "15_Apple_Epic_Report.qmd", title: "Apple's App Store Tax vs. Epic Games", years: "2020-Present",
    company: "Apple", issue: "Epic challenged Apple's App Store commission and payment restrictions, raising antitrust questions about platform power and app-store governance.",
    theory: "Platform economics, antitrust, two-sided markets", debate: "Is 30% fair for platform access, and should app stores be regulated as utilities?",
    refs: [...sources.platform, ["CourtListener. (n.d.). *Epic Games, Inc. v. Apple Inc., docket*. <https://www.courtlistener.com/docket/17442392/epic-games-inc-v-apple-inc/>", "Provides accessible court-document context for the Epic v. Apple litigation."], ["U.S. Court of Appeals for the Ninth Circuit. (2023). *Epic Games, Inc. v. Apple, Inc.* <https://cdn.ca9.uscourts.gov/datastore/opinions/2023/04/24/21-16506.pdf>", "Provides the appellate decision used to analyze antitrust claims and payment-link remedies."]]
  },
  {
    n: 16, file: "16_Microsoft_Report.qmd", title: "Microsoft's Cultural Transformation", years: "2014-Present",
    company: "Microsoft", issue: "Satya Nadella shifted Microsoft from internal rivalry and Windows defensiveness toward cloud, learning culture, and cross-platform strategy.",
    theory: "Leadership, organizational culture, strategic renewal", debate: "Can culture really drive financial results, and what did Nadella do differently?",
    refs: [...sources.culture, ...sources.innovation, ["Nadella, S., Shaw, G., & Nichols, J. T. (2017). *Hit refresh: The quest to rediscover Microsoft's soul and imagine a better future for everyone*. Harper Business.", "Provides Nadella's own account of the cultural and strategic reset."], ["Microsoft Corporation. (n.d.). *Annual reports*. <https://www.microsoft.com/en-us/Investor/annual-reports.aspx>", "Provides official financial data for comparing Microsoft's performance before and after the transformation."]]
  },
  {
    n: 17, file: "17_OpenAI_Report.qmd", title: "ChatGPT and OpenAI Board Drama", years: "2023",
    company: "OpenAI", issue: "OpenAI's board removed Sam Altman, employees and Microsoft pushed back, and Altman returned days later with a changed board structure.",
    theory: "Corporate governance, nonprofit vs. for-profit, growth vs. caution", debate: "Was the board right to fire Altman, and is OpenAI's structure workable?",
    refs: [...sources.governance, ["OpenAI. (2023). *OpenAI announces leadership transition*. <https://openai.com/index/openai-announces-leadership-transition/>", "Documents the board's initial public statement removing Sam Altman as CEO."], ["OpenAI. (2023). *Sam Altman returns as CEO, OpenAI has a new initial board*. <https://openai.com/index/sam-altman-returns-as-ceo-openai-has-a-new-initial-board/>", "Documents the reversal and governance reset that followed employee and partner pressure."], ["Microsoft. (2023). *Microsoft announces new AI customer commitments*. <https://blogs.microsoft.com/on-the-issues/2023/07/21/ai-customer-commitments/>", "Provides partner-governance context for Microsoft's role as a major AI infrastructure and commercial partner."]]
  },
  {
    n: 18, file: "18_Meta_Report.qmd", title: "Meta's $50B Metaverse Bet", years: "2021-Present",
    company: "Meta Platforms", issue: "Facebook renamed itself Meta and spent heavily on metaverse and VR initiatives while investors questioned adoption, timing, and founder control.",
    theory: "Strategic pivots, R&D spending, market timing, founder control", debate: "When should companies abandon big bets, and should shareholders be able to override founders?",
    refs: [...sources.innovation, ...sources.governance, ["Meta. (2021). *Facebook company is now Meta*. <https://about.fb.com/news/2021/10/facebook-company-is-now-meta/>", "Documents the official strategic pivot and rebranding rationale."], ["Meta Platforms, Inc. (n.d.). *Annual reports*. <https://investor.fb.com/financials/default.aspx>", "Provides official financial reporting for Reality Labs spending and segment performance."]]
  },
  {
    n: 19, file: "19_Costco_Report.qmd", title: "Costco's Employee-First Model", years: "1983-Present",
    company: "Costco Wholesale", issue: "Costco pays above many retail competitors and accepts Wall Street criticism while arguing that low turnover and operating discipline support performance.",
    theory: "HR strategy, stakeholder vs. shareholder, operational efficiency", debate: "Is Costco's model replicable, and why do not more companies copy it?",
    refs: [...sources.culture, ["Ton, Z. (2014). *The good jobs strategy: How the smartest companies invest in employees to lower costs and boost profits*. New Harvest.", "Provides the operating-model theory that higher wages can support productivity and lower hidden costs."], ["Costco Wholesale Corporation. (n.d.). *Annual reports*. <https://investor.costco.com/financials/annual-reports-and-proxy/default.aspx>", "Provides official financial and operating data for assessing Costco's employee-first model."]]
  },
  {
    n: 20, file: "20_Peloton_Report.qmd", title: "Peloton's Pandemic Rise and Crash", years: "2020-2023",
    company: "Peloton Interactive", issue: "Peloton expanded capacity during pandemic demand, then faced reopening, inventory pressure, layoffs, and a sharp valuation collapse.",
    theory: "Demand forecasting, pandemic strategy, operational flexibility", debate: "How should companies respond to sudden demand spikes, and when is expansion a mistake?",
    refs: [...sources.innovation, ["Fisher, M. L. (1997). What is the right supply chain for your product? *Harvard Business Review, 75*(2), 105-116.", "Provides the supply-chain fit framework for distinguishing temporary demand shocks from sustainable operating needs."], ["Peloton Interactive, Inc. (n.d.). *SEC filings*. <https://investor.onepeloton.com/financials/sec-filings/default.aspx>", "Provides official filings for revenue, inventory, restructuring, and risk-factor evidence."], ["Peloton Interactive, Inc. (2022). *Peloton announces comprehensive program to reduce costs and drive growth, profitability, and free cash flow*. <https://investor.onepeloton.com/news-releases/news-release-details/peloton-announces-comprehensive-program-reduce-costs-and-drive>", "Documents the company's restructuring response to post-pandemic demand normalization."]]
  },
  {
    n: 21, file: "21_Uber_Report.qmd", title: "Uber Surge Pricing Ethics", years: "2014-Present",
    company: "Uber", issue: "Uber's dynamic pricing raises fares during demand spikes, creating tension between efficient market clearing and perceived exploitation during emergencies.",
    theory: "Dynamic pricing, price-gouging ethics, behavioral economics", debate: "Is surge pricing fair, and should there be caps during emergencies?",
    refs: [...sources.pricing, ...sources.platform, ["Cohen, P., Hahn, R., Hall, J., Levitt, S., & Metcalfe, R. (2016). Using big data to estimate consumer surplus: The case of Uber. *NBER Working Paper No. 22627*. <https://doi.org/10.3386/w22627>", "Provides empirical evidence on Uber pricing, consumer surplus, and ride-hailing market design."], ["Uber. (n.d.). *How surge pricing works*. <https://www.uber.com/us/en/drive/driver-app/how-surge-works/>", "Documents Uber's public explanation of surge pricing mechanics for drivers and riders."]]
  },
];

function esc(s) {
  return s.replaceAll("&", "\\&").replaceAll("%", "\\%");
}

function md(s) {
  return s.replaceAll("$", "\\$");
}

function latexTable(headers, rows, widths) {
  const spec = widths.map((w) => `>{\\raggedright\\arraybackslash}p{${w}\\linewidth}`).join(" ");
  const body = rows.map((row, i) => `${i % 2 === 1 ? "\\rowcolor{lightgray}\n" : ""}${row.map((c) => esc(c)).join(" & ")} \\\\`).join("\n");
  return `\\begingroup\\small
\\begin{longtable}{${spec}}
\\toprule
\\rowcolor{lightgray}
${headers.map((h) => `\\textbf{${esc(h)}}`).join(" & ")} \\\\
\\midrule
\\endhead
${body}
\\bottomrule
\\end{longtable}
\\endgroup`;
}

function refSection(refs) {
  return refs.map(([citation, relevance]) => `- ${md(citation)}\n  - Relevance: ${md(relevance)}`).join("\n\n");
}

function render(c) {
  const constraints = [
    ["Financial", "Management must protect cash flow, margins, and investor confidence while making decisions under public scrutiny."],
    ["Operational", "The organization must align product, process, technology, and data systems fast enough to prevent the issue from compounding."],
    ["Brand", "The decision affects trust in a highly visible brand where customers, regulators, employees, and partners can react quickly."],
    ["Human", "Employees, customers, communities, and counterparties bear consequences that cannot be reduced to short-term financial metrics."],
  ];
  const techniques = [
    ["Cohort and Segment Analysis", "Separate customers, products, regions, or stakeholders to identify where value, risk, or backlash is concentrated."],
    ["Scenario Modeling", "Compare best-case, base-case, and downside outcomes before committing to irreversible strategic moves."],
    ["Early-Warning Dashboards", "Track leading indicators such as complaints, churn, defect reports, adoption, utilization, or regulatory signals."],
    ["Root-Cause Analysis", "Connect observed outcomes to organizational incentives, process design, governance, and data-quality limitations."],
  ];
  const alternatives = [
    ["Option A: Defend the Current Model", "Preserve the existing strategy and address the issue with limited tactical changes.", "Avoids disruption and protects short-term continuity.", "Risks appearing slow, defensive, or unwilling to confront the underlying problem."],
    ["Option B: Disciplined Reset", "Make targeted changes to strategy, governance, operations, and metrics while protecting the strongest parts of the brand.", "Balances accountability with future value creation.", "Requires tradeoffs, internal conflict, and clear communication."],
    ["Option C: Radical Break", "Abandon the contested model, product, or governance structure and rebuild around a new approach.", "Signals seriousness and may restore trust quickly.", "Can destroy useful assets and may overcorrect before evidence is complete."],
  ];

  return `---
title: "${c.title.replaceAll('"', '\\"')}"
subtitle: "MBA Case Study Report (${c.years})"
date: "June 2026"
${preamble}
---

# Key Questions & Case Objectives

This case study addresses three high-order management questions through the lens of **${md(c.company)}'s** ${md(c.title.toLowerCase())}. The issue is not only a famous business story; it is a decision problem about how leaders use evidence, protect stakeholders, and act when strategy, incentives, and public trust collide.

1. **Strategy & Value Creation**
   - How can data-driven decision-making create sustainable competitive advantage?
   - *Case Application*: ${md(c.company)} needed to interpret market, operational, financial, and stakeholder signals before choosing whether to defend the existing model or make a more fundamental change.

2. **Ethics & Governance**
   - What are the boundaries of data utilization, and who bears responsibility for its consequences?
   - *Case Application*: The case raises questions about accountability, transparency, and whether leaders used data to understand reality or to justify a preferred decision.

3. **Execution & Transformation**
   - How should organizations balance innovation speed with operational risk in digital transformation?
   - *Case Application*: The decision required leadership to move quickly while managing brand risk, operating constraints, and unintended consequences.

**Debate Proposition**: "${md(c.debate)}"


# Background & Context

## Industry Landscape and Market Environment

${md(c.issue)} The surrounding industry environment made the decision more difficult because competitors, customers, investors, and regulators were already changing expectations about speed, transparency, and value creation.

## Company's Strategic Position

${md(c.company)} entered the case with valuable assets: brand recognition, customer relationships, distribution, data, and managerial attention. Those assets also created inertia. The same strengths that made the company important made it harder to admit that an existing strategy, product, policy, or governance model might need to change.

## Current Data/Technology Infrastructure

The relevant data environment includes customer behavior, operational performance, financial reporting, external market signals, and stakeholder feedback. The central analytical challenge is not simply collecting more data; it is deciding which signals should drive action when short-term metrics conflict with trust, safety, or long-term strategic resilience.


# Core Issues

## Business Problem Definition

The core business problem is how ${md(c.company)} should respond when evidence suggests that the current approach is producing strategic, ethical, or operational risk. The case connects directly to ${md(c.theory)}, but the management dilemma is broader: leaders must decide whether the problem is a temporary execution failure or a sign that the underlying model needs redesign.

## Why a Decision Is Needed Now

Delay can make the problem more expensive. Customers may leave, regulators may intervene, employees may lose confidence, and competitors may use the moment to reposition themselves. A decision is needed because the organization cannot preserve credibility while treating the issue as routine.

## Constraints

${latexTable(["Category", "Constraint"], constraints, [0.32, 0.63])}


# Data Science / Big Data Perspectives

## Data Landscape

### Available Data Types and Sources

- **Customer and stakeholder data**: Complaints, churn, usage, sentiment, willingness to pay, adoption, and support interactions.
- **Operational data**: Defects, cycle time, utilization, incident reports, capacity, inventory, service levels, and process exceptions.
- **Financial data**: Revenue, margin, cash flow, lifetime value, customer-acquisition cost, restructuring cost, and litigation or regulatory exposure.
- **External data**: Competitor moves, media coverage, court or regulatory records, macroeconomic conditions, and industry benchmarks.

### Data Quality and Limitations

The main limitation is interpretation. Data can show what happened, but managers still need to determine whether the signal is temporary noise, a structural change, or evidence of deeper governance failure. Historical data may be especially misleading when technology, regulation, or customer expectations are shifting.

### Data Governance Issues

The case requires shared definitions of risk, value, and accountability. Without governance, teams can optimize local metrics while creating enterprise-level harm. Data governance should clarify who owns the metric, who can challenge it, and how decisions are documented.

## Analytical Approaches

### Applicable Techniques

${latexTable(["Technique", `Application at ${c.company}`], techniques, [0.35, 0.6])}

### Technical Requirements

The organization needs integrated reporting across strategy, finance, operations, legal, product, and customer-facing teams. The most important requirement is a trusted decision dashboard that combines leading indicators with financial consequences and stakeholder-risk signals.

### ROI Measurement Methods

- Recovery or protection of revenue, margin, cash flow, and enterprise value.
- Reduction in complaints, defects, incidents, churn, or regulatory exposure.
- Improvement in customer trust, employee confidence, and partner stability.
- Evidence that the chosen response improves long-term strategic positioning rather than only short-term optics.

## Ethical Considerations

### Privacy and Data Protection

Customer and employee data should be used only for legitimate business analysis, with appropriate access controls and aggregation. Sensitive data should not be used to shift blame onto individuals when the root cause is organizational design.

### Algorithmic Bias

Models can overvalue measurable financial outcomes and undervalue trust, safety, fairness, or long-term brand effects. Leaders should test whether dashboards exclude affected stakeholders simply because their harm is harder to quantify.

### Transparency and Explainability

Stakeholders need a clear explanation of what the company knew, what it changed, and how future decisions will be governed. Explainability matters because trust recovery depends on credible reasoning, not only on a favorable metric.


# Strategic Alternatives

${latexTable(["Option", "Description", "Pros", "Cons"], alternatives, [0.22, 0.32, 0.2, 0.2])}

**Decision and Analysis**: The recommended classroom position is **Option B: Disciplined Reset**. It forces management to acknowledge the problem, preserve useful assets, and redesign incentives or operating routines without assuming that every legacy practice must be abandoned. Students should still test whether the facts of the case justify the more conservative Option A or the more radical Option C.


# Debate Framework

## Pro Side (Affirmative)

"${md(c.debate)}"

Key Arguments:

1. **Evidence Should Override Habit**: When data and stakeholder signals indicate risk, management should not defend the old model simply because it was historically successful.
2. **Trust Is an Economic Asset**: Reputation, regulatory legitimacy, and customer confidence affect future cash flows.
3. **Governance Converts Data into Action**: Better dashboards are not enough unless decision rights and accountability are clear.

Supporting Evidence:

- The case illustrates how visible brands can face rapid shifts in stakeholder trust.
- ${md(c.theory)} provides a theoretical basis for analyzing the decision.
- Verified sources in the reference section provide case chronology, official data, or scholarly frameworks.

Rebuttals to Anticipated Counterarguments:

- *Counterargument*: The company should avoid overreacting to public pressure. *Rebuttal*: A disciplined reset is not panic; it is a structured response that separates useful assets from harmful practices.

## Con Side (Opposition)

"Management should avoid dramatic changes until evidence proves the business model itself is broken."

Key Arguments:

1. **Short-Term Pressure Can Distort Strategy**: Media, markets, and regulators may reward symbolic action over durable fixes.
2. **Data Can Be Ambiguous**: Early indicators may not prove that a full strategic reset is necessary.
3. **Overcorrection Has Costs**: Radical changes can destroy capabilities, morale, or customer value.

Supporting Evidence:

- Some crises fade after operational corrections, while others reveal deeper strategic failure.
- Not every unpopular decision is unethical; some unpopular choices create long-term value.
- Strong governance requires proportionality as well as accountability.

Rebuttals to Anticipated Counterarguments:

- *Counterargument*: Waiting increases harm. *Rebuttal*: Management can act immediately on risk controls while still gathering evidence before making irreversible strategic commitments.


# Pre-Class Preparation Questions

1. What are the critical success factors for data-driven decision-making in this case?
   - Consider data quality, stakeholder visibility, incentive design, and leadership accountability.

2. What additional data would have enabled a better decision?
   - Consider customer behavior, operating costs, risk signals, employee feedback, and external benchmarks.

3. If you were the decision-maker, what would you choose and why?
   - Compare the financial, ethical, operational, and reputational consequences of each option.

4. What is the strongest argument for the opposing side?
   - Identify where your preferred decision could fail or create new risks.


# References (APA 7th Edition)

${refSection(c.refs)}
`;
}

for (const c of cases) {
  writeFileSync(c.file, render(c));
  console.log(`wrote ${c.file}`);
}
