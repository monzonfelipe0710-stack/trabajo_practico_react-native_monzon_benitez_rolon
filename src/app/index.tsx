import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";

import { obtenerPeliculas, type Pelicula } from "@/services/peliculas";

export default function PantallaListado() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarPeliculas() {
      const datos = await obtenerPeliculas();
      setPeliculas(datos);
      setCargando(false);
    }
    cargarPeliculas();
  }, []);

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.menu}>
        <Link href="/agregar" style={estilos.botonMenu}>
          Agregar película
        </Link>
        <Link href="/acerca" style={estilos.botonMenu}>
          Acerca de
        </Link>
      </View>

      {cargando ? (
        <View style={estilos.centro}>
          <ActivityIndicator size="large" />
          <Text>Cargando películas...</Text>
        </View>
      ) : peliculas.length === 0 ? (
        <View style={estilos.centro}>
          <Text>No hay películas cargadas.</Text>
        </View>
      ) : (
        <FlatList
          data={peliculas}
          keyExtractor={(pelicula) => pelicula.id}
          renderItem={({ item }) => (
            <View style={estilos.tarjeta}>
              <Text style={estilos.titulo}>{item.titulo}</Text>
              <Text style={estilos.datos}>
                {item.genero} - {item.anio}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    padding: 12,
  },
  botonMenu: {
    backgroundColor: "#2f6fed",
    color: "white",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "bold",
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  tarjeta: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    gap: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  datos: {
    color: "#555",
  },
});
