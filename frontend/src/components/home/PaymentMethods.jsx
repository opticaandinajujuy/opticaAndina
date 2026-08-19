import { motion } from 'framer-motion';
import { CreditCard, Banknote } from 'lucide-react';

function PaymentMethods() {
  return (
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
  );
}

export default PaymentMethods;
