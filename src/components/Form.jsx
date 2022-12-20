import React, { useState, useEffect } from "react";
import { FormControl, InputLabel } from "@mui/material";
import SelectData from "./SelectData";
import api_URL from "../api/api";
import axios from "axios";

function Form() {

    const [region, setRegion] = useState([]);
    const [provincia, setProvincia] = useState([{ id: 1, nombre: "Concepción" }]);
    const [ciudad, setCiudad] = useState([{ id: 1, nombre: "San Pedro de la Paz" }, { id: 2, nombre: "Lomas Coloradas" }]);

    useEffect(() => {
        setData();
    }, []);

    //? Cargar info de la BD.
    const setData = () => {
        axios.get(api_URL + "/regiones")
            .then((res) => {
                setRegion(res?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            {/* REGIONES */}
            <FormControl fullWidth>
                <InputLabel id="region-label">Region</InputLabel>
                <SelectData
                    labelId="region-label"
                    id="region-select"
                    value={""}
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
                    value={provincia[0]?.id}
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
                    value={ciudad[0]?.id}
                    label="Ciudad"
                    items={ciudad}
                />
            </FormControl>
            {/* DATA */}
        </div>
    );
}

export default Form;