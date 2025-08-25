
function AddProductCard({ onClick }) {
  return (
    <div className="add-product-card" onClick={onClick}>
      <div className="plus-icon">+</div>
      <p>Add New Product</p>
    </div>
  );
}

export default AddProductCard;