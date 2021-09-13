import React, { useEffect } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert ,TouchableOpacity} from 'react-native';
import Cardscan from 'react-native-cardscan'
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io'



const Separator = () => (
  <View style={styles.separator} />
);



const Cardscanlibray = () =>{
  console.log("first line");

  Cardscan.scan()
  .then(({action, payload, canceled_reason}) => {
   if (action === 'scanned') {
    const { number, expiryMonth, expiryYear,cardholderName } = payload;
    // Display information
    console.log("number ------->"+ number);
    console.log("expiryMonth ------->"+ expiryMonth);
    console.log("expiryYear ------->"+ expiryYear);
    console.log("cardholderName ------->"+ cardholderName);
    Alert.alert("Card Details number:------->"+number+"  expiryMonth ------->"+expiryMonth+"   expiryYear -------->"+expiryYear+"  cardholderName---------"+cardholderName);
  } else if (action === 'canceled') {
  if (canceled_reason === 'enter_card_manually') {
    // the user elected to enter a card manually
    console.log("enter_card_manually ------->");
  } else if (canceled_reason === 'camera_error') {
    // there was an error with the camera
    console.log("camera_error ------->");
  } else if (canceled_reason === 'fatal_error') {
    // there was an error during the scan
    console.log("fatal_error ------->");
  } else if (canceled_reason === 'user_canceled') {
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
  // Cardscan.isSupportedAsync()
  // .then(supported => {
  //   if (supported) {
  //     // YES, show scan button
  //     console.log("yes");
     
  //   } else {
  //     // NO
  //     console.log("no");
  //   }
  // })
}


//  react-native-awesome-card-io
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


function StripeProvider(){
  // return (
  //   <StripeProvider
  //     publishableKey="pk_test_51JXNd9SCoHmWVGyt3oDfzlV8NzSrymuzxAugluXmflUNULbosfE8D6k8n5VBc3Rsu4VfUQksudrT66w4G0IHoqqh00J58tu630"
  //     merchantIdentifier="merchant.identifier"
  //   >
  //     <PaymentScreen />
  //   </StripeProvider>
  // );
}

function PaymentScreen() {
  const { confirmPayment } = useStripe();
  // return (
  //   <CardField
  //     postalCodeEnabled={true}
  //     placeholder={{
  //       number: '4242 4242 4242 4242',
  //     }}
  //     cardStyle={{
  //       backgroundColor: '#FFFFFF',
  //       textColor: '#000000',
  //     }}
  //     style={{
  //       width: '100%',
  //       height: 50,
  //       marginVertical: 30,
  //     }}
  //     onCardChange={(cardDetails) => {
  //       console.log('cardDetails', cardDetails);
  //     }}
  //     onFocus={(focusedField) => {
  //       console.log('focusField', focusedField);
  //     }}
  //   />
  // );
}

function App () {
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
        onPress={() => Cardscanlibray()}
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
        Stripe
      </Text>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => StripeProvider()}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
      </Text>
      <View>
        <Button
          title="Left button"
          onPress={() => Alert.alert('Left button pressed')}
        />
      </View>
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

export default App;