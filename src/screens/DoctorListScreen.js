import React, {useEffect, useState} from 'react';
import { 
    StyleSheet,
    StatusBar,
    Image, 
    Animated, 
    Text, 
    View, 
    Dimensions,
    ActivityIndicator
} from 'react-native';
import faker from 'faker'
import axios from 'axios';


//Generate Fake Data
// faker.seed(10);
// const DATA = [...Array(10).keys()].map((_, i) => {
//     return {
//         key: Math.random(10),
//         image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(10)}.jpg`,
//         name: faker.name.findName(),
//         jobTitle: faker.name.jobTitle(),
//         email: faker.internet.email(),
//     };
// });

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const DoctorListScreen = () => {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [docData, setDocData] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getDoctors = async () => {
            setIsLoading(true);  
            await axios.get("https://us-central1-sched-me-doc.cloudfunctions.net/doctor/")  
            .then(res => {  
                const data = res.data.map(obj => ({
                    ...obj, 
                    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(60)}.jpg`
                }));
                setDocData(data); 
            })  
            .catch(err => {  
              console.log(err)  
            });
        }
        getDoctors();
        console.log(docData);
        setIsLoading(false);
    },[])

    if(isLoading){
        return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        )
    }
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Animated.FlatList
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: StatusBar.currentHeight || 42
                }}
                data={docData}
                keyExtractor={item => item.id}
                onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: true}
                )}
                renderItem={({index,item}) => {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2)
                    ]
                
                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0]
                    })
                    return (
                        <Animated.View style={{...styles.flatListItem, transform:[{scale}]}}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                            />
                            <View>
                                <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
                                <Text style={{ fontSize: 18, opacity: .7 }}>{item.address}</Text>
                                <Text style={{ fontSize: 12, opacity: .8, color: '#0099cc' }}>{item.email}</Text>
                            </View>
                        </Animated.View>
                    )
                }}
            >

            </Animated.FlatList>
        </View>
    )
}

export default DoctorListScreen;

const styles = StyleSheet.create({
    flatListItem: {
        flexDirection: 'row', 
        padding: SPACING,
        marginBottom: SPACING,
        backgroundColor: '#0000',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 3,
        shadowOffset: {
            width: 10,
            height: 10
        },
    },
    image: {
        width: AVATAR_SIZE, 
        height: AVATAR_SIZE, 
        borderRadius: AVATAR_SIZE,
        marginRight: SPACING / 2
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    }
});