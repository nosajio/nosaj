import h from "hyperscript";
import "./styles.css";

export default (props: Record<any, any>) => (
  <h1 className="hi">Hello {props.name}!</h1>
);
