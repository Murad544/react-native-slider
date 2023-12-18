import { SafeAreaView, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainPage from './components/MainPage';

const images = [
  'https://fastly.picsum.photos/id/557/300/200.jpg?hmac=I8VNA3M1ZqTqbZSYqF9cmYLFC0PTsH4jtvDB-I26M2Q',
  'https://fastly.picsum.photos/id/736/300/200.jpg?hmac=VMEBbfgnuOtJXS_RYVlSfGKd37uTDHtHcqWbvaXnBI8',
  'https://fastly.picsum.photos/id/380/300/200.jpg?hmac=gFmrK_9oSezhTqAkLhYYbqPs18BtnYTeXW-Ll_10NRI',
  'https://fastly.picsum.photos/id/460/300/200.jpg?hmac=BnPkmWAxs-vklFl1lq0xhDAESNUZzynRHPtgbhU4vl0',
];

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <MainPage />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
