import React, { Component } from 'react';
import styles from "./OrderCart.module.css";
import OrderForm from "../OrderForm";
import OrderSum from "../OrderSum";


class OrderCart extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            notFullAns: false,
        };
    }


    render() {

        return (
            <div>
                <div className={styles.wrapper}>

                    <div className={styles.orderInfo}>
                        <OrderForm/>
                        <OrderSum/>
                    </div>

                </div>
            </div>
        );
    }
}

export default OrderCart;