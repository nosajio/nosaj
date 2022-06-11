import h from "hyperscript";
import hello from "./components/Hello";

export default (props: Record<any, any>): JSX.Element => {
  const Hello = hello(props);
  return <div>{Hello}</div>;
};
