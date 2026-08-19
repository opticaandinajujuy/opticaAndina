function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
      {children}
    </span>
  );
}

export default Badge;
