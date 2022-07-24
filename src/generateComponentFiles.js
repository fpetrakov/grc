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

  const handleError = (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

  const newComponentFolderPath = path.resolve(
    path.join(process.cwd(), componentsFolderPath, componentName),
  );

  fs.mkdirSync(`${newComponentFolderPath}`, handleError);
  fs.writeFileSync(
    `${newComponentFolderPath}/${componentName}.tsx`,
    tsxFileContents,
    handleError,
  );
  fs.writeFileSync(
    `${newComponentFolderPath}/index.ts`,
    indexFileContents,
    handleError,
  );
  fs.writeFileSync(
    `${newComponentFolderPath}/${componentName}.scss`,
    scssFileContents,
    handleError,
  );

  console.log("Component was successfully created!");
};

module.exports = generateComponentFiles;
