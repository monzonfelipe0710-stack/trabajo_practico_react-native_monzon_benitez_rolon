import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { tema } from '../tema';

export default function Header() {
  return (
    <View style={styles.topBar}>
      <Text style={styles.logo}>
        Top<Text style={styles.logoAcento}>Films</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 64,
    backgroundColor: tema.colores.fondo,
    borderBottomWidth: 1,
    borderBottomColor: tema.colores.borde,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: { color: tema.colores.texto, fontWeight: '800', fontSize: 20 },
  logoAcento: { color: tema.colores.acento },
});
