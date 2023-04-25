import React from 'react';

type ComponentNames = 'AuthButton' | 'AuthTitle';
type ComponentObject = {
	[K in ComponentNames]?: React.ReactNode;
} & {
	AuthChildrens?: React.ReactNodeArray;
};

const names = ['AuthButton', 'AuthTitle'];

export default function useLocateCompObject(children: React.ReactNode) {
	const locateObject: ComponentObject = {};
	React.Children.forEach(children, (child) => {
		if (React.isValidElement(child) && child.type instanceof Function) {
			if (isComponentNames(child.type.name)) {
				locateObject[child.type.name] = child;
			} else {
				locateObject.AuthChildrens = (locateObject.AuthChildrens || []).concat(child);
			}
		}
	});
	return locateObject;
}

function isComponentNames(name: string): name is ComponentNames {
	if (names.includes(name)) {
		return true;
	}
	return false;
}
