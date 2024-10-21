export const Test = (props) => {
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
