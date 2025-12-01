import '@testing-library/jest-dom';

// Polyfill para `window.matchMedia` usado por Ant Design (responsiveObserver)
// Evita el error: "TypeError: window.matchMedia is not a function" en jsdom
if (typeof window !== 'undefined' && !window.matchMedia) {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}),
	});
}
