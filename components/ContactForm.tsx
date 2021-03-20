import axios from "axios";
import { useEffect } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    errors,
    formState,
  } = useForm();
  const onSubmit = (data) => {
    return axios
      .post("/api/contact", data)
      .then((res) => console.log("sucess"))
      .catch((error) => console.log(error));
  };

  const onVerifyCaptcha = (token) => {
    setValue("captchaToken", token);
  };

  useEffect(() => {
    register({ name: "captchaToken" }, { required: true });
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            name="name"
            type="text"
            className={`input ${errors.name ? "is-danger" : ""}`}
            ref={register({ required: true })}
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
            name="email"
            type="email"
            className={`input ${errors.email ? "is-danger" : ""}`}
            ref={register({
              required: true,
              pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            })}
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
            name="message"
            className={`textarea ${errors.email ? "is-danger" : ""}`}
            ref={register({ required: true })}
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
            disabled={!formState.isDirty || formState.isSubmitting}
            className={`button is-link ${
              formState.isSubmitting ? "is-loading" : ""
            } ${formState.isSubmitSuccessful ? "is-success" : null}`}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
