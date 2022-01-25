import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { increment, decrement } from "../app/couter/couter.slice";

export default function CounterPage() {
  const dispatch = useDispatch();
  const { value } = useSelector((state: RootStateOrAny) => state.counter);

  const plus = (event: React.MouseEvent<HTMLElement>): void => {
    const { name, value } = event.target as HTMLButtonElement;
    dispatch(increment());
  };

  const minus = (): void => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1>Counter</h1>
      <div className="wrapper">
        <button onClick={minus}>-</button>
        <span>{value}</span>
        <button onClick={plus}>+</button>
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}
