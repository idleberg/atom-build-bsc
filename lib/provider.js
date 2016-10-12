'use babel';

import { install } from 'atom-package-deps';
import { execSync } from 'child_process';

// Package settings
import meta from '../package.json';
const notEligible = `**${meta.name}**: \`bsc\` is not in your PATH`;

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
}

export function provideBuilder() {
  return class BscProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'BuckleScript';
    }

    isEligible() {
      try {
        execSync('bsc -version');
        if (atom.inDevMode()) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
        return true;
      } catch (e) {
        if (atom.inDevMode()) atom.notifications.addInfo(`**${meta.name}**`, { detail: stdout, dismissable: false });
        return false;
      }
    }

    settings() {
      const errorMatch = [
        'File \\"(?<file>([^\\"]+))\\", line (?<line>\\d+), characters (?<col>\\d+)-(?<col_end>\\d+):\\r?\\n(?<message>.+)'
      ];

      const warningMatch = [
      ];

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
        }
      ];
    }
  };
}
