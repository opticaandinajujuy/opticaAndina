import { FileText, CheckCircle2, Circle } from 'lucide-react';

const typeLabels = {
  sol: 'Sol',
  contacto: 'Contacto',
  receta: 'Receta',
  otro: 'Otro',
};

function formatDate(value) {
  return new Date(value).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function QuoteTable({ quotes, onToggleStatus }) {
  if (quotes.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-sage-200 py-12 text-center text-sm text-sage-500">
        No hay consultas que coincidan con el filtro.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-sage-100">
      <table className="w-full text-left text-sm">
        <thead className="bg-sage-50 text-xs uppercase tracking-wide text-sage-500">
          <tr>
            <th className="px-4 py-3 font-medium">Contacto</th>
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 font-medium">Mensaje</th>
            <th className="px-4 py-3 font-medium">Fecha</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-sage-100">
          {quotes.map((quote) => (
            <tr key={quote._id} className="align-top transition hover:bg-sage-50/60">
              <td className="px-4 py-3">
                <p className="font-medium text-sage-800">{quote.name}</p>
                <p className="text-xs text-sage-500">{quote.phone}</p>
                <p className="text-xs text-sage-500">{quote.email}</p>
              </td>
              <td className="px-4 py-3 text-sage-600">
                {typeLabels[quote.consultationType] ?? 'Otro'}
              </td>
              <td className="max-w-xs px-4 py-3 text-sage-600">
                <p className="line-clamp-2">{quote.message}</p>
                {quote.recipeUrl && (
                  <a
                    href={quote.recipeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-sage-700 hover:text-sage-900"
                  >
                    <FileText size={12} /> Ver receta adjunta
                  </a>
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-sage-500">
                {formatDate(quote.createdAt)}
              </td>
              <td className="px-4 py-3">
                {quote.status === 'attended' ? (
                  <span className="rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700">
                    Atendido
                  </span>
                ) : (
                  <span className="rounded-full bg-mustard-100 px-2.5 py-1 text-xs font-medium text-mustard-700">
                    Pendiente
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onToggleStatus(quote)}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-sage-600 transition hover:bg-sage-100 hover:text-sage-900"
                >
                  {quote.status === 'attended' ? (
                    <>
                      <Circle size={14} /> Marcar pendiente
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} /> Marcar atendido
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuoteTable;
