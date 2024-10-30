'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/styles.css';

const FormTest = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [isOption2Checked, setIsOption2Checked] = useState(false);
  const DELUXE_PRICE = 34.99; // Set the price for Deluxe Chocolate Chip
  const DARK_CHOCOLATE_PRICE = 36.99; // Set the price for Dark Chocolate Cashew & Sea Salt
  const DOUBLE_DELUXE_PRICE = 59.99; // Set the price for Deluxe Chocolate Chip
  const DOUBLE_DARK_CHOCOLATE_PRICE = 64.99; // Set the price for Dark Chocolate Cashew & Sea Salt
  const [deluxeQuantity, setDeluxeQuantity] = useState(0);
  const [darkChocolateQuantity, setDarkChocolateQuantity] = useState(0);
  const [doubleDeluxeQuantity, setDoubleDeluxeQuantity] = useState(0);
  const [doubleDarkChocolateQuantity, setDoubleDarkChocolateQuantity] = useState(0);
  const ILLINOIS_TAX_RATE = 0.0625; // 6.25% sales tax

  const isBlockedDate = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Block weekends
  };

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    // Remove empty fields
    const cleanedData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value));

    try {
      const response = await emailjs.sendForm(
        'service_6m0rk9b',
        'template_550i7ji',
        '#cookies-order',
        'qeXWWBIPhLVcfD2yZ',
      );
      console.log('SUCCESS!', response.status, response.text, JSON.stringify(cleanedData));
      window.location.href = '/thank-you';
    } catch (error) {
      console.log('FAILED...', error);
    }
  };

  const handleDeluxeQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 0;
    setDeluxeQuantity(quantity);
    setValue('cookie-1-quantaty', quantity);
  };

  const calculateTotalPrice = () => {
    const subtotal =
      DELUXE_PRICE * deluxeQuantity +
      DARK_CHOCOLATE_PRICE * darkChocolateQuantity +
      DOUBLE_DELUXE_PRICE * doubleDeluxeQuantity +
      DOUBLE_DARK_CHOCOLATE_PRICE * doubleDarkChocolateQuantity;

    const tax = subtotal * ILLINOIS_TAX_RATE;
    const totalWithTax = subtotal + tax;

    return {
      totalWithTax: totalWithTax.toFixed(2),
      tax: tax.toFixed(2),
      subTotal: subtotal.toFixed(2),
    }; // Return total as a fixed decimal value
  };

  const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    padding: '20px',
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column', // Stack elements vertically
  };

  const renderInput = (id, label, type = 'text', extraProps = {}) => (
    <div className="bottomMargin">
      <label htmlFor={id}>{label}:</label>
      <input id={id} type={type} {...register(id, extraProps)} />
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
      <div style={cardStyle}>
        <label>
          <input type="checkbox" value="Deluxe Chocolate Chip" {...register('cookie-1')} />
          #1 <b> Deluxe Chocolate Chip</b>; milk, semi, dark chips frosted w/ vanilla and chocolate frostings.
        </label>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
            <select value={deluxeQuantity} onChange={handleDeluxeQuantityChange} style={{ marginRight: '10px' }}>
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
      </div>

      {/* Dark Chocolate Cashew & Sea Salt Cookie */}
      <div style={cardStyle}>
        <label>
          <input
            type="checkbox"
            value="Dark Chocolate Cashew & Sea Salt"
            {...register('cookie-2')}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsOption2Checked(checked);
              if (!checked) {
                setValue('cookie-2-layer', '');
                setValue('no-cashews-selected', 'false');
              }
            }}
          />
          #2 <b> Dark Chocolate Cashew & Sea Salt</b>; dairy-free, vanilla frosted (dairy free)
        </label>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
              value={darkChocolateQuantity}
              onChange={(e) => {
                setDarkChocolateQuantity(Number(e.target.value));
                setValue('cookie-2-quantaty', e.target.value);
              }}
              style={{ marginRight: '10px' }}
            >
              <option value="">QTY</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>
              <input type="checkbox" {...register('no-cashews-selected')} /> No Cashews
            </label>
            <span style={{ marginLeft: '10px' }}>Price: ${DARK_CHOCOLATE_PRICE}</span>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <label>
          <input type="checkbox" value="Deluxe Chocolate Chip" {...register('cookie-1')} />
          #3 <b> Deluxe Chocolate Chip</b>; milk, semi, dark chips frosted w/ vanilla and chocolate frostings.
        </label>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
            <select
              {...register('cookie-1-quantaty')}
              style={{ marginRight: '10px' }}
              value={doubleDeluxeQuantity}
              onChange={(e) => {
                setDoubleDeluxeQuantity(Number(e.target.value));
                setValue('double-cookie-2-quantaty', e.target.value);
              }}
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
      </div>

      <div style={cardStyle}>
        <label>
          <input
            type="checkbox"
            value="Dark Chocolate Cashew & Sea Salt"
            {...register('cookie-2')}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsOption2Checked(checked);
              if (!checked) {
                setValue('cookie-2-layer', '');
                setValue('no-cashews-selected', 'false');
              }
            }}
          />
          #4 <b> Dark Chocolate Cashew & Sea Salt</b>; dairy-free, vanilla frosted (dairy free)
        </label>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
              {...register('cookie-2-quantaty')}
              style={{ marginRight: '10px' }}
              value={doubleDarkChocolateQuantity}
              onChange={(e) => {
                setDoubleDarkChocolateQuantity(Number(e.target.value));
                setValue('double-cookie-2-quantaty', e.target.value);
              }}
            >
              <option value="">QTY</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>
              <input type="checkbox" {...register('no-cashews-selected')} /> No Cashews
            </label>
            <span style={{ marginLeft: '10px' }}>Price: ${DOUBLE_DARK_CHOCOLATE_PRICE}</span>
          </div>
        </div>
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
            }}
            placeholderText="Select a date"
            required
          />
          <div style={{ marginLeft: '20px', fontWeight: 'bold' }}>
            <div>SubTotal: ${calculateTotalPrice().subTotal}</div>
            <div>Tax: ${calculateTotalPrice().tax}</div>
            <div>Total: ${calculateTotalPrice().totalWithTax}</div>
          </div>
        </div>
        <input type="hidden" {...register('selectedDate', { required: 'Date is required' })} />
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

      <h2 style={{ textAlign: 'center', color: '#2B7EC3', margin: '20px 0', fontSize: '20px', fontWeight: 'bold' }}>
        Contact Information
      </h2>
      {renderInput('name', 'Name', 'text', { required: 'Name is required' })}
      {renderInput('email', 'Email', 'email', {
        required: 'Email is required',
        pattern: { value: /^\S+@\S+$/, message: 'Email is not valid' },
      })}
      {renderInput('phone', 'Telephone', 'tel', { required: 'Phone number is required' })}

      <div className="bottomMargin" style={{ display: 'flex' }}>
        <label style={{ marginRight: '10px' }}>Select your contact preference(s):</label>
        <label style={{ marginRight: '10px' }}>
          Email
          <input
            style={{ marginLeft: '10px' }}
            type="radio"
            value="email"
            {...register('contactPreference', { required: 'You must select an option' })}
          />
        </label>
        <label style={{ marginRight: '10px' }}>
          Phone
          <input style={{ marginLeft: '10px' }} type="radio" value="phone" {...register('contactPreference')} />
        </label>
        <label style={{ marginRight: '10px' }}>
          Text
          <input style={{ marginLeft: '10px' }} type="radio" value="text" {...register('contactPreference')} />
        </label>
      </div>

      <button
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
      </button>
    </form>
  );
};

export default FormTest;
