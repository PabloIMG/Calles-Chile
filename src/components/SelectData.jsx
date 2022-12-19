import { MenuItem, Select } from "@mui/material";

function SelectData(props) {

    const { labelId, id, value, label, items } = props;

    return (
        <Select
            labelId={labelId}
            id={id}
            value={value}
            label={label}
        >
            {items.map((item, index) => (
                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
            ))}
        </Select>
    );
}

export default SelectData;