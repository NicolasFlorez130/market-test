import Link from "next/link";
import BarsIcon from "./svgs/BarsIcon";
import CartIcon from "./svgs/CartIcon";

const NavBar = () => {
  return (
    <nav className="border-y border-gray-200">
      <ul className="flex justify-between fill-main px-4 py-3 font-bold  text-main">
        <li className="grid">
          <button className="h-5 flex-none self-center">
            <BarsIcon className="aspect-square h-full" />
          </button>
        </li>
        <li>
          <Link href="#">Categorías</Link>
        </li>
        <li>
          <Link href="#">Historial</Link>
        </li>
        <li>
          <Link href="#">Destacados</Link>
        </li>
        <li className="grid">
          <button className="h-5 flex-none self-center">
            <CartIcon className="aspect-square h-full" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
