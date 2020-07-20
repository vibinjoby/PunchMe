import { View, Text, SafeAreaView } from "react-native";

export default function Termsandsconditions() {
  const i = 10;
  return (
    <SafeAreaView>
      <Text styles={styles.container}>Terms and Policies</Text>
      <Text styles={styles.heading}>
        Bla bla bla,Bla bla bla Bla bla blaBla bla bla Bla bla bla Bla bla bla
        Bla bla bla Bla bla bla
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    marginBottom: 20,
    padding: 30,
  },
  heading: {
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    marginBottom: 20,
    padding: 30,
  },
});
