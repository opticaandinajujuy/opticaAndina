import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProducts } from '../../services/productService.js';
import { useProductStore } from '../../store/useProductStore.js';
import { fadeInUp, scrollViewport, staggerChildren } from '../../hooks/useScrollAnimation.js';
import ProductFilters from './ProductFilters.jsx';
import ProductSearch from './ProductSearch.jsx';
import ProductCard from './ProductCard.jsx';

const PAGE_SIZE = 12;

function ProductGrid() {
  const { products, category, search, setProducts, setCategory, setSearch } = useProductStore();
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const sectionRef = useRef(null);
  const isFirstRender = useRef(true);

  // al cambiar de página, volver siempre al techo del catálogo — evita que
  // una página más corta (la última) deje el scroll caído sobre la sección
  // siguiente. Corre en un efecto (no en el click) para no depender de que
  // React ya haya vuelto a renderizar.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  // debounce solo la búsqueda por texto, no la carga inicial ni los clicks
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // volver a la página 1 cuando cambia el filtro o la búsqueda
  useEffect(() => {
    setPage(1);
  }, [category, debouncedSearch]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setErrored(false);

    getProducts({
      activeOnly: 'true',
      category: category !== 'all' ? category : undefined,
      search: debouncedSearch || undefined,
      page,
      limit: PAGE_SIZE,
    })
      .then(({ data }) => {
        if (!active) return;
        setProducts(data?.items ?? []);
        setPages(data?.pages ?? 1);
        setTotal(data?.total ?? 0);
      })
      .catch(() => {
        if (active) setErrored(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [category, debouncedSearch, page, setProducts]);

  return (
    <section ref={sectionRef} id="catalogo" className="relative overflow-hidden px-6 py-20 md:px-8">
      <span className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap font-heading text-[13vw] font-extrabold leading-none text-sage-900/[0.035] md:block">
        CATÁLOGO
      </span>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={scrollViewport}
        variants={fadeInUp}
        className="relative mx-auto mb-12 flex max-w-6xl flex-col gap-6"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mustard-600">
            Catálogo
          </span>
          <h2 className="mt-2 font-heading text-4xl font-bold leading-tight text-sage-900 md:text-5xl">
            Encontrá tus próximos anteojos
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ProductFilters value={category} onChange={setCategory} layoutId="catalog-filter-pill" />
          <ProductSearch value={search} onChange={setSearch} />
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        {loading && (
          <p className="py-16 text-center text-sm text-sage-500">Cargando productos...</p>
        )}

        {!loading && errored && (
          <p className="py-16 text-center text-sm text-sage-500">
            No pudimos cargar el catálogo. Probá recargar la página.
          </p>
        )}

        {!loading && !errored && products.length === 0 && (
          <p className="py-16 text-center text-sm text-sage-500">
            No encontramos productos con ese criterio.
          </p>
        )}

        {!loading && !errored && products.length > 0 && (
          <>
            <motion.div
              key={page}
              initial="hidden"
              animate="show"
              variants={staggerChildren}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>

            {pages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sage-200 text-sage-600 transition-colors hover:border-sage-400 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={18} />
                </motion.button>

                <span className="text-sm font-medium text-sage-600">
                  Página {page} de {pages} · {total} productos
                </span>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  disabled={page === pages}
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sage-200 text-sage-600 transition-colors hover:border-sage-400 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Página siguiente"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
