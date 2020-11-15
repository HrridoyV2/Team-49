import React from "react";
import "./BookingForm.css";
import { useForm } from "react-hook-form";
function BookingForm() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          ref={register({ required: true })}
          name="name"
          placeholder="Full Name"
          className="form-control"
          required
        />
        {errors.name && <span>This field is required</span>}
        <br />
        <input
          type="number"
          ref={register({ required: true })}
          name="number"
          placeholder="Phone No."
          className="form-control"
          required
        />
        {errors.number && <span>This field is required</span>}
        <br />
        <input
          type="text"
          ref={register({ required: true })}
          name="email"
          placeholder="Email Address"
          className="form-control"
          required
        />
        {errors.email && <span>This field is required</span>}
        <br />
        <textarea
          ref={register({ required: true })}
          name="message"
          placeholder="Message"
          className="form-control"
          cols="22"
          rows="5"
          required
        ></textarea>
        {errors.email && <span>This field is required</span>}
        <br />
        <input
          type="submit"
          className="btn btn-block btn-success"
          value="Request Booking"
        />
      </form>
    </div>
  );
}

export default BookingForm;
