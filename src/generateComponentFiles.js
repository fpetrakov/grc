const fs = require("fs");
const path = require("path");

const generateComponentFiles = (componentsFolderPath, componentName) => {
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
    if (err) throw Error(err.message);
  };

  const newComponentFolderPath = path.resolve(
    path.join(process.cwd(), componentsFolderPath, componentName),
  );

  fs.mkdirSync(`${newComponentFolderPath}`, throwError);
  fs.writeFileSync(
    `${newComponentFolderPath}/${componentName}.tsx`,
    tsxFileContents,
    throwError,
  );
  fs.writeFileSync(
    `${newComponentFolderPath}/index.ts`,
    indexFileContents,
    throwError,
  );
  fs.writeFileSync(
    `${newComponentFolderPath}/${componentName}.scss`,
    scssFileContents,
    throwError,
  );

  console.log("Component was successfully created!");
};

module.exports = generateComponentFiles;
