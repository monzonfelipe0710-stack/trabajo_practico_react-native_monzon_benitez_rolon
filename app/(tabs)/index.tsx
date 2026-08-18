import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MovieCard from '@/components/MovieCard';
import { getMovies, Movie } from '@/services/movies';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      try {
        const data = await getMovies();
        if (isMounted) {
          setMovies(data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return movies;
    }

    return movies.filter((movie) => movie.title.toLowerCase().includes(query));
  }, [movies, searchQuery]);

  const emptyMessage = searchQuery.trim()
    ? `No se encontraron películas para "${searchQuery}".`
    : 'No hay películas disponibles en este momento.';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>CineLibre</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#8A8A8F" style={styles.searchIcon} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar películas..."
            placeholderTextColor="#8A8A8F"
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F59E0B" />
            <Text style={styles.loadingText}>Cargando películas...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredMovies}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <MovieCard movie={item} onPress={() => undefined} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{emptyMessage}</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 18,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 16,
    paddingVertical: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: '#F8FAFC',
    fontSize: 15,
    marginTop: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#CBD5E1',
    fontSize: 15,
    textAlign: 'center',
  },
});
