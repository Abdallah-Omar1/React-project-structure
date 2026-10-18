
type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`reusable-button button-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
