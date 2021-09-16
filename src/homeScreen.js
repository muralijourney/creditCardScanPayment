import React, { useEffect } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert ,TouchableOpacity} from 'react-native';
import Cardscan from 'react-native-cardscan'
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io'




const Separator = () => (
  <View style={styles.separator} />
);

const Cardscanlibray = (props) =>{
  Cardscan.scan()
  .then(({action, payload,canceledReason}) => { 
    console.log("action Name ------->"+ action);
    console.log("canceled_reason ------->"+ canceledReason);
    console.log("payload ------->"+ payload);
   if (action === 'scanned') {
    const { number, expiryMonth, expiryYear,cardholderName } = payload;
    // Display information 
    Alert.alert("Card Details number:------->"+number+"  expiryMonth ------->"+expiryMonth+"   expiryYear -------->"+expiryYear+"  cardholderName---------"+cardholderName);
  } else if (action === 'canceled') {
  if (canceledReason === 'enter_card_manually') {
    // the user elected to enter a card manually
    console.log("enter_card_manually ------->");
    props.navigation.navigate("EnterManual");
  } else if (canceledReason === 'camera_error') {
    // there was an error with the camera
    console.log("camera_error ------->");
  } else if (canceledReason === 'fatal_error') {
    // there was an error during the scan
    console.log("fatal_error ------->");
  } else if (canceledReason === 'user_canceled') {
    // the user canceled the scan
    console.log("user_canceled ------->");
  } else {
    // the scan was canceled for an unknown reason
    console.log("unknown reason ------->");
  }
} else if (action === 'skipped') {
  // User skipped
  console.log("skipped ------->");
} else if (action === 'unknown') {
  // Unknown reason for scan canceled
  console.log("scan canceled ------->");
}
})
}

const scanCard =() =>{
  if (Platform.OS === 'ios') {
  CardIOModule.scanCard()
    .then(card => {
      // the scanned card
      console.log("card"+JSON.stringify(card));
    })
    .catch(() => {
      // the user cancelled
      console.log("scanCard Catch");
    })
  }else if(Platform.OS === "android"){
    CardIOModule.scanCard()
    .then(card => {
      // the scanned card
      console.log("card"+JSON.stringify(card));
    })
    .catch(() => {
      // the user cancelled
      console.log("scanCard Catch");
    })
  }
}



function HomeScreen (props) {
useEffect(() =>{
  if (Platform.OS === 'ios') {
      CardIOUtilities.preload()
  }
},[]);


return (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        React-native-cardscan 
      </Text>
      <Button
        title="Press me"
        onPress={() => Cardscanlibray(props)}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        React-native-awesome-card-io
      </Text>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => scanCard()}
      />
    </View>

    <Separator />
    <View>
      <Text style={styles.title}>
        Manually Card Enter 
      </Text>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => props.navigation.navigate("EnterManual")}
      />
    </View>
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    backgroundColor:"white"
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default HomeScreen;