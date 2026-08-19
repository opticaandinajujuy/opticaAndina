function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded-full bg-mustard-400 px-6 py-3 font-heading font-semibold text-sage-900 transition hover:bg-mustard-500 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
