export const metadata = {
  title: {
    template: "%s | Technical Agency",
    default: "Technical Agency",
  },
  description: "This is the main layout description",
  keywords: ["NextJS","ReactJs"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <title>Home</title>not recommended way */}
      <body >
       <header style={{background:"red",color:"#fff",textAlign:"center"}}>Header</header>
       {children}
       <footer style={{background:"green",color:"#fff",textAlign:"center"}}>Footer</footer>
      </body>
    </html>
  );
}
