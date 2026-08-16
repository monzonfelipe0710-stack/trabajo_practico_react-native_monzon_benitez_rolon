import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

import { obtenerPelicula, type Pelicula } from "@/services/peliculas";

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
      setCargando(false);
    }
    cargar();
  }, [id]);

  if (cargando)
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
        <Text>Cargando película...</Text>
      </View>
    );

  if (!pelicula)
    return (
      <View style={styles.centro}>
        <Text>Película no encontrada.</Text>
        <Link href="/">Volver al listado</Link>
      </View>
    );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>{pelicula.titulo}</Text>
      <Text style={styles.sub}>{pelicula.genero} — {pelicula.anio}</Text>
      <Text style={styles.descripcion}>{pelicula.descripcion}</Text>
      <Link href="/">Volver al listado</Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  content: { gap: 12 },
  centro: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  titulo: { fontSize: 22, fontWeight: "bold" },
  sub: { color: "#666" },
  descripcion: { marginTop: 12, lineHeight: 20 },
});
