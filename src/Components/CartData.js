import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { decrementQty, incrementQty, removeItem } from "../Redux/slice";
const CartData = () => {

    const dispatch = useDispatch();

    const cartData = useSelector((state) => state.dataSlice.data);

    // console.log(cartData);

    const grandPrice = useSelector((state) => state.dataSlice.grandPrice);

    // Increment Quantity
    const incrementProduct = (index) => {
        dispatch(incrementQty(index));
    }

    // Decrement Quantity
    const decrementProduct = (index) => {
        dispatch(decrementQty(index))
    }

    // Remove Product
    const removeProduct = (item) => {
        dispatch(removeItem(item));
    }

    return (
        <>
            <div className="cart-data">
                <div className="container">

                    <div className="my-breadcrumb ms-5 mt-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to='/'>
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active text-capitalize" aria-current="page">
                                    Cart Data
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="cart-table">
                        <table className="table table-bordered align-middle">
                            <thead>
                                <tr align='center'>
                                    <th>Images</th>
                                    <th>Details</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total Price</th>
                                    <th>Remove Item</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartData.map((item) => {
                                        return (
                                            <tr key={item.id-1}>
                                                <td style={{ width: '300px' }}>
                                                    <img src={item.thumbnail} alt="" className="w-100" />
                                                </td>
                                                <td width={"400px"}>
                                                    <h5>{item.title}</h5>
                                                    <p>{item.description}</p>
                                                </td>
                                                <td>
                                                    <span>
                                                        ₹{Math.round(item.price)}
                                                    </span>
                                                </td>
                                                <td align="center">
                                                    <button className="qty-btn" onClick={() => decrementProduct(item.id-1)}>-</button>
                                                    {item.qty}
                                                    <button className="qty-btn" onClick={() => incrementProduct(item.id-1)}>+</button>
                                                </td>
                                                <td>
                                                    <span>
                                                        ₹{item.totalprice}
                                                    </span>
                                                </td>
                                                <td align='center'>
                                                    <button onClick={() => removeProduct(item)} className="remove-btn">
                                                        <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="btn-icon">
                                                            <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>

                        </table>
                        <h5 className="text-end">Grand Total : ₹{grandPrice}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartData;