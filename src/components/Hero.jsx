import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { Button } from './Button.jsx';

const themeClassMap = {
  imgLeft: 'md:flex-row-reverse',
  imgRight: 'md:flex-row',
};
const heading = 'Oak & Pine Bakehouse';
const intro =
  "At Oak & Pine Bakehouse, we believe that indulgence can be both delicious and mindful. Whether you're craving a sweet treat or celebrating a special occasion, our freshly made cookie cakes and frostings are crafted with care using premium, and often organic and locally sourced ingredients. We prioritize quality and strive to minimize artificial and harmful additives, ensuring you can enjoy a delightful dessert without compromise. Join us in savoring the joy of treats that nourish both body and soul.";
const disclaimer = 'A Cottage Bakery in Normal, IL';
const content = `${intro}<br /><br />${disclaimer}`;
export const Hero = (props) => {
  console.log(props);
  return (
    <div className="px-6 py-16 bg-gray-100 sm:px-12 sm:py-24" data-sb-object-id={props.id}>
      <div
        className={`max-w-6xl mx-auto flex flex-col gap-12 md:items-center ${
          themeClassMap[props.theme] ?? themeClassMap['imgRight']
        }`}
      >
        <div className="w-full max-w-xl mx-auto flex-1">
          <h3 className="mb-6 text-3xl font-bold sm:text-4x1" data-sb-field-path="heading">
            {heading}
          </h3>
          {props.body && (
            <Markdown options={{ forceBlock: true }} className="mb-6 text-lg" data-sb-field-path="body">
              {content}
            </Markdown>
          )}
          {/* {props.button && <Button {...props.button} />} */}
        </div>
        <div className="w-full aspect-[4/3] flex-1 relative overflow-hidden rounded-md">
          <img src="/oakandpinelogo.png" alt="oak & pine bakehouse logo" />
        </div>
      </div>
    </div>
  );
};
