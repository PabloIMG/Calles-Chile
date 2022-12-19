import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Form() {

    const [region, setRegion] = useState("bio-bio");
    const [provincia, setProvincia] = useState("concepcion");
    const [ciudad, setCiudad] = useState("san-pedro-de-la-paz");

    return (
        <div>
            {/* REGIONES */}
            <FormControl fullWidth>
                <InputLabel id="region-label">Region</InputLabel>
                <Select
                    labelId="region-label"
                    id="region-select"
                    value={region}
                    label="Region"
                // onChange={handleChange}
                >
                    <MenuItem value="bio-bio">Bío-Bío</MenuItem>
                </Select>
            </FormControl>
            {/* PROVINCIAS */}
            <FormControl fullWidth>
                <InputLabel id="provincia-label">Provincia</InputLabel>
                <Select
                    labelId="provincia-label"
                    id="provincia-select"
                    value={provincia}
                    label="Region"
                // onChange={handleChange}
                >
                    <MenuItem value="concepcion">Concepción</MenuItem>
                </Select>
            </FormControl>
            {/* CIUDADES */}
            <FormControl fullWidth>
                <InputLabel id="ciudad-label">Ciudad</InputLabel>
                <Select
                    labelId="ciudad-label"
                    id="ciudad-select"
                    value={ciudad}
                    label="Ciudad"
                // onChange={handleChange}
                >
                    <MenuItem value="san-pedro-de-la-paz">San Pedro de la Paz</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default Form;