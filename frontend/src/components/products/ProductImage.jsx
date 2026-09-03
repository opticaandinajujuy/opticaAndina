import { useWhiteBackground } from '../../hooks/useWhiteBackground.js';

function ProductImage({ src, alt, className = '', containPadding = '', ...props }) {
  const isWhite = useWhiteBackground(src);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${isWhite ? `object-contain ${containPadding}` : 'object-cover'}`}
      {...props}
    />
  );
}

export default ProductImage;
