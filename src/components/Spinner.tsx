import cx from "classnames";

export const Spinner = ({ className, label }: { className: string, label: string }) => {
  return (

    <button type="button" className={cx("bg-indigo-500 text-white px-4 py-2 rounded-md", className)} disabled>
      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
      </svg>
      {label}
    </button>
  )
}
