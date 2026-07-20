import { ProcessStep } from '../../models/process-step';
import { fetchCollection } from '../_commons/cms';
import defaultProcessSteps from './defaults';

export const listProcessSteps = async (): Promise<ProcessStep[]> => {
  const steps = await fetchCollection<ProcessStep>(
    'process_steps',
    defaultProcessSteps
  );
  return [...steps].sort((a, b) => a.seq - b.seq);
};
