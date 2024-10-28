import FormTest from '../components/FormTest.jsx';
import Navbar from '../components/Navbar.jsx';
import styles from '../../styles/Navbar.module.css';
import '../../styles/styles.css'

const About = () => {
  return (
    <>
      <Navbar />
      <br></br>
      <div style={{textAlign: 'center'}} className="w-full max-w-xl mx-auto flex-1">
        <h3 className="text-center mb-6 text-3xl font-bold sm:text-4x1 sm:text-center" data-sb-field-path="heading">
          About Us
        </h3>
        <p className="mb-6 text-lg text-center" data-sb-field-path="body">
          At Oak and Pine Bakery, we believe that nourishment goes beyond just the body; it encompasses the mind and
          spirit as well. Rooted in our faith, we put God first in everything we do, crafting each product with care and
          intention. Our commitment to health is reflected in our selection of wholesome ingredients, ensuring that
          every bite is both delicious and beneficial. We aim to create a welcoming space where our community can come
          together, celebrate life’s moments, and enjoy the goodness of baked treats that uplift the spirit. Join us on
          this journey of wellness and joy, as we share our passion for baking with heart and purpose.
        </p>
      </div>
    </>
  );
};

export default About;
