"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function DeleteAddressButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("დარწმუნებული ხართ, რომ გსურთ მისამართის წაშლა?")) {
          e.preventDefault();
        }
      }}
      className="inline-flex items-center gap-1.5 text-destructive disabled:opacity-50 cursor-pointer hover:opacity-50" 
    >
      <Trash2 className="size-3.5 " /> წაშლა
    </button>
  );
}