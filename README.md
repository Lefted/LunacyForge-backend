# LunacyForge-backend
Backend for LunacyForge managing cosmetics

# Requests

/post should have following body


Name | Description according to [minecraft.id](https://github.com/MC-Auth/api.minecraft.id/wiki/Classic-Authentication-Flow)
--- | --- |
id | Unique ID of this request (Note that this is not the same as the request_id you specified, but it's used as an identifier for the API
request_id | A unique identifier for the request.
request_secret | A secret unique string to later verify the result.
code | A secret string used to later verify the callback & get the authentication result
