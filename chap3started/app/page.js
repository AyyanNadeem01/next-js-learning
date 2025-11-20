import styles from"./home.module.css"
import style2 from "./home.module.scss"
//import "./globals.css"
export const dynamic="force-dynamic";//this will make the page dynamic and will run on every request
const Home = () => {
    
  return (
    <>

      <div>
        <h1 className={styles.title}>Home Page</h1>
        <p className={style2.para}>Welcome to our website!</p>
      </div>
    </>
  );
};

export default Home;