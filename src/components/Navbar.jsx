import Link from 'next/link';
import styles from '../../styles/Navbar.module.css'; // Optional for styling

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/order">Order</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
};

export default Navbar;