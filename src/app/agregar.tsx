import { completarDatosDesdeTMDB } from "@/services/peliculas";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "./components/Header";

import { getTmdbApiKey, TMDB_IMAGE_BASE } from "@/config/tmdb";
import { agregarPelicula } from "@/services/peliculas";
import { tema, useTema } from "./tema";

export default function AgregarPelicula() {
  const router = useRouter();
  const { colores } = useTema();
  const styles = crearEstilos(colores);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [anio, setAnio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [poster, setPoster] = useState<string | null>(null);

  function validar() {
    if (!titulo.trim() || !genero.trim() || !anio.trim()) {
      Alert.alert(
        "Campos obligatorios",
        "Título, género y año son obligatorios",
      );
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
      await agregarPelicula({
        titulo: titulo.trim(),
        genero: genero.trim(),
        anio: Number(anio),
        descripcion: descripcion.trim(),
        poster,
      });
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
      Alert.alert(
        "Buscar póster",
        "Ingrese primero el título para buscar en TMDB.",
      );
      return;
    }
    const key = getTmdbApiKey();
    if (!key) {
      Alert.alert(
        "TMDB key",
        "No se encontró la clave de TMDB. Agregala en .env o en app config.",
      );
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
      Alert.alert(
        "No encontrado",
        "No se encontró póster para ese título en TMDB.",
      );
    } catch (err) {
      console.warn("Error buscando TMDB:", err);
      Alert.alert("Error", "No se pudo buscar en TMDB (ver consola).");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formulario}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ej: Nueve Reinas"
          placeholderTextColor={colores.textoSuave}
        />

        <Text style={styles.label}>Género</Text>
        <TextInput
          style={styles.input}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ej: Thriller"
          placeholderTextColor={colores.textoSuave}
        />

        <Text style={styles.label}>Año</Text>
        <TextInput
          style={styles.input}
          value={anio}
          onChangeText={setAnio}
          keyboardType="numeric"
          placeholder="Ej: 2000"
          placeholderTextColor={colores.textoSuave}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
          numberOfLines={4}
          placeholder="De qué trata la película"
          placeholderTextColor={colores.textoSuave}
        />

        <View style={styles.posterRow}>
          {poster ? (
            <Image source={{ uri: poster }} style={styles.posterPreview} />
          ) : (
            <View style={[styles.posterPreview, styles.posterPlaceholder]} />
          )}
          <View style={styles.posterButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={async () => {
                // Buscar y rellenar datos (poster, descripción, género, año)
                const temp = {
                  titulo: titulo.trim(),
                  genero: genero.trim() || undefined,
                  anio: anio ? Number(anio) : undefined,
                  descripcion: descripcion.trim() || undefined,
                  poster: poster || null,
                } as any;
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
              }}
            >
              <Text style={styles.buttonSecondaryText}>
                Completar datos automáticamente
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {submitting ? (
          <ActivityIndicator color={colores.texto} />
        ) : (
          <TouchableOpacity style={styles.primaryButton} onPress={onSubmit}>
            <Text style={styles.buttonPrimaryText}>Agregar película</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function crearEstilos(colores: typeof tema.colores) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colores.fondo },
    formulario: { padding: tema.espaciados.mediano },
    label: {
      fontWeight: "700",
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 6,
      marginTop: tema.espaciados.mediano,
      color: colores.texto,
    },
    input: {
      backgroundColor: colores.fondoInput,
      borderWidth: 1,
      borderColor: colores.borde,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: tema.radios.boton,
      color: colores.texto,
      fontSize: 14,
    },
    multiline: { minHeight: 90, textAlignVertical: "top" },
    posterRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: tema.espaciados.mediano,
      gap: tema.espaciados.mediano,
    },
    posterPreview: {
      width: 100,
      height: 150,
      borderRadius: tema.radios.imagen,
      backgroundColor: colores.fondoInput,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    posterPlaceholder: { justifyContent: "center", alignItems: "center" },
    posterButtons: { flex: 1 },
    primaryButton: {
      backgroundColor: colores.botonPrimario,
      paddingVertical: 14,
      borderRadius: tema.radios.boton,
      alignItems: "center",
      marginTop: tema.espaciados.mediano,
    },
    buttonPrimaryText: {
      color: colores.textoBotonPrimario,
      fontWeight: "700",
      fontSize: 14,
    },
    secondaryButton: {
      backgroundColor: colores.botonSecundario,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: tema.radios.boton,
      alignItems: "center",
    },
    buttonSecondaryText: {
      color: colores.texto,
      fontWeight: "600",
      fontSize: 13,
    },
  });
}
