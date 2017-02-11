'use babel';

import { EventEmitter } from 'events';
import { platform } from 'os';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';

this.config = {
  customArguments: {
    title: 'Custom Arguments',
    description: 'Specify your preferred arguments for `bsc`, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    'default': '{FILE_ACTIVE}',
    order: 0
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 1
  },
  alwaysEligible: {
    title: 'Always Eligible',
    description: 'The build provider will be available in your project, even when not eligible',
    type: 'boolean',
    default: false,
    order: 2
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (atom.config.get(meta.name + '.manageDependencies') && !atom.inSpecMode()) {
    this.satisfyDependencies();
  }
}

export function which() {
  if (platform() === 'win32') {
    return 'where';
  }
  return 'which';
}

export function satisfyDependencies() {
  let k;
  let v;

  require('atom-package-deps').install(meta.name);

  const ref = meta['package-deps'];
  const results = [];

  for (k in ref) {
    if (typeof ref !== 'undefined' && ref !== null) {
      v = ref[k];
      if (atom.packages.isPackageDisabled(v)) {
        if (atom.inDevMode()) {
          console.log('Enabling package \'' + v + '\'');
        }
        results.push(atom.packages.enablePackage(v));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
}

export function provideBuilder() {
  return class BscProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-bsc.customArguments', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'BuckleScript';
    }

    isEligible() {
      if (atom.config.get(meta.name + '.alwaysEligible') === true) {
        return true;
      }

      const cmd = spawnSync(which(), ['bsc']);
      if (!cmd.stdout.toString()) {
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        'File \\"(?<file>([^\\"]+))\\", line (?<line>\\d+), characters (?<col>\\d+)-(?<col_end>\\d+):\\r?\\n(?<message>.+)'
      ];

      const warningMatch = [
      ];

      // User settings
      const customArguments = atom.config.get(meta.name + '.customArguments').trim().split(' ');

      return [
        {
          name: 'BuckleScript',
          exec: 'bsc',
          args: [ '-c', '{FILE_ACTIVE}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'bsc:compile',
          errorMatch: errorMatch,
          warningMatch: warningMatch
        },
        {
          name: 'BuckleScript (user)',
          exec: 'bsc',
          args: customArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'bsc:compile',
          errorMatch: errorMatch,
          warningMatch: warningMatch
        }
      ];
    }
  };
}
