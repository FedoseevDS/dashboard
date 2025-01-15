import { useGetDataQuery } from 'store/requests';

import { Button, Container } from './styles';

const Main = () => {
  const { data = [], isLoading } = useGetDataQuery({ limit: 100 });

  return (
    <Container>
      <Button>
        <button>значение</button>
        <button>тип диаграммы</button>
      </Button>
      <div>
        {isLoading
          ? '...Идет загрузка данных'
          : data?.data.map(({ open }: { open: string }, index: number) => (
              <div key={open + index}>{open}</div>
            ))}
      </div>
    </Container>
  );
};

export default Main;
