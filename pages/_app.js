import 'tailwindcss/tailwind.css';
import Head from 'next/head'; // Import the Head component

export default function App({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}
