
import FormTest from '../components/Form.jsx';
import Navbar from '../components/Navbar.jsx';
// import styles from '../../.next/static/css/app/layout.css'
import ThankYouContent from '../components/Thankyou.jsx'

const ThankYou = () => {
  return (
    <>
      <Navbar />
      <ThankYouContent/>
      <footer
        style={{
          backgroundColor: '#333',
          color: 'white',
          textAlign: 'center',
          fontSize: '14px',
          padding: '20px', // Added padding here
        }}
      >
        <p>© 2024 Oak &amp; Pine Bakehouse. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default ThankYou;