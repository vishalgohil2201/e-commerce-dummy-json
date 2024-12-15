// Icon
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getSearchData } from "../Redux/slice";
import { Link } from "react-router-dom";

const TopHeader = () => {

    // Badge

    const badge = useSelector((state) => state.dataSlice.badge);

    const disptach = useDispatch();

    const findData = (value) => {

        axios.get(`https://dummyjson.com/products/search?q=${value}`)
            .then(function (response) {
                // console.log(response.data.products);
                let searchAllData = response.data.products;
                let searchSingleValue = value;
                disptach(getSearchData({ searchAllData, searchSingleValue }));
            })
            .catch(function (error) {
                console.error(error)
            });
    }

    return (
        <>
            <div className="top-menu py-2 z-1">
                <div className="container">
                    <div className="main-box d-flex align-items-center justify-content-between">
                        <div className="left-logo">
                            <a href="/" className="cursor-pointer header-name">
                                E-Commerce
                            </a>
                        </div>
                        <div className="center-search d-flex">
                            <div className="search-input">
                                <input type="text" placeholder='Search for products, brand and more'
                                    onChange={(e) => findData(e.target.value)} />
                            </div>
                            <div className="search-btn">
                                <button><IoSearch /></button>
                            </div>
                        </div>
                        <div className='right-cart'>
                            <Link to='/cartdata' className='d-flex align-items-center'>
                                <FaShoppingCart />
                                <span>Cart</span>
                            </Link>
                            <div className="mybadge text-center">
                                <span>
                                    {badge}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopHeader;