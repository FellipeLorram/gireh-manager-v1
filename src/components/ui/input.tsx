import { cn } from "@/lib/utils"
import { forwardRef } from "react";
import InputMask, { type Props as InputMaskProps } from 'react-input-mask';

export interface InputProps extends Omit<InputMaskProps, 'mask'> {
  mask?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, mask, type, ...props }, ref) => {
    return (
      <>
        {mask ? (
          <InputMask
            mask={mask ?? ""}
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            inputRef={ref}
            {...props}
          />
        ) :
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        }
      </>

    )
  }
)
Input.displayName = "Input"

export { Input }
