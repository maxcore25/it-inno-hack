import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ProjectGet } from '@/types';
import { Pencil, Star, Trash } from 'lucide-react';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

export type ProjectCardProps = HTMLAttributes<HTMLDivElement> & {
  project: ProjectGet;
};

export const ProjectCard = ({
  project,
  className,
  ...props
}: ProjectCardProps) => {
  return (
    <Card
      className={cn(
        'group relative flex h-[100px] items-center justify-center gap-2 p-0 font-semibold',
        className
      )}
      {...props}
    >
      <div className='absolute right-1 top-1 z-10 opacity-0 transition-opacity group-hover:opacity-100'>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='size-auto rounded-full p-1'
        >
          <Star className='size-4' />
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='size-auto rounded-full p-1'
        >
          <Pencil className='size-4' />
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='size-auto rounded-full p-1'
        >
          <Trash className='size-4' />
        </Button>
      </div>
      <Link
        href={`/projects/${project.guid}`}
        className='grid size-full place-content-center'
      >
        {project.name}
      </Link>
    </Card>
  );
};
