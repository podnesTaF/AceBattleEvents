import React from "react";

type MenuItemGradientProps = {
  children: React.ReactNode;
  variant?: "light" | "dark";
  direction?: "left" | "right";
};

const MenuItemGradient = ({
  children,
  variant = "light",
  direction = "right",
}: MenuItemGradientProps): JSX.Element => {
  // Determine the variant class
  const variantClass =
    variant === "light" ? "menu-item-light" : "menu-item-dark";

  // Determine the direction class and border style
  const directionClass =
    direction === "right"
      ? "pr-[2px] rounded-l-none"
      : "pl-[2px] rounded-r-none";

  // Combine classes for the final className
  const className = `py-[2px] w-full rounded-[30px] overflow-hidden ${directionClass} ${variantClass}-${direction}`;

  return (
    <div className={className}>
      <div
        className={`w-full h-full rounded-[28px] ${directionClass} ${
          variant === "light"
            ? "bg-white hover:bg-accent "
            : "bg-[#1c1e1f] hover:bg-[#242628]  text-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MenuItemGradient;
