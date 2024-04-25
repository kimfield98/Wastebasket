import Loading from './loading';

async function getMatch() {
  await new Promise(resolve => setTimeout(resolve, 60000));
}

export default function MatchDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  const match = getMatch();
  return <Loading />;
}
