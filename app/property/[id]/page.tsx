import { INITIAL_PROPERTIES } from '../../../data/demoData';
import PropertyDetailsClient from './PropertyDetailsClient';

export function generateStaticParams() {
  return INITIAL_PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyDetailsClient id={id} />;
}
