import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

import { obtenerPeliculas, type Pelicula } from "@/services/peliculas";
import Header from "./components/Header";
import { tema, useTema } from "./tema";

export default function PantallaListado() {
  const router = useRouter();
  const { colores } = useTema();
  const { width } = useWindowDimensions();
  const estilos = crearEstilos(colores, width);
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [cargando, setCargando] = useState(true);
  const [query, setQuery] = useState("");
  const [generoActivo, setGeneroActivo] = useState("Todos");

  useEffect(() => {
    async function cargarPeliculas() {
      const datos = await obtenerPeliculas();
      setPeliculas(datos);
      setCargando(false);
    }
    cargarPeliculas();
  }, []);

  const generos = ["Todos", ...new Set(peliculas.map((p) => p.genero))];
  const filtered = peliculas.filter((p) => {
    const coincideBusqueda = p.titulo
      .toLowerCase()
      .includes(query.toLowerCase());
    const coincideGenero =
      generoActivo === "Todos" || p.genero === generoActivo;
    return coincideBusqueda && coincideGenero;
  });
  const destacada = peliculas[0];

  return (
    <View style={estilos.contenedor}>
      <Header />
      {cargando ? (
        <View style={estilos.centro}>
          <ActivityIndicator size="large" color={colores.texto} />
          <Text style={estilos.textoCentro}>Cargando películas...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={estilos.centro}>
          <Text style={estilos.textoCentro}>No hay películas cargadas.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {destacada && (
            <ImageBackground
              source={destacada.poster ? { uri: destacada.poster } : undefined}
              style={estilos.hero}
              imageStyle={estilos.heroImage}
            >
              <View style={estilos.heroShade} />
              <View style={estilos.heroContent}>
                <Text style={estilos.kicker}>SELECCION DE HOY</Text>
                <Text style={estilos.heroTitle}>{destacada.titulo}</Text>
                <Text style={estilos.heroMeta}>
                  {destacada.genero.toUpperCase()} / {destacada.anio}
                </Text>
                <TouchableOpacity
                  style={estilos.heroButton}
                  onPress={() => router.push(`/detalle/${destacada.id}`)}
                >
                  <Text style={estilos.heroButtonText}>VER DETALLE →</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          )}
          <View style={estilos.content}>
            <View style={estilos.sectionHeading}>
              <View>
                <Text style={estilos.eyebrow}>EXPLORA EL CATALOGO</Text>
                <Text style={estilos.sectionTitle}>Peliculas destacadas</Text>
              </View>
              <Link href="/agregar" style={estilos.addLink}>
                + AGREGAR
              </Link>
            </View>
            <View style={estilos.searchRow}>
              <TextInput
                placeholder="Buscar películas..."
                placeholderTextColor={colores.textoSuave}
                value={query}
                onChangeText={setQuery}
                style={estilos.search}
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={estilos.filters}
            >
              {generos.map((genero) => (
                <TouchableOpacity
                  key={genero}
                  onPress={() => setGeneroActivo(genero)}
                  style={[
                    estilos.filter,
                    generoActivo === genero && estilos.filterActivo,
                  ]}
                >
                  <Text
                    style={[
                      estilos.filterText,
                      generoActivo === genero && estilos.filterTextActivo,
                    ]}
                  >
                    {genero}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={estilos.carousel}
            >
              {filtered.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={estilos.cardTouchable}
                  onPress={() => router.push(`/detalle/${item.id}`)}
                >
                  <View style={estilos.tarjeta}>
                    {item.poster ? (
                      <Image
                        source={{ uri: item.poster }}
                        style={estilos.poster}
                      />
                    ) : (
                      <View
                        style={[estilos.poster, estilos.posterPlaceholder]}
                      />
                    )}
                    <Text style={estilos.cardGenre}>
                      {item.genero.toUpperCase()}
                    </Text>
                    <Text style={estilos.titulo}>{item.titulo}</Text>
                    <Text style={estilos.datos}>{item.anio}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={estilos.footerLinks}>
              <Link href="/acerca" style={estilos.aboutLink}>
                SOBRE TOPFILMS →
              </Link>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function crearEstilos(colores: typeof tema.colores, ancho: number) {
  const esEscritorio = ancho >= 900;
  const anchoContenido = Math.min(ancho, 1280);
  const anchoTarjeta = esEscritorio ? 220 : ancho < 420 ? 156 : 172;

  return StyleSheet.create({
    contenedor: {
      flex: 1,
      backgroundColor: colores.fondo,
    },
    searchRow: {
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingTop: 18,
    },
    search: {
      flex: 1,
      backgroundColor: colores.fondoInput,
      color: colores.texto,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 4,
      fontSize: 14,
    },
    centro: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      gap: 10,
    },
    textoCentro: {
      color: colores.textoSuave,
    },
    hero: {
      height: esEscritorio ? 500 : ancho < 420 ? 300 : 340,
      width: "100%",
      maxWidth: anchoContenido,
      alignSelf: "center",
      justifyContent: "flex-end",
      backgroundColor: colores.fondoOscuro,
    },
    heroImage: { opacity: 0.55 },
    heroShade: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(10,10,10,0.48)",
    },
    heroContent: {
      padding: esEscritorio ? 48 : 24,
      maxWidth: esEscritorio ? 560 : 360,
    },
    kicker: {
      color: colores.acentoSuave,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1.6,
      marginBottom: 8,
    },
    heroTitle: {
      color: colores.textoSobreOscuro,
      fontSize: esEscritorio ? 58 : ancho < 420 ? 32 : 38,
      lineHeight: esEscritorio ? 64 : ancho < 420 ? 36 : 42,
      fontWeight: "800",
    },
    heroMeta: {
      color: "#d2cbc4",
      fontSize: 12,
      fontWeight: "700",
      letterSpacing: 1,
      marginTop: 10,
    },
    heroButton: {
      alignSelf: "flex-start",
      backgroundColor: colores.acento,
      paddingHorizontal: 16,
      paddingVertical: 11,
      borderRadius: 4,
      marginTop: 18,
    },
    heroButtonText: {
      color: "#fff",
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 0.8,
    },
    content: {
      paddingTop: 30,
      width: "100%",
      maxWidth: anchoContenido,
      alignSelf: "center",
    },
    sectionHeading: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingHorizontal: esEscritorio ? 40 : 20,
    },
    eyebrow: {
      color: colores.acento,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1.4,
      marginBottom: 6,
    },
    sectionTitle: {
      color: colores.texto,
      fontSize: esEscritorio ? 34 : 26,
      fontWeight: "800",
    },
    addLink: {
      color: colores.texto,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 0.8,
      paddingBottom: 3,
    },
    filters: {
      paddingHorizontal: esEscritorio ? 40 : 20,
      gap: 8,
      paddingTop: 20,
      paddingBottom: 2,
    },
    filter: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colores.fondoInput,
    },
    filterActivo: { backgroundColor: colores.fondoOscuro },
    filterText: {
      color: colores.textoSuave,
      fontSize: 11,
      fontWeight: "700",
    },
    filterTextActivo: { color: colores.textoSobreOscuro },
    carousel: {
      paddingHorizontal: esEscritorio ? 40 : 20,
      paddingTop: 20,
      paddingBottom: 28,
    },
    cardTouchable: { marginRight: 12, width: anchoTarjeta },
    tarjeta: {
      backgroundColor: colores.fondoInput,
      borderRadius: tema.radios.tarjeta,
      borderWidth: 1,
      borderColor: colores.borde,
      padding: 8,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    poster: {
      width: "100%",
      height: anchoTarjeta * 1.4,
      borderRadius: tema.radios.imagen,
      marginBottom: tema.espaciados.chico,
    },
    posterPlaceholder: {
      backgroundColor: colores.fondoInput,
    },
    titulo: {
      fontSize: 14,
      fontWeight: "700",
      color: colores.texto,
    },
    datos: {
      color: colores.textoSuave,
      fontSize: 12,
      marginTop: 4,
    },
    cardGenre: {
      color: colores.acento,
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 0.8,
      marginBottom: 4,
    },
    footerLinks: {
      borderTopWidth: 1,
      borderTopColor: colores.borde,
      padding: esEscritorio ? 40 : 20,
      paddingBottom: 36,
    },
    aboutLink: {
      color: colores.texto,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 0.8,
    },
  });
}
