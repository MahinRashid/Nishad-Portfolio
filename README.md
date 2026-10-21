# Nishad Rashid Mahi: Business Data Analyst Portfolio

An interactive portfolio site for my data analysis work. Each case study links to its dashboard and its GitHub repository, so every number on the site can be checked against the analysis behind it.

**Built with:** Next.js, TypeScript, React, CSS and SVG charts · deployed on Vercel

## What's on the site

- **Case studies**, each with the business problem, the questions asked, the data, the process and the results:
  - [Who Funds UK Political Parties?](https://github.com/MahinRashid/UK-Political-Donations-Analysis) (Python · SQL · Tableau)
  - [Revenue Leakage & Customer Retention](https://github.com/MahinRashid/Ecommerce-Revenue-Retention-Analysis) (SQL · Python · Power BI)
  - [Amazon Apparel Operations](https://github.com/MahinRashid/Amazon-Sales-Report) (Python · SQL · Power BI)
  - [Walmart Store Sales](https://github.com/MahinRashid/Walmart-Sales-Trend) (SQL · Python · Excel · Tableau)
  - [Maternal Health Risk Screening](https://github.com/MahinRashid/Maternity-Health-Risk) (Python · scikit-learn · Tableau)
- **Dashboard galleries** with screenshots of each Tableau and Power BI dashboard
- **My visual résumé** ([source](https://github.com/MahinRashid/Viz-Resume))
- **My résumé as a PDF**, downloadable from the site
- **How I work:** understand the decision, make the evidence clear, recommend the next move
- **Contact form**

## Project structure

```
├── app/          pages, layout, metadata and the contact API route
├── components/   the portfolio sections and interactive charts
├── content/      projects.ts: every case study's text, figures and links
├── public/       portrait, dashboard screenshots and icons
```

To add or edit a case study, change `content/projects.ts`.

## Run locally

Requires Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Then open the local address the dev server prints.

## Contact form delivery

The contact form works without any setup and says so when no delivery channel is connected. To receive messages, copy `.env.example` to `.env.local` and set at least one channel: email (Resend), WhatsApp Cloud API, or a webhook (Zapier, Make, n8n). Credentials stay on the server and are never committed.

## Checks

```bash
npm run lint
npm run build
```
