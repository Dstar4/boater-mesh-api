# Routes

## Auth

### `POST /auth/sign-up`

**Params**

```json
{
  "email": "test@test.com",
  "password": "test"
}
```

**Response**

```json
{
  "email": "test@test.com",
  "password": "$2a$12$.M2mCK3zwvq/v8CUY8BdpuxePCqJF8mWotKUePDNMfKvMxbUY78O6",
  "id": 14
}
```

### `POST /auth/sign-in`

**Params**

```json
{
  "email": "test@test.com",
  "password": "test"
}
```

**Response**

```json
{
  "id": 14,
  "email": "test@test.com",
  "password": "$2a$12$.M2mCK3zwvq/v8CUY8BdpuxePCqJF8mWotKUePDNMfKvMxbUY78O6",
  "created_at": "2020-02-13 01:27:47",
  "updated_at": "2020-02-13 01:27:47",
  "token": null,
  "zip": null,
  "isAdmin": null
}
```

---

## Gauges

### Protected - requires Authorization Headers

`Authorization: "Bearer + token"`

Example:

`Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlkIjoxfSwiaWF0IjoxNTgxNTYzMzc1LCJpc3MiOiJib2F0ZXItbWVzaCIsInN1YiI6IjEifQ.TNTAK0XCAv-XVXJI0b6J9DBOygv000VO7P84wKn5Wng"`

### `GET /gauges/`

```json
[
    {
        "siteName": "LINVILLE RIVER NEAR NEBO, NC",
        "siteCode": "02138500",
        "geoLocation": {
            "latitude": 35.79555556,
            "longitude": -81.8911111
        }
    },
    {
        "siteName": "MIDDLE SALUDA RIVER NEAR CLEVELAND, SC",
        "siteCode": "02162350",
        "geoLocation": {
            "latitude": 35.1201172,
            "longitude": -82.537623
        }
    },

   ...

]
```
