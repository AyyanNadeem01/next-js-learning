import Header from "../components/Header"
import ThemeProvider from "../context/ThemeContext"
import './globals.css';
export const dynamic="force-dynamic"
export default function RootLayout({ children }) {//layout error cannot be handled by app/error.js because layout layer is above all pages
  // const randomNumber = Math.random();
  // console.log(randomNumber);
  
  // if (randomNumber > 0.5) {
  //   throw new Error("Error occurred");//this is error which occur sometime, sometime not
  // }
  return (
    <html lang="en">
      <body
        >
        <ThemeProvider>
           <Header/>
          {children}</ThemeProvider>
      </body>
    </html>
  );
}
