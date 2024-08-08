interface RootObject {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  previewUrl: string;
  type: string;
  level: string;
  equipment: string;
  metric: string;
  instructions: Instruction[];
  exerciseTargets: ExerciseTarget[];
  exerciseLogs: ExerciseLog[];
}

interface ExerciseLog {
  id: number;
  createdAt: string;
  updatedAt: string;
  workoutLogId: number;
  exerciseId: number;
  order: number;
}

interface ExerciseTarget {
  id: number;
  createdAt: string;
  updatedAt: string;
  targetId: number;
  exerciseId: number;
  priority: number;
  target: Target;
}

interface Target {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  parentId: number;
}

interface Instruction {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  exerciseId: number;
}
