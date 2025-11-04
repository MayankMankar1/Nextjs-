// import React from 'react'
// import './styles.css'

// export const metadata = {
//   description: 'A blank template using Payload in a Next.js app.',
//   title: 'Payload Blank Template',
// }

// export default async function RootLayout(props: { children: React.ReactNode }) {
//   const { children } = props

//   return (
//     <html lang="en">
//       <body>
//         <main>{children}</main>
//       </body>
//     </html>
//   )
// }

// import './globals.css';

// export const metadata = {
//   title: 'Mayank | Web Designer Portfolio',
//   description: 'Portfolio showcasing web design, branding, and development services.',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }

// import '../(frontend)/styles.css'
import '../(frontend)/global.css'
import { ThemeProvider } from '../(frontend)/providers/Theme'

export const metadata = {
  title: 'Portfolio',
  description: 'Next.js + Tailwind Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
