const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

export class ModuleTree {
  constructor(workspaceRoot) {
    this.workspaceRoot = workspaceRoot;
  }

  refresh() {
    // this._onDidChangeTreeData.fire();
  }

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage('No module in empty workspace');
      return Promise.resolve([]);
    }

    if (element) {
      return Promise.resolve(this.getModulesInPackage(path.join(this.workspaceRoot, 'src/pages')));
    } else {
      vscode.window.showInformationMessage('Workspace has no modules');
      return Promise.resolve([]);
    }
  }

  /**
   * Given the path, read all its system and modules.
   */
  getModulesInPackage(modulePath) {
    if (this.pathExists(modulePath)) {
      const modules = fs.readdirSync(modulePath);
      console.log(modules);

      //   const toDep = (moduleName, version) => {
      //     if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
      //       return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
      //     } else {
      //       return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.None, {
      //         command: 'extension.openPackageOnNpm',
      //         title: '',
      //         arguments: [moduleName],
      //       });
      //     }
      //   };

      //   const deps = packageJson.dependencies
      //     ? Object.keys(packageJson.dependencies).map(dep =>
      //         toDep(dep, packageJson.dependencies[dep])
      //       )
      //     : [];
      //   const devDeps = packageJson.devDependencies
      //     ? Object.keys(packageJson.devDependencies).map(dep =>
      //         toDep(dep, packageJson.devDependencies[dep])
      //       )
      //     : [];
      //   return deps.concat(devDeps);
      // } else {
      //   return [];
    }
  }

  pathExists(p) {
    try {
      fs.accessSync(p);
    } catch (err) {
      return false;
    }

    return true;
  }
}

export class Dependency extends vscode.TreeItem {
  constructor(label, version, collapsibleState, command) {
    super(label, collapsibleState);
    this.version = version;
  }

  get tooltip() {
    return `${this.label}-${this.version}`;
  }

  get description() {
    return this.version;
  }

  contextValue = 'dependency';
}
