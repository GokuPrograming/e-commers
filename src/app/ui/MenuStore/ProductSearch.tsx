import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
}

// interface SearchProps {
//   products: Product[];
// }

// const ProductSearch: React.FC<SearchProps> = ({ products }) => {
  const ProductSearch: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

   // const results = products.filter(product =>
     // product.name.toLowerCase().includes(term.toLowerCase())
  //  );

    //setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
      />
      
      <ul>
        {searchResults.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;
