# Discretize Guild Wars 2 extended API

This repo holds the code for the extended gw2-api.

Features:

- query items/skills/traits
- query by names or ids
- includes missing data, that the official api is lacking

## API endpoints

All endpoints return a cached version of the gw2-api

`/api/skills/names/:names` - requires a comma seperated list of names that are normalized  
`/api/skills/ids/:ids` - requires a comma seperated list of ids  
`/api/items/names/:names` - requires a comma seperated list of names that are normalized  
`/api/items/ids/:ids` - requires a comma seperated list of ids  
`/api/traits/names/:names` - requires a comma seperated list of names that are normalized  
`/api/traits/ids/:ids` - requires a comma seperated list of ids

## Local development

1. Create the file `wrangler.toml` with your account cloudflare account id

```
name = "discretize-serverless-apply"
type = "javascript"

account_id = "$accountId"
workers_dev = true
route = ""
zone_id = ""
compatibility_date = "2021-10-08"
```

2. `wrangler login` to login into your cloudflare account
3. `wrangler dev` to start the dev server
