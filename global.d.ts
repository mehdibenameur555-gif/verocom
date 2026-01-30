// TypeScript global types for jQuery, bootstrap, and react-summernote modules

declare module 'jquery';
declare module 'react-summernote' {
	import * as React from 'react';
	interface SummernoteProps {
		value?: string;
		defaultValue?: string;
		options?: any;
		onChange?: (content: string) => void;
		[key: string]: any;
	}
	const Summernote: React.FC<SummernoteProps>;
	export = Summernote;
}
// Allow window.$ and window.jQuery
interface Window {
	$: any;
	jQuery: any;
}
declare module 'bootstrap';
