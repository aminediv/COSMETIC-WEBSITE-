import React from 'react';

interface BlurTitleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  delay?: number;
  duration?: number;
  stagger?: number;
  align?: 'left' | 'center' | 'right';
  hoverEffect?: boolean;
}

export default function BlurTitle({
  text,
  className = '',
  as: Component = 'h2',
  align = 'center',
}: BlurTitleProps) {
  const alignmentClass = 
    align === 'left' ? 'text-left' : 
    align === 'right' ? 'text-right' : 
    'text-center';

  return (
    <Component className={`${className} ${alignmentClass}`}>
      {text.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Component>
  );
}
