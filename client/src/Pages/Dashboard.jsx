import React, { useState, useMemo } from 'react';
// Assuming ProductCard component exists and is correctly imported
import ProductCard from '../components/ProductCard'; 
import '../styles/Dashboard.css';


const initialProducts = [
  { id: 1, name: 'Chocolate filled croissants', price: 50, imageUrl: 'https://i.pinimg.com/736x/fe/23/f7/fe23f70424c566c4266c07120125a7f9.jpg' },
  { id: 2, name: '500 gm Chocolate Cake', price: 500, imageUrl: 'https://i.pinimg.com/736x/32/9e/77/329e7773d2281ed45dfd435fee21ef3a.jpg' },
  { id: 3, name: 'Chocolate Paestry', price: 75, imageUrl: 'https://i.pinimg.com/736x/d7/ff/8b/d7ff8b6ca2b5860d100243a9f9b2bb6b.jpg' },
  { id: 4, name: 'Brownie Chocolate', price: 80, imageUrl: 'https://i.pinimg.com/736x/1a/96/75/1a96756708f1423ccaf833b888643403.jpg' },
  { id: 5, name: 'Wallnut Kernels', price: 200, imageUrl: 'https://i.pinimg.com/736x/2e/3a/e4/2e3ae414d3f98f94b782b1a4cdca0672.jpg' },
  { id: 6, name: 'Light & Right', price: 40, imageUrl: 'https://i.pinimg.com/736x/6c/5a/a1/6c5aa1ca6ce0b12b5d73eaf8b5a9d0b2.jpg' },
  { id: 7, name: 'Soul Cream Lays', price: 20, imageUrl: 'https://i.pinimg.com/736x/95/22/fa/9522fa6324f930d361768a69e32c078f.jpg' },
];

function Dashboard() {
  const [products] = useState(initialProducts);
  // State to hold the quantity for each product { productId: quantity }
  const [cart, setCart] = useState({});
  // NEW: State to track which products are selected via checkbox
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  // This function just updates the quantity of a product
  const handleQuantityChange = (productId, newQuantity) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: newQuantity >= 0 ? newQuantity : 0,
    }));
  };

  // NEW: This function handles the checkbox selection
  const handleSelectionChange = (productId, isChecked) => {
    setSelectedProducts(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (isChecked) {
        newSelected.add(productId);
        // If item is selected and has no quantity, default to 1
        if (!cart[productId] || cart[productId] === 0) {
          handleQuantityChange(productId, 1);
        }
      } else {
        newSelected.delete(productId);
      }
      return newSelected;
    });
  };
  
  // UPDATED: This now calculates totals based ONLY on selected products
  const { totalItems, billAmount } = useMemo(() => {
    let items = 0;
    let amount = 0;
    // Iterate over the Set of selected product IDs
    selectedProducts.forEach(productId => {
      const quantity = cart[productId] || 0;
      const product = products.find(p => p.id === productId);
      if (product && quantity > 0) {
        items += quantity;
        amount += product.price * quantity;
      }
    });
    return { totalItems: items, billAmount: amount };
  }, [cart, selectedProducts, products]); // Dependencies now include selectedProducts

  const handlePrintInvoice = () => {
    const invoiceItems = Array.from(selectedProducts).map(id => ({
        id,
        quantity: cart[id],
        name: products.find(p => p.id === id)?.name,
        price: products.find(p => p.id === id)?.price,
    }));
    console.log("Finalizing sale:", { items: invoiceItems, totalItems, billAmount });
    alert(`Invoice for ${totalItems} items, total amount: $${billAmount}`);
  };

  return (
    <div className="main-content">
      <div className="header">
        <div><strong>5 Star Bakery</strong></div>
        <div>zeron@123</div>
        <div>@5star_bakery</div>
        <button className="print-btn" onClick={handlePrintInvoice}>Print Invoice</button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cart[product.id] || 0}
            // Pass down selection state and handler to the card
            isSelected={selectedProducts.has(product.id)}
            onQuantityChange={handleQuantityChange}
            onSelectionChange={handleSelectionChange}
          />
        ))}
      </div>

      <div className="footer-bar">
        <span>Total Items: {totalItems}</span>
        <span>Bill Amount: ${billAmount.toFixed(2)}</span>
        <button className="details-btn">See Details</button>
      </div>
    </div>
  );
}

export default Dashboard;
