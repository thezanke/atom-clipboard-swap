'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'clipboard-swap:swap': () => this.swap()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  swap() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      const selection = editor.getSelectedText();
      editor.insertText(atom.clipboard.read());
      atom.clipboard.write(selection);
    }
  }

};
