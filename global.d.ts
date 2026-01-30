// TypeScript global types for jQuery, bootstrap, and react-summernote modules

declare module 'jquery';
declare module 'bootstrap';
// Allow window.$ and window.jQuery
interface Window {
	$: any;
	jQuery: any;
}
declare module 'bootstrap';
