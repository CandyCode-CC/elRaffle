import React, { useEffect, useState } from 'react';
import Product from "../components/Product";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const App = () => {
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
    <div className="button-container">
      <WalletMultiButton className="cta-button connect-wallet-button" />
    </div>
  );
  
  const renderItemBuyContainer = () => (
    <div className="middle-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );


  return (
    <div className="App">

      <nav>
        <ul>
          <li><a href="">Raffles</a></li>
          <li><a href="/history">History</a></li>
          <li><a href="/nft">NFT</a></li>
        </ul>
        {publicKey ? renderNotConnectedContainer() : renderNotConnectedContainer()}
      </nav>

      <div className="container">

        <main>

          {publicKey ? renderItemBuyContainer() : null }

        </main>
      </div>
    </div>
  );
};

export default App;