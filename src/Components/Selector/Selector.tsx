import { Autocomplete, Box, TextField, autocompleteClasses } from "@mui/material";

const Selector = (props: { selectedValue: any; setSelectedValue: (value: any) => void; options: any[]; label: string; multiple?: boolean; width: number }) => {
  const { selectedValue, setSelectedValue, options, label, multiple } = props;
  return (
    <Autocomplete
      value={selectedValue}
      disablePortal
      multiple={multiple}
      onChange={(e, value) => setSelectedValue(value)}
      id="combo-box-demo"
      size="small"
      options={options}
      sx={{ width: props.width, fontSize: "10px" }}
      renderInput={(params) => <TextField sx={{ fonsize: 1, backgroundColor: "" }} {...params} label={label} />}
    

    />
  );
};

export default Selector;
