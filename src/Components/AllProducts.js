// Axios
import axios from 'axios';
import { useEffect, useState } from 'react';

// icon
import { IoMdStar } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../Redux/slice';
import { useLoader } from '../common/LoaderContext';


const AllProducts = () => {

    // Example API endpoints
    const apiUrl1 = 'https://dummyjson.com/products';
    const apiUrl2 = 'https://dummyjson.com/products/categories';

    // Function to make multiple API calls
    async function makeMultipleApiCalls() {
        try {
            // Make multiple requests in parallel
            await axios.all([
                axios.get(apiUrl1),
                axios.get(apiUrl2),
                // Add more API calls as needed
            ]);
        } catch (error) {
            console.error('Error making API calls:', error);
        }
    }

    // Call the function to make multiple API calls
    makeMultipleApiCalls();


    // --------------------------------------------------------
    const dispatch = useDispatch()

    // Search
    const searchData = useSelector((state) => state.dataSlice.searchProducts)

    const searchInputValue = useSelector((state) => state.dataSlice.searchInput)

    // console.log(SearchData.products);

    // All 
    const { setLoading } = useLoader(); // Access the setLoading function
    const [allProducts, setAllProducts] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        document.title = 'E-Commerce';
        const fetchProducts = async () => {
            setLoading(true); // Start the loader before making API calls
            try {
                let url;
                if (!category) {
                    url = 'https://dummyjson.com/products?limit=100&skip=0';
                } else {
                    url = `https://dummyjson.com/products/category/${category}`;
                }

                const response = await axios.get(url);
                setAllProducts(response.data.products); // Set the response data to state

            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Stop the loader once the API call finishes (success or failure)
            }
        };

        fetchProducts();
    }, [category, setLoading]); // Re-run when `category` changes

    return (
        <>
            {/* <h1>AllProducts</h1> */}
            <div className="products-box">

                <div className="inner-box">
                    {
                        searchInputValue !== '' ?
                            searchData.map((value, index) => {
                                return (
                                    <div className="product-item" key={index}>

                                        <div className="item-box d-flex align-items-center text-black">

                                            <div className="col-4 product-img">
                                                <img src={value.thumbnail} alt="" />
                                            </div>

                                            <div className="col-8 product-details d-flex">
                                                <div className="left-details col-8">

                                                    <h4>{value.title}</h4>

                                                    <div className="rate-and-review d-flex align-items-center my-2">
                                                        <div className='green-rate d-flex align-items-center'>
                                                            <span className='pe-1'>4.3</span> <IoMdStar />
                                                        </div>
                                                        {/* Stock and Rating , Stock=Review */}
                                                        <div className='rating-stock ms-2'>
                                                            <span>{value.rating} Ratings & </span>
                                                            <span>{value.stock} Reviews</span>
                                                        </div>
                                                    </div>

                                                    <ul className='m-0 p-0 description-box'>
                                                        <li className='mb-1'>{value.description}</li>
                                                        <li className='mb-1'>{value.brand}</li>
                                                        <li>{value.category}</li>
                                                    </ul>

                                                </div>
                                                <div className="right-details col-4">
                                                    <div className='price-menu'>
                                                        <h5 className='m-0'>₹{Math.round(value.price)}</h5>
                                                        <div className='price-discount'>
                                                            <span className='strike-price'>₹{Math.round(value.price + (Math.round(value.discountPercentage) / 100 * Math.round(value.price)))}</span>
                                                            <span className='discount-percentage'>{Math.round(value.discountPercentage)}% off</span>
                                                        </div>
                                                    </div>
                                                    <div className="addCart-btn mt-2">
                                                        <button onClick={() => dispatch(addCart(value))}>Add To Cart</button>
                                                    </div>
                                                    <div className="addCart-btn mt-2">
                                                        <Link to={`/product/${value.id}`}>
                                                            <button>View Product</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) :
                            allProducts.map((value, index) => {
                                return (
                                    <div className="product-item" key={index}>

                                        <div className="item-box d-flex align-items-center text-black">

                                            <div className="col-4 product-img">
                                                <img src={value.thumbnail} alt="" />
                                            </div>

                                            <div className="col-8 product-details d-flex">
                                                <div className="left-details col-8">

                                                    <h4>{value.title}</h4>

                                                    <div className="rate-and-review d-flex align-items-center my-2">
                                                        <div className='green-rate d-flex align-items-center'>
                                                            <span className='pe-1'>4.3</span> <IoMdStar />
                                                        </div>
                                                        {/* Stock and Rating , Stock=Review */}
                                                        <div className='rating-stock ms-2'>
                                                            <span>{value.rating} Ratings & </span>
                                                            <span>{value.stock} Reviews</span>
                                                        </div>
                                                    </div>

                                                    <ul className='m-0 p-0 description-box'>
                                                        <li className='mb-1'>{value.description}</li>
                                                        {
                                                            value.brand ? <li className='mb-1'>{value.brand}</li> : ''
                                                        }
                                                        <li>{value.category}</li>
                                                    </ul>

                                                </div>
                                                <div className="right-details col-4">
                                                    <div className='price-menu'>
                                                        <h5 className='m-0'>₹{Math.round(value.price)}</h5>
                                                        <div className='price-discount'>
                                                            <span className='strike-price'>₹{Math.round(value.price + (Math.round(value.discountPercentage) / 100 * Math.round(value.price)))} </span>
                                                            <span className='discount-percentage'>{Math.round(value.discountPercentage)}% off</span>
                                                        </div>
                                                    </div>
                                                    <div className="addCart-btn mt-2">
                                                        <button onClick={() => dispatch(addCart(value))}>Add To Cart</button>
                                                    </div>
                                                    <div className="addCart-btn mt-2">
                                                        <Link to={`/product/${value.id}`}>
                                                            <button>View Product</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default AllProducts;