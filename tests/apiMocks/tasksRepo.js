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
        type: 'richText',
        name: 'rt-1',
        content:
          '<h1>Task</h1> In this task you will have to do x Please remember to do y',
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
    enabled: false,
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
  scoreThreshold: 1,
  retries: 3,
  failureMessage: 'Quiz failed',
  data: {
    answer: { field: 'input' },
    columns: [
      { name: 'varname1', type: 'text' },
      { name: 'varname2', type: 'number' },
      { name: 'varname3', type: 'bool' },
    ],
    steps: [
      { values: ['Type your name', 12, false], answer: '14' },
      { values: ['Your favorite book', 22, false], answer: '14' },
      { values: ['text-31', 32, false], answer: '14' },
      { values: ['text-41', 42, false], answer: '15' },
    ],
  },
  taskForm: {
    modules: [
      {
        name: 'input',
        type: 'input',
        inputType: 'text',
        placeholder: '$(varname1)...',
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
};

export const formTemplates = [quizForm].concat(
  range(10).map(id => ({
    id: nanoid(),
    name: `Form, ${id}`,
    isGroup: false,
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
  }))
);
