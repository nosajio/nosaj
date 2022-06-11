import h from "hyperscript";
import * as s from "./styles";

export default (props: Record<any, any>) => (
  <h1 className={s.hi}>Hello {props.name}!</h1>
);
