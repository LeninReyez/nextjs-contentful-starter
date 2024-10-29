'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/styles.css';

const FormTest = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [isOption2Checked, setIsOption2Checked] = useState(false);

  const isBlockedDate = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Block weekends
  };

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    // Remove empty fields
    const cleanedData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value));

    try {
      const response = await emailjs.sendForm('service_bahenfj', 'template_550i7ji', '#cookies-order', 'qeXWWBIPhLVcfD2yZ');
      console.log('SUCCESS!', response.status, response.text, JSON.stringify(cleanedData));
    } catch (error) {
      console.log('FAILED...', error);
    }
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
    <form id="cookies-order" onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '800px', margin: 'auto', fontWeight: 'bold' }}>
      <h2 style={{ textAlign: 'center', color: '#2B7EC3', margin: '20px 0', fontSize: '30px' }}>Specialty Cookie Cakes</h2>

      <div style={cardStyle}>
        <label>
          <input type="checkbox" value="Deluxe Chocolate Chip" {...register('cookie-1')} />
          #1 <b>Deluxe Chocolate Chip</b>
        </label>
        <div style={{ marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
          <select {...register('cookie-1-layer')} style={{ marginRight: '10px' }}>
            <option value="">Layer</option>
            <option value="single">Single Layer</option>
            <option value="double">Double Layer</option>
          </select>
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
          #2 <b>Dark Chocolate Cashew & Sea Salt</b>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '25px' }}>
          <select
            {...register('cookie-2-layer', { required: isOption2Checked ? 'Please select a layer' : false })}
            style={{ marginRight: '10px' }} // Spacing between dropdown and checkbox
          >
            <option value="">Layer</option>
            <option value="single">Single Layer</option>
            <option value="double">Double Layer</option>
          </select>
          <label>
            <input type="checkbox" {...register('no-cashews-selected')} /> No Cashews
          </label>
        </div>
      </div>

      <div style={cardStyle}>
        <label>Select Date:</label>
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
        <input type="hidden" {...register('selectedDate', { required: 'Date is required' })} />
        {errors.selectedDate && <span style={{ color: 'red' }}>{errors.selectedDate.message}</span>}
      </div>

      <h2 style={{ textAlign: 'center', color: '#2B7EC3', margin: '20px 0', fontSize: '20px', fontWeight: 'bold'}}>Contact Information</h2>
      {renderInput('name', 'Name', 'text', { required: 'Name is required' })}
      {renderInput('email', 'Email', 'email', {
        required: 'Email is required',
        pattern: { value: /^\S+@\S+$/, message: 'Email is not valid' },
      })}
      {renderInput('phone', 'Telephone', 'tel', { required: 'Phone number is required' })}

      <div className="bottomMargin">
        <label>Select your contact preference(s):</label>
        <label>
          <input type="radio" value="email" {...register('contactPreference', { required: 'You must select an option' })} /> Email
        </label>
        <label>
          <input type="radio" value="phone" {...register('contactPreference')} /> Phone
        </label>
        <label>
          <input type="radio" value="text" {...register('contactPreference')} /> Text
        </label>
      </div>

      <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#2B7EC3', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Submit
      </button>
    </form>
  );
};

export default FormTest;
