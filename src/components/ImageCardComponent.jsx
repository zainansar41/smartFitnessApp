import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";

const ImageCardComponent = ({ title, description, imageUrl }) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Cover source={{ uri: imageUrl }} />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default ImageCardComponent;
