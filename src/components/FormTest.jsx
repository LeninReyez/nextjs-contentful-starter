'use client'
import React from 'react';
import { useForm } from 'react-hook-form';

const FormTest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="example">Example Field:</label>
        <input
          id="example"
          {...register('example', { required: 'This field is required' })}
        />
        {errors.example && <span>{errors.example.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormTest;