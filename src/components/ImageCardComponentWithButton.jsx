import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph, Button, Avatar } from "react-native-paper";

const ImageCardComponentWithButton = ({ title, subtitle, imageUrl }) => {
  return (
    <Card style={styles.card}>
      {/* Card Header */}
      <Card.Title
        title={title}
        subtitle={subtitle}
        left={(props) => <Avatar.Image {...props} source={{ uri: imageUrl }} size={40} />}
      />
      {/* Card Image */}
      <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
      {/* Card Actions */}
      <Card.Actions style={styles.actions}>
        <Button mode="contained" onPress={() => console.log("Open pressed")} style={styles.openButton}>
          Open
        </Button>
        <Button mode="contained" onPress={() => console.log("Share pressed")} style={styles.shareButton}>
          Share
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    width:"90%"
  },
  image: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  openButton: {
    borderRadius: 20,
  },
  shareButton: {
    borderRadius: 20,
  },
});

export default ImageCardComponentWithButton;
