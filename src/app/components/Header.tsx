import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { tema, useTema } from "../tema";

export default function Header() {
  const { colores, modo, alternarModo } = useTema();
  const styles = crearEstilos(colores);

  return (
    <View style={styles.topBar}>
      <View style={styles.brandRow}>
        <View style={styles.brandMark} />
        <View>
          <Text style={styles.logo}>TOPFILMS</Text>
          <Text style={styles.tagline}>CINE PARA VOLVER A VER</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Text style={styles.menuLabel}>CATALOGO</Text>
        <TouchableOpacity
          onPress={alternarModo}
          style={styles.themeButton}
          accessibilityLabel="Cambiar modo de color"
        >
          <Text style={styles.themeIcon}>{modo === "claro" ? "☾" : "☀"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function crearEstilos(colores: typeof tema.colores) {
  return StyleSheet.create({
    topBar: {
      height: 82,
      backgroundColor: colores.fondoOscuro,
      paddingHorizontal: 20,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    brandMark: {
      width: 22,
      height: 22,
      borderRadius: 4,
      backgroundColor: colores.acento,
      transform: [{ rotate: "45deg" }],
    },
    logo: {
      color: colores.textoSobreOscuro,
      fontWeight: "800",
      fontSize: 19,
      letterSpacing: 1.5,
    },
    tagline: {
      color: colores.acentoSuave,
      fontSize: 8,
      fontWeight: "700",
      letterSpacing: 1.2,
      marginTop: 2,
    },
    menuLabel: {
      color: colores.textoSuave,
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1.3,
    },
    actions: { flexDirection: "row", alignItems: "center", gap: 14 },
    themeButton: {
      width: 32,
      height: 32,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colores.textoSuave,
      alignItems: "center",
      justifyContent: "center",
    },
    themeIcon: {
      color: colores.textoSobreOscuro,
      fontSize: 18,
      lineHeight: 20,
    },
  });
}
