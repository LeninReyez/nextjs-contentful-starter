import Link from 'next/link';

const themeClassMap = {
  default: 'p-2 mt-4 border border-green-700 bg-lightgray-700 text-white rounded hover:bg-gray-300 hover:border-purple-500 transition',
  outline: 'border-purple-700 bg-transparent text-purple-700 hover:text-darkgray-500 hover:border-purple-500',
};

const buttonText = "Buy Now"

export const Button = (props) => {
  return (
    <Link
      href={props.url}
      className={`py-3 px-6 inline-block border-2 font-semibold rounded-md transition-all duration-300 ${
        themeClassMap[props.theme] ?? themeClassMap['default']
      }`}
      data-sb-object-id={props.id}
    >
      <span data-sb-field-path="label">{buttonText}</span>
    </Link>
  );
};
