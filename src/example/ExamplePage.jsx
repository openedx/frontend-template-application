import { Container, Skeleton } from '@edx/paragon';

const ExamplePage = () => (
  <main>
    <Container className="py-5">
      <h1>Example Page</h1>
      <p>Hello world!</p>
      <Skeleton />
    </Container>
  </main>
);

export default ExamplePage;
