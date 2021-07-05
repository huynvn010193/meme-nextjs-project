import Link from "next/link";
import { useGlobalState } from "../../state";

const HeaderMenu = () => {
  const [categories] = useGlobalState("categories");

  return (
    <nav>
      <ul className="ass1-header__menu">
        <li>
          <a>Danh mục</a>
          <div className="ass1-header__nav">
            <div className="container">
              <ul>
                <li>
                  <a href="index.html">Funny</a>
                </li>
                {categories.map((cate) => {
                  return (
                    <li key={cate.id}>
                      <Link
                        href="/categories/[cateId]"
                        as={`/categories/${cate.id}`}
                      >
                        <a href="/">{cate.text}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="ass1-header__menu-transition" />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderMenu;
