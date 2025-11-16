

export default function RootLayout({ children }) {
  return (
    <>
       <header style={{background:"red",color:"#fff",textAlign:"center"}}>Header Marketing ()</header>
       {children}
       <footer style={{background:"green",color:"#fff",textAlign:"center"}}>Footer Marketing()</footer>
      </>
  );
}
