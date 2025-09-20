import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export async function loader({}: Route.LoaderArgs) {
  return null;
}
export default function Home() {
  return <Welcome />;
}
