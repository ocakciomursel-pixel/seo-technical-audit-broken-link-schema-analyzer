"""
Technical SEO, Broken Link, Schema.org & Security Auditor — LangChain, CrewAI & OpenAI Assistants Tool
Official Apify Actor: https://apify.com/lucacelli/seo-technical-audit-broken-link-schema-analyzer ($0.80 / 1,000 pages)
"""
import os
import requests
from typing import Dict, Any, List

APIFY_TOKEN = os.getenv("APIFY_TOKEN", "YOUR_APIFY_TOKEN")
ENDPOINT = "https://api.apify.com/v2/acts/lucacelli~seo-technical-audit-broken-link-schema-analyzer/run-sync-get-dataset-items"

def run_seo_technical_audit_broken_link_schema_analyzer(custom_input: Dict[str, Any] = None) -> List[Dict[str, Any]]:
    """
    Executes Technical SEO, Broken Link, Schema.org & Security Auditor on Apify Cloud ($0.80/1k pages).
    Run a 45-point technical SEO audit across any URL list: HTTP TTFB latency, Title/Meta lengths, Canonical & robots/llms.txt checks, HSTS/CSP security headers, Schema.org JSON-LD validation, and live broken link detection.
    """
    default_payload = {
    "urls": [
        "https://apify.com",
        "https://cloudflare.com"
    ],
    "checkBrokenLinks": True
}
    payload = custom_input if custom_input else default_payload
    res = requests.post(f"{ENDPOINT}?token={APIFY_TOKEN}", json=payload, timeout=300)
    res.raise_for_status()
    return res.json()
