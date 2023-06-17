import Select from "react-select";

const SelectInput = ({ field, options, name, placeholder }) => {
  return (
    <div>

      <Select
        {...field}
        options={options}
        instanceId={name}
        styles={{
          control: (baseStyle, state) => ({
            ...baseStyle,
            border: state.isFocused ? "2px solid #0369a1" : 0,
            padding: "2px 3px",
            borderRadius: "6px",
            boxShadow: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
            "&:hover": {
              border: state.isFocused ? "2px solid #0369a1" : 0,
            },
          }),
        }}
        placeholder={placeholder}
        isClearable
        isSearchable={false}
      />
    </div>
  );
};

export default SelectInput;
