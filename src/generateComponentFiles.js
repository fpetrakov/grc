const fs = require("fs");
const path = require("path");

const generateComponentFiles = async (componentsFolderPath, componentName) => {
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

  const newComponentFolderPath = await path.resolve(
    path.join(process.cwd(), componentsFolderPath, componentName),
  );

  await fs.mkdir(`${newComponentFolderPath}`, throwError);
  await fs.writeFile(
    `${newComponentFolderPath}/${componentName}.tsx`,
    tsxFileContents,
    throwError,
  );
  await fs.writeFile(
    `${newComponentFolderPath}/index.ts`,
    indexFileContents,
    throwError,
  );
  await fs.writeFile(
    `${newComponentFolderPath}/${componentName}.scss`,
    scssFileContents,
    throwError,
  );
};

module.exports = generateComponentFiles;
