import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    completarDatosDesdeTMDB,
    eliminarPelicula,
    obtenerPelicula,
    type Pelicula,
} from "@/services/peliculas";
import Header from "../components/Header";
import { tema, useTema } from "../tema";

export default function DetallePelicula() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [cargando, setCargando] = useState(true);
  const { colores } = useTema();
  const styles = crearEstilos(colores);

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
        <ActivityIndicator size="large" color={colores.texto} />
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
              <Image
                source={{ uri: pelicula.poster }}
                style={styles.posterSide}
                resizeMode="cover"
              />
            ) : null}
          </View>

          <View style={styles.details}>
            <Text style={styles.sub}>
              {pelicula.genero.toUpperCase()} — {pelicula.anio}
            </Text>
            <Text style={styles.titulo}>{pelicula.titulo}</Text>
            <Text style={styles.descripcion}>{pelicula.descripcion}</Text>
            <Link href="/" style={styles.botonVolver}>
              Volver al listado
            </Link>
            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={() =>
                Alert.alert(
                  "Eliminar película",
                  `¿Querés eliminar ${pelicula.titulo}?`,
                  [
                    { text: "Cancelar", style: "cancel" },
                    {
                      text: "Eliminar",
                      style: "destructive",
                      onPress: async () => {
                        await eliminarPelicula(pelicula.id);
                        router.replace("/");
                      },
                    },
                  ],
                )
              }
            >
              <Text style={styles.textoEliminar}>ELIMINAR PELÍCULA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function crearEstilos(colores: typeof tema.colores) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colores.fondo },
    content: { padding: tema.espaciados.mediano },
    centro: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      gap: tema.espaciados.mediano,
      backgroundColor: colores.fondo,
    },
    textoCentro: { color: colores.textoSuave },
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
      color: colores.acento,
      fontSize: 12,
      fontWeight: "700",
      letterSpacing: 1,
      marginBottom: 6,
    },
    titulo: {
      fontSize: 26,
      fontWeight: "800",
      color: colores.texto,
      marginBottom: tema.espaciados.mediano,
    },
    posterSide: {
      width: "100%",
      height: 420,
      borderRadius: tema.radios.tarjeta,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    descripcion: {
      lineHeight: 22,
      color: colores.textoSuave,
      fontSize: 15,
      marginBottom: tema.espaciados.grande,
    },
    botonVolver: {
      backgroundColor: colores.botonPrimario,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: tema.radios.boton,
      fontWeight: "700",
      fontSize: 13,
      alignSelf: "flex-start",
      overflow: "hidden",
    },
    botonEliminar: {
      borderWidth: 1,
      borderColor: "#c44738",
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: tema.radios.boton,
      marginTop: 12,
      alignSelf: "flex-start",
    },
    textoEliminar: { color: "#c44738", fontWeight: "800", fontSize: 11 },
  });
}
