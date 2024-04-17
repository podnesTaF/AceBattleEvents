import { VStack, Text, Heading} from '@gluestack-ui/themed';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <VStack justifyContent='center' alignItems='center'>
        <Heading size='xl'>This screen doesn't exist.</Heading>

        <Link href="/" style={styles.link}>
          <Text size={'lg'} color="$blue300">Go to home screen!</Text>
        </Link>
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
