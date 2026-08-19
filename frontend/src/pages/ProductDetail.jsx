import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { getProductById } from '../services/productService.js';
import { formatPrice } from '../lib/utils.js';
import { buildProductInquiryLink } from '../lib/whatsapp.js';

const categoryLabels = {
  sol: 'Lentes de sol',
  contacto: 'Lentes de contacto',
  receta: 'Lentes recetados',
};

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getProductById(id)
      .then(({ data }) => {
        setProduct(data);
        setActiveImage(0);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10 md:px-8">
        <Link
          to="/#catalogo"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-sage-600 hover:text-sage-900"
        >
          <ArrowLeft size={16} /> Volver al catálogo
        </Link>

        {loading && <p className="py-16 text-center text-sm text-sage-500">Cargando...</p>}

        {!loading && notFound && (
          <p className="py-16 text-center text-sm text-sage-500">
            No encontramos este producto.
          </p>
        )}

        {!loading && product && (
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="aspect-square overflow-hidden rounded-2xl bg-sage-50">
                {product.images?.[activeImage] ? (
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sage-300">
                    Sin imagen
                  </div>
                )}
              </div>
              {product.images?.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(i)}
                      className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${
                        i === activeImage ? 'border-sage-600' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-mustard-600">
                {categoryLabels[product.category]}
              </span>
              <h1 className="mt-1 font-heading text-2xl font-bold text-sage-900 md:text-3xl">
                {product.name}
              </h1>
              {product.price ? (
                <p className="mt-2 font-heading text-xl font-bold text-sage-800">
                  {formatPrice(product.price)}
                </p>
              ) : (
                <p className="mt-2 text-sm text-sage-400">Consultar precio</p>
              )}

              {product.description && (
                <p className="mt-4 text-sm leading-relaxed text-sage-600">
                  {product.description}
                </p>
              )}

              {product.measurements && (
                <div className="mt-6">
                  <h2 className="font-heading text-sm font-semibold text-sage-800">Medidas</h2>
                  <p className="mt-1 text-sm text-sage-600">{product.measurements}</p>
                </div>
              )}

              {product.features?.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-heading text-sm font-semibold text-sage-800">
                    Características
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-heading text-sm font-semibold text-sage-800">
                    Talles disponibles
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-sage-200 px-3 py-1.5 text-xs font-medium text-sage-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={buildProductInquiryLink(product.name)}
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-mustard-400 py-3.5 font-heading text-sm font-semibold text-sage-900 shadow-sm transition hover:bg-mustard-500"
              >
                <MessageCircle size={17} /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default ProductDetail;
