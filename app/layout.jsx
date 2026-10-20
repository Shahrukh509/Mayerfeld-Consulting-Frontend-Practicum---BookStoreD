import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Booklovers - Independent Bookstore & Cultural Hub',
  description:
    'Discover curated fiction, inspiring non-fiction, author readings, and a passionate community of book lovers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
