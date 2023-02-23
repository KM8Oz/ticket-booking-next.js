import Link from 'next/link';
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <div className="logo">
          <Image src="/logo.svg" alt="site logo" width={100} height={60} />
          <div className="header__text">
            <div>Астрахань</div>
            <div className="header__text-addition">ТЦ "Алимпик",</div>
            <div className="header__text-addition">ул. Боевая, 25</div>
          </div>
          <div className="header__text">
            <div>999-505</div>
            <div className="header__text-addition">Касса</div>
            </div>
        </div>
      </Link>
      <Link href="/"><a>домашний</a></Link>
    </nav>
  );
}

export default Navbar;