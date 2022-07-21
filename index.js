const fs = require("fs");
const path = require("path");

const componentName = "Button";
const pathToComponent = path.resolve(path.join(__dirname, componentName)) + "/";

const tsxFileContents = `import React from 'react';
import { makeCn } from '@/shared/utils';
import styles from './${componentName}.scss';

const cn = makeCn('${componentName}', styles);

interface ${componentName}Props {}

export const ${componentName}: React.FC<${componentName}Props> = ({}) => {
  return (
    <div>${componentName}</div>
  )
}
`;

const indexFileContents = `export * from './${componentName}';`;

const scssFileContents = `@import '@/shared/styles/functions';

.${componentName} {
  $this: &;
}
`;

const throwError = (err) => {
  if (err) throw Error;
};

const generateReactComponent = async () => {
  await fs.mkdir(componentName, throwError);
  await fs.writeFile(
    `${pathToComponent}${componentName}.tsx`,
    tsxFileContents,
    throwError,
  );
  await fs.writeFile(
    `${pathToComponent}index.ts`,
    indexFileContents,
    throwError,
  );
  await fs.writeFile(
    `${pathToComponent}${componentName}.scss`,
    scssFileContents,
    throwError,
  );
};

generateReactComponent();
