import nanoid from 'nanoid';

const range = count => [...Array(count).keys()];

export const tasks = range(10).map(id => ({
  id,
  title: 'Task Title',
  status: Math.random() > 0.5 ? 'completed' : 'in-progress',
  description: 'Task description',
  logo: '/images/yc.png',
}));

export const drafts = range(5).map(id => ({
  id: nanoid(),
  title: `Draft Title ${id}`,
  logo: '/images/yc.png',
  endWhen: 'ExceedTasks',
}));

export const getDashboardTask = task => ({
  taskId: task.id,
  title: task.title,
  logo: task.logo,
  status: task.status,
});

export const getDashboardDraft = draft => ({
  id: draft.id,
  title: draft.title,
  logo: draft.logo,
  status: 'draft',
});

export const createTask = draft => ({
  id: tasks.length,
  title: draft.title,
  status: 'scheduled',
  logo: draft.logo,
  endWhen: draft.endWhen,
  endResultCount: draft.endWhen,
  endDate: draft.endDate,
});

export const copyDraft = draft => ({
  ...draft,
  id: nanoid(),
  title: `Copy of ${draft.title}`,
});

export const taskTemplates = range(20).map(i => ({
  id: nanoid(),
  name: i === 0 ? `Template name very very long, ${i}` : `Template name, ${i}`,
  logo: 'https://portal.gems.org//images/complete-tasks.png',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  taskForm: {
    modules: [
      {
        name: 'input',
        type: 'input',
        inputType: 'text',
        label: 'input label',
        placeholder: 'type something...',
      },
      {
        name: 'test',
        type: 'text',
        style: 'body',
        align: 'left',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ',
      },
      {
        name: 'submit',
        caption: 'Submit',
        type: 'submit',
      },
    ],
  },
  onboarding: {
    enabled: true,
    successMessage: '',
    failureMessage: '',
    steps: [],
  },
  verificationForm: {
    modules: [],
  },
  logic: {
    eligibility: {
      module: null,
    },
    assignment: {
      module: null,
      limit: null,
      repeat: false,
      expiration: null,
    },
    verification: {
      module: null,
      agreementCount: null,
      scoreThreshold: null,
      prompt: null,
    },
    funding: {
      module: null,
      balance: 0,
      reward: 0,
      verificationReward: 0,
    },
  },
}));

const quizForm = {
  id: nanoid(),
  name: 'Quiz',
  isGroup: true,
  data: [],
  logo: 'https://portal.gems.org//images/complete-tasks.png',
  taskForm: {
    modules: [
      {
        name: 'input',
        type: 'input',
        inputType: 'text',
        label: 'input label',
        placeholder: 'type something...',
      },
      {
        name: 'test',
        type: 'text',
        style: 'body',
        align: 'left',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ',
      },
      {
        name: 'submit',
        caption: 'Submit',
        type: 'submit',
      },
    ],
  },
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};

export const formTemplates = [quizForm].concat(
  range(10).map(id => ({
    id: nanoid(),
    name: `Form, ${id}`,
    isGroup: false,
    logo: 'https://portal.gems.org//images/complete-tasks.png',
    taskForm: {
      modules: [
        {
          name: 'input',
          type: 'input',
          inputType: 'text',
          label: 'input label',
          placeholder: 'type something...',
        },
        {
          name: 'test',
          type: 'text',
          style: 'body',
          align: 'left',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ',
        },
        {
          name: 'submit',
          caption: 'Submit',
          type: 'submit',
        },
      ],
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }))
);
