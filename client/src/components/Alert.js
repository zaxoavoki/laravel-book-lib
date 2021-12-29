export default function Alert({ style, options, message, close }) {
  if (options.type === "error") {
    options.type = "danger";
  }

  return (
    <div
      className={`alert alert-${options.type} alert-dismissible fade show`}
      role="alert"
      style={style}
    >
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={close}
      ></button>
    </div>
  );
}
