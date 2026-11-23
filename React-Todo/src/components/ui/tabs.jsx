import * as React from "react"
import { cn } from "@/lib/utils"

const TabsList = ({ className, ...props }) => (
  <div
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
)

const TabsTrigger = ({ active, className, ...props }) => (
  <button
    type="button"
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all",
      active
        ? "bg-background text-foreground shadow-sm"
        : "hover:text-foreground",
      className
    )}
    {...props}
  />
)

export { TabsList, TabsTrigger }
