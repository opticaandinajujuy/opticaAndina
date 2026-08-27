const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export function buildWhatsappLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildProductInquiryLink(productName) {
  return buildWhatsappLink(`Hola! Quisiera consultar por: ${productName}`);
}

export function buildWhatsappLinkTo(phone, message) {
  let digits = phone.replace(/\D/g, '');
  // wa.me necesita el número completo con código de país (54) + 9 para celulares
  // de Argentina; si el teléfono se guardó sin eso (ej: "381 3550986"), lo agrega.
  if (!digits.startsWith('54')) {
    digits = `549${digits}`;
  } else if (!digits.startsWith('549')) {
    digits = `549${digits.slice(2)}`;
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}
