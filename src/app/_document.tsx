import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/placeholder-override.css" />
        <link rel="stylesheet" href="/input-placeholder-normal.css" />
        {/* Bootstrap 3 CDN for Summernote compatibility */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
