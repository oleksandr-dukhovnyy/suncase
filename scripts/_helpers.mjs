import util from 'node:util';
import Child_process from 'node:child_process';
const exec = util.promisify(Child_process.exec);

const executer = async (commands) => {
  for (let i = 0; i < commands.length; i++) {
    const res = await exec(commands[i]);

    if (res.stderr) {
      console.error(res.stderr);
    }

    console.log(`[${commands[i]}]:\n`, res.stdout);
  }
};

export default executer;
