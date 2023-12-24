import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorPalettes, fonts, routeNames } from '../config/Constants';
import { Button1 } from '../generalComponents/Buttons';
import { checkUser } from '../services/API';
import { storeUserData } from '../services/Store';

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errObj, setErrObj] = useState({ type: 0, msg: '' });  //{0: none, 1: email, 2: password, 3: both}
  const [isLoader, setLoader] = useState(false);

  const handleLogin = () => {
    let checkValidation = validation();
    if (checkValidation) {
      setLoader(true);
      Keyboard.dismiss();
      checkUser({username, password}).then((res:any) => {
        setLoader(false);
        if(res){
          storeUserData.storeVal(res);
          navigation.replace(routeNames.home);
        }else{
          setErrObj({ type: 3, msg: 'Invalid credentials.' });
        }
      })
      .catch((e) => {
        console.log(e);
        setErrObj({ type: 4, msg: 'Oops something went wrong !!!\nPlease try again sometimes later.' });
      })
    }
  };

  const validation = () => {
    if ((username?.toString()).length == 0 && (password?.toString()).length == 0) {
      setErrObj({ type: 3, msg: 'Both fields are required !!!' });
      return false;
    } else {
      if ((username?.toString()).length == 0) {
        setErrObj({ type: 1, msg: 'Please enter username.' });
        return false;
      } else if ((password?.toString()).length == 0) {
        setErrObj({ type: 2, msg: 'Please enter password.' });
        return false;
      }
    }
    setErrObj({ type: 0, msg: '' });
    return true;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { borderColor: ((errObj.type == 1 || errObj.type == 3) ? colorPalettes.error : colorPalettes.azureishWhite) }]}>
        <Icon name="user" size={20} color={colorPalettes.black} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.errCtn}>
        {errObj.type == 1 && <Text style={[styles.errTxt]}>{errObj.msg}</Text>}
      </View>
      <View style={[styles.inputContainer, { borderColor: ((errObj.type == 2 || errObj.type == 3) ? colorPalettes.error : colorPalettes.azureishWhite) }]}>
        <Icon name="lock" size={20} color={colorPalettes.black} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.errCtn}>
        {errObj.type == 2 && <Text style={[styles.errTxt]}>{errObj.msg}</Text>}
      </View>

      {(errObj.type == 3 || errObj.type == 4) && <Text style={[styles.errTxt, {textAlign:'center'}]}>{errObj.msg}</Text>}
      <Button1 handleEvent={handleLogin} label={'Sign In'} isDisabled={isLoader} isSpinner={isLoader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: colorPalettes.white,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
  },
  errTxt: {
    fontFamily: fonts.family.poppins,
    fontSize: fonts.size.h6,
    color: colorPalettes.error,
    textAlign: 'left',
  },
  errCtn: {
    width: '100%',
    marginBottom: 10
  },
  input: {
    flex: 1,
    height: 60,
    marginLeft: 8,
    color: colorPalettes.black,
  },
  icon: {
    marginLeft: 16,
  }
});

export default Login;
