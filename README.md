# Brightcove Thumbnail Scraper

A simple scaper to fetch all thumbnails from your Brightcove Video Cloud account.

## Installation

Download and install dependencies:
`npm install`
or
`yarn`

Copy the example `.env` configuration.
```
cp .env.example .env
```

Add your Brightcove API token:
```
BRIGHTCOVE_API_TOKEN=[your-api-token]
```

## Run

Currently the scraper will fetch thumbnails from all videos in your account.

```
npm run start
```
