import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService();
turndownService.use(gfm);

export default turndownService;
