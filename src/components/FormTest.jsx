'use client'
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

    emailjs.sendForm('service_bahenfj', 'template_550i7ji', '#cookies-order', 'qeXWWBIPhLVcfD2yZ').then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );
  };

  return (
    <form id="cookies-order" onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h1>Order Now</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
        type="name"
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

      {/* <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
      </div> */}

      <div>
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

      
      <hr></hr>

      <div>
        <label>
          <input
            type="checkbox"
            value="vanilla"
            {...register('flavors', {
              required: 'You must select at least one option',
            })}
          />
          vanilla
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="chocolate"
            {...register('flavors')}
          />
          chocolate
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="strawberry"
            {...register('flavors')}
          />
          strawberry
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="mint"
            {...register('flavors')}
          />
          mint
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormTest;
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import '../../styles/styles.css';



// const FormTest = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   return (
//     <form onSubmit={handleSubmit((data) => console.log(data))}>
//       <input {...register('firstName')} />
//       <input {...register('lastName', { required: true })} />
//       {errors.lastName && <p>Last name is required.</p>}
//       <input {...register('age', { pattern: /\d+/ })} />
//       {errors.age && <p>Please enter number for age.</p>}
//       <input type="submit" />
//     </form>
//   );
// };

// export default FormTest;