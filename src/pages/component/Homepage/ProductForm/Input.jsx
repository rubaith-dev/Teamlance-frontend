const Input = ({ register, name, placeholder, errorMessage, ...props }) => {
  const { type } = props;

  return (
    <div>
      <input
        className="w-full px-4 py-2 rounded-md shadow-lg focus:outline-primary-700 placeholder:text-gray-500"
        placeholder={placeholder}
        name={name}
        {...register(name, {
          valueAsNumber: type === "number",
          required: `${placeholder} is required`,
        })}
        {...props}
      />
      <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
    </div>
  );
};

export default Input;
