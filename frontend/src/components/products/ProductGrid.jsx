import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProducts } from '../../services/productService.js';
import { useProductStore } from '../../store/useProductStore.js';
import { fadeInUp, scrollViewport, staggerChildren } from '../../hooks/useScrollAnimation.js';
import ProductFilters from './ProductFilters.jsx';
import ProductSearch from './ProductSearch.jsx';
import ProductCard from './ProductCard.jsx';

function ProductGrid() {
  const { products, category, search, setProducts, setCategory, setSearch } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setErrored(false);

    getProducts({ activeOnly: 'true' })
      .then(({ data }) => {
        if (active) setProducts(data);
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
  }, [setProducts]);

  const filtered = products.filter((p) => {
    const matchesCategory = category === 'all' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-6 py-20 md:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={scrollViewport}
        variants={fadeInUp}
        className="mb-10 flex flex-col gap-6"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-mustard-600">
            Catálogo
          </span>
          <h2 className="mt-1 font-heading text-3xl font-bold text-sage-900">
            Encontrá tus próximos lentes
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ProductFilters value={category} onChange={setCategory} />
          <ProductSearch value={search} onChange={setSearch} />
        </div>
      </motion.div>

      {loading && (
        <p className="py-16 text-center text-sm text-sage-500">Cargando productos...</p>
      )}

      {!loading && errored && (
        <p className="py-16 text-center text-sm text-sage-500">
          No pudimos cargar el catálogo. Probá recargar la página.
        </p>
      )}

      {!loading && !errored && filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-sage-500">
          No encontramos productos con ese criterio.
        </p>
      )}

      {!loading && !errored && filtered.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={staggerChildren}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4"
        >
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default ProductGrid;
