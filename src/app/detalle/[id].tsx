import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

import Header from "../components/Header";
import { obtenerPelicula, completarDatosDesdeTMDB, type Pelicula } from "@/services/peliculas";

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
        <ActivityIndicator size="large" />
        <Text style={{ color: '#fff' }}>Cargando película...</Text>
      </View>
    );

  if (!pelicula)
    return (
      <View style={styles.centro}>
        <Text style={{ color: '#fff' }}>Película no encontrada.</Text>
        <Link href="/">Volver al listado</Link>
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
            <Text style={styles.titulo}>{pelicula.titulo}</Text>
            <Text style={styles.sub}>{pelicula.genero} — {pelicula.anio}</Text>
            <Text style={styles.descripcion}>{pelicula.descripcion}</Text>
            <Link href="/">Volver al listado</Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0b' },
  content: { padding: 16 },
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 8 },
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12 },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 16, paddingHorizontal: 16 },
  details: { flex: 1, marginLeft: 16 },
  imageContainer: { width: 320 },
  titulo: { fontSize: 22, fontWeight: "bold", color: '#fff', marginTop: 8 },
  sub: { color: "#bbb", marginTop: 4 },
  posterSide: { width: '100%', height: 420, borderRadius: 8 },
  descripcion: { marginTop: 12, lineHeight: 20, color: '#ddd' },
});
