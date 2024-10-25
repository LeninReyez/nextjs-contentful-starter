"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/styles.css';
import emailjs from 'emailjs-com';

const FormTest = () => {
  // Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    // emailjs.sendForm('service_bahenfj', 'template_550i7ji', '#cookies-order', 'qeXWWBIPhLVcfD2yZ').then(
    //   (response) => {
    //     console.log('SUCCESS!', response.status, response.text);
    //   },
    //   (error) => {
    //     console.log('FAILED...', error);
    //   },
    // );
  };

  const myStyle = {
    border: '1px solid black',
    padding: '10px',
    };

  return (
    <form id="cookies-order" onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '800px', margin: 'auto' }}>
      <h1>Order Now</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
      </div>

      <div>
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

      <div>
        <label htmlFor="email">Select your cookie size:</label>
        <label>
          <input
            type="radio"
            value="Small"
            {...register('cookie-size', { required: 'You must select an option' })}
          />
          Small
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="Medium"
            {...register('cookie-size', { required: 'You must select an option' })}
          />
          Medium
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="Large"
            {...register('cookie-size', { required: 'You must select an option' })}
          />
          Large
        </label>
      </div>
      <div>        
        <label style={{textAlign: 'center'   }} htmlFor="email">Specialty Cookie Cakes</label></div>

      <div style={myStyle}>
        <label>
          <input
            type="checkbox"
            value="vanilla"
            {...register('flavors', {
              required: 'You must select at least one option',
            })}
          />
          #1 <b>Deluxe Chocolate Chip</b>; milk, semi, dark chips frosted w/ vanilla and chocolate frostings.
        </label>
      </div>

      <div style={myStyle}>
        <label>
          <input
            type="checkbox"
            value="chocolate"
            {...register('flavors')}
          />
          #2 Dark Chocolate Cashew & Sea Salt; dairy-free, vanilla frosted (dairy free)
        </label>

        <p style={{ color: 'black', margin: '10px' }}>
       
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        <label htmlFor="vehicle1" style={{ marginLeft: '5px', marginRight: '10px' }}>No Cashews</label>

        <label style={{border: 'dashed black 1px', padding: '5px'}} for="cars">Layer:
          <select name="cars" id="cars">
          <option value="single">Single Layer</option>
          <option value="double">Double Layer</option>
        </select>
        </label>

        </div>
          </p>
      </div>

      <div style={myStyle}>
        <label>
          <input
            type="checkbox"
            value="strawberry"
            {...register('flavors')}
          />
          #3 White Chip Funfetti; rainbow sprinkles and vanilla frosted
        </label>
      </div>

      <div style={myStyle}>
        <label>
          <input
            type="checkbox"
            value="mint"
            {...register('flavors')}
          />
          #4 Double Chocolate; chocolate cookie and chips, vanilla frosted w/ chocolate sprinkles
        </label>
      </div>

      <div style={myStyle}>
        <label>
          <input
            type="checkbox"
            value="triple-chocolate"
            {...register('flavors')}
          />
          #5 Triple Chocolate; chocolate cookie, chips and chocolate frosting
        </label>
      </div>

      {/* <div style={myStyle}>
        <label>
          <input
            type="checkbox"
            value="oreo"
            {...register('flavors')}
          />
          <text><span style={{ color: 'green' }}>#6 Chocolate Oreo Cookie</span>; white chips, vanilla frosted, Oreo topping</text>
        </label>
      </div> */}


      <button type="submit">Submit</button>
    </form>
  );
};

export default FormTest;
