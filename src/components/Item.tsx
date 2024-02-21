import { VDOM } from "@/lib/jsx/type";

interface Props {
  text: string;
}
const Item = ({ text }: Props) => {
  return <li>{text}</li>;
};

export default Item;
