const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-card border border-border rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;
