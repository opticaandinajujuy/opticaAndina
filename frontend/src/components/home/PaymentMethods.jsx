import { motion } from 'framer-motion';
import { CreditCard, Banknote } from 'lucide-react';

const cardLogos = [
  { name: 'Visa', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg', size: 'h-5' },
  { name: 'Mastercard', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg', size: 'h-5' },
  { name: 'Tarjeta Naranja', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Tarjeta_Naranja.png', size: 'h-9' },
  { name: 'Tarjeta Sol', url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Logo_Tarjeta_Sol.png', size: 'h-9' },
  { name: 'Sucrédito', url: 'https://www.tarjetasucredito.com.ar/images/logo.svg', size: 'h-5' },
  { name: 'Credimás', url: 'https://images.seeklogo.com/logo-png/3/1/credimas-logo-png_seeklogo-36507.png', size: 'h-9' },
];

function PaymentMethods() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex flex-1 items-center gap-3 rounded-xl border border-sage-100 bg-white px-4 py-3.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
            <CreditCard size={18} />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-sage-800">Tarjetas</p>
            <p className="text-xs text-sage-500">Débito y crédito</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex flex-1 items-center gap-3 rounded-xl border border-mustard-200 bg-mustard-50 px-4 py-3.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mustard-200 text-mustard-700">
            <Banknote size={18} />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-sage-800">Efectivo</p>
            <p className="text-xs text-mustard-700">Con descuento especial</p>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-sage-100 bg-white px-4 py-3.5">
        {cardLogos.map((card) => (
          <img
            key={card.name}
            src={card.url}
            alt={card.name}
            title={card.name}
            className={`${card.size} w-auto object-contain`}
          />
        ))}
      </div>
    </div>
  );
}

export default PaymentMethods;
