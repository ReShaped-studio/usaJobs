/**
 * Downloads agency titles and descriptions from USA.gov federal directory pages
 * listed in the public sitemap. Output is suitable for civiWork mock/reference data.
 *
 * Run: node scripts/fetch-usagov-agency-descriptions.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../src/data/usagov-agency-descriptions.json");
const SITEMAP = "https://www.usa.gov/sitemap.xml";
const CONCURRENCY = 10;
const SOURCE = "https://www.usa.gov/";

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function parseTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  if (!m) return null;
  return decodeHtmlEntities(m[1].replace(/\s*\|\s*USAGov\s*$/i, "").trim());
}

function parseDescription(html) {
  const m = html.match(
    /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i,
  );
  if (!m) return null;
  return decodeHtmlEntities(m[1].trim());
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "civiWork/1.0 (USA.gov agency directory reference fetch)",
      Accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.text();
}

async function loadAgencyUrls() {
  const xml = await fetchText(SITEMAP);
  const urls = [];
  const re = /<loc>(https:\/\/www\.usa\.gov\/agencies\/[^<]+)<\/loc>/g;
  let x;
  while ((x = re.exec(xml)) !== null) {
    urls.push(x[1]);
  }
  return [...new Set(urls)].sort();
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

async function main() {
  const urls = await loadAgencyUrls();
  console.log(`Found ${urls.length} agency URLs in sitemap`);

  const rows = await mapPool(urls, CONCURRENCY, async (url) => {
    const slug = url.replace(/^https:\/\/www\.usa\.gov\/agencies\//, "");
    try {
      const html = await fetchText(url);
      const name = parseTitle(html);
      const description = parseDescription(html);
      if (!name || !description) {
        return {
          slug,
          url,
          name: name ?? null,
          description: description ?? null,
          error: "missing_title_or_description",
        };
      }
      return { slug, url, name, description };
    } catch (e) {
      return {
        slug,
        url,
        name: null,
        description: null,
        error: String(e?.message ?? e),
      };
    }
  });

  const errors = rows.filter((r) => r.error);
  if (errors.length) {
    console.warn(`${errors.length} entries failed or incomplete`);
  }

  const payload = {
    source: SOURCE,
    directoryStyleExample: "https://www.usa.gov/agencies/u-s-department-of-energy",
    retrievedAt: new Date().toISOString(),
    note: "Names and descriptions are taken from USA.gov federal directory pages (meta title and meta description).",
    agencies: rows.filter((r) => !r.error),
    failed: errors.length ? errors : undefined,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${payload.agencies.length} agencies to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
