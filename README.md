# grc
grc (generate react component) is a CLI tool that creates React components for me

## 🚀 How to use

1. Install dependencies:
```console
npm i
```

2. Change templates according to your needs in src/generateComponentFiles.js (or use my templates)

3. Install this utility globally:
```console
npm i -g .
```

4. Generate Button component in src/component folder:
```console
grc Button -p src/components
```

5. Save path using -key option so you don't have to write path every time:
```console
grc Button -p very/long/path/to/your/components/folder -k cmp
```

6. Generate Button component using key:
```console
grc Button -k cmp
```

## ⚙️ Options

```bash
-p, --path   # path to components folder
-k, --key    # key to path from config file
```
