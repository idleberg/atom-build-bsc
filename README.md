# build-bsc

[![apm](https://flat.badgen.net/apm/license/build-bsc)](https://atom.io/packages/build-bsc)
[![apm](https://flat.badgen.net/apm/v/build-bsc)](https://atom.io/packages/build-bsc)
[![apm](https://flat.badgen.net/apm/dl/build-bsc)](https://atom.io/packages/build-bsc)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-build-bsc)](https://circleci.com/gh/idleberg/atom-build-bsc)
[![David](https://flat.badgen.net/david/dev/idleberg/atom-build-bsc)](https://david-dm.org/idleberg/atom-build-bsc?type=dev)

[Atom Build](https://atombuild.github.io/) provider for [BuckleScript](https://github.com/bloomberg/bucklescript), compiles OCaml into JavaScript. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

## Installation

### apm

Install `build-bsc` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-bsc`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `BuckleScript` — compile script (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd>)
* `BuckleScript (user)` — compile script with arguments specified in the package settings

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE).
