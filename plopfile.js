export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create a React component',
    prompts: [
      {
        type: 'input',
        name: 'folder',
        message: 'Folder name?',
      },
      {
        type: 'input',
        name: 'component',
        message: 'Component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{kebabCase folder}}/{{pascalCase component}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase folder}}/{{pascalCase component}}.module.scss',
        templateFile: 'plop-templates/component.module.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/types/components/{{kebabCase folder}}/{{pascalCase component}}.types.ts',
        templateFile: 'plop-templates/component.types.ts.hbs',
      },
      {
        type: 'add',
        path: 'stories/{{kebabCase folder}}/{{pascalCase component}}.stories.tsx',
        templateFile: 'plop-templates/component.stories.tsx.hbs',
      },
    ],
  })
}
