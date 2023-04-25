import React from 'react';
import { CSSProperties } from 'react';
import { ThemeConfig } from 'tailwindcss/types/config';

import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
export function GridMain() {}

interface RowProps {
	wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
	direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
}

export function Row({ wrap, direction = 'row', children }: React.PropsWithChildren<RowProps>) {
	return <div className={`flex flex-${direction} ${wrap ? `flex-${wrap}` : ''}`}>{children}</div>;
}

type BasisSpace = keyof DefaultTheme['spacing'] | 'auto' | 'full';
type BasisPercentage =
	| '1/2'
	| '1/3'
	| '2/3'
	| '1/4'
	| '2/4'
	| '3/4'
	| '1/5'
	| '2/5'
	| '3/5'
	| '4/5'
	| '1/6'
	| '2/6'
	| '3/6'
	| '4/6'
	| '5/6'
	| '1/12'
	| '2/12'
	| '3/12'
	| '4/12'
	| '5/12'
	| '6/12'
	| '7/12'
	| '8/12'
	| '9/12'
	| '10/12'
	| '11/12';
interface ColProps {
	flex?: '1' | 'auto' | 'initial' | 'none';
	basis?: BasisSpace & BasisPercentage;
	grow?: '1' | '0';
	shrink?: '1' | '0';
	className?: string;
}
export function Col({ flex, basis, grow, shrink, className }: React.PropsWithChildren<ColProps>) {
	const zeroOrNone = (name: 'grow' | 'shrink', value?: '1' | '0') => {
		if (value === undefined) return '';
		return value === '1' ? `${name}` : `${name}-0`;
	};
	const makeClasses = React.useMemo(() => {
		const classes = [];

		if (flex) {
			classes.push(`flex-${flex}`);
		}
		if (basis) {
			classes.push(`basis-${basis}`);
		}
		if (grow) {
			classes.push(zeroOrNone('grow', grow));
		}
		if (shrink) {
			classes.push(zeroOrNone('shrink', shrink));
		}
		let classNames = classes.join(' ');
		if (classes.length === 0) return;
		if (className) {
			classNames.concat(` ${className}`);
		}
		return className;
	}, [flex, basis, grow, shrink, className]);
	return <div className={makeClasses}></div>;
}
