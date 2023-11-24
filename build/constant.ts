/**
 * The name of the configuration file entered in the production environment
 */
import { getEnvALLConfig } from './utils';

const config = getEnvALLConfig();
const { VITE_APP_ID } = config;
const dirList = ['dist', 'dist', 'wisdompark', 'carbon', 'zhyl', 'kygl'];

export const GLOB_CONFIG_FILE_NAME = '_app.config.js';

export const OUTPUT_DIR = dirList[VITE_APP_ID];
