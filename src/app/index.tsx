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
} from "react-native";
import { Link, useRouter } from "expo-router";

import { obtenerPeliculas, type Pelicula } from "@/services/peliculas";
import Header from "./components/Header";
import { tema } from "./tema";

export default function PantallaListado() {
  const router = useRouter();
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
          placeholderTextColor={tema.colores.textoSuave}
          value={query}
          onChangeText={setQuery}
          style={estilos.search}
        />
      </View>

      <View style={estilos.menuRow}>
        <Link href="/agregar" style={estilos.botonMenu}>
          Agregar película
        </Link>
        <Link href="/acerca" style={[estilos.botonMenu, estilos.botonSecundario]}>
          Acerca de
        </Link>
      </View>
      {cargando ? (
        <View style={estilos.centro}>
          <ActivityIndicator size="large" color={tema.colores.texto} />
          <Text style={estilos.textoCentro}>Cargando películas...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={estilos.centro}>
          <Text style={estilos.textoCentro}>No hay películas cargadas.</Text>
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
                onPress={() => router.push(`/detalle/${item.id}`)}
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
    backgroundColor: tema.colores.fondo,
  },
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: tema.espaciados.mediano,
    paddingTop: tema.espaciados.mediano,
  },
  search: {
    flex: 1,
    backgroundColor: tema.colores.fondoInput,
    color: tema.colores.texto,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: tema.radios.boton,
    fontSize: 14,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: tema.espaciados.mediano,
    gap: 10,
  },
  botonMenu: {
    backgroundColor: tema.colores.botonPrimario,
    color: tema.colores.textoBotonPrimario,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: tema.radios.boton,
    fontWeight: "700",
    fontSize: 13,
    overflow: "hidden",
  },
  botonSecundario: {
    backgroundColor: tema.colores.botonSecundario,
    color: tema.colores.texto,
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
  },
  textoCentro: {
    color: tema.colores.textoSuave,
  },
  carouselContainer: { paddingVertical: tema.espaciados.chico },
  carousel: { paddingHorizontal: tema.espaciados.mediano },
  cardTouchable: { marginRight: tema.espaciados.mediano },
  tarjeta: {
    backgroundColor: tema.colores.fondo,
    borderRadius: tema.radios.tarjeta,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    padding: 10,
    width: 200,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  poster: {
    width: "100%",
    height: 280,
    borderRadius: tema.radios.imagen,
    marginBottom: tema.espaciados.chico,
  },
  posterPlaceholder: {
    backgroundColor: tema.colores.fondoInput,
  },
  titulo: {
    fontSize: 15,
    fontWeight: "700",
    color: tema.colores.texto,
  },
  datos: {
    color: tema.colores.textoSuave,
    fontSize: 12,
    marginTop: 2,
  },
});
