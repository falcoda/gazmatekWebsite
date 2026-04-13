import "./Button.scss";

import { forwardRef, ReactNode } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";

type ButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: "big" | "small" | "transparent";
  className?: string;
  label?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  href?: string;
  height?: number | string;
  width?: number | string;
  margin?: string;
  padding?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      className,
      label,
      icon,
      type = "button",
      style = "big",
      isLoading,
      href,
      height,
      width,
      margin,
      padding,
    },
    ref,
  ) => {
    const animatedNavigate = useAnimatedNavigate();
    const isExternalLink = (url: string) => {
      return /^(http|https|mailto):/.test(url);
    };

    const handleClick = () => {
      if (isLoading) {
        toast.error("Opération en cours");
        return;
      }
      if (href) {
        if (isExternalLink(href)) {
          window.open(href, "_blank");
        } else {
          animatedNavigate(href);
        }
      } else if (onClick) {
        onClick();
      }
    };
    return (
      <button
        onClick={handleClick}
        className={`${className ?? ""} styledButton ${style}`}
        type={type}
        ref={ref}
        style={{
          height: height,
          width: width,
          margin: margin,
          padding: padding,
        }}
      >
        {isLoading ? (
          <FaSpinner className="loaderButton" />
        ) : (
          <>
            {icon}
            {label}
          </>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";
export default Button;
