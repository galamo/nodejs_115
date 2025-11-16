import React from "react";
import {
  Container,
  Flex,
  Heading,
  HStack,
  VStack,
  Image,
  AspectRatio,
  Text,
  Divider,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  GridItem,
  Select,
  Checkbox,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const CartPage = () => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        py={[0, 10, 20]}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <VStack spacing={3} alignItems="flex-start">
            <Heading size="2xl">Your details</Heading>
            <Text>
              If you!!! already have an account, click here to log in.
            </Text>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={colSpan}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="John" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Doe" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input placeholder="Blvd. Broken Dreams 21" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input placeholder="San Francisco" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select>
                  <option value="usa">United States of America</option>
                  <option value="uae">United Arab Emirates</option>
                  <option value="pak"> Pakistan </option>
                  <option value="nmk">North Macedonia</option>
                  <option value="de">Germany</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <Checkbox defaultChecked>Ship to billing address.</Checkbox>
            </GridItem>
            <GridItem colSpan={2}>
              <Button variant="primary" size="lg" w="full">
                Place order
              </Button>
            </GridItem>
          </SimpleGrid>
        </VStack>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={6}
          align="flex-start"
          bg={bgColor}
        >
          <VStack alignItems="flex-start" spacing={3}>
            <Heading size="2xl">Your cart</Heading>
            <Text>
              If the price is too hard on your eyes,{" "}
              <Button
                onClick={toggleColorMode}
                variant="link"
                colorScheme="black"
              >
                try changing the theme.
              </Button>
            </Text>
          </VStack>
          <HStack
            spacing={{ base: 3, md: 6 }}
            alignItems={{ base: "flex-start", md: "center" }}
            w="full"
          >
            <AspectRatio ratio={1} w={24}>
              <Image
                src="https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
                alt="Skateboard"
              />
            </AspectRatio>
            <Stack
              spacing={0}
              w="full"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack w="full" spacing={0} alignItems="flex-start">
                <Heading size="md">Nice Chair, pink</Heading>
                <Text color={secondaryTextColor}>PNYCOMP27541</Text>
              </VStack>
              <Heading size="sm" textAlign="end">
                $119.00
              </Heading>
            </Stack>
          </HStack>
          <VStack spacing={4} alignItems="stretch" w="full">
            <HStack justifyContent="space-between">
              <Text color={secondaryTextColor}>Subtotal</Text>
              <Heading size="sm">$57.00</Heading>
            </HStack>
            <HStack justifyContent="space-between">
              <Text color={secondaryTextColor}>Shipping</Text>
              <Heading size="sm">$19.00</Heading>
            </HStack>
            <HStack justifyContent="space-between">
              <Text color={secondaryTextColor}>Taxes (estimated)</Text>
              <Heading size="sm">$23.80</Heading>
            </HStack>
          </VStack>
          <Divider />
          <HStack justifyContent="space-between" w="full">
            <Text color={secondaryTextColor}>Total</Text>
            <Heading size="lg">$93.00</Heading>
          </HStack>
        </VStack>
      </Flex>
    </Container>
  );
};

export default CartPage;
