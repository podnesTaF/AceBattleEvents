import { View, Text } from 'react-native'
import React from 'react'
import { Box, HStack, ScrollView } from '@gluestack-ui/themed';

interface Props {
    items: any[];
    ItemComponent: React.FC<any>;
    identifier: string
}

const HorizontalListLayout: React.FC<Props> = ({items, ItemComponent, identifier}) => {
  return (
    <ScrollView horizontal={true}>
          <HStack px="$6" py="$2" w="$full" space={'lg'}>
            {items.map((item, i) => (
              <Box key={item?.id || i} maxWidth={340}>
                <ItemComponent {...{[identifier]: item}} />
              </Box>
            ))}
          </HStack>
        </ScrollView>
  )
}

export default HorizontalListLayout