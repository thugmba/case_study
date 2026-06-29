import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = "."; // Workspace root directory
const files = readdirSync(dir);

// Filter and sort the 21 case report QMD files numerically
const reportFiles = files
  .filter(f => /^\d+_[A-Za-z0-9_]+_Report\.qmd$/.test(f))
  .map(f => {
    const match = f.match(/^(\d+)_/);
    return {
      name: f,
      index: parseInt(match[1], 10)
    };
  })
  .sort((a, b) => a.index - b.index);

console.log(`Found ${reportFiles.length} reports to merge:`);
reportFiles.forEach(r => console.log(`  - ${r.name} (index: ${r.index})`));



const preamble = `title: "Global MBA Case Study Reports"
subtitle: "29 Business Decisions and Turnarounds"
author: "Innovation Analytics Lab"
date: "June 2026"
format:
  pdf:
    toc: true
    toc-depth: 1
    number-sections: true
    documentclass: scrartcl
    classoption: [DIV=11, numbers=noendperiod, index=totoc]
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
        \\AtBeginDocument{\\pagenumbering{roman}}
        \\usepackage{setspace}
        \\usepackage{makeidx}
        \\makeindex
        \\let\\oldtableofcontents\\tableofcontents
        \\renewcommand{\\tableofcontents}{%
          \\begingroup
          \\singlespacing
          \\oldtableofcontents
          \\endgroup
        }
        \\setlength{\\aboverulesep}{0pt}
        \\setlength{\\belowrulesep}{0pt}
        \\setkomafont{title}{\\fontsize{28pt}{34pt}\\selectfont\\color{navy}\\fontseries{l}\\sffamily}
        \\setkomafont{subtitle}{\\fontsize{14pt}{18pt}\\selectfont\\color{footergray}\\sffamily}
        \\setkomafont{section}{\\fontsize{16pt}{20pt}\\selectfont\\color{navy}\\bfseries\\sffamily}
        \\setkomafont{subsection}{\\fontsize{13pt}{16pt}\\selectfont\\color{darkgray}\\bfseries\\sffamily}
        \\setkomafont{subsubsection}{\\fontsize{11pt}{14pt}\\selectfont\\color{darkgray}\\bfseries\\sffamily}
        \\RedeclareSectionCommand[beforeskip=-12pt, afterskip=6pt, tocbeforeskip=2pt]{section}
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
        \\clubpenalty=10000
`;

let mergedContent = `---\n${preamble}---\n\n`;

// Add LaTeX command to start Arabic page numbering for the body
// This goes right at the beginning of the body, which will be executed after front matter/TOC
mergedContent += `\\newpage\n\\pagenumbering{arabic}\n\\setcounter{page}{1}\n\n`;

const getYamlField = (yaml, field) => {
  const regex = new RegExp(`^${field}:\\s*["']?(.*?)["']?\\s*$`, 'm');
  const match = yaml.match(regex);
  return match ? match[1] : '';
};

const indexKeywords = [
  // Companies
  "The Coca-Cola Company", "Coca-Cola", "The LEGO Group", "LEGO", "Samsung Electronics", "Samsung", "Volkswagen Group", "Volkswagen", "Blockbuster", "Netflix", "Kodak", "Boeing", "Theranos", "FTX", "WeWork", "Airbnb", "Twitter", "Adobe", "Apple", "Epic Games", "Microsoft", "OpenAI", "Meta Platforms", "Meta", "Costco Wholesale", "Costco", "Peloton Interactive", "Peloton", "Uber", "TSMC", "Foxconn", "MediaTek", "Giant Manufacturing", "Giant Bicycles", "ASUS", "Delta Electronics", "E Ink Holdings", "E Ink", "Evergreen Marine",
  
  // Theories
  "Brand equity", "Consumer psychology", "Market research limits", "Corporate turnaround", "Focus strategy", "Brand extension limits", "Crisis management", "Quality control", "Supply chain pressure", "Product recall", "Corporate fraud", "Environmental ethics", "Organizational pressure", "Disruption", "Strategic myopia", "Business model innovation", "Innovator's dilemma", "Cannibalization fear", "Strategic inertia", "Subscription economics", "Customer lifetime value", "Policy enforcement timing", "Engineering ethics", "Regulatory failure", "Shareholder vs. stakeholder", "Startup fraud", "Due diligence failure", "Fake-it-till-you-make-it culture", "Corporate governance", "Platform economics", "Platform governance", "Two-sided markets", "Dynamic pricing", "Price gouging ethics", "Behavioral economics", "Operations strategy", "Systems integration", "B2B solution marketing", "M&A technology acquisition", "Patent portfolio strategy", "Niche monopoly", "Cyclical industry strategy", "Capital allocation", "Carbon transition",
  
  // Terms & Jargons
  "Classic Coke", "New Coke", "MIH Consortium", "MIH", "electronic shelf labels", "ESL", "Kindle", "pure-play foundry", "silicon shield", "ROG", "Republic of Gamers", "switching power supplies", "E-bike", "defeat device", "737 MAX", "MCAS", "Note 7", "ChatGPT", "Metaverse", "Reality Labs", "Good Jobs Strategy", "surge pricing", "drip pricing", "junk fees", "Creative Cloud", "App Store", "Epic v. Apple", "Chapter 11", "due diligence", "whistleblower", "Alameda Research", "S-1", "unit economics"
].sort((a, b) => b.length - a.length);

for (const r of reportFiles) {
  const content = readFileSync(r.name, "utf-8");
  const lines = content.split(/\r?\n/);
  
  let yamlStart = -1;
  let yamlEnd = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (yamlStart === -1) {
        yamlStart = i;
      } else {
        yamlEnd = i;
        break;
      }
    }
  }
  
  if (yamlStart === -1 || yamlEnd === -1) {
    console.error(`Error: Could not parse YAML front matter in ${r.name}`);
    continue;
  }
  
  const yamlHeader = lines.slice(yamlStart + 1, yamlEnd).join('\n');
  const rawBodyLines = lines.slice(yamlEnd + 1);
  
  const title = getYamlField(yamlHeader, "title").replace(/\\"/g, '"');
  const subtitle = getYamlField(yamlHeader, "subtitle");
  
  // Demote all headings in the body:
  // # -> ##, ## -> ###, etc.
  const demotedBodyLines = rawBodyLines.map(line => {
    if (line.startsWith('#')) {
      return '#' + line;
    }
    return line;
  });
  
  const bodyText = demotedBodyLines.join('\n');
  
  // Append case study content
  // Each case study starts on a new page
  if (r.index > 1) {
    mergedContent += `\\newpage\n\n`;
  }
  
  mergedContent += `# ${title}\n\n`;
  if (subtitle) {
    mergedContent += `*${subtitle}*\n\n`;
  }
  
  let indexedBodyText = bodyText;
  for (const kw of indexKeywords) {
    const escapedKw = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?<!\\\\index\\{[^}]*)\\b${escapedKw}\\b`, 'i');
    indexedBodyText = indexedBodyText.replace(regex, (match) => {
      const escapedIndexKw = kw.replace(/&/g, '\\&').replace(/%/g, '\\%');
      return `${match}\\index{${escapedIndexKw}}`;
    });
  }

  mergedContent += indexedBodyText;
  mergedContent += `\n\n`;
}

mergedContent += `\n\n\\phantomsection\n\\addcontentsline{toc}{section}{Index}\n\\printindex\n`;

writeFileSync("GMBA_Case_Studies_Merged.qmd", mergedContent, "utf-8");
console.log("Successfully wrote GMBA_Case_Studies_Merged.qmd");
