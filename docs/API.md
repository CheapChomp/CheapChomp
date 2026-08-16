# CheapChomp API Documentation

Base URL: `http://localhost:3000`

## GET /recipes

Search for recipes by ingredients.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `q` | string | Comma-separated list of ingredients to search for |

**Example:**

GET /recipes?q=chicken,rice,garlic

## GET /missing-ingredients

Get the ingredients missing from a recipe, given what the user already has.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `recipe_id` | string | ID of the recipe |
| `q` | string | Comma-separated list of ingredients the user already has |

**Example:**

GET /missing-ingredients?recipe_id=abc123&q=chicken,rice

## POST /price

Estimate the cost of a list of missing ingredients.

**Request body:**

```json
{
  "ingredients": ["soy sauce", "sake", "eggs"],
  "location": "Vancouver, British Columbia"
}
```

**Notes:**
- `location` is optional and defaults to `Toronto, Ontario` if not provided.
