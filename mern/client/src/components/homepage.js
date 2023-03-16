import Card from 'react-bootstrap/Card';

function NavigationCards() {
  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '18rem', margin: '1rem' }}>
        <Card.Body>
          <Card.Title>Agent Page</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Create, View</Card.Subtitle>
          <Card.Text>
            Contains all agents information and admin command.
          </Card.Text>
          <Card.Link href="/RecordList">Go to Agent List</Card.Link>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: '1rem' }}>
        <Card.Body>
          <Card.Title>Transaction Page</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Money</Card.Subtitle>
          <Card.Text>
            Contains all transaction information and admin command.
          </Card.Text>
          <Card.Link href="/Transaction">Go to Transaction List</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NavigationCards;
