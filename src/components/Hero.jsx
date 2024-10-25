import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { Button } from './Button.jsx';

const themeClassMap = {
  imgLeft: 'md:flex-row-reverse',
  imgRight: 'md:flex-row',
};
const heading = "Oak & Pine Bakehouse"
const content = "Craving a sweet treat without the guilt? You’ve come to the right place! At Oak & Pine, we believe that healthy eating shouldn’t mean sacrificing flavor. Our delicious cookies are crafted with wholesome ingredients, bursting with natural goodness, and designed to satisfy your cravings.From rich, nutty flavors to delightful fruity blends, our cookies are made with love, using only the finest ingredients. Whether you’re looking for a post-workout snack, a midday pick-me-up, or a delightful dessert, we have something for everyone! Join us on this delicious journey to a healthier lifestyle, one cookie at a time. Dive into our mouthwatering selection and discover how indulgent health can truly be!"

export const Hero = (props) => {
  console.log(props)
  return (
    <div className="px-6 py-16 sm:px-12 sm:py-24" data-sb-object-id={props.id}>
      <div className={`max-w-6xl mx-auto flex flex-col-reverse md:flex-row gap-12 md:items-center ${themeClassMap[props.theme] ?? themeClassMap['imgRight']}`}>
       <div className="w-full max-w-xl mx-auto flex-1">
          <h3 className="text-center mb-6 text-3xl font-bold sm:text-4x1" data-sb-field-path="heading">
            {heading}
          </h3>
          {props.body && (
            <Markdown options={{ forceBlock: true }} className="mb-6 text-lg" data-sb-field-path="body">
              {content}
            </Markdown>
          )}
          {/* {props.button && <Button {...props.button} />} */}
        </div>
        <div className="w-full flex-1 relative overflow-hidden rounded-md">
        <img src="/oakandpinelogo.png" alt="oak & pine bakehouse logo"/>
        
        </div>
      </div>
    </div>
  );
  
};
