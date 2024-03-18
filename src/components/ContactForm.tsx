import useZodForm from "@/hooks/useZodForm";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface FormFields {
  captchaToken: string;
  message: string;
  email: string;
  name: string;
}

const FormSchema = z.object({
  email: z.string().email(),
  message: z.string(),
  name: z.string(),
  captchaToken: z.string(),
});

interface ContactFormProps {
  support?: boolean;
}

export default function ContactForm({ support = false }: ContactFormProps) {
  const contactMutation = trpc.contact.useMutation();
  const alert = useAlert();

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useZodForm({
    schema: FormSchema,
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await contactMutation.mutateAsync({ ...data, support });
      alert.success("Message sent!");
      reset();
    } catch (error) {
      alert.error("Error sending message");
    }
  };

  const onVerifyCaptcha = (token: string) => {
    setValue("captchaToken", token);
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LePQYcaAAAAADCt0y4pP_nCj1VNMOXheQG-mh-f"
      scriptProps={{
        async: false, // optional, default to false,
        defer: false, // optional, default to false
        appendTo: "head", // optional, default to "head", can be "head" or "body",
        nonce: undefined, // optional, default undefined
      }}
    >
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
            <p className="help is-danger">{errors.name.message}</p>
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
            <p className="help is-danger">{errors.email.message}</p>
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
            <p className="help is-danger">{errors.message.message}</p>
          ) : null}
        </div>
        <GoogleReCaptcha onVerify={onVerifyCaptcha} />
        <div className="field is-grouped">
          <div className="control">
            <button
              disabled={!isDirty || isSubmitting}
              className={`button is-link ${isSubmitting ? "is-loading" : ""}`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </GoogleReCaptchaProvider>
  );
}
