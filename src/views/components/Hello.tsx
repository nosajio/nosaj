import h from "hyperscript";
import * as s from "./hello.scss";

export default (props: Record<any, any>) => (
  <h1 className={s.hi}>Hello {props.name}!</h1>
);
