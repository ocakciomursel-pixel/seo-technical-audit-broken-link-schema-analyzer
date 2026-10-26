/**
 * ============================================================================
 * 📊 Technical SEO, Broken Link, Schema.org & Security Auditor — Official Google Sheets Integration (Apps Script)
 * ============================================================================
 * Run https://apify.com/lucacelli/seo-technical-audit-broken-link-schema-analyzer ($0.80 / 1,000 pages) directly inside Google Sheets!
 *
 * HOW TO INSTALL (30 SECONDS):
 * 1. Open any Google Sheet -> Click "Extensions" -> "Apps Script"
 * 2. Paste this code and replace YOUR_APIFY_TOKEN_HERE with your Apify API Token
 *    (Get $5.00/mo free credit at: https://apify.com/lucacelli/seo-technical-audit-broken-link-schema-analyzer)
 * 3. Click Save & Reload your Google Sheet -> Use the "⚡ Apify Cloud Data" menu!
 */

const APIFY_TOKEN = 'YOUR_APIFY_TOKEN_HERE';
const ACTOR_ENDPOINT = 'https://api.apify.com/v2/acts/lucacelli~seo-technical-audit-broken-link-schema-analyzer/run-sync-get-dataset-items';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚡ Apify Cloud Data (@lucacelli)')
    .addItem('🚀 Run Technical SEO, Broken Link, Schema.org...', 'runApifyActorToSheet')
    .addToUi();
}

function runApifyActorToSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const payload = {
  "urls": [
    "https://apify.com",
    "https://cloudflare.com"
  ],
  "checkBrokenLinks": true
};

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(ACTOR_ENDPOINT + '?token=' + encodeURIComponent(APIFY_TOKEN), options);
  const rows = JSON.parse(response.getContentText());

  if (!Array.isArray(rows) || rows.length === 0) {
    SpreadsheetApp.getUi().alert('No records returned or check your APIFY_TOKEN.');
    return;
  }

  const headers = Object.keys(rows[0]);
  sheet.clear();
  sheet.appendRow(headers);

  const matrix = rows.map(r => headers.map(h => {
    const val = r[h];
    return typeof val === 'object' && val !== null ? JSON.stringify(val) : (val ?? '');
  }));

  sheet.getRange(2, 1, matrix.length, headers.length).setValues(matrix);
  SpreadsheetApp.getUi().alert('✅ Successfully imported ' + rows.length + ' records from Apify Cloud!');
}
