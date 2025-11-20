import "./home.css"
export const dynamic="force-dynamic";//this will make the page dynamic and will run on every request
const Home = () => {
    
  return (
    <>

      <div>
        <h1 className="title">Home Page</h1>
        <p>Welcome to our website!</p>
      </div>
    </>
  );
};

export default Home;