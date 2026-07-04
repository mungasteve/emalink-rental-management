import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = body?.Body?.stkCallback;

    if (!result) return NextResponse.json({ ok: true });

    const checkoutRequestId = result.CheckoutRequestID;
    const resultCode = result.ResultCode;

    if (resultCode === 0) {
      const meta = result.CallbackMetadata?.Item || [];
      const get = (name: string) => meta.find((i: { Name: string }) => i.Name === name)?.Value;

      await prisma.payment.updateMany({
        where: { reference: checkoutRequestId },
        data: {
          status: "COMPLETED",
          transactionId: get("MpesaReceiptNumber"),
          paidAt: new Date(),
        },
      });
    } else {
      await prisma.payment.updateMany({
        where: { reference: checkoutRequestId },
        data: { status: "FAILED" },
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
