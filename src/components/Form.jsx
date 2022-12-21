import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import api_URL from "../api/api";
import axios from "axios";

function Form() {

    //? Información de la BD.
    const [regiones, setRegiones] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [calles, setCalles] = useState(["Calle 1", "Calle 2", "Calle 3"]);

    //? Información seleccionada.
    const [regionSeleccionada, setRegionSeleccionada] = useState("");
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");

    useEffect(() => {
        setData();
    }, []);

    //* .: Cargar info de la BD :. *//
    const setData = () => {
        axios.get(api_URL + "/regiones")
            .then((res) => {
                setRegiones(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //* .: Modificar selectores :. *//
    const onChange = (id, tipo) => {
        let peticion = "";
        //? Limpiar hooks.
        if (tipo === "regiones") {
            setProvincias([]);
            setCiudades([]);
            setProvinciaSeleccionada("");
            setCiudadSeleccionada("");
            peticion = "provincias";
        }
        else if (tipo === "provincias") {
            setCiudades([]);
            setCiudadSeleccionada("");
            peticion = "ciudades";
        }

        //? Petición a la BD.
        axios.get(api_URL + "/" + peticion + "/" + id)
            .then((res) => {
                if (tipo === "regiones") {
                    setProvincias(res.data.provincias);
                }
                else if (tipo === "provincias") {
                    setCiudades(res.data.ciudades);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //* .: Listar items del selector :. *//
    const listarItems = (items) => {
        if (items.length > 0) {
            return (
                items.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                ))
            )
        }
        else {
            return (
                <MenuItem value="">-</MenuItem>
            )
        }
    }

    return (
        <div
            style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
            {/* REGIONES */}
            <FormControl fullWidth>
                <InputLabel id="region-label">Región</InputLabel>
                <Select
                    labelId="region-label"
                    id="region-label"
                    value={regionSeleccionada}
                    onChange={(e) => { setRegionSeleccionada(e.target.value); onChange(e.target.value, "regiones"); }}
                >
                    {regiones.map((item, index) => (
                        <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            {/* PROVINCIAS */}
            <FormControl fullWidth>
                <InputLabel id="provincia-label">Provincia</InputLabel>
                <Select
                    labelId="provincia-label"
                    id="provincia-label"
                    value={provinciaSeleccionada}
                    onChange={(e) => { setProvinciaSeleccionada(e.target.value); onChange(e.target.value, "provincias"); }}
                >
                    {listarItems(provincias)}
                </Select>
            </FormControl>
            <br />
            {/* CIUDADES */}
            <FormControl fullWidth>
                <InputLabel id="ciudad-label">Ciudad</InputLabel>
                <Select
                    labelId="ciudad-label"
                    id="ciudad-label"
                    value={ciudadSeleccionada}
                    onChange={(e) => { setCiudadSeleccionada(e.target.value); }}
                >
                    {listarItems(ciudades)}
                </Select>
            </FormControl>
            <br />
            {/* CALLES */}
            <TableContainer>
                <Table>
                    <TableHead
                        style={{ backgroundColor: "#3f51b5" }}
                    >
                        <TableRow>
                            <TableCell
                                style={{ fontWeight: "bold", color: "#fff" }}
                            >
                                Nombre
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {calles.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Form;