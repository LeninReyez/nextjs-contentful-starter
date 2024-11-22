'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/styles.css';
import { format } from 'date-fns'; // Add this import at the top
import App from '../components/PayPal'

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(null);
  const DELUXE_PRICE = 34.99;
  const DARK_CHOCOLATE_PRICE = 34.99;
  const DOUBLE_DELUXE_PRICE = 59.99;
  const DOUBLE_DARK_CHOCOLATE_PRICE = 59.99;
  const ILLINOIS_TAX_RATE = 0.0625;

  const [deluxeQuantity, setDeluxeQuantity] = useState(0);
  const [darkChocolateQuantity, setDarkChocolateQuantity] = useState(0);
  const [doubleDeluxeQuantity, setDoubleDeluxeQuantity] = useState(0);
  const [doubleDarkChocolateQuantity, setDoubleDarkChocolateQuantity] = useState(0);
  const [isCookie1Checked, setIsCookie1Checked] = useState(false);
  const [isCookie2Checked, setIsCookie2Checked] = useState(false);
  const [isCookie3Checked, setIsCookie3Checked] = useState(false);
  const [isCookie4Checked, setIsCookie4Checked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [paymentData, setPaymentData] = useState(null); // state to hold payment data

  const isBlockedDate = (date) => {
    const day = date.getDay();
    
    // Check if the date is November 27th (regardless of the year)
    const isNovember27 = date.getMonth() === 10 && date.getDate() === 27; // November is month 10 (zero-based index)
  
    // Block Tuesday (2), Friday (5), and November 27th
    return day === 2 || day === 5 || isNovember27;
  };

  const onSubmit = async (data) => {
    console.log(`--------------------------------`);
    console.log(`--OnSubmit Ran------------------`);
    console.log(`--------------------------------`);
    // Check if at least one checkbox is selected
    if (!isCookie1Checked && !isCookie2Checked && !isCookie3Checked && !isCookie4Checked) {
      alert('Please select at least one cookie option before submitting.');
      return; // Prevent form submission if no checkbox is checked
    }

    console.log(JSON.stringify(data));
    // Calculate the total price
    const totalPrice = calculateTotalPrice().totalWithTax;

    // Add the total price to the form data
    data['total-price'] = totalPrice; // Add total price to the data object

    const cleanedData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value));
 window.location.href = '/thank-you';
    try {
      // const response = await emailjs.sendForm(
      //   'service_5xwvrum',
      //   'template_icx3u2c',
      //   '#cookies-order',
      //   'BVsL3cTPaRR3vE4FH',
      // );

      // Store the cleaned data in local storage
      localStorage.setItem('formData', JSON.stringify(cleanedData));

      console.log('SUCCESS!', response.status, response.text, JSON.stringify(cleanedData));

       // Set the payment data in the state to be passed to the PayPal button
    setPaymentData({
      totalPrice: totalPrice,
      formData: cleanedData,
    });
     
    } catch (error) {
      console.log('FAILED...', error);
    }
  };

  const calculateTotalPrice = () => {
    let subtotal =
      DELUXE_PRICE * deluxeQuantity +
      DARK_CHOCOLATE_PRICE * darkChocolateQuantity +
      DOUBLE_DELUXE_PRICE * doubleDeluxeQuantity +
      DOUBLE_DARK_CHOCOLATE_PRICE * doubleDarkChocolateQuantity;

    // Adjust subtotal based on "No Cashews" selections
    if (watch('cookie-2-no-cashews-selected')) {
      subtotal -= 2 * darkChocolateQuantity; // Subtract $2 for each cookie-2 quantity if "No Cashews" is selected
    }

    if (watch('cookie-4-no-cashews-selected')) {
      subtotal -= 4 * doubleDarkChocolateQuantity; // Subtract $4 for each cookie-4 quantity if "No Cashews" is selected
    }

    const tax = subtotal * ILLINOIS_TAX_RATE;
    const totalWithTax = subtotal + tax;

    return {
      totalWithTax: totalWithTax.toFixed(2),
      tax: tax.toFixed(2),
      subTotal: subtotal.toFixed(2),
    };
  };

  const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    padding: '20px',
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
  };

  const alertStyle = {
    backgroundColor: '#2196F3',
    padding: '20px',
    color: 'white',
    opacity: '0.83',
    transition: 'opacity 0.6s',
    marginBottom: '15px',
    borderRadius: '12px',
  };

  const input = {
    marginRight: '10px',
  };

  const renderInput = (id, label, type = 'text', extraProps = {}) => (
    <div className="bottomMargin">
      <label htmlFor={id}>{label}:</label>
      <input id={id} type={type} {...register(id, extraProps)} />
      {errors[id] && <span style={{ color: 'red' }}>{errors[id].message}</span>}
    </div>
  );

  const renderContactMethodDropdown = (id, label, extraProps = {}) => (
    <div className="bottomMargin">
      <label htmlFor={id}>{label}:</label>
      <select id={id} {...register(id, extraProps)}>
        <option value="">Select a contact method</option>
        <option value="email">Email</option>
        <option value="text">Text</option>
        <option value="tel">Telephone</option>
      </select>
      {errors[id] && <span style={{ color: 'red' }}>{errors[id].message}</span>}
    </div>
  );

  return (
    <form
      id="cookies-order"
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: '800px', margin: 'auto', fontWeight: 'bold' }}
    >
      <h2 style={{ textAlign: 'center', color: '#2B7EC3', margin: '20px 0', fontSize: '30px' }}>
        Specialty Cookie Cakes
      </h2>

      {/* Deluxe Chocolate Chip Cookie */}
      <div id="cookie-1" style={cardStyle}>
        <label>
          <input
            style={{ ...input }}
            type="checkbox"
            value="Deluxe Chocolate Chip"
            {...register('cookie-1')}
            onChange={(e) => {
              setIsCookie1Checked(e.target.checked);
              setValue('cookie-1', e.target.checked ? 'Deluxe Chocolate Chip' : '');

              // Clear quantity if checkbox is unchecked
              if (isCookie1Checked) {
                setDeluxeQuantity(0); // Reset local state
                setValue('cookie-1-quantity', ''); // Clear form value
              }
            }}
          />
          #1 <b>Deluxe Chocolate Chip</b>; 9&quot; round, single layer made with milk, semi, and dark chip mixture and
          frosted w/ vanilla and chocolate frostings.
        </label>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
            <select
              {...register('cookie-1-quantity', {
                required: isCookie1Checked ? 'Please select a quantity' : false, // Conditionally add required validation
                min: isCookie1Checked ? 1 : undefined, // Minimum quantity 1 if selected
              })}
              value={deluxeQuantity}
              onChange={(e) => {
                const quantity = Number(e.target.value);
                setDeluxeQuantity(quantity);
                setValue('cookie-1-quantity', quantity);
              }}
              style={{ marginRight: '10px' }}
              disabled={!isCookie1Checked}
            >
              <option value="">QTY</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <span style={{ marginLeft: '10px' }}>Price: ${DELUXE_PRICE}</span>
          </div>
        </div>
        {errors['cookie-1-quantity'] && <span style={{ color: 'red' }}>{errors['cookie-1-quantity'].message}</span>}
      </div>

      {/* Dark Chocolate Cashew & Sea Salt Cookie */}
      <div id="cookie-2" style={cardStyle}>
        <label>
          <input
            style={{ ...input }}
            type="checkbox"
            value="Dark Chocolate Chip & Sea Salt"
            {...register('cookie-2')}
            onChange={(e) => {
              setIsCookie2Checked(e.target.checked);
              setValue('cookie-2', e.target.checked ? 'Dark Chocolate Chip & Sea Salt' : '');

              // Clear quantity if checkbox is unchecked
              if (isCookie2Checked) {
                setDarkChocolateQuantity(0); // Reset local state
                setValue('cookie-2-quantity', ''); // Clear form value
                // setValue('cookie-2-no-cashews-selected', false);
              }
            }}
          />
          #2 <b> Dark Chocolate Chip & Sea Salt</b>; 9&quot; round, single layer made with dark chocolate chips, sea
          salt, and cashews, vanilla frosted (**dairy free)
        </label>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
              {...register('cookie-2-quantity', {
                required: isCookie2Checked ? 'Please select a quantity' : false, // Conditionally add required validation
                min: isCookie2Checked ? 1 : undefined, // Minimum quantity 1 if selected
              })}
              value={darkChocolateQuantity}
              onChange={(e) => {
                const quantity = Number(e.target.value);
                setDarkChocolateQuantity(quantity);
                setValue('cookie-2-quantity', quantity);
              }}
              style={{ marginRight: '10px' }}
              disabled={!isCookie2Checked}
            >
              <option value="">QTY</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {/* <label>
              <input type="checkbox" {...register('cookie-2-no-cashews-selected')} disabled={!isCookie2Checked} /> No
              Cashews
            </label> */}
            <span style={{ marginLeft: '10px' }}>
              Price: ${DARK_CHOCOLATE_PRICE - (watch('cookie-2-no-cashews-selected') ? 2 : 0)}
            </span>
          </div>
        </div>
        {errors['cookie-2-quantity'] && <span style={{ color: 'red' }}>{errors['cookie-2-quantity'].message}</span>}
      </div>

      <div id="cookie-3" style={cardStyle}>
        <label>
          <input
            style={{ ...input }}
            type="checkbox"
            value="double-deluxe-chocolate-chip"
            {...register('cookie-3')}
            onChange={(e) => {
              setIsCookie3Checked(e.target.checked);
              setValue('cookie-3', e.target.checked ? 'double-deluxe-chocolate-chip' : '');

              if (isCookie3Checked) {
                setDoubleDeluxeQuantity(0);
                setValue('cookie-3-quantity', '');
              }
            }}
          />
          #3 <b> Deluxe Chocolate Chip</b>; 9&quot; round, double layered made with a mixture of milk, semi, dark chips
          frosted w/ vanilla and chocolate frostings.
        </label>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
            <select
              {...register('cookie-3-quantity', {
                required: isCookie3Checked ? 'Please select a quantity' : false, // Conditionally add required validation
                min: isCookie3Checked ? 1 : undefined, // Minimum quantity 1 if selected
              })}
              style={{ marginRight: '10px' }}
              value={doubleDeluxeQuantity}
              onChange={(e) => {
                const quantity = Number(e.target.value);
                setDoubleDeluxeQuantity(quantity);
                setValue('cookie-3-quantity', quantity);
              }}
              disabled={!isCookie3Checked}
            >
              <option value="">QTY</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <span style={{ marginLeft: '10px' }}>Price: ${DOUBLE_DELUXE_PRICE}</span>
          </div>
        </div>
        {errors['cookie-3-quantity'] && <span style={{ color: 'red' }}>{errors['cookie-3-quantity'].message}</span>}
      </div>

      <div id="cookie-4" style={cardStyle}>
        <label>
          <input
            style={{ ...input }}
            type="checkbox"
            value="double-dark-chocolate-chip-and-sea-salt"
            {...register('cookie-4')}
            onChange={(e) => {
              setIsCookie4Checked(e.target.checked);
              setValue('cookie-4', e.target.checked ? 'double-dark-chocolate-chip-and-sea-salt' : '');
              

              // Clear quantity if checkbox is unchecked
              if (isCookie4Checked) {
                setDoubleDarkChocolateQuantity(0); // Reset local state
                setValue('cookie-4-quantity', ''); // Clear form value
                // setValue('cookie-4-no-cashews-selected', false);
              }
            }}
          />
          #4 <b> Dark Chocolate Chip & Sea Salt</b>; 9&quot; round, double layered made with dark chocolate chips, sea
          salt, and cashews, vanilla frosted (**dairy free)
        </label>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
              {...register('cookie-4-quantity', {
                required: isCookie4Checked ? 'Please select a quantity' : false, // Conditionally add required validation
                min: isCookie4Checked ? 1 : undefined, // Minimum quantity 1 if selected
              })}
              style={{ marginRight: '10px' }}
              value={doubleDarkChocolateQuantity}
              onChange={(e) => {
                const quantity = Number(e.target.value);
                setDoubleDarkChocolateQuantity(quantity);
                setValue('cookie-4-quantity', quantity);
              }}
              disabled={!isCookie4Checked}
            >
              <option value="">QTY</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {/* <label>
              <input type="checkbox" {...register('cookie-4-no-cashews-selected')} disabled={!isCookie4Checked} /> No
              Cashews
            </label> */}
            <span style={{ marginLeft: '10px' }}>
              Price: ${(DOUBLE_DARK_CHOCOLATE_PRICE - (watch('cookie-4-no-cashews-selected') ? 4 : 0)).toFixed(2)}
            </span>
          </div>
        </div>
        {errors['cookie-4-quantity'] && <span style={{ color: 'red' }}>{errors['cookie-4-quantity'].message}</span>}
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '25px' }}>Select Date:</label>
          <DatePicker
            selected={startDate}
            filterDate={isBlockedDate}
            onChange={(date) => {
              setStartDate(date);
              setValue('selectedDate', date);

              const formattedDate = format(date, 'MM/dd/yyyy'); // Format the date
              setValue('selectedDate', formattedDate); // Use the formatted date
            }}
            placeholderText="Select a date"
            required
          />
          <div style={{ marginLeft: '20px', fontWeight: 'bold' }}>
            <div>SubTotal: ${calculateTotalPrice().subTotal}</div>
            <div>Tax: ${calculateTotalPrice().tax}</div>
            <div>Total: ${calculateTotalPrice().totalWithTax}</div>
            <input type="hidden" {...register('total-price')} value={calculateTotalPrice().totalWithTax} />
          </div>
        </div>
        <span>**Default pickup time is 5:30PM unless specified under special instructions.</span>
        <input
          type="hidden"
          {...register('selectedDate', { required: 'Date is required' })}
          value={startDate ? format(startDate, 'MM/dd/yyyy') : ''}
        />

        {errors.selectedDate && <span style={{ color: 'red' }}>{errors.selectedDate.message}</span>}
      </div>

      <div style={{ ...cardStyle }}>
        <sup style={{ fontWeight: 'bold', textAlign: 'center', lineHeight: 'normal' }}>
          **48 HOUR NOTICE IS REQUIRED BEFORE SCHEDULED PICKUP**
        </sup>
        <p style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '10px', marginTop: '10px' }}>
          Pickup in West Normal
        </p>
      </div>

      <div style={{ ...cardStyle, display: 'block' }}>
        <sup style={{ fontWeight: 'bold', textAlign: 'left', lineHeight: 'normal' }}>Custom Message:</sup>
        <select
          {...register('custom-message')}
          style={{ marginLeft: '10px' }}
          defaultValue="No"
          onChange={(e) => {
            setShowMessage(e.target.value === 'yes'); // Show message if "Yes" is selected
          }}
        >
          <option value="No">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <div style={{ ...cardStyle, display: 'block' }}>
        <sup style={{ fontWeight: 'bold', textAlign: 'left', lineHeight: 'normal' }}>Additional Instructions:</sup>
        <input
          type="text"
          id="freeText"
          placeholder="Enter your additional instructions here."
          style={{ height: '50px', fontSize: '16px' }}
          {...register('additional-instructions')}
        />
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <sup>We will try to accomodate all requests if possible.</sup>
        </div>
      </div>

      {showMessage && (
        <div style={{ ...alertStyle }}>
          <strong>Info!</strong> We will contact you using your preferred method to confirm your message.
        </div>
      )}

      <h2 style={{ textAlign: 'center', color: '#2B7EC3', margin: '20px 0', fontSize: '20px', fontWeight: 'bold' }}>
        Contact Information
      </h2>
      {renderInput('name', 'Name', 'text', { required: 'Name is required' })}
      {renderInput('email', 'Email', 'email', {
        required: 'Email is required',
        pattern: { value: /^\S+@\S+$/, message: 'Email is not valid' },
      })}
      {renderInput('phone', 'Telephone', 'tel', { required: 'Phone number is required' })}

      {renderContactMethodDropdown('contact-method', 'Preferred Contact Method', {
        required: 'Please select a contact method',
      })}

      {/* <button
        type="submit"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#2B7EC3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Submit
      </button> */}
       {/* PayPal Button */}
       <App paymentData={paymentData} />
    </form>
  );
};

export default Form;
