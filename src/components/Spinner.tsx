"use client"

import cx from "classnames";

export const Spinner = ({ className, label }: { className?: string, label?: string }) => {
  return (

    <button type="button" className={cx("flex items-center justify-center bg-indigo-500 text-white px-4 py-2 rounded-md", className)} disabled>
      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      {label}
    </button>
  )
}
