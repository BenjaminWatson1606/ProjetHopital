import { StatusBar } from 'expo-status-bar';
import React, { useState,useMemo, useCallback } from 'react';
import { Text, View, TextInput, Button, Alert,StyleSheet,Image,TouchableOpacity,Modal,Animated } from "react-native";
import Constants from 'expo-constants';
import { NativeRouter, Route, Link } from "react-router-native";
import {Calendar, CalendarList, Agenda,AgendaEntry,AgendaSchedule} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import axios from "axios";
import AuthAPI from "../services/authAPI";


const Login = ({ OnLogin, History }) => {
  const [showLogin, setshowLogin] = useState(true)
  const [showCalendar, setshowCalendar] = useState(false)

  const onSubmit = data => console.log(data);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [token,setToken] = useState(""); 
  const [Error, SetError] = useState("");
  let [idPatientCree, setIdPatientCree] = useState();
  //gestion des champs
  

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({ ...credentials, [name]: [value] });
  };

  //gestion du submit

  const handleSubmit = async () => {
    try {
      await AuthAPI.authenticate(credentials);
      
       if (AuthAPI.authenticate(credentials)[0] ){
         setshowCalendar(true);
         setshowLogin(false);
         setToken(AuthAPI.authenticate(credentials)[1]);
       }
    } catch (error) {
       
      SetError("Aucun compte ne correpond à vos identifiants");
    }
  };


  interface State {
  items?: AgendaSchedule;
  }


  const ModalPopUp = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};


  const [items, setItems] = useState(undefined);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
      fetchMedecins()
      fetchVaccins()
      fetchVaccinations()
    }, [])

  
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const options = [
    { label: '8:00-8:30', value: '8:00-8:30' },
    { label: '8:30-9:00', value: '8:30-9:00' },
    { label: '9:00-9:30', value: '9:00-9:30' },
    { label: '9:30-10:00', value: '9:30-10:00' },
    { label: '10:00-10:30', value: '10:00-10:30' },
    { label: '10:30-11:00', value: '10:30-11:00' },
    { label: '11:00-11:30', value: '11:00-11:30' },
    { label: '11:30-12:00', value: '11:30-12:00' },
    { label: '13:00-13:30', value: '13:00-13:30' },
    { label: '13:30-14:00', value: '13:30-14:00' },
    { label: '14:00-14:30', value: '14:00-14:30' },
    { label: '14:30-15:00', value: '14:30-15:00' },
    { label: '15:00-15:30', value: '15:00-15:30' },
    { label: '15:30-16:00', value: '15:30-16:00' },
    { label: '16:00-16:30', value: '16:00-16:30' },
    { label: '16:30-17:00', value: '16:30-17:00' },
    { label: '17:00-17:30', value: '17:00-17:30' },
    { label: '17:30-18:00', value: '17:30-18:00' },
  ];

  const [optionMedecin,setOptionMedecin] = useState([]);
  const [optionVaccin, setOptionVaccin] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [vaccinations, setVaccinations] = useState();
  const [selectedVaccinOption, setSelectedVaccinOption] = useState();
  const [selectedMedecinOption, setSelectedMedecinOption] = useState();
  let [newPatient, setNewPatient] = useState({
        NomPatient: undefined,
        PrenomPatient: undefined,
        NumSecuriteSociale: undefined,
        DateVaccination: undefined,
        CreneauHoraire: undefined,
        AgePatient: undefined,
        AdressePatient: undefined
      })

  const fetchMedecins = async () => {
    const headersMedecins = {Authorization:`Bearer ${token}`}
      try {
        await axios
          .get("http://localhost:8000/api/medecins",{headersMedecins})
          .then((response) => response.data["hydra:member"].map(Medecin => (optionMedecin.push({value: Medecin.id, label: Medecin.NomMedecin + " " + Medecin.PrenomMedecin}))))
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    };

    const fetchVaccinations = async () => {
    const headersVaccinations = {Authorization:`Bearer ${token}`}
      try {
        await axios
          .get("http://localhost:8000/api/vaccinations",{headersVaccinations})
          .then((response) => setVaccinations(response.data["hydra:member"]))
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    };

  const fetchVaccins = async () => {
    const headersVaccins = {Authorization:`Bearer ${token}`}
      try {
        await axios
          .get("http://localhost:8000/api/vaccins",{headersVaccins})
          .then((response) => response.data["hydra:member"].map(Vaccin => (optionVaccin.push({value: Vaccin.id, label: Vaccin.TypeVaccin}))))
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    };
  const addVaccination = () => {
    console.log(selectedOption)
    const headersVaccination = {Authorization:`Bearer ${token}`}
      const heureDebut = selectedOption.split("-")[0]
      const heureFin = selectedOption.split("-")[1]
        try {
          axios.post("http://localhost:8000/api/patients", {
            NomPatient: newPatient.NomPatient,
            PrenomPatient: newPatient.PrenomPatient,
            NumSecuriteSociale: newPatient.NumSecuriteSociale,
            AgePatient: parseInt(newPatient.AgePatient),
            AdressePatient: newPatient.AdressePatient,
            TypePatient: 'Vaccination'
          },{headersVaccination})
          .then((response) => setIdPatientCree(response.data.id))
          console.log(idPatientCree)
        } catch (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        }
        try {
          axios.post("http://localhost:8000/api/vaccinations", {
            Vaccin:"/api/vaccins/" + selectedVaccinOption,
            Medecin: "/api/medecins/" + selectedMedecinOption,
            Patient: "/api/patients/" + idPatientCree,
            DateDebut: newPatient.DateVaccination + " " + heureDebut,
            DateFin: newPatient.DateVaccination + " " + heureFin
          },{headersVaccination})
        } catch (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        }

      }
  
  const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  image:{
    marginBottom: 40,
    marginLeft: 75,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  
});

  return (
    <View>
    <Modal 
    visible={showLogin}
    >
    <View style={styles.container}>
    
      <Image style={styles.image} source={require('../assets/hospital.png')} />
      <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            onChange={e => {
              credentials.username=e.target.value
            }}
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
          />
    
      <Text style={styles.label}>Password</Text>
      
          <TextInput
            style={styles.input} 
            onChange={e => {
              credentials.password=e.target.value
            }}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        
      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Button"
          onPress={() =>handleSubmit()}
        />
      </View>
    </View>
    </Modal>
    <Modal visible={showCalendar}>
      <div className="HopitalArray">
        <table id="InfirmiersTable" className="table table-dark">
          <thead>
            <tr>
              <th>Medecin</th>
              <th>Patient</th>
              <th>Vaccin</th>
              <th>Date de debut</th>
              <th>Date de fin</th>
            </tr>
          </thead>
          <tbody>
           {vaccinations &&
            vaccinations.map(vaccination => (
              <tr>
                <td>{vaccination.Medecin.NomMedecin + " " + vaccination.Medecin.PrenomMedecin}</td>
                <td>{vaccination.Patient.NomPatient + " " + vaccination.Patient.PrenomPatient}</td>
                <td>{vaccination.Vaccin.TypeVaccin}</td>
                <td>{"Le " + vaccination.DateDebut.split('+')[0].split('T')[0].split('-')[2] + "/" + vaccination.DateDebut.split('+')[0].split('T')[0].split('-')[1] + "/" + vaccination.DateDebut.split('+')[0].split('T')[0].split('-')[0] + " à " + vaccination.DateDebut.split('+')[0]                   .split('T')[1]}</td>
                <td>{"Le " + vaccination.DateFin.split('+')[0].split('T')[0].split('-')[2] + "/" + vaccination.DateFin.split('+')[0].split('T')[0].split('-')[1] + "/" + vaccination.DateFin.split('+')[0].split('T')[0].split('-')[0] + " à " + vaccination.DateFin.split('+')[0].split('T')                [1]}</td>

              </tr>))}
          </tbody>

        </table>
      </div>
     <ModalPopUp visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <Button title="X" onPress={() => setVisible(false)} />
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            // onChange={e => {
            //   credentials.username=e.target.value
            // }}
            type="text"
            id="name"
            name="nomPatient"
            placeholder="Entrer le nom du patient"
            onChange = {e => {newPatient.NomPatient=e.target.value}}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            // onChange={e => {
            //   credentials.username=e.target.value
            // }}
            type="text"
            id="surname"
            name="prenomPatient"
            placeholder="Entrer le prénom du patient"
            onChange = {e => {newPatient.PrenomPatient=e.target.value}}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            // onChange={e => {
            //   credentials.username=e.target.value
            // }}
            type="number"
            id="age"
            name="agePatient"
            placeholder="Entrer l'âge du patient"
            onChange = {e => {newPatient.AgePatient=e.target.value}}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            // onChange={e => {
            //   credentials.username=e.target.value
            // }}
            type="text"
            id="adresse"
            name="adressePatient"
            placeholder="Entrer son adresse"
            onChange = {e => {newPatient.AdressePatient=e.target.value}}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            // onChange={e => {
            //   credentials.username=e.target.value
            // }}
            type="text"
            id="numSecu"
            name="numSecuPatient"
            placeholder="Entrer son numéro de sécurité sociale"
            onChange = {e => {newPatient.NumSecuriteSociale=e.target.value}}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
           <TextInput
            style={styles.input}
            // onChange={e => {
            //   credentials.username=e.target.value
            // }}
            type="text"
            id="date"
            name="date"
            placeholder="Entrer date de la vaccination"
            onChange = {e => {newPatient.DateVaccination=e.target.value}}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <RNPickerSelect
            items={options}
            onValueChange={(value)=>setSelectedOption(value)}
            name="creneauxHoraire"
            value={selectedOption}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              color: {
                ...theme.colors,
                primary25: '#Bdd7cf',
                primary: '#c3cfd9'
              }
            })}
          />
          </View>
          <View style={{ marginTop: 25 }}>
          <RNPickerSelect
            items={optionVaccin}
            onValueChange={(value)=>setSelectedVaccinOption(value)}
            name="Vaccin"
            value={selectedVaccinOption}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              color: {
                ...theme.colors,
                primary25: '#Bdd7cf',
                primary: '#c3cfd9'
              }
            })}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <RNPickerSelect
            items={optionMedecin}
            onValueChange={(value)=>setSelectedMedecinOption(value)}
            name="Medecin"
            value={selectedMedecinOption}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              color: {
                ...theme.colors,
                primary25: '#Bdd7cf',
                primary: '#c3cfd9'
              }
            })}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button title="Ajouter" 
          onPress={() => addVaccination()}
          />
        </View>
      </ModalPopUp>
      
      <Button title="Ajout d'un RDV ;)" onPress={() => setVisible(true)} />
    </Modal>
    </View>
  );
}
export default Login;


