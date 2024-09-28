// import { ProjectLayout } from '@/components/layouts';
import dynamic from 'next/dynamic';

const ProjectLayout = dynamic(
  () =>
    import('../../components/layouts/ProjectLayout').then(
      mod => mod.ProjectLayout
    ),
  {
    ssr: false,
  }
);

export default function ProjectPage() {
  return (
    <>
      <ProjectLayout />
    </>
  );
}
