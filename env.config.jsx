import React from 'react';
import { PLUGIN_OPERATIONS, DIRECT_PLUGIN } from '@openedx/frontend-plugin-framework';
import Feedback from './src/plugin-slots/feedback';

const getPluginSlots = () => ({
  feedback_plugin_slot: {
    plugins: [
      {
        op: PLUGIN_OPERATIONS.Insert,
        widget: {
          id: 'feedback_plugin_slot',
          type: DIRECT_PLUGIN,
          priority: 1,
          RenderWidget: (props) => <Feedback {...props} />,
        },
      },
    ],
  },
});

const config = {
  ...process.env,
  get pluginSlots() {
    return getPluginSlots();
  },
};

export default config;
