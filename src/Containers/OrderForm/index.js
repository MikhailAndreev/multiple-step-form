import React, { Component } from 'react';
import styles from "./OrderForm.module.css";
import FormInput from "../../MuiComponents/FormInput";
import FormButton from "../../MuiComponents/FormButton";



const formValid = ({form1Errors, ...rest}) => {
    let valid = true;

    Object.values(form1Errors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val === '' && (valid = false)
    });

    return valid;
};

class OrderForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            step: 1,
            nameError:'',
            error: false,
            fullName:'',
            daytimeTel:'',
            street:'',
            suite:'',
            city:'',
            country:'',
            zipCode:'',
            form1Errors: {
                fullName:'',
                daytimeTel:'',
                // street:'',
                // suite:'',
                // city:'',
                // country:'',
                // zipCode:'',
            },
            form2Errors: {
                cardFullName:'',
                email:'',
                billingSuite:'',
                billingCity:'',
                billingCountry:'',
                billingZip:'',
                billingStreet:''
            },
            cardFullName:'',
            email:'',
            billingSuite:'',
            billingCity:'',
            billingCountry:'',
            billingZip:'',
            billingStreet:''

        };
        this.handleChange = this.handleChange.bind(this);
        this.submitStep1 = this.submitStep1.bind(this);
    }


    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
        console.log(this.state.step)
    }

    // handleChange(event) {
    //     const {name, value} = event.target;
    //     this.setState({
    //         [name]: value
    //     },
    //     //     ()=>{
    //     //     this.validate()
    //     // }
    //     );
    //     console.log('is changed')
    // }

    // validate(){
    //     const {step, fullName, daytimeTel, street, city, country, zipCode,
    //         cardFullName, email, billingSuite, billingCity, billingCountry,
    //         billingZip, billingStreet } = this.state;
    //
    //         if( fullName  === '' || daytimeTel === '' || street === ''|| city===""|| country=== ''|| zipCode ===''){
    //             this.setState({
    //                 nameError: 'Please enter recipient full name',
    //                 error: true
    //             })
    //         }
    //
    //     else {
    //         this.setState({
    //             nameError: '',
    //             error:false,
    //         })
    //     }
    // }


    // validateName(){
    //     if(this.state.nameError.length){
    //         return(
    //             <span> {this.state.nameError} </span>
    //         )
    //     }
    // }

    handleChange(event) {
        const {name, value} = event.target;
       let formErrors = this.state.form1Errors;

       switch (name) {
           case 'fullName' :
               formErrors.fullName =
                   value.length === 0
                       ? 'minimum 3 characters required'
                       : '';
               break;
           case 'daytimeTel' :
               formErrors.daytimeTel =
                   value.length === 0
                       ? 'minimum 3 characters required'
                       : '';
               break;
           default:
               break;
       }
       this.setState({
           formErrors, [name]:value
       })
    }

    submitStep1=(e)=>{
        e.preventDefault();

        if(formValid(this.state) ){

           console.log('ITS OK !')
        }else {
            this.setState(prevState => ({
                ...prevState,
                form1Errors: {
                    fullName: 'Please enter recipient full name',
                    daytimeTel: 'error'
                }
            }));
            console.log('there is an error !')
        }

    };

    // submitStep1=(e)=>{
    //     const {step, fullName, daytimeTel, street, city, country,
    //         cardFullName, email, billingSuite, billingCity, billingCountry,
    //         billingZip, billingStreet } = this.state;
    //     e.preventDefault();
    //
    //
    //     if(step === 1 && fullName && daytimeTel && street && city && country  ){
    //
    //         this.setState({
    //             step: this.state.step + 1
    //         })
    //     }
    //
    //     this.validate();
    //
    // };

    // submitStep2=(e)=>{
    //     const {step, cardFullName, email, billingSuite, billingCity, billingCountry,
    //          billingStreet } = this.state;
    //     e.preventDefault();
    //
    //
    //     if(step === 2 && cardFullName && email && billingSuite && billingCity && billingCountry && billingCountry && billingStreet ){
    //
    //         this.setState({
    //             step: this.state.step + 1
    //         })
    //     }
    //
    //     this.validateForm2();
    //
    // };

    render() {
        const {form1Errors} = this.state;
        return (
            <div>
                <div className={styles.wrapper}>

                    <div className={styles.steps}>
                        <p className={this.state.step === 1 ? styles.activStep : styles.disableStep}>Shipping</p>
                        <p className={this.state.step === 2 ? styles.activStep : styles.disableStep}>Billing</p>
                        <p className={this.state.step === 3 ? styles.activStep : styles.disableStep}>Payment</p>
                    </div>

                    {this.state.step === 1 &&

                         <form noValidate className={styles.formSec}>
                    <h1>
                        Shipping info
                    </h1>
                    <fieldset>
                        <legend>Recepient</legend>
                        {form1Errors.fullName.length > 0 && (
                            <span>
                                {form1Errors.fullName}
                            </span>
                        )}
                        <FormInput
                            handleChange={this.handleChange}
                            name='fullName'
                            placeholder={'Full Name'}
                            classname={form1Errors.fullName.length > 0 ? styles.errorInput : styles.userName}
                        />

                        <div className={styles.phoneSec}>

                            <FormInput
                                handleChange={this.handleChange}
                                name='daytimeTel'
                                placeholder={'Daytime phone'}
                                classname={form1Errors.daytimeTel.length > 0 ? styles.errorInput : styles.userPhone}
                            />
                            <p>
                                For delivery  questions only
                            </p>
                        </div>

                    </fieldset>

                    <fieldset>
                        <legend>Address</legend>
                        <FormInput
                            handleChange={this.handleChange}
                            name='street'
                            placeholder='Street Address'
                            classname={this.state.error ? styles.errorInput : ''}
                        />

                        <FormInput
                            handleChange={this.handleChange}
                            name='suite'
                            placeholder='Apt, Suite, Bldg, Gate Code. (optional)'
                            classname={this.state.error ? styles.errorInput : ''}
                        />

                        <FormInput
                            handleChange={this.handleChange}
                            name='city'
                            placeholder='City'
                            classname={this.state.error ? styles.errorInput : ''}
                        />

                        <div className={styles.country}>
                            <FormInput
                                handleChange={this.handleChange}
                                name='country'
                                placeholder='Country'
                                classname={this.state.error ? styles.errorInputCountry : styles.inputCountry}
                            />

                            <FormInput
                                handleChange={this.handleChange}
                                name='zipCode'
                                placeholder={'ZIP'}
                                classname={styles.userZip}
                            />
                        </div>
                    </fieldset>

                            <FormButton
                                handleClick={this.submitStep1}
                                name={'Continue'}
                                style={styles.continueBtn}
                            />

                  </form>
                    }

                    {this.state.step === 2 &&

                         <form>

                             <div className={styles.billingTitle}>
                                 <h1>
                                     Billing information
                                 </h1>
                                 <p>Same as shipping</p>
                             </div>

                        <fieldset>
                            <legend>Billing Contact</legend>
                            <FormInput
                                handleChange={this.handleChange}
                                name='cardFullName'
                                placeholder='Full Name'
                                classname={this.state.error ? styles.errorInput : styles.userName}
                            />

                            <FormInput
                                handleChange={this.handleChange}
                                name='email'
                                placeholder='Email Address'
                                classname={this.state.error ? styles.errorInput : styles.formInput}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Billing Address</legend>
                            <FormInput
                                handleChange={this.handleChange}
                                name='billingStreet'
                                placeholder='Street Address'
                                classname={this.state.error ? styles.errorInput : styles.formInput}
                            />

                            <FormInput
                                handleChange={this.handleChange}
                                name='billingSuite'
                                placeholder={'Apt, Suite, Bldg, Gate Code. (optional)'}
                                classname={this.state.error ? styles.errorInput : styles.formInput}
                            />

                            <FormInput
                                handleChange={this.handleChange}
                                name='billingCity'
                                placeholder='City'
                                classname={this.state.error ? styles.errorInput : styles.formInput}
                            />

                            <div className={styles.country}>
                                <FormInput
                                    handleChange={this.handleChange}
                                    name='billingCountry'
                                    placeholder='Country'
                                    classname={this.state.error ? styles.errorInputCountry : styles.inputCountry}
                                />

                                <FormInput
                                    handleChange={this.handleChange}
                                    name='billingZip'
                                    placeholder='ZIP'
                                    classname={styles.userZip}
                                />
                            </div>
                        </fieldset>
                             <FormButton
                                 handleClick={this.submitStep2}
                                 name='Continue'
                                 style={styles.continueBtn}
                             />
                        </form>
                    }

                    {this.state.step === 3 &&

                        <form>
                        <h1>
                            Payment
                        </h1>
                            <div className={styles.secureInf}>
                                <p>
                                    This is a secure 128-bit SSL encrypted payment
                                </p>
                            </div>
                        <fieldset>
                            <legend>Cardholder Name</legend>
                            <FormInput
                                placeholder='Name as it appears on your card'
                                classname={styles.formInput}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Card Number</legend>
                            <FormInput
                                placeholder='XXXX XXXX XXXX XXXX'
                            />

                            <div className={styles.cardInf}>
                                <FormInput
                                    label='Expire Date'
                                    placeholder='MM/YY'
                                    classname={styles.expDate}
                                />

                                <FormInput
                                    label='Security Code'
                                    classname={styles.secCode}
                                />
                            </div>
                        </fieldset>
                            <FormButton
                                name='Pay Securely'
                                style={styles.continueBtn}
                            />
                    </form>

                    }

                </div>
            </div>
        );
    }
}

export default OrderForm;