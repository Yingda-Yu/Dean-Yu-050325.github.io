# Analytics Setup Guide

This guide explains how to connect real visitor analytics to the website.

## Overview

The website displays country-level aggregate visitor statistics in the "Around the World" section. The architecture is:

```
Analytics Provider API
        ↓ (GitHub Action, every 6 hours)
  visitor-stats.json  (committed to repo)
        ↓ (fetched by browser)
  Frontend renders stats
```

The API token never enters the browser. Only aggregate, country-level data is shown.

## Until Analytics Is Configured

The frontend displays **"Visitor analytics coming online."** — no fake numbers are shown.

## Step 1: Choose an Analytics Provider

### Recommended: Umami

Umami is a privacy-friendly, open-source web analytics tool.

1. **Self-host Umami** or use [Umami Cloud](https://umami.is/).
2. Create a website entry in Umami for your GitHub Pages URL.
3. Add the Umami tracking script to `index.html` (inside `<head>`):

```html
<script async defer
  src="https://YOUR_UMAMI_HOST/script.js"
  data-website-id="YOUR_WEBSITE_ID"></script>
```

4. Create an API key in Umami settings.

### Alternative: Plausible

Plausible also works. Adjust the API call in the GitHub Action accordingly.

## Step 2: Add GitHub Secrets

In your GitHub repository, go to **Settings → Secrets and variables → Actions** and add:

| Secret Name | Value |
|---|---|
| `ANALYTICS_API_URL` | Your analytics API endpoint that returns aggregate stats |
| `ANALYTICS_API_TOKEN` | Your API key/token |

## Step 3: Configure the API Call

Edit `.github/workflows/update-visitor-stats.yml` and adjust the `curl` command and `jq` filter to match your analytics provider's API response format.

The output JSON must have this shape:

```json
{
  "visitors": 1234,
  "countries": 42,
  "topCountries": [
    { "name": "China", "count": 500 },
    { "name": "United States", "count": 300 }
  ]
}
```

## Step 4: Test the Workflow

1. Go to **Actions** tab in GitHub.
2. Select **Update Visitor Stats**.
3. Click **Run workflow** to trigger it manually.
4. Check that `assets/data/visitor-stats.json` is updated with real data.

## Privacy Notes

- The website only displays **country-level aggregate data**.
- No IP addresses, city-level locations, or individual visitor data are shown.
- API tokens are stored in GitHub Secrets and never appear in the browser.

## Umami API Example

For Umami, the stats API endpoint is typically:

```
GET https://YOUR_UMAMI_HOST/api/websites/{websiteId}/stats
  ?start_at=TIMESTAMP&end_at=TIMESTAMP
```

And the country breakdown:

```
GET https://YOUR_UMAMI_HOST/api/websites/{websiteId}/metrics
  ?type=country&start_at=TIMESTAMP&end_at=TIMESTAMP
```

You may need to combine both calls in the GitHub Action script.
