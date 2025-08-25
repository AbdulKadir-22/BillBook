// src/components/products/ProductCard.jsx


function ProductCard({ product, quantity, isSelected, onQuantityChange, onSelectionChange }) {
  const handleIncrease = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    // Allow quantity to go to 0, but not below
    if (quantity > 0) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  const handleCheckboxChange = (event) => {
    onSelectionChange(product.id, event.target.checked);
  };

  return (
    <div className="product-card">
      <input 
        type="checkbox" 
        checked={isSelected}
        onChange={handleCheckboxChange}
      /> 
      {/* Added a fallback image for products without a URL */}
      <img src={product.imageUrl || 'https://placehold.co/600x400/EEE/31343C?text=No+Image'} alt={product.name} />
      <p>{product.name.replace('<br>', ' ')}</p>
      <div className="controls">
        <button onClick={handleDecrease}>-</button>
        <span>${product.price} * {quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
    </div>
  );
}

export default ProductCard;
