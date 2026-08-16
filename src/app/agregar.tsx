import { useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Header from "./components/Header";
import { completarDatosDesdeTMDB } from "@/services/peliculas";

import { agregarPelicula } from "@/services/peliculas";
import { getTmdbApiKey, TMDB_IMAGE_BASE } from "@/config/tmdb";

export default function AgregarPelicula() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [anio, setAnio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [poster, setPoster] = useState<string | null>(null);

  function validar() {
    if (!titulo.trim() || !genero.trim() || !anio.trim()) {
      Alert.alert("Campos obligatorios", "Título, género y año son obligatorios");
      return false;
    }
    const n = Number(anio);
    if (Number.isNaN(n) || n <= 1800) {
      Alert.alert("Año inválido", "Ingrese un año válido");
      return false;
    }
    return true;
  }

  async function onSubmit() {
    if (!validar()) return;
    setSubmitting(true);
    try {
      await agregarPelicula({ titulo: titulo.trim(), genero: genero.trim(), anio: Number(anio), descripcion: descripcion.trim(), poster });
      router.push("/");
    } catch (e) {
      Alert.alert("Error", "No se pudo agregar la película");
    } finally {
      setSubmitting(false);
    }
  }

  async function buscarPosterTMDB() {
    const q = titulo.trim();
    if (!q) {
      Alert.alert("Buscar póster", "Ingrese primero el título para buscar en TMDB.");
      return;
    }
    const key = getTmdbApiKey();
    if (!key) {
      Alert.alert("TMDB key", "No se encontró la clave de TMDB. Agregala en .env o en app config.");
      return;
    }
    try {
      setSubmitting(true);
      console.log("Buscar póster TMDB para:", q);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn("TMDB search failed, status:", res.status);
        Alert.alert("Error", "Fallo al buscar en TMDB (ver consola).");
        return;
      }
      const data = await res.json();
      console.log("TMDB response results:", data?.results?.length ?? 0);
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        const first = data.results[0];
        if (first.poster_path) {
          setPoster(TMDB_IMAGE_BASE + first.poster_path);
          return;
        }
      }
      Alert.alert("No encontrado", "No se encontró póster para ese título en TMDB.");
    } catch (err) {
      console.warn("Error buscando TMDB:", err);
      Alert.alert("Error", "No se pudo buscar en TMDB (ver consola).");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Género</Text>
      <TextInput style={styles.input} value={genero} onChangeText={setGenero} />

      <Text style={styles.label}>Año</Text>
      <TextInput style={styles.input} value={anio} onChangeText={setAnio} keyboardType="numeric" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={[styles.input, styles.multiline]} value={descripcion} onChangeText={setDescripcion} multiline numberOfLines={4} />

      <View style={styles.posterRow}>
        {poster ? <Image source={{ uri: poster }} style={styles.posterPreview} /> : <View style={[styles.posterPreview, styles.posterPlaceholder]} />}
        <View style={styles.posterButtons}>
          <TouchableOpacity style={styles.secondaryButton} onPress={async () => {
            // Buscar y rellenar datos (poster, descripción, género, año)
            const temp = { titulo: titulo.trim(), genero: genero.trim() || undefined, anio: anio ? Number(anio) : undefined, descripcion: descripcion.trim() || undefined, poster: poster || null } as any;
            try {
              setSubmitting(true);
              await completarDatosDesdeTMDB(temp);
              // actualizar estados si la función rellenó datos
              if (temp.poster) setPoster(temp.poster);
              if (temp.descripcion) setDescripcion(temp.descripcion);
              if (temp.genero) setGenero(temp.genero);
              if (temp.anio) setAnio(String(temp.anio));
            } catch (e) {
              // error manejado en servicio
            } finally {
              setSubmitting(false);
            }
          }}>
            <Text style={styles.buttonText}>Buscar datos de la película automáticamente</Text>
          </TouchableOpacity>
        </View>
      </View>

      {submitting ? <ActivityIndicator /> : (
        <TouchableOpacity style={styles.primaryButton} onPress={onSubmit}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b0b0b' },
  label: { fontWeight: "600", marginBottom: 4, color: '#fff' },
  input: { borderWidth: 1, borderColor: "#333", padding: 8, borderRadius: 6, marginBottom: 8, backgroundColor: '#111', color: '#fff' },
  multiline: { minHeight: 80, textAlignVertical: "top" },
  posterRow: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  posterPreview: { width: 100, height: 150, borderRadius: 6, backgroundColor: "#333" },
  posterPlaceholder: { justifyContent: "center", alignItems: "center" },
  posterButtons: { flex: 1, marginLeft: 8 },
  primaryButton: { backgroundColor: '#e50914', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginTop: 12 },
  secondaryButton: { backgroundColor: '#444', paddingVertical: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
