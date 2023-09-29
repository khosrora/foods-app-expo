import React from 'react'

import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { View, Text, Pressable, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';


export default function Recipies({ categories, meals }) {
    const navigation = useNavigation()
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-500'>Recipes</Text>
            {
                categories.length == 0 || meals.length == 0 ? (
                    <Loading
                        size='large'
                        className='mt-20'
                    />
                ) :
                    <MasonryList
                        data={meals}
                        keyExtractor={(item) => item.idMeal}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, i }) => <CardItem item={item} index={i} navigation={navigation} />}
                        // refreshing={isLoadingNext}
                        // onRefresh={() => refetch({ first: ITEM_CNT })}
                        onEndReachedThreshold={0.1}
                    // onEndReached={() => loadNext(ITEM_CNT)}
                    />
            }
        </View>
    )
}


const CardItem = ({ item, index , navigation }) => {
    let isEven = index % 2 == 0;

    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable
                style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                className='flex justify-center mb-4 space-y-1'
                onPress={() => navigation.navigate('RecioeDetails' , {...item})}
            >
                <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35) }}
                    className='bg-black/5 rounded-3xl'
                />
                <Text className='font-semibold ml-2 text-neutral-600'>
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}