// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import ProductList from './components/product_item';
import ProductForm from './components/product_form';

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleProductSave = () => {
        setSelectedProduct(null);
        setRefresh(!refresh);
    };

    return (
        <div>
            <ProductList refresh={refresh} />
            <ProductForm product={selectedProduct} onSave={handleProductSave} />
        </div>
    );
};

export default App;
