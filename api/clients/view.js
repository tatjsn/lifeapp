import path from 'path';
import { Environment, FileSystemLoader } from 'nunjucks';

let instance;

export default function () {
  if (!instance) {
    instance = new Environment(
      new FileSystemLoader(path.join(process.cwd(), 'views'))
    );
    instance.addFilter('date', (num) => new Date(num).toISOString());
  }

  return instance;
}
