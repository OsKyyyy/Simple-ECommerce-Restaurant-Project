import React, {Component, useEffect, useState} from 'react';
import "./cartstyle.css"
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeToCart, removeSingleItem, emptyCart} from "../redux/features/cartSlice";
import toast from "react-hot-toast";

const CartDetails = () => {

    const {carts} = useSelector((state) => state.allCart);

    const [totalPrc, setTotalPrc] = useState(0);
    const [totalQnty, setTotalQnty] = useState(0);

    const dispatch = useDispatch();

    // add to cart
    const handleIncrement = (e) => {
        dispatch(addToCart(e));
        toast.success("Item Updated In Your Cart!");
    }

    // remove to singlecart
    const handleDecrement = (e) => {
        dispatch(removeToCart(e));
        toast.error("Item Deleted In Your Cart!");
    }

    // remove to single item
    const handleSingleDecrement = (e) => {
        dispatch(removeSingleItem(e));
        toast.success("Item Updated In Your Cart!");
    }

    // remove all items
    const handleEmptyCart = () => {
        dispatch(emptyCart());
        toast.error("Items Deleted In Your Cart!");
    }

    // count total price
    const totalPrice = () => {
        let totalPrc = 0;
        carts.map((item) => {
            totalPrc = item.price * item.qnty + totalPrc;
        })
        setTotalPrc(totalPrc);
    }

    // count total quantity
    const totalQuantity = () => {
        let totalQnty = 0;
        carts.map((item) => {
            totalQnty = item.qnty + totalQnty;
        })
        setTotalQnty(totalQnty);
    }

    useEffect(() => {
        totalPrice()
    },[totalPrice])

    useEffect(() => {
        totalQuantity()
    },[totalQuantity])

    return (
        <div className='row justify-content-center m-0'>
            <div className='col-md-8 mt-5 mb-5 cardsdetails'>
                <div className="card">
                    <div className="card-header bg-dark p-3">
                        <div className='card-header-flex'>
                            <h5 className='text-white m-0 text-left'>Cart Calculation({carts.length >0 ? carts.length : "0"})</h5>
                            {
                                carts.length > 0 ? <Button className='btn btn-danger mt-0 btn-sm' onClick={handleEmptyCart}><i
                                        className='fa fa-trash-alt mr-2'></i><span>Empty Cart</span></Button>
                                    : ""
                            }
                        </div>
                    </div>
                    <div className="card-body p-0">
                        {
                            carts.length === 0 ?
                                <table className='table cart-table mb-0'>
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='cart-empty'>
                                                    <i className='fa fa-shopping-cart'></i>
                                                    <p>Your Cart Is Empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            :
                                <table className='table cart-table mb-0 table-responsive-sm'>
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>Product</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th className='text-left'>Quantity</th>
                                            <th className='text-right'><span id='amount' className='amount'>Total Amount</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        carts.map(data => {
                                            return (
                                                <tr key={data.id}>
                                                    <td>
                                                        <button className='prdct-delete' onClick={() => handleDecrement(data.id)}>
                                                            <i className='fa fa-trash-alt mr-2'></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div className='product-img'><img src={data.imgdata}/></div>
                                                    </td>
                                                    <td>
                                                        <div className='product-name'><p>{data.dish}</p></div>
                                                    </td>
                                                    <td>{data.price}</td>
                                                    <td>
                                                        <div className="prdct-qty-container">
                                                            <button className='prdct-qty-btn' type='button' onClick={() => handleSingleDecrement(data)}>
                                                                <i className='fa fa-minus'></i>
                                                            </button>
                                                            <input className='qty-input-box' value={data.qnty} type="text" disabled name="" id=""/>
                                                            <button className='prdct-qty-btn' type='button' onClick={() => handleIncrement(data)}>
                                                                <i className='fa fa-plus'></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className='text-right'>{data.qnty * data.price}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th colSpan={3}>&nbsp;</th>
                                            <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalQnty}</span></th>
                                            <th className='text-right'>Total Price <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalPrc}</span></th>
                                        </tr>
                                    </tfoot>
                                </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CartDetails;