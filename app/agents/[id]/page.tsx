import { DEMO_AGENTS } from '../../../data/demoData';
import AgentDetailsClient from './AgentDetailsClient';

export function generateStaticParams() {
  return DEMO_AGENTS.map((agent) => ({
    id: agent.id,
  }));
}

export default async function AgentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AgentDetailsClient id={id} />;
}
