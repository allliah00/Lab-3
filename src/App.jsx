import { useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

useEffect(() => {
  const timer = setTimeout(() => {
    debouncedSearch.trim();
  }, 300);
  return () => clearTimeout(timer);
}, [searchText]);

  const handleAddToCart = (title) => {
    setCount(count + 1);
    setLastAdded(title);
  };

  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  const filteredProducts = [...products]
    .filter((p) => p.title.toLowerCase().includes(searchText.trim().toLowerCase()))
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="app">
      <h1>CvSU Mini Store</h1>

      <p className="cart-message">
        {count === 0
          ? "Your cart is empty."
          : `Items added to cart: ${count} (Last added: ${lastAdded})`}
      </p>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClear}
      />

      <div className="grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
            onAddToCart={handleAddToCart}
          >
            {product.badge && (
              <span className={`badge ${product.badge.toLowerCase()}`}>
                {product.badge}
              </span>
            )}
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default App;
