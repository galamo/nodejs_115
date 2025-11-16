import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import StorePage from './Page/StorePage';

export default function App() {
  return (
    <ChakraProvider>
      <StorePage />
    </ChakraProvider>
  );
}
