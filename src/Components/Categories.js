// Axios
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../common/LoaderContext';

const Categories = () => {

    // get all categories
    const { setLoading } = useLoader();  // Access the setLoading function to trigger the loader state
    const [allCategories, setAllCategories] = useState([]);

    // Fetch all categories when the component mounts
    useEffect(() => {
        setLoading(true); // Show loader before starting the API call

        axios.get('https://dummyjson.com/products/categories')
            .then(function (response) {
                setAllCategories(response.data);  // Set the categories data to state
            })
            .catch(function (error) {
                console.error('Error fetching categories:', error);
            })
            .finally(() => {
                setLoading(false);  // Hide loader after the API call is completed
            });
    }, [setLoading]);

    return (
        <>
            {/* <div>Categories</div> */}
            <div className="categories-box">
                <div className="inner-box">
                    <span className="title">Filters</span>
                    <div className="p-3">
                        <h6 className='mb-3'>CATEGORIES</h6>
                        <ul className='m-0 p-0'>
                            <li className='mb-2 d-block'>
                                <Link to='/'>
                                    <input type="button" className='form-control text-capitalize' value="all" />
                                </Link>
                            </li>
                            {
                                allCategories.map((item, index) => {
                                    return (
                                        <li className='mb-2 d-block' key={index}>
                                            <Link to={`/${item.slug}`}>
                                                <input type="button" className='form-control text-capitalize' value={item.slug} />
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories;