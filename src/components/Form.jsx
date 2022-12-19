import React, { useState } from "react";
import { FormControl, InputLabel } from "@mui/material";
import SelectData from "./SelectData";

function Form() {

    const [region, setRegion] = useState([{ id: 1, name: "Bío-Bío" }]);
    const [provincia, setProvincia] = useState([{ id: 1, name: "Concepción" }]);
    const [ciudad, setCiudad] = useState([{ id: 1, name: "San Pedro de la Paz" }, { id: 2, name: "Lomas Coloradas" }]);

    return (
        <div>
            {/* REGIONES */}
            <FormControl fullWidth>
                <InputLabel id="region-label">Region</InputLabel>
                <SelectData
                    labelId="region-label"
                    id="region-select"
                    value={region[0].id}
                    label="Region"
                    items={region}
                />
            </FormControl>
            <br />
            <br />
            {/* PROVINCIAS */}
            <FormControl fullWidth>
                <InputLabel id="provincia-label">Provincia</InputLabel>
                <SelectData
                    labelId="provincia-label"
                    id="provincia-select"
                    value={provincia[0].id}
                    label="Provincia"
                    items={provincia}
                />
            </FormControl>
            <br />
            <br />
            {/* CIUDADES */}
            <FormControl fullWidth>
                <InputLabel id="ciudad-label">Ciudad</InputLabel>
                <SelectData
                    labelId="ciudad-label"
                    id="ciudad-select"
                    value={ciudad[0].id}
                    label="Ciudad"
                    items={ciudad}
                />
            </FormControl>
            {/* DATA */}
        </div>
    );
}

export default Form;