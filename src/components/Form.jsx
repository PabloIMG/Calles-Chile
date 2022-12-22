import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

function Form() {

    //? Información de la BD.
    const [regiones, setRegiones] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [calles, setCalles] = useState([]);

    //? Información seleccionada.
    const [regionSeleccionada, setRegionSeleccionada] = useState("");
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
    const [calleSeleccionada, setCalleSeleccionada] = useState("");

    useEffect(() => {
        setData();
    }, []);

    //* .: Cargar info de la BD :. *//
    const setData = () => {
        axios.get(process.env.REACT_APP_API_URL + "/regiones")
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
            setCalles([]);
            setProvinciaSeleccionada("");
            setCiudadSeleccionada("");
            peticion = "provincias";
        }
        if (tipo === "provincias") {
            setCiudades([]);
            setCalles([]);
            setCiudadSeleccionada("");
            peticion = "ciudades";
        }
        if (tipo === "ciudades") {
            setCalles([]);
            setCalleSeleccionada("");
            peticion = "calles";
        }


        //? Petición a la BD.
        axios.get(process.env.REACT_APP_API_URL + "/" + peticion + "/" + id)
            .then((res) => {
                if (tipo === "regiones") {
                    setProvincias(res.data.provincias);
                }
                if (tipo === "provincias") {
                    setCiudades(res.data.ciudades);
                }
                if (tipo === "ciudades") {
                    setCalles(res.data.calles);
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
                <InputLabel id="demo-simple-select-label">Región</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={regionSeleccionada}
                    label="Región"
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
                <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="provincia-label"
                    value={provinciaSeleccionada}
                    label="Provincia"
                    disabled={provincias.length == 0}
                    onChange={(e) => { setProvinciaSeleccionada(e.target.value); onChange(e.target.value, "provincias"); }}
                >
                    {listarItems(provincias)}
                </Select>
            </FormControl>
            <br />
            {/* CIUDADES */}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="ciudad-label"
                    value={ciudadSeleccionada}
                    label="Ciudad"
                    disabled={ciudades.length == 0}
                    onChange={(e) => { setCiudadSeleccionada(e.target.value); onChange(e.target.value, "ciudades"); }}
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
                                <TableCell>{item.nombre}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Form;