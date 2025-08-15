// client/app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Ще изпращаме винаги към този имейл
const TO = "vladigpasev@gmail.com";

// За DEV можеш да ползваш 'onboarding@resend.dev', но за продукция сложи
// домейн, верифициран в Resend (пример: "Wooden Statues <no-reply@yourdomain.com>")
const FROM = process.env.RESEND_FROM || "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let payload: any = {};

    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await req.formData();
      payload = Object.fromEntries(form.entries());
    } else {
      payload = (await req.json().catch(() => ({}))) || {};
    }

    // Разпознаване на тип форма
    const isOrder = "statue_name" in payload && "order_details" in payload;
    const isContact =
      "email" in payload && "name" in payload && !("order_details" in payload);

    // Валидация
    if (isOrder) {
      if (!payload.statue_name || !payload.phone || !payload.order_details) {
        return NextResponse.json(
          { ok: false, error: "Липсват задължителни полета." },
          { status: 400 }
        );
      }
    } else if (isContact) {
      if (!payload.name || !payload.phone || !payload.email) {
        return NextResponse.json(
          { ok: false, error: "Липсват задължителни полета." },
          { status: 400 }
        );
      }
    }

    const subject = isOrder
      ? `Нова заявка: ${payload.statue_name || "Статуетка"}`
      : `Запитване от ${payload.name || "посетител"} през сайта`;

    const html = isOrder
      ? `
        <div>
          <h2>Нова заявка от сайта</h2>
          <p><strong>Статуетка:</strong> ${escapeHtml(payload.statue_name)}</p>
          <p><strong>Телефон:</strong> ${escapeHtml(payload.phone || "")}</p>
          <p><strong>Детайли:</strong></p>
          <p>${escapeHtml(payload.order_details || "").replace(/\n/g, "<br/>")}</p>
        </div>
      `
      : `
        <div>
          <h2>Ново запитване от контактната форма</h2>
          <p><strong>Име:</strong> ${escapeHtml(payload.name || "")}</p>
          <p><strong>Телефон:</strong> ${escapeHtml(payload.phone || "")}</p>
          <p><strong>Имейл:</strong> ${escapeHtml(payload.email || "")}</p>
        </div>
      `;

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { ok: false, error: "Сървърна грешка при изпращане." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
