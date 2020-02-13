# Routes

## Auth

### `/auth/sign-up`

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

### `/auth/sign-in`

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
