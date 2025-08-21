## 📦 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Typeorm](https://typeorm.io/)
- **Database**: [Postgresql](https://www.postgresql.org/docs/)
- **Authentication**: [PassportJS](https://www.passportjs.org/docs/) + JWT
- **Architecture Pattern**: Repository Pattern

---

## Roles

- admin
- user

---

### Credentials (for development)

1. user

```
{
    "email": "user@gmail.com",
    "password": "Nn14@abc"
}
```
---

## Things to know

1. Repository name (i.e service name) with TypeOrm prefix means that this is the table entity. And service names without TypeOrm prefix means that it contains db logic (normally quries).

2. Always store time in utc.
