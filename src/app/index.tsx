import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

  if (cargando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" />
        <Text>Cargando películas...</Text>
      </View>
    );
  }

  if (peliculas.length === 0) {
    return (
      <View style={estilos.centro}>
        <Text>No hay películas cargadas.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={estilos.lista}
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
  );
}

const estilos = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  lista: {
    padding: 16,
  },
  tarjeta: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
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
