import type { InputHTMLAttributes } from "react";

export default function Input(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      className="rounded-lg border border-gray-300 px-3 py-2"
      {...props}
    />
  );
}