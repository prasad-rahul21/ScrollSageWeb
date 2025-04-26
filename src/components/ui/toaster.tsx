"use client"

import { Toaster as SonnerToaster } from "sonner" // Assuming sonner might be added later
import { useToast } from "@/components/ui/use-toast" // Keep using the shadcn hook for now
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast() // Use the default shadcn toast hook

  return (
    <>
      {/* Default Shadcn Toaster */}
      <ToastProvider>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
          )
        })}
        <ToastViewport />
      </ToastProvider>

      {/* Sonner Toaster (if added later) */}
      {/* <SonnerToaster position="top-right" /> */}
    </>
  )
}

