import React from 'react';
import { DefaultColors } from 'tailwindcss/types/generated/colors';
type Defaults = 'inherit' | 'current' | 'transparent' | 'black' | 'white';
type ColorNames = keyof DefaultColors;
type Opacities = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
type TextColorType<color = ColorNames> = color extends Defaults
	? color
	: color extends ColorNames
	? `${color}-${Opacities}`
	: never;
interface TypographyProps {
	fontFamily?: 'sans' | 'serif' | 'mono';
	fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
	fontWeight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
	letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
	lineHeight?: 3 | 4 | 5 | 6 | 7 | 9 | 9 | 10 | 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
	textAlign?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
	textColor?: TextColorType;
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p';
}

export default function Typography({
	children,
	fontFamily,
	fontSize,
	fontWeight,
	letterSpacing,
	lineHeight,
	textAlign,
	textColor,
	variant = 'p',
}: React.PropsWithChildren<TypographyProps>) {
	const fonts = React.useMemo(
		() => `font-${fontFamily || 'sans'} font-${fontWeight || 'normal'}`,
		[fontFamily, fontWeight]
	);
	const texts = React.useMemo(
		() => `text-${fontSize || 'base'} text-${textAlign || 'left'} text-${textColor || 'gray-700'}`,
		[fontSize, textAlign, textColor]
	);
	const className = `${texts} leading-${lineHeight || 7} ${fonts} tracking-${letterSpacing} ${texts}`;
	return React.createElement(
		variant,
		{
			className,
		},
		children
	);
}
