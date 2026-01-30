# Verocom Customer Verification API

## Overview
The Customer Verification API endpoint provides a robust system for verifying customer trust scores and order histories. It calculates a risk-based rating (0-100) to help store owners make informed shipping decisions.

---

## Endpoint Details

### `POST /api/verify-customer`

Verifies a customer's trust score based on their order history and provides shipping recommendations.

#### Request Body

```json
{
  "phoneNumber": "98765432",     // Optional: 8-digit Tunisian phone number
  "email": "customer@example.com" // Optional: Customer email address
}
```

**At least one identifier (phone or email) must be provided.**

#### Request Examples

**By Phone Number:**
```bash
curl -X POST http://localhost:3000/api/verify-customer \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "98765432"}'
```

**By Email:**
```bash
curl -X POST http://localhost:3000/api/verify-customer \
  -H "Content-Type: application/json" \
  -d '{"email": "ahmed@example.com"}'
```

---

## Response Format

### Success Response (200 OK)

```json
{
  "status": "success",
  "data": {
    "customerId": "cus-001",
    "customerName": "أحمد محمد",
    "email": "ahmed@example.com",
    "phone": "+216 98 765 432",
    "trustScore": 93,
    "riskLevel": "safe",
    "totalOrders": 15,
    "deliveredCount": 14,
    "cancelledCount": 1,
    "returnedCount": 0,
    "recommendation": "Safe to ship - Customer has excellent delivery history",
    "lastOrderDate": "2024-01-20T10:30:00Z"
  }
}
```

### Error Responses

#### 400 - Bad Request

**Missing both identifiers:**
```json
{
  "status": "error",
  "error": "Please provide either a phone number or email address"
}
```

**Invalid phone number:**
```json
{
  "status": "error",
  "error": "Invalid phone number. Please provide a valid 8-digit Tunisian phone number (e.g., 98765432)"
}
```

**Invalid email:**
```json
{
  "status": "error",
  "error": "Invalid email address format"
}
```

#### 404 - Not Found

```json
{
  "status": "error",
  "error": "No customer found with the provided contact information"
}
```

#### 500 - Server Error

```json
{
  "status": "error",
  "error": "Internal server error. Please try again later."
}
```

---

## Scoring Algorithm

### Trust Score Calculation

The trust score is calculated on a scale of **0-100** based on order history:

- **+20 points** for each successfully delivered order
- **-30 points** for each cancelled, fake, or refunded order
- **Final score is clamped** between 0 (minimum) and 100 (maximum)

### Formula
```
trustScore = max(0, min(100, (deliveredCount × 20) - (cancelledCount × 30)))
```

### Example Calculations

| Delivered | Cancelled | Score | Risk Level |
|-----------|-----------|-------|-----------|
| 14        | 1         | 93%   | 🟢 Safe |
| 6         | 2         | 60%   | 🟠 Neutral |
| 1         | 2         | 0%    | 🔴 Dangerous |
| 5         | 0         | 100%  | 🟢 Safe |
| 0         | 1         | 0%    | 🔴 Dangerous |

---

## Risk Levels & Recommendations

### 🟢 Safe (Trust Score ≥ 80)
**Recommendation:** "Safe to ship - Customer has excellent delivery history"
- ✅ Proceed with shipping
- ✅ No additional verification needed
- ✅ Customer is verified buyer

### 🟠 Neutral (Trust Score 50-79)
**Recommendation:** "Verify before shipping - Customer has mixed order history"
- ⚠️ Review order details before shipping
- ⚠️ Consider contacting customer for confirmation
- ⚠️ Monitor order closely

### 🔴 Dangerous (Trust Score < 50 OR 3+ Cancelled Orders)
**Recommendation:** "High risk - Consider calling customer before processing order"
- ❌ Call customer before shipping
- ❌ Request payment confirmation
- ❌ Consider COD (Cash on Delivery) option
- ❌ High risk of chargeback/return

---

## Input Validation

### Phone Number Validation
- Accepts 8-digit Tunisian mobile numbers (local format)
- Accepts international format: +216 followed by 8 digits
- Examples of valid inputs:
  - `98765432` ✅
  - `+216 98765432` ✅
  - `+21698765432` ✅
  - `+216-98-765-432` ✅
  - `9876543` ❌ (too short)
  - `98765432123` ❌ (too long)

### Email Validation
- Standard email format validation
- Maximum 254 characters
- Examples:
  - `customer@example.com` ✅
  - `invalid.email` ❌
  - `user@` ❌

---

## Security Features

### SQL Injection Prevention
- No direct SQL queries - uses parameterized database queries
- Input validation and sanitization
- Case-insensitive comparisons using safe methods

### Rate Limiting (Future Enhancement)
- Consider implementing rate limiting: max 100 requests per minute per IP
- Prevents abuse and scanning attempts

### Data Privacy
- PII (Personally Identifiable Information) is returned only for authorized requests
- Customer phone/email are masked in certain contexts in production

---

## Mock Data for Testing

The API includes pre-loaded mock data for testing:

### Test Customers:

**1. Ahmed Muhammad (Safe Buyer)**
- Phone: `98765432`
- Email: `ahmed@example.com`
- Trust Score: 93%
- Orders: 15 delivered, 1 returned

**2. Fatima Ali (Neutral Buyer)**
- Phone: `97654321`
- Email: `fatima@example.com`
- Trust Score: 75%
- Orders: 6 delivered, 2 cancelled/returned

**3. Mahmoud Alkrim (High Risk)**
- Phone: `96543210`
- Email: `mahmoud@example.com`
- Trust Score: 20%
- Orders: 1 delivered, 4 cancelled/fake

---

## Usage Examples

### Example 1: Verify Safe Customer

**Request:**
```bash
POST /api/verify-customer
Content-Type: application/json

{
  "phoneNumber": "98765432"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "customerId": "cus-001",
    "customerName": "أحمد محمد",
    "trustScore": 93,
    "riskLevel": "safe",
    "totalOrders": 15,
    "deliveredCount": 14,
    "cancelledCount": 1,
    "recommendation": "Safe to ship - Customer has excellent delivery history"
  }
}
```

### Example 2: Verify High-Risk Customer

**Request:**
```bash
POST /api/verify-customer
Content-Type: application/json

{
  "phoneNumber": "96543210"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "customerId": "cus-003",
    "customerName": "محمود الكريم",
    "trustScore": 20,
    "riskLevel": "dangerous",
    "totalOrders": 5,
    "deliveredCount": 1,
    "cancelledCount": 4,
    "recommendation": "High risk - Consider calling customer before processing order"
  }
}
```

### Example 3: Customer Not Found

**Request:**
```bash
POST /api/verify-customer
Content-Type: application/json

{
  "email": "unknown@example.com"
}
```

**Response (404):**
```json
{
  "status": "error",
  "error": "No customer found with the provided contact information"
}
```

---

## Integration with Frontend

### React Component Integration

```typescript
async function verifyCustomer(phoneNumber: string) {
  try {
    const response = await fetch('/api/verify-customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    const data = await response.json();
    
    if (data.status === 'success') {
      // Display customer info and recommendation
      console.log(`Trust Score: ${data.data.trustScore}`);
      console.log(`Recommendation: ${data.data.recommendation}`);
    }
  } catch (error) {
    console.error('Verification failed:', error);
  }
}
```

---

## Production Deployment Considerations

### Database Integration (Prisma)
The current implementation uses mock data. For production:

1. **Configure Prisma:**
   - Update `prisma/schema.prisma` with your database provider
   - Run `npx prisma migrate dev` to sync database
   - Generate Prisma client: `npx prisma generate`

2. **Replace mock data:**
   - Remove the mock database (`mockCustomersDB`, `mockOrdersDB`)
   - Replace with Prisma queries in the POST handler

3. **Add indexes for performance:**
   ```prisma
   model Customer {
     // ... fields
     @@index([email])
     @@index([phone])
     @@index([storeId])
   }
   ```

### Caching Strategy
- Cache customer verification results for 5-10 minutes
- Use Redis or Next.js built-in caching
- Invalidate cache when order status changes

### Monitoring & Logging
- Log all API requests and responses
- Monitor for suspicious patterns (repeated verification attempts)
- Alert on unusual risk level patterns

---

## API Information Endpoint

### `GET /api/verify-customer`

Returns API documentation and available endpoints.

**Response:**
```json
{
  "status": "info",
  "message": "Verocom Customer Verification API",
  "endpoint": "POST /api/verify-customer",
  "description": "Verify customer trust score and order history",
  "requestBody": {
    "phoneNumber": "string (optional) - 8-digit Tunisian phone number",
    "email": "string (optional) - Customer email address"
  },
  "scoringAlgorithm": {
    "deliveredOrder": "+20 points",
    "cancelledOrder": "-30 points",
    "maxScore": 100,
    "minScore": 0
  }
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01-25 | Initial API release with mock data |
| Future | TBD | Prisma database integration |
| Future | TBD | Rate limiting & API key authentication |
| Future | TBD | Advanced fraud detection algorithms |

---

## Support & Questions

For issues or questions about the API:
- Check the mock data section for test credentials
- Review error messages for validation issues
- Ensure request body is valid JSON
- Contact technical support for Prisma integration help
