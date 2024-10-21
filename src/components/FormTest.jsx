'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/styles.css';

const FormTest = () => {
  // Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: 'auto' }}>
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

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="option1"
            {...register('option', { required: 'You must select an option' })}
          />
          Option 1
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="option2"
            {...register('option', { required: 'You must select an option' })}
          />
          Option 2
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="option3"
            {...register('option', { required: 'You must select an option' })}
          />
          Option 3
        </label>
      </div>

      
      <hr></hr>

      <div>
        <label>
          <input
            type="checkbox"
            value="option1"
            {...register('options', {
              required: 'You must select at least one option',
            })}
          />
          Option 1
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="option2"
            {...register('options')}
          />
          Option 2
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="option3"
            {...register('options')}
          />
          Option 3
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="option4"
            {...register('options')}
          />
          Option 4
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