import Link from "next/link";
import styled from "styled-components";
import { Themes } from "../pages/StyleVariables";
import BarsIcon from "./svgs/BarsIcon";
import CartIcon from "./svgs/CartIcon";

const NavBar = () => {
  return (
    <Nav>
      <ul>
        <li>
          <button>
            <BarsIcon />
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
        <li>
          <button>
            <CartIcon />
          </button>
        </li>
      </ul>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  border: 0 rgb(229 231 235) solid;
  border-top-width: 1px;
  border-bottom-width: 1px;

  ul {
    color: ${Themes.main};
    display: flex;
    fill: ${Themes.main};
    font-weight: bold;
    justify-content: space-between;
    padding: 0.75rem 1rem;

    li {
      &:first-child,
      &:last-child {
        display: grid;
      }

      button {
        align-self: center;
        display: flex;
        height: 1.25rem;

        svg {
          aspect-ratio: 1/1;
          height: 100%;
        }
      }
    }
  }
`;
