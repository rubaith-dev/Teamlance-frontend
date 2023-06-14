import Select from "react-select";
import { Controller } from "react-hook-form";

const SelectInput = ({ placeholder, control, name, options, errorMessage }) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: `You need to select an option` }}
        render={({ field }) => (
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
        )}
      />

      <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
    </div>
  );
};

export default SelectInput;
