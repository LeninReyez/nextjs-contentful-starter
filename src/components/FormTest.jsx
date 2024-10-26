'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/styles.css';
import emailjs from 'emailjs-com';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormTest = () => {
  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(null);

  // Blocked dates (example: weekends and specific dates)
  const isBlockedDate = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Block Sundays (0) and Saturdays (6)
    // You can add more conditions for specific dates
  };

  // Handle form submission
  const onSubmit = (data) => {
    emailjs.sendForm('service_bahenfj', 'template_550i7ji', '#cookies-order', 'qeXWWBIPhLVcfD2yZ').then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text, JSON.stringify(data));
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );
  };

  const myStyle = {
    border: '1px solid black',
    padding: '10px',
  };

  // Define styles as objects
  const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    padding: '20px',
    display: 'flex',
    // flexWrap: 'wrap',
    alignItems: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    margin: '10px 0',
  };

  const wrapMe = {
    flexWrap: 'wrap',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const inputStyle = {
    marginRight: '15px',
  };

  const flavorNameStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
  };

  const boldFlavorStyle = {
    color: '#4B8FD5', // Change this to your preferred color
    marginLeft: '10px',
  };

  const alignedStyle = {
    display: 'flex',
    alignItems: 'center', // Align items vertically in the center
    lineHeight: '1.5', // Set line height to match your font size
    marginBottom: '10px', // Optional: Space between rows
  };

  const dataStyle = {
    marginRight: '10px', // Space between the label and the date input
    // height: '40px', // Match the height of the input if needed
    lineHeight: '11px', // Ensure line height matches the height
  };

  const datePickerStyle = {
    height: '40px', // Set the same height as the label
  };

  return (
    <form id="cookies-order" onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '800px', margin: 'auto' }}>
      <div>
        <label
          style={{
            textAlign: 'center',
            fontSize: '18px', // Increase font size
            fontWeight: 'bold', // Make the text bold
            color: '#2B7EC3', // Use a standout color
            backgroundColor: '#E0F7FA', // Light background color for contrast
            padding: '10px', // Add some padding
            borderRadius: '5px', // Rounded corners
            display: 'block', // Make it a block element for better spacing
            margin: '20px 0', // Add top and bottom margin
          }}
          htmlFor="email"
        >
          Specialty Cookie Cakes
        </label>
      </div>

      <div style={cardStyle}>
        <label style={labelStyle}>
          <input
            type="checkbox"
            value="vanilla"
            {...register('flavors', {
              required: 'You must select at least one option',
            })}
            style={inputStyle}
          />
          <span style={flavorNameStyle}>
            #1 <b style={boldFlavorStyle}> Deluxe Chocolate Chip</b>; milk, semi, dark chips frosted w/ vanilla and
            chocolate frostings.
          </span>
        </label>
      </div>

      <div style={{ ...cardStyle, ...wrapMe }}>
        <label style={labelStyle}>
          <input style={inputStyle} type="checkbox" value="chocolate" {...register('flavors')} />
          <span style={flavorNameStyle}>
            #2 <b style={boldFlavorStyle}> Dark Chocolate Cashew & Sea Salt</b>; dairy-free, vanilla frosted (dairy
            free)
          </span>
        </label>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
          <input style={inputStyle} type="checkbox" id="vehicle1" name="cashews" value="no" />
          <label htmlFor="vehicle1" style={{ marginLeft: '5px', marginRight: '10px' }}>
            No Cashews
          </label>

          <label style={{ border: 'dashed black 1px', padding: '5px' }} htmlFor="layers">
            Layer:
            <select name="layer" id="layers">
              <option value="single">Single Layer</option>
              <option value="double">Double Layer</option>
            </select>
          </label>
        </div>
      </div>

      <div style={cardStyle}>
        <label style={labelStyle}>
          <input style={inputStyle} type="checkbox" value="strawberry" {...register('flavors')} />
          <span style={flavorNameStyle}>
            #3 <b style={boldFlavorStyle}> White Chip Funfetti</b>; rainbow sprinkles and vanilla frosted
          </span>
        </label>
      </div>

      <div style={cardStyle}>
        <label style={labelStyle}>
          <input type="checkbox" value="mint" {...register('flavors')} />
          <span style={flavorNameStyle}>
            #4 <b style={boldFlavorStyle}> Double Chocolate</b>; chocolate cookie and chips, vanilla frosted w/
            chocolate sprinkles
          </span>
        </label>
      </div>

      <div style={cardStyle}>
        <label style={labelStyle}>
          <input style={inputStyle} type="checkbox" value="triple-chocolate" {...register('flavors')} />
          <span style={flavorNameStyle}>
            #5 <b style={boldFlavorStyle}> Triple Chocolate</b>; chocolate cookie, chips and chocolate frosting
          </span>
        </label>
      </div>

      {/* Date Picker */}
      <div style={{ ...cardStyle, ...alignedStyle }}>
        <label style={dataStyle} htmlFor="date">
          Select Date:
        </label>
        <DatePicker
          id="date"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setValue('selectedDate', date); // Set the value in react-hook-form
          }}
          filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6} // Example to block weekends
          placeholderText="Select a date"
        />
      </div>

      <div>
        <label
          style={{
            textAlign: 'center',
            fontSize: '18px', // Increase font size
            fontWeight: 'bold', // Make the text bold
            color: '#2B7EC3', // Use a standout color
            backgroundColor: '#E0F8E0', // Light background color for contrast
            padding: '10px', // Add some padding
            borderRadius: '5px', // Rounded corners
            display: 'block', // Make it a block element for better spacing
            margin: '20px 0', // Add top and bottom margin
          }}
          htmlFor="email"
        >
          Contact Information
        </label>
      </div>

      <div className="bottomMargin">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" {...register('name', { required: 'Name is required' })} />
        {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
      </div>

      <div className="bottomMargin">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Email is not valid',
            },
          })}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
      </div>

      <div className="bottomMargin">
        <label htmlFor="phone">Telephone:</label>
        <input
          type="tel"
          id="phone"
          {...register('phone', { required: 'Phone number is required' })}
          name="phone"
          placeholder="123-456-7890"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
        ></input>
        {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}
      </div>

      <div className="bottomMargin">
        <label htmlFor="email">Select your contact preference(s):</label>
      </div>
      <label>
        <input type="radio" value="email" {...register('email', { required: 'You must select an option' })} />
        Email
      </label>

      <div>
        <label>
          <input type="radio" value="phone" {...register('phone', { required: 'You must select an option' })} />
          Phone
        </label>
      </div>

      <div>
        <label>
          <input type="radio" value="text" {...register('text', { required: 'You must select an option' })} />
          Text
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormTest;
