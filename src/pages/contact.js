import FormTest from '../components/Form.jsx';
import Navbar from '../components/Navbar.jsx';
import '../../styles/styles.css'


const Contact = () => {
  return (
    <>
      <Navbar />
      <br></br>
      <div style={{textAlign: 'center'}} className="w-full max-w-xl mx-auto flex-1 sm:text-center">
        <h3 className="text-center mb-6 text-3xl font-bold sm:text-4x1 sm:text-center" data-sb-field-path="heading">
          Contact Us
        </h3>
        <br></br>

        <p>If you have any questions or inquiries, feel free to reach out to us!</p>
        <br></br>
        <a href="mailto:oakandpainbakery@gmail.com" className="email-link">
          Email: oakandpinebakehouse@gmail.com
        </a>
      </div>
    </>
  );
};

export default Contact;
