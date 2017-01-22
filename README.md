# Brightcove Thumbnail Scraper

A simple scaper to fetch all thumbnails from your Brightcove Video Cloud account.

## Installation

1) Download the project

2) Install dependencies:
`npm install`
or
`yarn`

3) Copy the example `.env` configuration.
```
cp .env.example .env
```

4) Add your Brightcove API token to `.env`:
```
BRIGHTCOVE_API_TOKEN=[your-api-token]
```

## Run

Currently the scraper will fetch thumbnails from all videos in your account.

```
npm run start
```
