import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Card, Button } from 'react-bootstrap';

const VirtualizedList = ({ items }) => {
  const renderRow = ({ index, style }) => {
    const item = items[index];
    return (
      <div style={style} key={index} className="mb-3">
        <Card>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Button variant="primary">Adopt</Button>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <List
      height={400} // Height of the virtualized container
      itemCount={items.length} // Number of items in the list
      itemSize={120} // Height of each item
      width="100%" // Full width of the container
    >
      {renderRow}
    </List>
  );
};

export default VirtualizedList;
