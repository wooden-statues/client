// client/app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const TO = process.env.RESEND_TO;
const FROM = process.env.RESEND_FROM || "onboarding@resend.dev";

type OrderPayload = {
  statue_name: string;
  phone: string;
  order_details: string;
};

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
};

type Payload = Partial<OrderPayload & ContactPayload>;

function asRecord(v: unknown): Record<string, unknown> {
  return typeof v === "object" && v !== null ? (v as Record<string, unknown>) : {};
}

function toOptionalString(v: unknown): string | undefined {
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return undefined;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

async function parsePayload(req: NextRequest): Promise<Payload> {
  const contentType = req.headers.get("content-type") || "";

  // JSON
  if (contentType.includes("application/json")) {
    const body: unknown = await req.json().catch(() => ({}));
    const o = asRecord(body);
    return {
      name: toOptionalString(o.name),
      phone: toOptionalString(o.phone),
      email: toOptionalString(o.email),
      statue_name: toOptionalString(o.statue_name),
      order_details: toOptionalString(o.order_details),
    };
  }

  // URL-encoded / multipart
  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await req.formData();
    const get = (key: string) => {
      const v = form.get(key);
      return v == null ? undefined : String(v);
    };
    return {
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      statue_name: get("statue_name"),
      order_details: get("order_details"),
    };
  }

  // Fallback: try JSON
  const body: unknown = await req.json().catch(() => ({}));
  const o = asRecord(body);
  return {
    name: toOptionalString(o.name),
    phone: toOptionalString(o.phone),
    email: toOptionalString(o.email),
    statue_name: toOptionalString(o.statue_name),
    order_details: toOptionalString(o.order_details),
  };
}

export async function POST(req: NextRequest) {
  try {
    const payload = await parsePayload(req);

    // Разпознаване на тип форма
    const isOrder = "statue_name" in payload || "order_details" in payload;
    const isContact = "email" in payload || "name" in payload;

    // Валидация
    if (isOrder) {
      if (
        !isNonEmptyString(payload.statue_name) ||
        !isNonEmptyString(payload.phone) ||
        !isNonEmptyString(payload.order_details)
      ) {
        return NextResponse.json(
          { ok: false, error: "Липсват задължителни полета." },
          { status: 400 }
        );
      }
    } else if (isContact) {
      if (
        !isNonEmptyString(payload.name) ||
        !isNonEmptyString(payload.phone) ||
        !isNonEmptyString(payload.email)
      ) {
        return NextResponse.json(
          { ok: false, error: "Липсват задължителни полета." },
          { status: 400 }
        );
      }
    }

    const subject = isOrder
      ? `Нова заявка: ${payload.statue_name ?? "Статуетка"}`
      : `Запитване от ${payload.name ?? "посетител"} през сайта`;

    const html = isOrder
      ? `
        <div>
          <h2>Нова заявка от сайта</h2>
          <p><strong>Статуетка:</strong> ${escapeHtml(payload.statue_name ?? "")}</p>
          <p><strong>Телефон:</strong> ${escapeHtml(payload.phone ?? "")}</p>
          <p><strong>Детайли:</strong></p>
          <p>${escapeHtml(payload.order_details ?? "").replace(/\n/g, "<br/>")}</p>
        </div>
      `
      : `
        <div>
          <h2>Ново запитване от контактната форма</h2>
          <p><strong>Име:</strong> ${escapeHtml(payload.name ?? "")}</p>
          <p><strong>Телефон:</strong> ${escapeHtml(payload.phone ?? "")}</p>
          <p><strong>Имейл:</strong> ${escapeHtml(payload.email ?? "")}</p>
        </div>
      `;

    if (!TO) {
      return NextResponse.json(
        { ok: false, error: "RESEND_TO is not configured." },
        { status: 500 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
    });

    if (error) {
      // Библиотеката връща структуриран error; държим типа неизвестен
      // и логваме безопасно:
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err: unknown) {
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
