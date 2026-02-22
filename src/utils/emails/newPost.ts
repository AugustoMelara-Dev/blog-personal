export interface PostEmailData {
  title: string;
  description: string;
  url: string;
  quote?: string;
  tags: string[];
  date: string;
}

export function newPostEmailHtml(post: PostEmailData): string {
  const tagBadges = post.tags
    .map(
      (tag) =>
        `<span style="display:inline-block;background:#1a1a1a;color:#a3a3a3;font-size:11px;padding:4px 10px;border-radius:4px;margin-right:6px;">#${tag}</span>`
    )
    .join('');

  const quoteBlock = post.quote
    ? `<tr><td style="padding:24px 0;">
        <div style="border-left:3px solid #a3e635;background:#111111;padding:16px 20px;border-radius:0 8px 8px 0;">
          <p style="margin:0;font-size:18px;color:#f5f5f5;font-style:italic;line-height:1.6;">"${post.quote}"</p>
        </div>
      </td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${post.title}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding-bottom:40px;border-bottom:1px solid #1f1f1f;">
          <span style="font-size:24px;font-weight:900;color:#f5f5f5;">Vito</span><span style="font-size:24px;font-weight:900;color:#a3e635;">Cipher</span>
        </td></tr>
        <tr><td style="padding:48px 0 16px;">
          <p style="margin:0 0 8px;font-size:11px;color:#525252;text-transform:uppercase;letter-spacing:0.2em;">Nueva entrada</p>
          <p style="margin:0;font-size:13px;color:#525252;">Publicado el ${post.date}</p>
        </td></tr>
        ${quoteBlock}
        <tr><td style="padding:24px 0 16px;">
          <h1 style="margin:0 0 16px;font-size:32px;font-weight:900;color:#f5f5f5;line-height:1.15;">${post.title}</h1>
          <p style="margin:0 0 20px;font-size:16px;color:#737373;line-height:1.8;">${post.description}</p>
          <div style="margin-bottom:24px;">${tagBadges}</div>
        </td></tr>
        <tr><td style="padding-bottom:48px;text-align:center;">
          <a href="${post.url}" style="display:inline-block;background:#a3e635;color:#0a0a0a;font-size:14px;font-weight:700;padding:14px 32px;border-radius:6px;text-decoration:none;">Leer ahora →</a>
        </td></tr>
        <tr><td style="padding-top:32px;border-top:1px solid #1f1f1f;">
          <p style="margin:0;font-size:12px;color:#2a2a2a;line-height:1.8;">Recibiste este email porque te suscribiste en VitoCipher.vercel.app<br/><a href="#" style="color:#525252;">Cancelar suscripción</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
