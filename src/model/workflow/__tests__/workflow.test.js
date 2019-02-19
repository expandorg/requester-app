import { TaskWorkflowBackend, TaskWorkflowState } from '../index';

describe('TaskWorkflowBackend', () => {
  const taskForm = {
    modules: [
      {
        name: 'submit',
        caption: 'Submit',
        type: 'submit',
      },
    ],
  };

  describe('initial state', () => {
    it('should return initial task state', () => {
      const taskDraft = {
        taskForm,
        onboarding: {
          enabled: false,
          successMessage: 'test',
          failureMessage: 'test',
          steps: [],
        },
      };

      const result = TaskWorkflowBackend.getNextState(taskDraft);
      expect(result).toEqual({
        state: TaskWorkflowState.TASK,
        form: taskForm,
      });
    });

    it('should return initial onboarding state', () => {
      const form1 = {
        modules: [],
      };
      const taskDraft = {
        taskForm,
        onboarding: {
          enabled: true,
          successMessage: '',
          failureMessage: '',
          steps: [
            {
              form: form1,
            },
          ],
        },
      };

      const result = TaskWorkflowBackend.getNextState(taskDraft);
      expect(result).toEqual({
        state: TaskWorkflowState.ONBOARDING_GROUP,
        form: form1,
        groupState: {
          currentTry: 0,
          groupIndex: 0,
          incorrect: 0,
          stepIndex: 0,
        },
        groups: [
          {
            isGroup: false,
            failureMessage: undefined,
            retries: undefined,
            scoreThreshold: undefined,
            steps: [
              {
                form: form1,
              },
            ],
          },
        ],
      });
    });

    it('should return initial onboarding data state', () => {
      const form1 = {
        modules: [],
      };
      const taskDraft = {
        taskForm,
        onboarding: {
          enabled: true,
          successMessage: 'success',
          failureMessage: 'failed',
          steps: [
            {
              isGroup: true,
              failureMessage: 'Onboarding Failed',
              retries: 2,
              scoreThreshold: 0,
              data: {
                columns: [
                  { name: 'var1', type: 'string' },
                  { name: 'var2', isAnswer: true, type: 'string' },
                ],
                values: [['1', '2'], ['3', '4']],
              },
              form: form1,
            },
          ],
        },
      };

      const result = TaskWorkflowBackend.getNextState(taskDraft);
      expect(result).toEqual({
        state: TaskWorkflowState.ONBOARDING_GROUP,
        form: form1,
        groupState: {
          currentTry: 0,
          groupIndex: 0,
          incorrect: 0,
          stepIndex: 0,
        },
        groups: [
          {
            isGroup: true,
            failureMessage: 'Onboarding Failed',
            retries: 2,
            scoreThreshold: 0,
            steps: [
              {
                answer: '2',
                form: {
                  modules: [],
                },
              },
              {
                answer: '4',
                form: {
                  modules: [],
                },
              },
            ],
          },
        ],
      });
    });
  });
});
