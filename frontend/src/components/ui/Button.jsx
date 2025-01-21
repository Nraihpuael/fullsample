import React from 'react';
import '../../styles/components/ui/button.css';

const buttonVariants = {
  default: 'defaultVariant',
  outline: 'outlineVariant',
  ghost: 'ghostVariant',
  cancel: 'cancelVariant',
  back: 'backVariant',
};

const buttonSizes = {
  default: 'defaultSize',
  sm: 'smSize',
  lg: 'lgSize',
  icon: 'iconSize',
};

const Button = React.forwardRef(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      asLink = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    let Comp;
    if (asLink) Comp = 'a';
    else if (asChild) Comp = 'span';
    else Comp = 'button';

    const variantClass = buttonVariants[variant] || buttonVariants.default;
    const sizeClass = buttonSizes[size] || buttonSizes.default;

    return (
      <Comp
        className={`button ${variantClass} ${sizeClass} ${className}`}
        ref={ref}
        {...props}
      >
        {leftIcon && <span style={{ marginRight: '4px' }}>{leftIcon}</span>}
        {props.children}
        {rightIcon && <span style={{ marginLeft: '4px' }}>{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export default Button;
