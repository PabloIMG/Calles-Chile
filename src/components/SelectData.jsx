import React, {useState} from "react";
import { MenuItem, Select } from "@mui/material";

function SelectData(props) {

    const { labelId, id, value, label, items } = props;

    const [selected, setSelected] = useState(value);

    return (
        <Select
            labelId={labelId}
            id={id}
            value={selected}
            label={label}
            onChange={(e) => setSelected(e.target.value)}
        >
            {items.map((item, index) => (
                <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
            ))}
        </Select>
    );
}

export default SelectData;