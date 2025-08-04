import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/jack/Documents/my_private_tutor_online/my-tutor-website/tina/__generated__/.cache/1751968551597', url: 'https://content.tinajs.io/1.5/content/local/github/main', token: 'local', queries,  });
export default client;
  