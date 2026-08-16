import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

import Header from "../components/Header";
import { obtenerPelicula, completarDatosDesdeTMDB, type Pelicula } from "@/services/peliculas";
import { tema } from "../tema";

export default function DetallePelicula() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      if (!id) return;
      setCargando(true);
      const p = await obtenerPelicula(id);
      setPelicula(p);
      // si faltan datos, intentar completarlos desde TMDB y recargar
      if (p && (!p.descripcion || !p.poster || !p.genero || !p.anio)) {
        await completarDatosDesdeTMDB(p);
        const actualizado = await obtenerPelicula(id);
        setPelicula(actualizado);
      }
      setCargando(false);
    }
    cargar();
  }, [id]);

  if (cargando)
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={tema.colores.texto} />
        <Text style={styles.textoCentro}>Cargando película...</Text>
      </View>
    );

  if (!pelicula)
    return (
      <View style={styles.centro}>
        <Text style={styles.textoCentro}>Película no encontrada.</Text>
        <Link href="/" style={styles.botonVolver}>
          Volver al listado
        </Link>
      </View>
    );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardRow}>
          <View style={styles.imageContainer}>
            {pelicula.poster ? (
              <Image source={{ uri: pelicula.poster }} style={styles.posterSide} resizeMode="cover" />
            ) : null}
          </View>

          <View style={styles.details}>
            <Text style={styles.sub}>{pelicula.genero.toUpperCase()} — {pelicula.anio}</Text>
            <Text style={styles.titulo}>{pelicula.titulo}</Text>
            <Text style={styles.descripcion}>{pelicula.descripcion}</Text>
            <Link href="/" style={styles.botonVolver}>
              Volver al listado
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tema.colores.fondo },
  content: { padding: tema.espaciados.mediano },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: tema.espaciados.mediano,
    backgroundColor: tema.colores.fondo,
  },
  textoCentro: { color: tema.colores.textoSuave },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: tema.espaciados.mediano,
    paddingHorizontal: tema.espaciados.chico,
    gap: tema.espaciados.mediano,
  },
  details: { flex: 1 },
  imageContainer: { width: 300 },
  sub: {
    color: tema.colores.acento,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 6,
  },
  titulo: { fontSize: 26, fontWeight: "800", color: tema.colores.texto, marginBottom: tema.espaciados.mediano },
  posterSide: {
    width: "100%",
    height: 420,
    borderRadius: tema.radios.tarjeta,
    borderWidth: 1,
    borderColor: tema.colores.borde,
  },
  descripcion: { lineHeight: 22, color: "#444444", fontSize: 15, marginBottom: tema.espaciados.grande },
  botonVolver: {
    backgroundColor: tema.colores.botonPrimario,
    color: tema.colores.textoBotonPrimario,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: tema.radios.boton,
    fontWeight: "700",
    fontSize: 13,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
});
