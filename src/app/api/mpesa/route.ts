import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getDarajaToken(): Promise<string> {
  const key = process.env.MPESA_CONSUMER_KEY!;
  const secret = process.env.MPESA_CONSUMER_SECRET!;
  const credentials = Buffer.from(`${key}:${secret}`).toString("base64");

  const res = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${credentials}` } }
  );
  const data = await res.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "TENANT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { phone, amount, leaseId } = await request.json();

  if (!phone || !amount || !leaseId) {
    return NextResponse.json({ error: "phone, amount and leaseId are required" }, { status: 400 });
  }

  try {
    const token = await getDarajaToken();
    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    const stkRes = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Math.round(amount),
          PartyA: phone.replace(/\s+/g, "").replace(/^\+/, ""),
          PartyB: shortcode,
          PhoneNumber: phone.replace(/\s+/g, "").replace(/^\+/, ""),
          CallBackURL: `${process.env.NEXTAUTH_URL}/api/mpesa/callback`,
          AccountReference: `EMALINK-${leaseId.slice(0, 8).toUpperCase()}`,
          TransactionDesc: "Rent Payment",
        }),
      }
    );

    const stkData = await stkRes.json();

    if (stkData.ResponseCode !== "0") {
      return NextResponse.json({ error: stkData.errorMessage || "STK push failed" }, { status: 400 });
    }

    // Create a pending payment record
    const tenant = await prisma.tenant.findUnique({ where: { userId: session.user.id } });
    if (tenant) {
      await prisma.payment.create({
        data: {
          amount,
          method: "MPESA",
          status: "PENDING",
          reference: stkData.CheckoutRequestID,
          dueDate: new Date(),
          tenantId: tenant.id,
          leaseId,
        },
      });
    }

    return NextResponse.json({ success: true, checkoutRequestId: stkData.CheckoutRequestID });
  } catch {
    return NextResponse.json({ error: "M-Pesa request failed" }, { status: 500 });
  }
}
