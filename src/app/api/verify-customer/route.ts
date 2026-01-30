import { NextRequest, NextResponse } from "next/server";

// Mock customer and order database for demonstration
// In production, this would be replaced with Prisma database queries
interface MockOrder {
  id: string;
  customerId: string;
  status: "pending" | "processing" | "completed" | "delivered" | "cancelled" | "fake" | "refunded";
  createdAt: Date;
  totalAmount: number;
}

interface MockCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

// Mock customer database
const mockCustomersDB: Record<string, MockCustomer> = {
  "cus-001": {
    id: "cus-001",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+216 98 765 432",
    createdAt: new Date("2023-01-15"),
  },
  "cus-002": {
    id: "cus-002",
    name: "فاطمة علي",
    email: "fatima@example.com",
    phone: "+216 97 654 321",
    createdAt: new Date("2023-06-20"),
  },
  "cus-003": {
    id: "cus-003",
    name: "محمود الكريم",
    email: "mahmoud@example.com",
    phone: "+216 96 543 210",
    createdAt: new Date("2023-03-10"),
  },
};

// Mock orders database
const mockOrdersDB: MockOrder[] = [
  // Ahmed's orders (14 delivered, 1 returned = 93% trust score)
  { id: "ord-001", customerId: "cus-001", status: "delivered", createdAt: new Date("2024-01-20"), totalAmount: 50 },
  { id: "ord-002", customerId: "cus-001", status: "delivered", createdAt: new Date("2024-01-18"), totalAmount: 75 },
  { id: "ord-003", customerId: "cus-001", status: "delivered", createdAt: new Date("2024-01-15"), totalAmount: 120 },
  { id: "ord-004", customerId: "cus-001", status: "delivered", createdAt: new Date("2024-01-10"), totalAmount: 90 },
  { id: "ord-005", customerId: "cus-001", status: "delivered", createdAt: new Date("2024-01-05"), totalAmount: 45 },
  { id: "ord-006", customerId: "cus-001", status: "delivered", createdAt: new Date("2023-12-25"), totalAmount: 200 },
  { id: "ord-007", customerId: "cus-001", status: "delivered", createdAt: new Date("2023-12-20"), totalAmount: 80 },
  { id: "ord-008", customerId: "cus-001", status: "delivered", createdAt: new Date("2023-12-15"), totalAmount: 95 },
  { id: "ord-009", customerId: "cus-001", status: "delivered", createdAt: new Date("2023-12-10"), totalAmount: 110 },
  { id: "ord-010", customerId: "cus-001", status: "delivered", createdAt: new Date("2023-12-05"), totalAmount: 65 },
  { id: "ord-011", customerId: "cus-001", status: "delivered", createdAt: new Date("2023-11-30"), totalAmount: 150 },
  { id: "ord-012", customerId: "cus-001", status: "delivered", createdAt: new Date("2023-11-25"), totalAmount: 100 },
  { id: "ord-013", customerId: "cus-001", status: "delivered", createdAt: new Date("2023-11-20"), totalAmount: 85 },
  { id: "ord-014", customerId: "cus-001", status: "delivered", createdAt: new Date("2023-11-15"), totalAmount: 70 },
  { id: "ord-015", customerId: "cus-001", status: "refunded", createdAt: new Date("2023-11-10"), totalAmount: 55 },

  // Fatima's orders (6 delivered, 1 returned, 1 cancelled = 75% trust score)
  { id: "ord-016", customerId: "cus-002", status: "delivered", createdAt: new Date("2024-01-12"), totalAmount: 60 },
  { id: "ord-017", customerId: "cus-002", status: "delivered", createdAt: new Date("2024-01-08"), totalAmount: 90 },
  { id: "ord-018", customerId: "cus-002", status: "delivered", createdAt: new Date("2024-01-02"), totalAmount: 75 },
  { id: "ord-019", customerId: "cus-002", status: "delivered", createdAt: new Date("2023-12-28"), totalAmount: 110 },
  { id: "ord-020", customerId: "cus-002", status: "delivered", createdAt: new Date("2023-12-20"), totalAmount: 85 },
  { id: "ord-021", customerId: "cus-002", status: "delivered", createdAt: new Date("2023-12-10"), totalAmount: 95 },
  { id: "ord-022", customerId: "cus-002", status: "refunded", createdAt: new Date("2023-12-01"), totalAmount: 50 },
  { id: "ord-023", customerId: "cus-002", status: "cancelled", createdAt: new Date("2023-11-25"), totalAmount: 70 },

  // Mahmoud's orders (1 delivered, 2 returned, 2 cancelled = 20% trust score / HIGH RISK)
  { id: "ord-024", customerId: "cus-003", status: "delivered", createdAt: new Date("2024-01-10"), totalAmount: 80 },
  { id: "ord-025", customerId: "cus-003", status: "refunded", createdAt: new Date("2024-01-05"), totalAmount: 60 },
  { id: "ord-026", customerId: "cus-003", status: "fake", createdAt: new Date("2024-01-01"), totalAmount: 100 },
  { id: "ord-027", customerId: "cus-003", status: "cancelled", createdAt: new Date("2023-12-25"), totalAmount: 75 },
  { id: "ord-028", customerId: "cus-003", status: "cancelled", createdAt: new Date("2023-12-15"), totalAmount: 50 },
];

/**
 * Validation helper: Check if phone number is a valid Tunisian format
 * Accepts: 8-digit Tunisian mobile (e.g., 98765432)
 * or full format with country code (e.g., +216 98765432)
 */
function isValidTunisianPhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Check: 8 digits (local format) or 10 digits starting with 216 (Tunisia country code)
  if (cleaned.length === 8) {
    return /^\d{8}$/.test(cleaned);
  }

  if (cleaned.length === 10 && cleaned.startsWith("216")) {
    return /^216\d{8}$/.test(cleaned);
  }

  return false;
}

/**
 * Validation helper: Check if email is valid
 * Basic email validation regex
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Calculate trust score based on order history
 * Algorithm:
 * - +20 points for each delivered order
 * - -30 points for each cancelled or fake order
 * - Max score: 100, Min score: 0
 */
function calculateTrustScore(
  deliveredCount: number,
  cancelledCount: number
): number {
  const positivePoints = deliveredCount * 20;
  const negativePoints = cancelledCount * 30;

  const rawScore = positivePoints - negativePoints;

  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, rawScore));
}

/**
 * Determine risk level based on trust score
 * and provide recommendation
 */
function getRiskLevelAndRecommendation(
  trustScore: number,
  totalOrders: number,
  cancelledCount: number
): { riskLevel: "safe" | "neutral" | "dangerous"; recommendation: string } {
  // Safe: High trust score
  if (trustScore >= 80) {
    return {
      riskLevel: "safe",
      recommendation: "Safe to ship - Customer has excellent delivery history",
    };
  }

  // Dangerous: Multiple cancelled orders (3+)
  if (cancelledCount >= 3) {
    return {
      riskLevel: "dangerous",
      recommendation: "Call customer first - Multiple cancelled orders detected",
    };
  }

  // Neutral: Mixed history
  if (trustScore >= 50) {
    return {
      riskLevel: "neutral",
      recommendation: "Verify before shipping - Customer has mixed order history",
    };
  }

  // Dangerous: Low trust score
  return {
    riskLevel: "dangerous",
    recommendation:
      "High risk - Consider calling customer before processing order",
  };
}

/**
 * POST /api/verify-customer
 * 
 * Request body:
 * {
 *   "phoneNumber": "98765432", // Optional: Tunisian phone (8 digits)
 *   "email": "customer@example.com" // Optional: Email address
 * }
 * 
 * Response:
 * {
 *   "status": "success" | "error",
 *   "data": {
 *     "trustScore": 85,
 *     "riskLevel": "safe" | "neutral" | "dangerous",
 *     "totalOrders": 10,
 *     "deliveredCount": 9,
 *     "cancelledCount": 1,
 *     "recommendation": "Safe to ship..."
 *   },
 *   "error": "Error message if status is error"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, email } = body;

    // Input validation: Must provide either phone or email
    if (!phoneNumber && !email) {
      return NextResponse.json(
        {
          status: "error",
          error: "Please provide either a phone number or email address",
        },
        { status: 400 }
      );
    }

    // Validate phone number format if provided
    if (phoneNumber && !isValidTunisianPhone(phoneNumber)) {
      return NextResponse.json(
        {
          status: "error",
          error:
            "Invalid phone number. Please provide a valid 8-digit Tunisian phone number (e.g., 98765432)",
        },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        {
          status: "error",
          error: "Invalid email address format",
        },
        { status: 400 }
      );
    }

    // Search for customer in mock database
    let customer: MockCustomer | null = null;

    if (email) {
      // Case-insensitive email search
      const emailLower = email.toLowerCase();
      customer =
        Object.values(mockCustomersDB).find(
          (c) => c.email.toLowerCase() === emailLower
        ) || null;
    } else if (phoneNumber) {
      // Normalize phone number: remove all non-digits, take last 8 digits
      const cleanedPhone = phoneNumber.replace(/\D/g, "").slice(-8);

      // Search for phone number in customer records
      customer =
        Object.values(mockCustomersDB).find((c) =>
          c.phone.includes(cleanedPhone)
        ) || null;
    }

    // Customer not found
    if (!customer) {
      return NextResponse.json(
        {
          status: "error",
          error: "No customer found with the provided contact information",
        },
        { status: 404 }
      );
    }

    // Get all orders for the customer
    const customerOrders = mockOrdersDB.filter(
      (order) => order.customerId === customer.id
    );

    // Count orders by status
    const deliveredCount = customerOrders.filter(
      (order) =>
        order.status.toLowerCase() === "completed" ||
        order.status.toLowerCase() === "delivered"
    ).length;

    const cancelledCount = customerOrders.filter(
      (order) =>
        order.status.toLowerCase() === "cancelled" ||
        order.status.toLowerCase() === "fake" ||
        order.status.toLowerCase() === "refunded"
    ).length;

    const totalOrders = customerOrders.length;

    // Calculate trust score
    const trustScore = calculateTrustScore(deliveredCount, cancelledCount);

    // Get risk level and recommendation
    const { riskLevel, recommendation } = getRiskLevelAndRecommendation(
      trustScore,
      totalOrders,
      cancelledCount
    );

    // Return success response
    return NextResponse.json({
      status: "success",
      data: {
        customerId: customer.id,
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone,
        trustScore,
        riskLevel,
        totalOrders,
        deliveredCount,
        cancelledCount,
        returnedCount: totalOrders - deliveredCount - cancelledCount,
        recommendation,
        lastOrderDate:
          customerOrders.length > 0
            ? customerOrders[0].createdAt
            : customer.createdAt,
      },
    });
  } catch (error) {
    // Log error for debugging
    console.error("Verify customer API error:", error);

    // Check for specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          status: "error",
          error: "Invalid request body format",
        },
        { status: 400 }
      );
    }

    // Generic server error
    return NextResponse.json(
      {
        status: "error",
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/verify-customer
 * Returns API documentation and available endpoints
 */
export async function GET() {
  return NextResponse.json({
    status: "info",
    message: "Verocom Customer Verification API",
    endpoint: "POST /api/verify-customer",
    description: "Verify customer trust score and order history",
    requestBody: {
      phoneNumber: "string (optional) - 8-digit Tunisian phone number",
      email: "string (optional) - Customer email address",
    },
    responseExample: {
      status: "success",
      data: {
        customerId: "cus_123456",
        customerName: "Ahmed Mohamed",
        email: "ahmed@example.com",
        phone: "+216 98 765 432",
        trustScore: 85,
        riskLevel: "safe",
        totalOrders: 10,
        deliveredCount: 9,
        cancelledCount: 1,
        returnedCount: 0,
        recommendation: "Safe to ship - Customer has excellent delivery history",
        lastOrderDate: "2024-01-20T10:30:00Z",
      },
    },
    scoringAlgorithm: {
      deliveredOrder: "+20 points",
      cancelledOrder: "-30 points",
      maxScore: 100,
      minScore: 0,
    },
  });
}
