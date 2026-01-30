// TypeScript global types for jQuery و bootstrap فقط

declare module 'jquery';
declare module 'bootstrap';
// Allow window.$ and window.jQuery
interface Window {
	$: unknown;
	jQuery: unknown;
}
declare module 'bootstrap';
