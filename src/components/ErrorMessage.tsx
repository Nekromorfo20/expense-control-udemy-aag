import { ReactNode } from "react"

type TErrorMessageProps = {
    children : ReactNode
}

const ErrorMessage = ({ children } : TErrorMessageProps) => {
  return (
    <p className="bg-red-600 p-2 font-bold text-white text-sm text-center">
        {children}
    </p>
  )
}

export default ErrorMessage