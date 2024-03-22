"use client";
import clsx from "clsx";
interface Prop {
  children: React.ReactNode | string;
  btnClass?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
/* btnClass
info
success
warning
error
neutral
primary
secondary
accent */

const Button = ({ children, btnClass, type, onClick }: Prop) => {
  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      className={clsx("btn", btnClass ? `btn-${btnClass}` : 'bg-gray-200')}
    >
      {children}
    </button>
  );
};

export default Button;
