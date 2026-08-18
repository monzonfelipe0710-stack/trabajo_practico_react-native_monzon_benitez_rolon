import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Movie } from '@/services/movies';

type MovieCardProps = {
  movie: Movie;
  onPress?: (movie: Movie) => void;
};

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress?.(movie)}
      accessibilityRole="button"
    >
      <Image
        source={{ uri: movie.posterUrl }}
        style={styles.poster}
        contentFit="cover"
        transition={200}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.meta}>{movie.genre}</Text>
        <Text style={styles.meta}>{movie.year}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  poster: {
    width: 96,
    height: 138,
    backgroundColor: '#374151',
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  meta: {
    color: '#A1A1AA',
    fontSize: 13,
    marginTop: 2,
  },
});
