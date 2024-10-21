import { notFound } from 'next/navigation';
import { Hero } from '../components/Hero.jsx';
import { Stats } from '../components/Stats.jsx';
import { getPageFromSlug } from '../utils/content.js';
import  FormTest  from '../components/FormTest.jsx';

const componentMap = {
  hero: Hero,
  stats: Stats,
  form: FormTest,
};

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug("/");

    if (!page) {
      return notFound();
    }

    return (
      <div data-sb-object-id={page.id}>
        {(page.sections || []).map((section, idx) => {
          const RenderedComponent = componentMap[section.type];
          return RenderedComponent ? (
            <RenderedComponent key={idx} {...section} />
          ) : null; // Handles cases where section.type isn't found
        })}
        <FormTest /> {/* Render FormTest directly if needed */}
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}