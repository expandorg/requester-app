export default {
  verification: {
    htmlId: 'add-verification',
    hint:
      'After a worker completes a task, we need to know if the worker should be paid. This is determined by your verification settings. Click the settings icon to explore the types of verification available.',
    orientation: 'bottom',
    order: 0,
  },
  screen: {
    htmlId: 'add-screen',
    hint:
      'Before workers attempt a task they need to know the rules right? They may also need to sign an NDA and you might want to filter out workers who are not a good fit for your job. Here you can add new screens seen before workers are assigned tasks.',
    orientation: 'left',
    order: 1,
  },
  search: {
    htmlId: 'gems-search',
    hint:
      "Use the search bar to search for the component you need. We are always adding new components and if you can't find the one you are looking for reach out to our team",
    orientation: 2,
  },
  components: {
    htmlId: 'gems-components',
    hint:
      'Drag and drop a component onto your screen to add it to your task. Optionally you can simply click the component to add.',
    orientation: 'right',
    order: 3,
  },
  preview: {
    htmlId: 'gems-preview',
    hint:
      "This button allows you to preview the task as seen from the worker's perspective. The preview starts with your first screen and as you click next it will take you through your other screens. The verification screen is previewed last.",
    orientation: 'top',
    order: 4,
  },
  toggle: {
    htmlId: 'gems-toggle',
    hint:
      'Welcome to the tutorial. Use the arrows to move between prompts. Click done when ever you want to stop.',
    orientation: 'top',
    order: 5,
  },
};
