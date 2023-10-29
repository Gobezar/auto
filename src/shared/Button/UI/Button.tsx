import React from "react";
import cn from "classnames";
import cl from "./Button.module.scss";

interface IButton {
  children: string;
  onClick?: () => void;
  size: "big" | "middle";
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<IButton> = ({ children, onClick, size, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        cl.button,
        size === "big" && cl.big,
        size === "middle" && cl.middle
      )}
    >
      {children}
    </button>
  );
};

export default Button;
