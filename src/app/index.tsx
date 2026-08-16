import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Link } from "expo-router";

import { obtenerPeliculas, type Pelicula } from "@/services/peliculas";
import Header from "./components/Header";

export default function PantallaListado() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [cargando, setCargando] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function cargarPeliculas() {
      const datos = await obtenerPeliculas();
      setPeliculas(datos);
      setCargando(false);
    }
    cargarPeliculas();
  }, []);

  const filtered = peliculas.filter((p) =>
    p.titulo.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={estilos.contenedor}>
      <Header />
      <View style={estilos.searchRow}>
        <TextInput
          placeholder="Buscar películas..."
          placeholderTextColor="#bbb"
          value={query}
          onChangeText={setQuery}
          style={estilos.search}
        />
      </View>

      <View style={estilos.menuRow}>
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
          <Text style={{ color: '#fff' }}>Cargando películas...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={estilos.centro}>
          <Text style={{ color: '#fff' }}>No hay películas cargadas.</Text>
        </View>
      ) : (
        <View style={estilos.carouselContainer}>
          <FlatList
            data={filtered}
            keyExtractor={(pelicula) => pelicula.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={estilos.carousel}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={estilos.cardTouchable}
                onPress={() => {
                  if (Platform.OS === "web") {
                    window.location.href = `/detalle/${item.id}`;
                  }
                }}
              >
                <View style={estilos.tarjeta}>
                  {item.poster ? (
                    <Image source={{ uri: item.poster }} style={estilos.poster} />
                  ) : (
                    <View style={[estilos.poster, estilos.posterPlaceholder]} />
                  )}
                  <Text style={estilos.titulo}>{item.titulo}</Text>
                  <Text style={estilos.datos}>
                    {item.genero} - {item.anio}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },
  header: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    backgroundColor: "#0b0b0b",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  topBar: {
    height: 72,
    backgroundColor: "#0b0b0b",
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  logo: { color: "#e50914", fontWeight: "800", fontSize: 18, marginRight: 12 },
  search: {
    flex: 1,
    backgroundColor: "#111",
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  menuRow: { flexDirection: "row", justifyContent: "center", paddingVertical: 12 },
  carouselContainer: { paddingVertical: 12 },
  carousel: { paddingHorizontal: 16 },
  cardTouchable: { marginRight: 16 },
  menu: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
  },
  botonMenu: {
    backgroundColor: "#2f6fed",
    color: "white",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "bold",
    marginHorizontal: 6,
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  tarjeta: {
    backgroundColor: "#141414",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: 220,
    overflow: "hidden",
    // sombra / elevación
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  poster: {
    width: "100%",
    height: 300,
    borderRadius: 6,
    marginBottom: 8,
  },
  posterPlaceholder: {
    backgroundColor: "#333",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  datos: {
    color: "#bbb",
    fontSize: 12,
  },
});
