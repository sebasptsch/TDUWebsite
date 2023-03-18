import { useEffect } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormFields {
  captchaToken: string;
  message: string;
  email: string;
  name: string;
}

export default function ContactForm() {
  const { setValue, register, handleSubmit, watch, reset, formState: {errors, isSubmitting, isDirty} } =
    useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    fetch("/api/contact", {
      body: JSON.stringify(data),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        reset();
      })
      .catch((error) => console.log(error));
  };

  const onVerifyCaptcha = (token: string) => {
    setValue("captchaToken", token);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            type="text"
            className={`input ${errors.name ? "is-danger" : ""}`}
            {...register("name", { required: true })}
          />
        </div>
        {errors.name ? (
          <p className="help is-danger">{errors.name.type}</p>
        ) : null}
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            type="email"
            className={`input ${errors.email ? "is-danger" : ""}`}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email ? (
          <p className="help is-danger">{errors.email.type}</p>
        ) : null}
      </div>
      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea
            className={`textarea ${errors.email ? "is-danger" : ""}`}
            {...register("message", { required: true })}
          />
        </div>
        {errors.message ? (
          <p className="help is-danger">{errors.message.type}</p>
        ) : null}
      </div>
      <GoogleReCaptcha onVerify={onVerifyCaptcha} />
      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isDirty || isSubmitting}
            className={`button is-link ${
              isSubmitting ? "is-loading" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
