# GMBA Case Study Report Template


## Style Guide

### Document Metadata
- **Title**: [Company Name]'s [Key Event/Challenge]
- **Subtitle**: GMBA Case Study Report ([Year Range])
- **Date**: [Month Year]

### Document Settings
- **Page Size**: A4
- **Margins**: 1 inch (2.54 cm) all sides
- **Line Spacing**: 1.5
- **Paragraph Spacing**: 6pt after

### Typography
| Element | Font (Primary / LaTeX / Fallback) | Size | Weight | Color |
|---------|-----------------------------------|------|--------|-------|
| Title (H1) | Helvetica Neue / TeX Gyre Heros / Calibri | 28pt | Light | Navy (#1A2B4C) |
| Section Headers (H2) | Helvetica Neue / TeX Gyre Heros / Calibri | 16pt | Medium | Navy (#1A2B4C) |
| Subsection Headers (H3) | Helvetica Neue / TeX Gyre Heros / Calibri | 13pt | Medium | Dark Gray (#333333) |
| Body Text | Helvetica Neue / TeX Gyre Heros / Calibri | 11pt | Regular | Dark Gray (#333333) |
| Tables | Helvetica Neue / TeX Gyre Heros / Calibri | 10pt | Regular | Dark Gray (#333333) |
| Captions/Footnotes | Helvetica Neue / TeX Gyre Heros / Calibri | 9pt | Regular | Gray (#666666) |
| Key Metrics/Numbers | Helvetica Neue / TeX Gyre Heros / Calibri | 11pt | Bold | Navy (#1A2B4C) |
| Page Footer | Helvetica Neue / TeX Gyre Heros / Calibri | 9pt | Regular | Gray (#666666) |
| Page Numbers | Helvetica Neue / TeX Gyre Heros / Calibri | 9pt | Regular | Gray (#666666) |

> **Note**: Helvetica Neue is preferred for its clean, professional look commonly used in McKinsey, BCG, and Bain reports. Use TeX Gyre Heros for LaTeX/Quarto environments. Calibri as a fallback for compatibility.

### Formatting Rules
- **Headings**: Title case, no period at the end. Follow these numbering hygiene rules:
  - **Do Not Hardcode Heading Numbers**: In the QMD source files, never manually prefix headings with numeric indicators (e.g., do not write `# 1. Case Study Title` or `## 1.1 Objectives`). Let Quarto's `number-sections: true` dynamically handle the numbering. This prevents duplicate numbers in the generated Table of Contents and PDF section headers.
  - **Suppressing Numbering**: For sections that should not be numbered (such as "References" or "Appendices"), use Quarto's `{.unnumbered}` class tag. For example: `## References (APA 7th Edition) {.unnumbered}`. This removes the numbering prefix while keeping the section in the document outline and TOC.
- **Lists**: Use bullet points for unordered lists, numbers for sequential steps
- **Tables**: Use raw LaTeX `longtable` tables for PDF output rather than Markdown pipe tables when row shading is required. Wrap each table in `\begingroup\small` and `\endgroup`, define fixed-width `p{...}` columns, and apply shading explicitly with `\rowcolor{lightgray}` on the header row and alternating body rows. In the PDF preamble, load `booktabs`, `array`, and `colortbl`, define `lightgray` as `#F5F5F5`, and set `\setlength{\aboverulesep}{0pt}` and `\setlength{\belowrulesep}{0pt}` so horizontal rules touch shaded rows cleanly. Do not use global `\AtBeginEnvironment{longtable}{\rowcolors{...}}` for these reports; Pandoc-generated Markdown tables can produce gray bands that extend beyond the booktabs rules.
- **References**: Include only real, verified sources. Prioritize academic articles, books, published case studies, reputable industry reports, company filings/official archives, and high-quality business journalism. Verify academic sources through Google Scholar when possible; if Google Scholar is inaccessible, use another scholarly index, publisher page, DOI resolver, university library record, Crossref, JSTOR, SSRN, ScienceDirect, Wiley, Springer, Taylor & Francis, Emerald, or the journal's official site. Every included URL or DOI must be accessible and clickable using `<url>` or `[url](url)` format. If a source is real but no accessible URL can be verified, cite it without a link. Under every reference item, add a concise `Relevance:` note explaining why the source is used in this specific case study. Never invent article titles, authors, journals, volumes, page ranges, DOIs, URLs, datasets, or relevance claims.
- **Figures/Charts**: Center-aligned, numbered (Figure 1, Figure 2...), caption below
- **Page Numbers**: Bottom center on every page, including page 1
- **Page Footer**: Show on every page, including page 1: "Innovation Analytics Lab" (left-aligned) | page number (center-aligned) | "Tunghai University" (right-aligned)
- **Company Name**: Bold on first mention, regular thereafter
- **Page Breaks**: Keep headers with content; never allow a page break immediately after a section header (use "keep with next" setting)
- **Title Page**: No separate title page; title and content start on the same page

### Quarto PDF Table Preamble
Use this table-related LaTeX setup in `format.pdf.include-in-header.text`:

```tex
\usepackage{booktabs}
\usepackage{array}
\usepackage{colortbl}
\definecolor{lightgray}{HTML}{F5F5F5}
\setlength{\aboverulesep}{0pt}
\setlength{\belowrulesep}{0pt}
```

Example table pattern:

```tex
\begingroup\small
\begin{longtable}{>{\raggedright\arraybackslash}p{0.35\linewidth} >{\raggedright\arraybackslash}p{0.6\linewidth}}
\toprule
\rowcolor{lightgray}
\textbf{Technique} & \textbf{Application} \\
\midrule
\endhead
\textbf{First Row} & Explanation text \\
\rowcolor{lightgray}
\textbf{Second Row} & Explanation text \\
\bottomrule
\end{longtable}
\endgroup
```

### Quarto PDF Footer Preamble
Use this footer setup in `format.pdf.include-in-header.text` so the first page and all later pages share the same footer:

```tex
\usepackage{fancyhdr}
\definecolor{footergray}{HTML}{666666}
\pagestyle{fancy}
\fancyhf{}
\fancyfoot[C]{\fontsize{9pt}{11pt}\selectfont\color{footergray}\thepage}
\fancyfoot[L]{\fontsize{9pt}{11pt}\selectfont\color{footergray}Innovation Analytics Lab}
\fancyfoot[R]{\fontsize{9pt}{11pt}\selectfont\color{footergray}Tunghai University}
\renewcommand{\headrulewidth}{0pt}
\fancypagestyle{plain}{
  \fancyhf{}
  \fancyfoot[C]{\fontsize{9pt}{11pt}\selectfont\color{footergray}\thepage}
  \fancyfoot[L]{\fontsize{9pt}{11pt}\selectfont\color{footergray}Innovation Analytics Lab}
  \fancyfoot[R]{\fontsize{9pt}{11pt}\selectfont\color{footergray}Tunghai University}
  \renewcommand{\headrulewidth}{0pt}
}
```

### Length Guidelines
- **Total Length**: 6-8 pages (excluding references)
- **Key Questions & Objectives**: 150-200 words
- **Background & Context**: 200-250 words
- **Core Issues**: 150-200 words
- **Data Science Perspectives**: 300-400 words
- **Strategic Alternatives**: 150-200 words
- **Debate Framework**: 300-400 words
- **Pre-Class Questions**: 100-150 words

### Language
- **All content must be written in English**

### Tone & Voice
- Professional, objective, third-person perspective
- Avoid jargon unless defined
- Present facts without bias; let readers form their own conclusions


## PDF Generation & Compilation Rules

### 1. Compiling Individual Case Reports
To compile any single case report `.qmd` file to a standalone PDF:
- Use the command:
  ```bash
  quarto render <filename>.qmd --to pdf
  ```
- **Document Class**: Use `scrartcl` (KOMA-Script Article).
- **Footer**: Ensure the custom page footer setup (from the Footer Preamble) is included. Under the KOMA-Script settings, page numbers start at Arabic `1` on the first page, and the footer reads: "Innovation Analytics Lab" (left) | Page Number (center) | "Tunghai University" (right).
- **Title Block**: No separate cover page; the title and content start on the same page.

### 2. Compiling the Merged Volume (All Cases)
To compile all 29 case studies into a single unified PDF:
- **Merging Strategy**: Use a script (e.g., in Node.js or Python) to merge the files in numerical order.
- **Heading Demotion**:
  - Insert a new top-level H1 header (`# [Case Title]`) for each case study.
  - Demote all internal headers within the case study by one level (e.g., `#` becomes `##`, `##` becomes `###`) to ensure a correct outline.
  - Use `\newpage` between case studies so each report starts on its own page.
- **Table of Contents (TOC)**:
  - Configure `toc: true` and `toc-depth: 1` in the YAML header to only display the case study titles in the TOC.
  - Force the TOC to fit on a single page by reducing the vertical skip between sections and setting single line spacing locally:
    ```latex
    \RedeclareSectionCommand[tocbeforeskip=2pt]{section}
    \usepackage{setspace}
    \let\oldtableofcontents\tableofcontents
    \renewcommand{\tableofcontents}{%
      \begingroup
      \singlespacing
      \oldtableofcontents
      \endgroup
    }
    ```
- **Page Numbering Rules**:
  - Format the front matter (title block and Table of Contents) with Roman page numbers starting at `i` (set `\AtBeginDocument{\pagenumbering{roman}}` in the YAML header).
  - Transition to Arabic page numbers starting at `1` for the main content by inserting the following LaTeX code right before the first case study:
    ```latex
    \newpage
    \pagenumbering{arabic}
    \setcounter{page}{1}
    ```
- **Alphabetical Two-Column Index**:
  - Load the `makeidx` package and call `\makeindex` in the header configuration.
  - Insert `\index{Keyword}` tags dynamically on the first occurrence of each designated keyword (covering companies, theories, and key terms) per case study. Special characters like `&` and `%` must be escaped as `\&` and `\%` in the index tags to compile cleanly.
  - Append `\phantomsection` and `\addcontentsline{toc}{section}{Index}` followed by `\printindex` at the end of the document.
  - Configure `classoption: [DIV=11, numbers=noendperiod, index=totoc]` in the YAML metadata to ensure the Index is registered in the Table of Contents.
- **Compilation Command**:
  ```bash
  quarto render <merged_filename>.qmd --to pdf
  ```

### 3. System Prerequisites & Dependencies
To ensure successful compilation:
- **LaTeX Engine**: Use `lualatex` as it supports system fonts out-of-the-box in Quarto.
- **System Fonts**: The template utilizes `"TeX Gyre Heros"` as the primary sans-serif font, `"TeX Gyre Cursor"` as the monospace font, and falls back to standard system Helvetica.
- **LaTeX Packages**: The compilation environment must have the following TeX packages installed:
  - `setspace` (for controlling line spacing)
  - `fancyhdr` (for custom headers and footers)
  - `booktabs` (for professional horizontal rules)
  - `colortbl` (for colored table rows)
  - `longtable` (for multi-page tables)
  - `needspace` (for preventing orphan headings)
  - `etoolbox` (for TeX patch utilities)

### 4. Automation & Maintenance Scripts
The project provides automated scripts located in `scripts/` to generate and compile case notes:
- **Case Report Generator**: Runs on Node.js. It compiles metadata definitions in `generate_reports.mjs` to output individual `.qmd` case notes:
  ```bash
  node scripts/generate_reports.mjs
  ```
- **Case Volume Merger**: Scans the workspace directory, merges all 29 case study files in numerical order, demotes heading levels, and compiles the volume:
  ```bash
  node scripts/merge_reports.mjs
  ```

### 5. Layout Tuning & Page-Break Management
To prevent unprofessional gaps, awkward page breaks, and orphaned headings in the rendered PDFs:
- **Orphan Headings**: Insert `\needspace{4\baselineskip}` immediately before section headers if they appear near the bottom of a page to force the heading and text to stay together.
- **Table Formatting**: Ensure all tables use standard relative column widths (e.g. `p{0.32\linewidth}`) and sum up to no more than `0.95` of the line width to prevent margin clipping.
- **Forced Page Breaks**: Use `\newpage` between major sections (like between case studies) to give each case study a clean start.

### 6. Reference Verification Checklist
Before committing new case reports or compiling the merged PDF, verify all citations against the following auditing rules:
1. **Factuality**: Verify the publication title, authors, volume, and pages on a scholarly index like Google Scholar. Do not invent metrics or relevance statements.
2. **Relevance**: Every citation must contain a `Relevance:` statement describing exactly how it supports the strategic, operational, data-science, or ethical argument of the case.
3. **Clickability**: All URL links and DOIs must be live, active, and formatted cleanly using `<url>` or standard markdown links.
4. **Academics**: Include at least two academic peer-reviewed sources for each case study if scholarly material exists.


## 1. Key Questions & Case Objectives

This case study addresses three high-order management questions:

1. **Strategy & Value Creation**
   - How can data-driven decision-making create sustainable competitive advantage?
   - *Case Application*: _(1-2 sentences explaining how this question applies to the specific company/case)_

2. **Ethics & Governance**
   - What are the boundaries of data utilization, and who bears responsibility for its consequences?
   - *Case Application*: _(1-2 sentences explaining how this question applies to the specific company/case)_

3. **Execution & Transformation**
   - How should organizations balance innovation speed with operational risk in digital transformation?
   - *Case Application*: _(1-2 sentences explaining how this question applies to the specific company/case)_

**Debate Proposition**: _(The specific statement teams will argue for/against)_


## 2. Background & Context
- Industry landscape and market environment
- Company's strategic position
- Current data/technology infrastructure


## 3. Core Issues
- Business problem definition
- Why a decision is needed now
- Constraints (time, budget, technology, regulations, etc.)


## 4. Data Science / Big Data Perspectives

### 4.1 Data Landscape
- Available data types and sources
- Data quality and limitations
- Data governance issues

### 4.2 Analytical Approaches
- Applicable techniques (ML, predictive models, A/B testing, etc.)
- Technical requirements
- ROI measurement methods

### 4.3 Ethical Considerations
- Privacy and data protection
- Algorithmic bias
- Transparency and explainability


## 5. Strategic Alternatives
| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| A | | | |
| B | | | |
| C | | | |


## 6. Debate Framework

### Pro Side (Affirmative)
- Key arguments
- Supporting evidence (data, cases, theories)
- Rebuttals to anticipated counterarguments

### Con Side (Opposition)
- Key arguments
- Supporting evidence (data, cases, theories)
- Rebuttals to anticipated counterarguments


## 7. Pre-Class Preparation Questions
1. What are the critical success factors for data-driven decision-making in this case?
2. What additional data would have enabled a better decision?
3. If you were the decision-maker, what would you choose and why?
4. What is the strongest argument for the opposing side?


## 8. References (APA 7th Edition)

> **Important**: Build references like a business-school case note. Use as many academic and case-study-quality sources as the topic realistically supports, then supplement with official company materials, financial filings, reputable industry reports, and high-quality business journalism. Always verify that every reference is real before adding it. For academic articles, search Google Scholar when possible and confirm the title, authors, year, journal, volume, issue, and page range against a scholarly index or publisher page. If Google Scholar is unavailable, verify through another scholarly source such as Crossref, JSTOR, SSRN, ScienceDirect, Wiley, Springer, Taylor & Francis, Emerald, a university library record, or the journal's official site. Test every included URL and DOI directly; do not include placeholder URLs, broken URLs, unavailable DOI links, inaccessible links, or links that cannot be verified. If a credible source is real but no accessible URL is available, cite it without a URL. Never fabricate citations or keep a citation whose existence cannot be independently confirmed.

Reference quality requirements:
- Include at least two academic or scholarly sources when credible sources exist for the case topic.
- Prefer peer-reviewed journal articles, books from reputable publishers, Harvard Business School-style case materials, and established management frameworks over generic web summaries.
- Use official company archives, annual reports, SEC filings, court/regulatory documents, or reputable industry datasets for factual timelines and financial figures.
- Use news sources only when they are reputable, attributable, and needed for contemporary reporting or event chronology.
- Remove any source immediately if the title, author, publication venue, DOI, URL, or publication details cannot be verified.
- For each reference, include a one-sentence `Relevance:` note that ties the source to a specific case need such as company timeline, financial evidence, strategic framework, data-science method, ethical issue, governance lesson, or debate argument.
- Do not use generic relevance notes such as "This source is relevant to the case." The note must identify what the source supports in the report.

### Academic Articles
- Author, A. A., & Author, B. B. (Year). Title of article. *Journal Name, Volume*(Issue), Page–Page. <https://doi.org/xxxxx>
  - Relevance: Explains the theoretical framework used to analyze [specific issue] in this case.

### Books
- Author, A. A. (Year). *Title of book*. Publisher.
  - Relevance: Provides case-specific background on [company/event/management decision].

### Industry Reports
- Organization Name. (Year). *Title of report*. <https://www.example.com/report>
  - Relevance: Supplies official financial, operational, or market data used to assess [specific decision or outcome].

### Online Sources
- Author, A. A. (Year, Month Day). Title of webpage. Site Name. <https://www.example.com/page>
  - Relevance: Documents the event chronology or stakeholder reaction needed to interpret [specific case issue].

### Data Sources
- Database or Dataset Name. (Year). *Title of dataset* [Data set]. Publisher. <https://www.example.com/data>
  - Relevance: Provides the dataset used to support [specific metric, trend, or comparison].
