import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart';
import { CurrencyFormatPipe } from '../../pipes/currency-format-pipe';

const WHATSAPP_PHONE = '51915107935';

@Component({
  selector: 'app-cart-drawer',
  imports: [CurrencyFormatPipe],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
})
export class CartDrawer {
  protected readonly cart = inject(CartService);

  protected sendToWhatsApp(): void {
    const items = this.cart.items();
    if (!items.length) return;

    const fmt = (n: number) =>
      new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2,
      }).format(n);

    const lines = items.map((item, idx) => {
      const { name, price, oldPrice, quantity } = {
        name: item.product.name,
        price: item.product.price,
        oldPrice: item.product.oldPrice,
        quantity: item.quantity,
      };

      let line =
        `${idx + 1}. 🏷️ *${name}*\n` +
        `   💰 Precio actual: *${fmt(price)}*`;

      if (oldPrice && oldPrice > price) {
        const saving = oldPrice - price;
        line +=
          `\n   ~~Precio antes: ${fmt(oldPrice)}~~` +
          `\n   ✅ Ahorras: ${fmt(saving)}`;
      }

      line +=
        `\n   📦 Cantidad: ${quantity}` +
        `\n   💵 Subtotal: *${fmt(price * quantity)}*`;

      return line;
    });

    const totalSavings = items.reduce((acc, item) => {
      if (item.product.oldPrice && item.product.oldPrice > item.product.price) {
        return acc + (item.product.oldPrice - item.product.price) * item.quantity;
      }
      return acc;
    }, 0);

    const message =
      `🛒 *Pedido - STORE2026*\n` +
      `${'─'.repeat(32)}\n\n` +
      lines.join('\n\n') +
      `\n\n${'─'.repeat(32)}\n` +
      (totalSavings > 0
        ? `🎉 *Ahorro total: ${fmt(totalSavings)}*\n`
        : '') +
      `📦 *TOTAL a pagar: ${fmt(this.cart.totalPrice())}*\n` +
      `   (${this.cart.totalItems()} producto${this.cart.totalItems() !== 1 ? 's' : ''})\n` +
      `🚚 Envío: *GRATIS*\n\n` +
      `─────────────────────────────────\n` +
      `¡Hola! Deseo realizar este pedido. 😊`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
