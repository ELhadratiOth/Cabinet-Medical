/* eslint-disable react/prop-types */
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  content: {
    height: '100%',
    marginTop: '30%',
  },
  medication: {
    fontSize: 13,

  },
  medicationName: {
    fontSize: 13,
    fontWeight: 'bold',
    textDecoration: 'underline',
    textTransform: 'uppercase', 

  },
  medicationDetail: {
    marginTop: 5,
    fontSize: 12,
  },
});

const PDFTemplate = ({ medications }) => {
  return (
    <Document>
      <Page size={[420, 595]} style={styles.body}>
        <View style={styles.content}>
          {medications.map((med, index) => (
            <Text key={med.id} style={styles.medication}>
              <Text style={styles.medicationName}>
                {index + 1}-{' '} {med.name}
              </Text>
              {'\n'}
              {'\n'}
              <Text style={styles.medicationDetail}>{med.description}</Text>
              {'\n'}
              {'\n'}
              {'\n'}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate;
