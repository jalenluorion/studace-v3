import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Maximize2, Menu, User } from "lucide-react"

function Module({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "modsm:w-72 modmd:w-72 modmodlg:w-72 w-full h-full bg-card text-card-foreground flex flex-col gap-2 rounded-xl border py-3 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

// todo: css fucking sucks ballsss
function ModuleHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-1 has-data-[slot=card-description]:grid-rows-[auto_auto] items-start has-data-[slot=card-description]:gap-1 px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-2",
        className
      )}
      {...props}
    />
  )
}

function ModuleTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold h-full flex items-center", className)}
      {...props}
    />
  )
}

function ModuleAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end flex gap-1",
        className
      )}
      {...props}
    />
  )
}

function SocialButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn('', className)}
      variant="ghost"
      size="xs"
      {...props}
    >
      <User />
    </Button>
  )
}

function ExpandButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn('', className)}
      variant="ghost"
      size="xs"
      {...props}
    >
      <Maximize2 />
    </Button>
  )
}

function MenuButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn('', className)}
      variant="ghost"
      {...props}
      size="xs"
    >
      <Menu />
    </Button>
  )
}

function ModuleContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-3 flex-1", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-3 [.border-t]:pt-2", className)}
      {...props}
    />
  )
}

export {
    Module,
    ModuleHeader,
    ModuleTitle,
    ModuleAction,
    SocialButton,
    ExpandButton,
    MenuButton,
    ModuleContent,
    CardFooter
}
