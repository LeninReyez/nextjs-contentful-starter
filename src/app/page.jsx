import { notFound } from 'next/navigation';
import { Hero } from '../components/Hero.jsx';
import { getPageFromSlug } from '../utils/content.js';
import Navbar from '../components/Navbar.jsx'

const componentMap = {
  hero: Hero,
  Navbar

};

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug("/");

    if (!page) {
      return notFound();
    }

    return (
      <div data-sb-object-id={page.id}>
               <Navbar></Navbar>
        {(page.sections || []).map((section, idx) => {
          const RenderedComponent = componentMap[section.type];
          return RenderedComponent ? (
            <RenderedComponent key={idx} {...section} />
          ) : null; // Handles cases where section.type isn't found
        })}
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}