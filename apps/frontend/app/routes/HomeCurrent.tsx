import type { Route } from "./+types/HomeCurrent";
import { Welcome } from "../welcome/welcome";

export async function loader({}: Route.LoaderArgs) {
  return null;
}
export default function HomeCurrent() {
  return <p>Hola desde Home Current</p>;
}
