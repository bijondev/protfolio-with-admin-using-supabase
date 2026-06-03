"use client";

import type { ReactNode } from "react";

type Props = {
  message: string;
  children: ReactNode;
  className?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
};

export function ConfirmButton({ message, children, className, formAction }: Props) {
  return (
    <button
      type="submit"
      formAction={formAction}
      className={className}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
