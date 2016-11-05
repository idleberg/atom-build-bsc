'use babel';

import { EventEmitter } from 'events';
import { install } from 'atom-package-deps';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';

this.config = {
  customArguments: {
    title: "Custom Arguments",
    description: "Specify your preferred arguments for `bsc`, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders",
    type: "string",
    "default": "{FILE_ACTIVE}",
    order: 0
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
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
      try {
        spawnSync('bsc -version');
      } catch (error) {
        if (atom.inDevMode()) atom.notifications.addError(meta.name, { detail: error, dismissable: true });
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
      const customArguments = atom.config.get('build-bsc.customArguments').trim().split(" ");

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
