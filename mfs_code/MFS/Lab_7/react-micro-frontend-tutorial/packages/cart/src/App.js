import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import CartPage from './Page/CartPage';

export default function App() {
  return (
    <ChakraProvider>
      <CartPage />
    </ChakraProvider>
  );
}
