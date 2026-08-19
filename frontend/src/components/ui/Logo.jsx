const LOGO_URL =
  'https://res.cloudinary.com/dabikk5ei/image/upload/v1787153553/logo_oge1xu.png';

function Logo({ className = 'h-10 w-10', withLabel = false, labelClassName = '' }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src={LOGO_URL} alt="Óptica Andina" className={`${className} object-contain`} />
      {withLabel && (
        <span className={`font-heading font-bold leading-none text-sage-800 ${labelClassName}`}>
          Óptica<span className="block text-mustard-600">Andina</span>
        </span>
      )}
    </span>
  );
}

export default Logo;
