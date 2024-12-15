// App.js
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// My CSS
import '../src/style.css';

// Components
import SingleProductView from "./Components/SingleProductView";
import TopHeader from '../src/Components/TopHeader';
import CartData from "./Components/CartData";

// Loader components and context
import { LoaderProvider, useLoader } from './common/LoaderContext';  // Import loader context
import Loader from './Components/Loader';  // Import the loader component

function App() {
  return (
    <LoaderProvider>
      <TopHeader />
      <GlobalLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Home />} />
        <Route path="/product/:id" element={<SingleProductView />} />
        <Route path="/cartdata" element={<CartData />} />
      </Routes>
    </LoaderProvider>
  );
}

// Component to display the loader based on the global loading state
function GlobalLoader() {
  const { loading } = useLoader();  // Access the loading state from the context
  return loading ? <Loader /> : null;  // Show the loader if loading is true
}

export default App;
