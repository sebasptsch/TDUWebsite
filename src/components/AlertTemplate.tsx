import { useMemo } from "react";
import { AlertTemplateProps } from "react-alert";

export default function AlertTemplate(props: AlertTemplateProps) {
  const alertClass =
    props.options.type === "error"
      ? "is-danger"
      : props.options.type === "success"
      ? "is-success"
      : "is-info";

  return (
    <div className={`notification ${alertClass}`} style={props.style}>
      <button className="delete" onClick={props.close}></button>
      {props.message}
    </div>
  );
}
