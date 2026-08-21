import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Shop() {
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await fetch(`${API_URL}/api/shop`);

        if (!res.ok) {
          throw new Error("Failed to fetch shop");
        }

        const data = await res.json();

        setShopName(data.shopName);
      } catch (error) {
        console.error("SHOP ERROR:", error);
      }
    };

    fetchShop();
  }, []);

  return (
    <div>
      <h1>Shop name us </h1>
    </div>
  );
}

export default Shop;