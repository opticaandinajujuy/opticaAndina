function Logo({ className = 'h-10 w-10', withLabel = false, labelClassName = '' }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Óptica Andina">
        <circle cx="32" cy="32" r="31" fill="#dcae48" />
        <circle cx="32" cy="32" r="24.5" fill="#faf8f3" />
        <path
          d="M14 40.5 L24 24 L30.5 34.5 L35 28 L50 40.5 Z"
          fill="#4f6b58"
        />
        <path
          d="M24 24 L30.5 34.5 L27 34.5 L22.5 27.5 Z"
          fill="#33473a"
          opacity="0.55"
        />
        <path
          d="M35 28 L50 40.5 L43.5 40.5 L37.5 32.5 Z"
          fill="#33473a"
          opacity="0.4"
        />
      </svg>
      {withLabel && (
        <span className={`font-heading font-bold leading-none text-sage-800 ${labelClassName}`}>
          Óptica<span className="block text-mustard-600">Andina</span>
        </span>
      )}
    </span>
  );
}

export default Logo;
