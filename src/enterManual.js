import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import React, { useEffect } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert ,TouchableOpacity} from 'react-native';



const cardInput = (formData) => {
  console.log("dfadsdfadsfas"+JSON.stringify(formData));
  const { values } = formData;
  const { number, expiry, cvc } = values;
  console.log(number)
  if(number.length === 19 && expiry!="" && cvc.length === 3){
    Alert.alert("Card :::>>>>>>>>>>"+number+"expiry >>>>>>>>>>>>>>"+expiry+"CVC >>>>>>>>>>>"+cvc);
  }
}


function EnterManual () {
 return(
    <View style={{marginTop:50}}>
      <CreditCardInput onChange={(formData) => cardInput(formData)} />
  </View>
 );
}

export default EnterManual;