import SlowCom1 from "../components/SlowCom1";
import SlowCom2 from "../components/SlowCom2";
import SlowCom3 from "../components/SlowCom3";
import Loading from "./loading";
import TodosItems from "../components/TodosItems";
import { Suspense } from "react";

const Todos = async () => {
  return (
    <>
      <h1>Todos</h1>

      <Suspense fallback={<Loading text="Todo Items" />}>
        <TodosItems />
      </Suspense>

      <Suspense fallback={<Loading text="Slow Component 1" />}>
        <SlowCom1 />
      </Suspense>

      <Suspense fallback={<Loading text="Slow Component 2" />}>
        <SlowCom2 />
      </Suspense>

      <Suspense fallback={<Loading text="Slow Component 3" />}>
        <SlowCom3 />
      </Suspense>
    </>
  );
};

export default Todos;
