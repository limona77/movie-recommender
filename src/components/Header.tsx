import { Search } from 'lucide-react';
import type { JSX } from 'react';

const Header = (): JSX.Element => {
  return (
    <header className="bg-amber-600 border-gray-200 dark:bg-gray-800">
      <div className="p-10 pb-6">
        <nav className="flex flex-col flex-wrap  gap-2 ">
          <a href="*" className="w-60">
            <span className="inline-block text-white font-bold">
              🎬 Рекомендации фильмов
            </span>
          </a>

          <div className=" dark:text-white w-180">
            Выберите фильм, который вам нравится и получите персональные
            персональные рекомендации
          </div>
          <div className="relative flex items-center bg-white w-55 ">
            <Search
              className="absolute pointer-events-none text-black"
              size={20}
            />
            <input
              type="text"
              placeholder="введите название фильма"
              className="w-55  pl-6"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
