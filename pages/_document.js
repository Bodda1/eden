import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>Eden: Eden</title>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
